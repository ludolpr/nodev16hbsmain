require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// Déstructuration des variables d'environement (process.env)
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
app.get('/', (req, res) => {

  // 2/ à faire en deuxième :: Récupération de tout les articles
  db.query(`SELECT * FROM articles`, function (err, data) {
    if (err) throw err;
    // Rendu de la page home avec les data de la requête SQL précédente
    res.render('home', {
      data
    });
  });

});

/*
 *  CRUD ARTICLES
 *****************/
app

// 1/ à faire en premier :: POST ARTICLE - CREATE
.post('/article', (req, res) => {
  // Récupération des données du formulaire
  const { title, price } = req.body;

  // Ajout d'un article
  db.query(`INSERT INTO articles (title, price) VALUES ('${title}', '${price}');`, function(err, data){
    if(err) throw err;

    // Redirection vers la page Admin
    res.redirect('/admin');
  })
})

// 4/ à faire en quatrième :: PUT ARTICLE ID - EDIT
.put('/article/:id', (req, res) => {
  // Récupération du paramètres passer dans l'URL (:id)
  const { id } = req.params;
  // Récupération des données du formulaire
  const { title, price } = req.body;
  
  // Edition de l'article par rapport a son id
  db.query(`UPDATE articles SET title="${title}", price="${price}" WHERE id=${id};`, function(err, data){
    if(err) throw err;

    // Redirection vers la page admin
    res.redirect('/admin');
  })
})

// 3/ à faire en troisième :: DELETE ARTICLE ID - DELETE
.delete('/article/:id', (req,res) => {
  // Récupération du paramètres passer dans l'URL (:id)
  const { id } = req.params;

  // Supression de l'article par rapport a son id
  db.query(`DELETE FROM articles WHERE id=${id}`, function(err, data){
    if(err) throw err;

    // Redirection vers la page admin
    res.redirect('/admin');
  })
});

// Contact page
app.get('/contact', (req, res) => {
  res.render('contact');
});

// ! Utilisation du middleware pour toute les routes suivante
app.use(isAdmin);

// Admin page
app.get('/admin', (req, res) => {

  // 2*/ à faire en deuxième bis :: Récupération de tout les articles
  db.query(`SELECT * FROM articles`, function (err, data) {
    if (err) throw err;

    // Rendu de la page admin avec les data de la requête précédente
    res.render('admin', {
      layout: "admin",
      data
    });
  })

});

// On demarre notre app en lui demandant d'être à l'écoute du port
app.listen(PORT_NODE, () => console.log(`Server start on localhost:${PORT_NODE} 🚀`));