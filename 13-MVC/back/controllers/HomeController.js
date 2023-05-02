/*
 * Controller: Home
 * **************** */
const Article = require('../models/ArticleModel')
const { RndProdOrJson } = require('../utils');

exports.HomePage = async function (req, res) {
    // Récupération de tout les articles

    RndProdOrJson(res, 200, 'home', {
        articles: await new Article({}).GetAll()
    });
}
exports.ContactPage = async function (req, res) {
    RndProdOrJson(res, 200, 'contact');
}
exports.ConnexionPage = async function (req, res) {
    RndProdOrJson(res, 200, 'connexion');
}
