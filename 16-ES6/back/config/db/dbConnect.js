import mysql from "mysql";
import { configDB } from './dbConfig.js'
import util from "util";

// Création de la connection avec les paramètres donner
const db = mysql.createConnection(configDB);

db.config.queryFormat = function (query, values) {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function (txt, key) {
      if (values.hasOwnProperty(key)) {
        return this.escape(values[key]);
      }
      return txt;
    }.bind(this));
  };

// Config ASYNC
db.query = util.promisify(db.query).bind(db);

// Connexion de la db mysql
db.connect((err) => {
    if (err) console.error('error connecting: ', err.stack);
    console.log('connected as id ', db.threadId);
});

export default db;