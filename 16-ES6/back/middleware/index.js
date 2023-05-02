// Import de Modules
import RndProdOrJson from '../utils/index.js';
import { validationResult } from 'express-validator';
import Article from '../models/ArticleModel.js';
import db from '../config/db/dbConnect.js';

export const isAdmin = async (req, res, next) => {
  if (!req.session.user) return res.redirect('/')
  const [user] = await db.query(`SELECT isAdmin FROM users WHERE email="${req.session.user.email}"`);
  (user.isAdmin === req.session.user.isAdmin && user.isAdmin === 0) ? res.redirect('/') : next();
}

export const isSession = (req, res, next) => {
  if (!req.session.user) return res.redirect('back');
  next()
}

export const validator = (config) => {
  return async (req, res, next) => {
    await Promise.all(config.map(validation => validation.run(req)));

    const errors = validationResult(req);
    // Si Error n'est pas vide // notEmpty = n'est pas vide donc
    console.log(errors.array());
    if (!errors.isEmpty()) {

      switch (req.url) {
        case '/register':
        case '/login':
          return RndProdOrJson(res, 200, 'connexion', { errors: errors.array() });
          break;
        case '/article':
          return RndProdOrJson(res, 200, 'admin', { layout: "admin", articles: await new Article({}).GetAll(), errors: errors.array() });
          break;
        default:
          return RndProdOrJson(res, 200, '/');
          break;
      }
    } else return next();
  };
};

