require("dotenv").config();
const express = require("express");
const { engine } = require("express-handlebars");
const mysql = require("mysql");
const expressSession = require("express-session");
const MySQLStore = require("express-mysql-session")(expressSession);
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const
  { RenderArt } = require("./utils/renderArtID"),
  { mailSend } = require("./utils/nodeMailer");

// Bcrypt
const bcrypt = require('bcrypt');
const bcrypt_salt = 10;

// Déstructuration de process.env
const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER, PORT_NODE } = process.env;

// Import des middlewares
const { isAdmin, isSession } = require('./middleware');
const app = express();

/*
* Configuration Handlebars 
***************************/

// Import des helpers
const { limit, ifCheck } = require('./helper');

app.engine('hbs', engine({
  helpers: {
    limit,
    ifCheck
  },
  extname: 'hbs',
  defaultLayout: 'main'
}));

app.set('view engine', 'hbs');
app.set('views', './views');

/*
* Config mysql
***************/
let configDB = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE
};

// Création de la connection avec les paramètres donner
db = mysql.createConnection(configDB);

// Config ASYNC
const util = require("util");
db.query = util.promisify(db.query).bind(db);

// Connexion de la db mysql
db.connect((err) => {
  if (err) console.error('error connecting: ', err.stack);
  console.log('connected as id ', db.threadId);
});

/*
 * Config method override 
 *************************/
app.use(methodOverride('_method'));

/*
 * Config Body-parser
 *********************/

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

/*
 * Configuration de la route vers notre dossier static
 ******************************************************/
app.use("/assets", express.static('public'));

// Configuration Express-Session
let sessionStore = new MySQLStore(configDB);
app.use(
  expressSession({
    secret: "securite",
    name: "poti-gato",
    saveUninitialized: true,
    resave: false,
    store: sessionStore
  })
);
// Session Connexion for HBS
app.use('*', (req, res, next) => {
  res.locals.user = req.session.user;
  next();
})

/*
 * Route de l'application
 *************************/

// Home page
app.get('/', async (req, res) => {
  // Récupération de tout les articles
  const articles = await db.query(`SELECT * FROM articles ORDER BY id DESC`)
  res.render('home', {
    articles
  });
});

// Contact page
app.get('/contact', (req, res) => {
  res.render('contact');
});

// Connexion page
app.get('/connexion', (req, res) => {
  res.render('connexion');
})


app.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await db.query(`SELECT password FROM users WHERE email="${email}"`)

  if (!user[0]) return res.render('connexion', { flash: "Ce compte n'existe pas" })
  bcrypt.compare(password, user[0].password, async (err, result) => {
    if (!result) res.render('connexion', { flash: "L\'email ou le mot de passe n\'est pas correct !" });
    else {
      let userget = await db.query(`SELECT * FROM users WHERE email="${email}" `)
      let user = userget[0];

      req.session.user = {
        id: user.id,
        email: user.email,
        name: user.name,
        account_create: user.create_time,
        isAdmin: user.isAdmin
      }

      res.redirect('/profil')
    }
  });

})

app
  .post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) return res.render('connexion', { flash: "Vous devez remplir tout les champs !!" })
    const mailExist = await db.query(`SELECT email FROM users WHERE email="${email}"`)

    if (mailExist == []) {
      bcrypt.hash(password, bcrypt_salt, async function (err, hash) {
        await db.query(`INSERT INTO users SET name="${name}", email="${email}", password="${hash}", isAdmin=0`)
        res.redirect('/connexion');
      })
    } else return res.render('connexion', { flash: "L'email n'est pas disponible !!" })
  })

app.get('/profil', (req, res) => {
  res.render('profil');
})
  .put('/profil', async (req, res) => {
    const { name, email, password } = req.body
    if (name) {
      await db.query(`UPDATE users SET name="${name}" WHERE id=${req.session.user.id}`)
    }
    if (email) {
      await db.query(`UPDATE users SET email="${email}" WHERE id=${req.session.user.id}`)
    }
    if (password) {
      bcrypt.hash(password, bcrypt_salt, async function (err, hash) {
        await db.query(`UPDATE users SET password="${hash}" WHERE id=${req.session.user.id}`)
      });
    }

    let userget = await db.query(`SELECT * FROM users WHERE id="${req.session.user.id}" `)
    let user = userget[0];

    req.session.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      account_create: user.create_time,
      isAdmin: user.isAdmin
    }

    res.redirect('/profil')

  })

app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('poti-gato');
    console.log("Clear Cookie session :", req.sessionID);
    res.redirect('/');
  })
})

/*
 *  CRUD ARTICLES
 *****************/
app
  // GET ARTICLE - GET
  .get('/article/:id', async (req, res) => {
    // On revoit notre page article_id avec les data
    res.render('article_id', {
      data: await RenderArt(id),
      flash: 'get article'
    })
  });

app.use(isSession);
/*
 * CRUD COMMENTAIRE 
 */
app
  .post('/comment/:id', async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body
    await db.query(`INSERT INTO commentaires SET comment="${comment}", article_id="${id}" ,user_id="${req.session.user.id}"`)
    res.redirect('back')
  })
  .delete('/comment/del/:id', async (req, res) => {
    const { id } = req.params;
    const data = await db.query(`SELECT user_id FROM commentaires WHERE id=${id}`)

    if (data !== []) {
      if (req.session.user.id === data[0].user_id) {
        await db.query(`DELETE FROM commentaires WHERE id=${id}`)
        res.redirect('back')
      } else return res.render('article_id', {
        data: await RenderArt(id),
        flash: "Vous n'avez pas les droits !"
      })
    } else return res.render('article_id', {
      data: await RenderArt(id),
      flash: "Le commentaire n'existe pas !"
    })

  })

// Utilisation du middleware pour toute les routes suivante
app.use(isAdmin);

app
  // POST ARTICLE - CREATE
  .post('/article', async (req, res) => {
    const { title, price } = req.body;
    if (!title || !price) return res.render('admin', { flash: "Vous n'avez pas les droits requis !!" });

    // Ajout d'un article
    await db.query(`INSERT INTO articles (title, price) VALUES ('${title}', '${price}');`)

    // Redirection vers la page Admin
    res.redirect('/admin');
  })

  // PUT ARTICLE ID - EDIT
  .put('/article/:id', async (req, res) => {
    const { id } = req.params;
    const { title, price } = req.body;

    if (!title || !price || !id) return res.redirect('back')

    // Edition de l'article par rapport a son id
    await db.query(`UPDATE articles SET title="${title}", price="${price}" WHERE id=${id};`)

    // Redirection vers la page admin
    res.redirect('/admin');
  })

  // DELETE ARTICLE ID - DELETE
  .delete('/article/:id', async (req, res) => {
    const { id } = req.params;

    // Supression de l'article par rapport a son id
    await db.query(`DELETE FROM articles WHERE id=${id}`)

    // Redirection vers la page admin
    res.redirect('/admin');
  });

// Admin page
app
  .get('/admin', async (req, res) => {

    // Récupération de tout les articles
    const articles = await db.query(`SELECT * FROM articles`)

    // Rendu de la page admin avec les data de la requête précédente
    res.render('admin', {
      layout: "admin",
      articles
    });

  })
  .post('/mail', (req, res) => {
    const { content, sujet, email } = req.body;

    mailSend(`Bruno Email Pro <${process.env.MAIL_USER}>`, `Vous <${email}>`, sujet, content, async function (err, info) {
      res.redirect('/')
    });

  });

// Port d'écoute de l'application
app.listen(PORT_NODE, () => console.log(`Server start on localhost:${PORT_NODE} 🚀`));