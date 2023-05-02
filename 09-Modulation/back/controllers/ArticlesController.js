const { RndArticle } = require("../utils/render");

exports.GetArticle = async function (req, res) {
    const { id } = req.params;
    // On revoit notre page article_id avec les data
    res.render('article_id', {
        data: await RndArticle(id),
        flash: 'get article'
    })
}
exports.CreateArticle = async function (req, res) {
    const { title, price } = req.body;

    if (!title || !price) return res.render('admin', {
        layout: "admin",
        articles: await db.query(`SELECT * FROM articles`),
        flash: "Vous devez remplir tout les champs de sasis !"
    });

    // Ajout d'un article
    await db.query(`INSERT INTO articles (title, price) VALUES ('${title}', '${price}');`)

    // Redirection vers la page d'avant
    res.redirect('/');
}

exports.EditArticle = async function (req, res) {
    const { id } = req.params;
    const { title, price } = req.body;

    if (!title || !price || !id) {
        // Rendu de la page admin avec les data de la requête précédente
        return res.render('admin', {
            layout: "admin",
            articles: await db.query(`SELECT * FROM articles`),
            flash: "Vous devez remplir tout les champs de sasis !"
        });
    }

    // Edition de l'article par rapport a son id
    await db.query(`UPDATE articles SET title="${title}", price="${price}" WHERE id=${id};`)

    // Redirection vers la page admin
    res.redirect('/admin');
}

exports.DeleteArticle = async function (req, res) {
    const { id } = req.params;

    // Supression de l'article par rapport a son id
    await db.query(`DELETE FROM articles WHERE id=${id}`)

    // Redirection vers la page admin
    res.redirect('/admin');
};
