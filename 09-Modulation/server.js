require("dotenv").config();
const express = require("express");
const { engine } = require("express-handlebars");
const expressSession = require("express-session");
const MySQLStore = require("express-mysql-session")(expressSession);
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const { configDB } = require('./back/config/db/dbConfig')

// Déstructuration de process.env
const { PORT_NODE } = process.env;

//
const app = express();

/*
* Configuration Handlebars 
***************************/
const { limit, ifCheck, formDate, formDateFromNow } = require('./back/helpers');
app.engine('hbs', engine({
  helpers: {
    limit,
    ifCheck,
    formDate,
    formDateFromNow
  },
  extname: 'hbs',
  defaultLayout: 'main'
}));
app.set('view engine', 'hbs');
app.set('views', './views');

/*
* Config mysql
***************/
require('./back/config/db/dbConnect')

/*
 * Config method override 
 *************************/
app.use(methodOverride('_method'));

/*
 * Config Body-parser
 *********************/
app.use(bodyParser.urlencoded({ extended: false }));
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
  console.log('SESSION :: ', req.session )
  res.locals.user = req.session.user;
  next();
})

/*
 * Router de l'application
 *************************/
const ROUTER = require('./back/router')
app.use("/", ROUTER)

// Port d'écoute de l'application
app.listen(PORT_NODE, () => console.log(`Server start on localhost:${PORT_NODE} 🚀`));

module.exports = { db }