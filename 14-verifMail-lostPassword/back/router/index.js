const express = require('express'),
    router = express.Router();

// Import des controllers
const C = require("../controllers")
// Import Middleware
const MD = require('../middleware');
// Multer
const upload = require('../config/other/multer');

// Visiteur
router.route('/').get(C.HomePage)
router.route('/contact').get(C.ContactPage)
router.route('/connexion').get(C.ConnexionPage)
router.route('/articles').get(C.GetArticles)
router.route('/article/:id').get(C.GetArticle)

// Auth
router.route('/register').post(C.register)
router.route('/login').post(C.login)

router.route('/verifmail')
    .get(C.GetVerifMail) // page avec le button pour vérifié la page
    .post(C.PostVerifMail) // button dans la page profile pour envoyer le mail
    .put(C.PutVerifMail) // action du button pour edité notre user

router.route('/resetpassword')
    .get(C.GetResetPassword) // page avec le formulaire pour editez le password
    .post(C.PostResetPassword) // formulaire mot de passe oublier de la page connexion
    .put(C.PutResetPassword) // action du formualaire de la page éditez le password

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
router.route('/article').post(upload.single('art_image'), C.CreateArticle)
router.route('/article/:id')
    .put(upload.single('edit_image'), C.EditArticle)
    .delete(C.DeleteArticle)

// Exports de notre router
module.exports = router