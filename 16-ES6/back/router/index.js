import { Router } from 'express';
const router = Router();

// Import des controllers
import HomeC from "../controllers/HomeController.js";
import ArticleC from "../controllers/ArticleController.js";
import AuthC from "../controllers/AuthController.js";
import UserC from "../controllers/UserController.js";
import CommentC from "../controllers/CommentController.js";
import AdminC from "../controllers/AdminController.js";
// Import Middleware
import * as MD from '../middleware/index.js';
// Multer
import upload from '../config/other/multer.js';
// Validator
import * as V from '../config/validator/index.js';

// Visiteur
router.route('/').get(HomeC.HomePage)
router.route('/contact').get(HomeC.ContactPage)
router.route('/connexion').get(HomeC.ConnexionPage)
router.route('/articles').get(ArticleC.GetArticles)
router.route('/article/:id').get(ArticleC.GetArticle)

// // Auth
router.route('/register')
    .post(MD.validator(V.register()), AuthC.register)
router.route('/login')
    .post(MD.validator(V.login()), AuthC.login)

router.route('/verifmail')
    .get(UserC.GetVerifMail)
    .post(UserC.PostVerifMail)
    .put(UserC.PutVerifMail)

router.route('/resetpassword')
    .get(UserC.GetResetPassword)
    .post(UserC.PostResetPassword)
    .put(UserC.PutResetPassword)

// // // Connect required
router.use(MD.isSession)
router.route('/profil')
    .get(UserC.ProfilPage)
    .put(UserC.ProfilEdit)

router.route('/logout').post(AuthC.logout)
router.route('/comment/:id')
    .post(CommentC.CreateComment)
    .delete(CommentC.DeleteComment)

// // Admin
router.use(MD.isAdmin)

router.route('/admin').get(AdminC.AdminPage)
router.route('/mail').post(AdminC.ContactMail)

// // CRUD Articles
router.route('/article')
    .post(upload.single('art_image'), MD.validator(V.articleCreate()), ArticleC.CreateArticle)
router.route('/article/:id')
    .put(upload.single('edit_image'), ArticleC.EditArticle)
    .delete(ArticleC.DeleteArticle)

// Exports de notre router
export default router