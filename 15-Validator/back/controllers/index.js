const { HomePage, ContactPage, ConnexionPage } = require("./HomeController");
const { login, register, logout } = require('./AuthController');
const { AdminPage, ContactMail } = require('./AdminController');
const { GetArticle, CreateArticle, EditArticle, DeleteArticle, GetArticles } = require('./ArticleController');
const { CreateComment, DeleteComment } = require('./CommentController');
const { ProfilPage, ProfilEdit, GetVerifMail,
    PostVerifMail, PutVerifMail, GetResetPassword,
    PutResetPassword, PostResetPassword } = require('./UserController');

module.exports = {
    // Home
    HomePage, ContactPage, ConnexionPage,
    // Auth
    login, register, logout,
    // User
    ProfilPage, ProfilEdit,
    GetVerifMail, PostVerifMail, PutVerifMail,
    GetResetPassword, PostResetPassword, PutResetPassword,
    // Comment
    GetArticle, CreateComment, DeleteComment,
    // Admin
    AdminPage, ContactMail,
    // CRUD Article
    CreateArticle, EditArticle, DeleteArticle, GetArticles
}