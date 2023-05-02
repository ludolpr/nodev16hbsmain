require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// Déstructuration de process.env
const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER, PORT_NODE } = process.env;

const app = express();

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

// ! Config ASYNC
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

/*
 * Route de l'application
 *************************/

// Import des middlewares
const { isAdmin } = require('./middleware');

// Home page
app.get('/', async (req, res) => {
  // Récupération de tout les articles
  const data = await db.query(`SELECT * FROM articles`);
  console.log(data);
  // Rendu de la page home avec les data de la requête précédente
  res.render('home', {
    data
  });
});

/*
 *  CRUD ARTICLES
 *****************/
app

// POST ARTICLE - CREATE
.post('/article', async (req, res) => {
  const { title, price } = req.body;

  // Ajout d'un article
  await db.query(`INSERT INTO articles (title, price) VALUES ('${title}', '${price}');`)

  // Redirection vers la page Admin
  res.redirect('/admin');
})

// PUT ARTICLE ID - EDIT
.put('/article/:id', async (req, res) => {
  const { id } = req.params;
  const { title, price } = req.body;
  
  // Edition de l'article par rapport a son id
  await db.query(`UPDATE articles SET title="${title}", price="${price}" WHERE id=${id};`)

  // Redirection vers la page admin
  res.redirect('/admin');
})

// DELETE ARTICLE ID - DELETE
.delete('/article/:id', async (req,res) => {
  const { id } = req.params;

  // Supression de l'article par rapport a son id
  await db.query(`DELETE FROM articles WHERE id=${id}`)

  // Redirection vers la page admin
  res.redirect('/admin');
});

// Contact page
app.get('/contact', (req, res) => {
  res.render('contact');
});

// Utilisation du middleware pour toute les routes suivante
app.use(isAdmin);

// Admin page
app.get('/admin', async (req, res) => {

  // Récupération de tout les articles
  const data = await db.query(`SELECT * FROM articles`)

  // Rendu de la page admin avec les data de la requête précédente
  res.render('admin', {
    layout: "admin",
    data
  });

});

// On demarre notre app en lui demandant d'être à l'écoute du port
app.listen(PORT_NODE, () => console.log(`Server start on localhost:${PORT_NODE} 🚀`));