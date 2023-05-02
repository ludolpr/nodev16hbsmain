require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const mysql = require('mysql');
const expressSession = require("express-session");
const MySQLStore = require("express-mysql-session")(expressSession);
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// Déstructuration de process.env
const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER, PORT_NODE } = process.env;

/*
* Configuration Handlebars 
***************************/
const { limit } = require('./helper');
app.engine('hbs', engine({
  helpers: {
    limit
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
  host: DB_HOST, // localhost
  user: DB_USER, // user
  password: DB_PASSWORD, // password
  database: DB_DATABASE // nameDatabase
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

// Session Connexion for HBS :: Ici on demande que à toutes (*) les requètes de tous les clients de passer par ce middleware
// Attention a bien le mettre au dessus de vos controllers
app.use('*', (req, res, next) => {
  // On assigne une variable locals (global dans notre application) qui sera égale à notre session
  // (que l'on pourra consomer directement dans notre HBS) {{ user.name }}
  res.locals.user = req.session.user;
  // La function next() nous permet de continuer dans l'arborescences des routes (tant qui n'aura pas de res il continuera)
  next();
})

/*
 * Route de l'application
 *************************/

// Import des middlewares
const { isAdmin } = require('./middleware');
const app = express();

// Home page
app.get('/', async (req, res) => {
  // Récupération de tout les articles
  const articles = await db.query(`SELECT * FROM articles`)
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

/*********/
const bcrypt = require('bcrypt');
const bcrypt_salt = 10;

// 2/ à faire en deuxième :: Login
app.post('/login', (req, res) => {
  // Récupération du formulaire de connexion
  const { email, password } = req.body

  // On va chercher dans la db si le mail existe
  db.query(`SELECT * FROM users WHERE email="${email}"`, function (err, data) {
    if (err) throw err;

    // On stock notre resultat[0] qui sera notre user ayant le mail correspondant
    let user = data[0]
    // Si l'on a aucun user ayant ce mail
    if (!user) return res.render('connexion', { flash: "Ce compte n'existe pas" })

    // On viens comparer notre password du formulaire avec le hash de l'user correspondant au mail dans la db
    // la function compare hash le password pour le comparer avec le hash passer en parametre (user.password)
    bcrypt.compare(password, user.password, function (err, result) {
      // Si le mot de passe ne correspond pas
      if (!result) return res.render('connexion', { flash: "L\'email ou le mot de passe n\'est pas correct !" })
      else {
        // On assigne les data voulu dans la session
        req.session.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          account_create: user.create_time,
          isAdmin: user.isAdmin
        };

        res.redirect('/')
      }
    });
  })

})

// 1/ à faire en premier :: Register
app.post('/register', (req, res) => {
  // Récupération du formulaire de création de compte
  const { name, email, password } = req.body;

  // Ici l'on pourrais checker en back si le password est égale au passwordConfirm
  // if(password !== confirm_password) return res.redirect('/')

  // On check si l'on a bien les informations que l'on a besoin
  if (!name || !email || !password) return res.redirect('/')

  // On hash notre password avant de l'enregistrer dans la DB
  bcrypt.hash(password, bcrypt_salt, function (err, hash) {
    // Notre requête SQL pour enregistrer notre user dans la DB
    db.query(`INSERT INTO users SET name="${name}", email="${email}", password="${hash}", isAdmin=0`, function (err, data) {
      if (err) throw err;

      res.redirect('/connexion');
    })
  });
})

// 4/ à faire en quatrième :: Profil
app
  // Notre page profile
  .get('/profil', (req, res) => {
    res.render('profil');
  })
  // Notre edit profil
  .put('/profil', async (req, res) => {
    // Récupération du formulaire de création de compte
    const { name, email, password } = req.body

    // Ici on vient editer les champs en fonction des besoins
    if (name) await db.query(`UPDATE users SET name="${name}" WHERE id=${req.session.user.id}`)
    if (email) await db.query(`UPDATE users SET email="${email}" WHERE id=${req.session.user.id}`)
    if (password) bcrypt.hash(password, bcrypt_salt, async function (err, hash) {
      await db.query(`UPDATE users SET password="${hash}" WHERE id=${req.session.user.id}`)
    });

    // On viens récupérer notre user avec les data mise à jour
    let [user] = await db.query(`SELECT * FROM users WHERE id=${req.session.user.id}`)

    // et l'on remet la session à jour
    req.session.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      account_create: user.create_time,
      isAdmin: user.isAdmin
    };

    res.redirect('/profil');
  })

// 3/ à faire en troisième :: Logout
app.post('/logout', (req, res) => {
  // On détruit la session
  req.session.destroy(() => {
    // On supprime le cookie
    res.clearCookie('poti-gato');
    // Le petit log pour informé dans la console
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
    const { id } = req.params;
    const articles = await db.query(`SELECT * FROM articles WHERE id=${id}`)

    res.render('article_id', {
      articles
    })
  });

// Utilisation du middleware pour toute les routes suivante
app.use(isAdmin);

app
  // POST ARTICLE - CREATE
  .post('/article', (req, res) => {
    const { title, price } = req.body;

    db.query(`INSERT INTO articles (title, price) VALUES ('${title}', '${price}');`, function (err, data) {
      if (err) throw err;

      res.redirect('/admin');
    })
  })

  // PUT ARTICLE ID - EDIT
  .put('/article/:id', (req, res) => {
    const { id } = req.params;
    const { title, price } = req.body;

    db.query(`UPDATE articles SET title="${title}", price="${price}" WHERE id=${id};`, function (err, data) {
      if (err) throw err;

      res.redirect('/admin');
    })
  })

  // DELETE ARTICLE ID - DELETE
  .delete('/article/:id', (req, res) => {
    const { id } = req.params;

    db.query(`DELETE FROM articles WHERE id=${id}`, function (err, data) {
      if (err) throw err;

      res.redirect('/admin');
    })
  });

// Admin page
app.get('/admin', async (req, res) => {
  const articles = await db.query(`SELECT * FROM articles`)

  res.render('admin', {
    layout: "admin",
    articles
  });

});

// Port d'écoute de l'application
app.listen(PORT_NODE, () => console.log(`Server start on localhost:${PORT_NODE} 🚀`));