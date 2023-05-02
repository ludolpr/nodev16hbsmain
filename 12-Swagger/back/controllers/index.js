const { HomePage, ContactPage, ConnexionPage } = require("./HomeController");
const { login, register, logout } = require('./AuthController');
const { AdminPage, ContactMail } = require('./AdminController');
const { GetArticle, CreateArticle, EditArticle, DeleteArticle, GetArticles } = require('./ArticlesController');
const { CreateComment, DeleteComment } = require('./CommentController');
const { ProfilPage, ProfilEdit } = require('./UserController');

module.exports = {
    // Home
    HomePage, ContactPage, ConnexionPage,
    // Auth
    login, register, logout,
    // User
    ProfilPage, ProfilEdit,
    // Comment
    GetArticle, CreateComment, DeleteComment,
    // Admin
    AdminPage, ContactMail,
    // CRUD Article
    CreateArticle, EditArticle, DeleteArticle, GetArticles
}