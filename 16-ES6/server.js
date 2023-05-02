import env from "dotenv"; 
import express  from "express";
import { engine } from "express-handlebars";
import expressSession from "express-session";
import MySQLStore from "express-mysql-session";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import { configDB } from './back/config/db/dbConfig.js'

env.config();
const app = express();

MySQLStore(expressSession)

// Déstructuration de process.env
const { PORT_NODE, MODE } = process.env;

/// Swagger Config
import swaggerUi  from 'swagger-ui-express';
import swaggerDocument from './back/config/api/swagger.json' assert { type: "json" };

// Générateur Swagger // Uncomment pour crée le json
// import expressOasGenerator from 'express-oas-generator';
// expressOasGenerator.init(app, {})


/*
* Configuration Handlebars 
***************************/
import { limit, ifCheck, formDate, formDateFromNow } from './back/helpers/index.js';
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
import db from './back/config/db/dbConnect.js';

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
  console.log('SESSION :: ', req.url )
  res.locals.user = req.session.user;
  next();
})

/*
 * Router de l'application
 *************************/
import ROUTER from './back/router/index.js';
app.use("/", ROUTER)

if (MODE === "swagger") {
  console.log("API SWAGGER RUN")
  //// Route pour API Swagger
  app.use('/api/v1', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

// Port d'écoute de l'application
app.listen(PORT_NODE, () => console.log(`Server start on localhost:${PORT_NODE} 🚀`));

export default app;