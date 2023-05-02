/*
 * Controller: Home
 * **************** */
import Article from '../models/ArticleModel.js';
import RndProdOrJson from '../utils/index.js';

export default {

    HomePage: async function (req, res) {
        // Récupération de tout les articles

        RndProdOrJson(res, 200, 'home', {
            articles: await new Article({}).GetAll()
        });
    },

    ContactPage: async function (req, res) {
        RndProdOrJson(res, 200, 'contact');
    },

    ConnexionPage: async function (req, res) {
        RndProdOrJson(res, 200, 'connexion');
    }

}