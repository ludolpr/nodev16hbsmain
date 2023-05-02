/*
 * Controller: Home
 * **************** */

exports.HomePage = async function (req, res) {
    // Récupération de tout les articles
    const articles = await db.query(`SELECT * FROM articles ORDER BY id DESC`)
    res.render('home', {
        articles
    });
}
exports.ContactPage = async function (req, res) {
    // 
    res.render('contact');
}
exports.ConnexionPage = async function (req, res) {
    //
    res.render('connexion');
}
