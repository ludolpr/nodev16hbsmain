const express = require('express'),
    router = express.Router();
    const { body } = require('express-validator');
// Import des controllers
const C = require("../controllers")
// Import Middleware
const MD = require('../middleware');
// Multer
const upload = require('../config/other/multer');
// Validator
const V = require('../config/validator');

// Visiteur
router.route('/').get(C.HomePage)
router.route('/contact').get(C.ContactPage)
router.route('/connexion').get(C.ConnexionPage)
router.route('/articles').get(C.GetArticles)
router.route('/article/:id').get(C.GetArticle)

// Auth
router.route('/register')
    .post(MD.validator(V.register()), C.register) // Use Validator Register
router.route('/login')
    .post(MD.validator(V.login()), C.login) // Use Validator Login

router.route('/verifmail')
    .get(C.GetVerifMail)
    .post(C.PostVerifMail)
    .put(C.PutVerifMail)

router.route('/resetpassword')
    .get(C.GetResetPassword)
    .post(C.PostResetPassword)
    .put(C.PutResetPassword)

// // Connect required
router.use(MD.isSession)
router.route('/profil')
    .get(C.ProfilPage)
    .put(C.ProfilEdit)

router.route('/logout').post(C.logout)
router.route('/comment/:id')
    .post(C.CreateComment)
    .delete(C.DeleteComment)

// Admin
router.use(MD.isAdmin)

router.route('/admin').get(C.AdminPage)
router.route('/mail').post(C.ContactMail)

// CRUD Articles
router.route('/article')
    .post(upload.single('art_image'), MD.validator(V.articleCreate()), C.CreateArticle) // Use Validator Article
router.route('/article/:id')
    .put(upload.single('edit_image'), C.EditArticle)
    .delete(C.DeleteArticle)

// Exports de notre router
module.exports = router