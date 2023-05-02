const { RndArticle } = require("../utils/render");
const path = require('path'),
  fs = require('fs')
  
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

    console.log('img create', req.body, req.file)

    if (!title || !price) return res.render('admin', {
        layout: "admin",
        articles: await db.query(`SELECT * FROM articles`),
        flash: "Vous devez remplir tout les champs de sasis !"
    });

    // Ajout d'un article
    await db.query(`INSERT INTO articles (title, price, image) VALUES ('${title}', '${price}', '${req.file.completed}');`)

    // Redirection vers la page d'avant
    res.redirect('/');
}

exports.EditArticle = async function (req, res) {
    const { id } = req.params;
    const { title, price } = req.body;
    
    if(!title || !price || !id)return RndAdmin(res, "Vous devez remplir tout les champs de sasis !");

    // Edition de l'article par rapport a son id
    await db.query(`UPDATE articles SET title="${title}", price="${price}" WHERE id=${id};`)
    
    if(req.file){
        const img = await db.query(`SELECT image from articles WHERE id=${id}`)

        if(img[0].image !== "default.png"){
            pathImg = path.resolve("public/images/" + img[0].image)
            fs.unlink(pathImg, (err) => {
                if (err) throw err;
            })
        }

        await db.query(`UPDATE articles SET image="${req.file.completed}" WHERE id=${id};`)
    }
    // Redirection vers la page admin
    res.redirect('/admin');
}

exports.DeleteArticle = async function (req, res) {
    const { id } = req.params;

    const img = await db.query(`SELECT image from articles WHERE id=${id}`)

        if(img[0].image !== "default.png"){
            pathImg = path.resolve("public/images/" + img[0].image)
            fs.unlink(pathImg, (err) => {
                if (err) throw err;
            })
        }
        
    // Supression de l'article par rapport a son id
    await db.query(`DELETE FROM articles WHERE id=${id}`)

    // Redirection vers la page admin
    res.redirect('/admin');
};
