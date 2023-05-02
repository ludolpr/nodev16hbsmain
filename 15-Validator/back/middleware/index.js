// Import de Modules
const { RndProdOrJson } = require('../utils')
const { validationResult } = require('express-validator');
const Article = require('../models/ArticleModel')

exports.isAdmin = async (req, res, next) => {
  if (!req.session.user) return res.redirect('/')
  const [user] = await db.query(`SELECT isAdmin FROM users WHERE email="${req.session.user.email}"`);
  (user.isAdmin === req.session.user.isAdmin && user.isAdmin === 0) ? res.redirect('/') : next();
}

exports.isSession = (req, res, next) => {
  if (!req.session.user) return res.redirect('back');
  next()
}

exports.validator = (config) => {
  return async (req, res, next) => {
    // Exec Array function for check input (req.body) (./validator/index.js)
    await Promise.all(config.map(validation => validation.run(req)));
    // Error de validator
    const errors = validationResult(req);
    // Si Error n'est pas vide // notEmpty = n'est pas vide donc
    console.log(errors.array());

    if (!errors.isEmpty()) {
      // Check where redirect req if errors
      switch (req.url) {
        case '/register':
        case '/login':
          return RndProdOrJson(res, 200, 'connexion',{ errors: errors.array() });
          break;
        case '/article':
          return RndProdOrJson(res, 200, 'admin',{ layout: "admin", articles: await new Article({}).GetAll(), errors: errors.array() });
          break;
        default:
          return RndProdOrJson(res, 200, '/');
          break;
      }
    } else {
      // Sinon les champs respect notre charte validator (config/validator/index.js)
      // Alors nous donnons accès au controlleur
      return next(); 
    }
  };
};

