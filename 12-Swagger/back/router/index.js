const express = require('express'),
    router = express.Router();

// Import des controllers
const { HomePage, ContactPage, ConnexionPage, login, AdminPage, GetArticles, CreateArticle, EditArticle, DeleteArticle, register, logout, GetArticle, CreateComment, DeleteComment, ContactMail, ProfilPage, ProfilEdit } = require("../controllers");
// Import Middleware
const { isAdmin, isSession } = require('../middleware');
// Multer
const upload = require('../config/other/multer');

// Visiteur
router.route('/').get(HomePage)
router.route('/contact').get(ContactPage)
router.route('/connexion').get(ConnexionPage)
router.route('/articles').get(GetArticles)
router.route('/article/:id').get(GetArticle)

// Auth
router.route('/register').post(register)
router.route('/login').post(login)

// // Connect required
router.use(isSession)
router.route('/profil')
    .get(ProfilPage)
    .put(ProfilEdit)

router.route('/logout').post(logout)
router.route('/comment/:id')
    .post(CreateComment)
    .delete(DeleteComment)

// Admin
router.use(isAdmin)

router.route('/admin').get(AdminPage)
router.route('/mail').post(ContactMail)

// CRUD Articles
router.route('/article').post(upload.single('art_image'), CreateArticle)
router.route('/article/:id')
    .put(upload.single('edit_image'), EditArticle)
    .delete(DeleteArticle)

// Exports de notre router
module.exports = router