const { RndArticle } = require("../utils/render");
const path = require('path'),
  fs = require('fs');

const { MODE } = process.env
  
exports.GetArticles = async function (req, res) {
    // On formate les datas
    const data = {
        flash: 'get article',
        message: "sucess get",
        articles: await db.query('SELECT * FROM articles')
    }

    // On ajoute bien le .json
    if (MODE === "test") res.json(data);
    // On revoit notre page article_id avec les data
    else res.render('articles', data)
    
}

exports.GetArticle = async function (req, res) {
    const { id } = req.params;

    // On formate les datas
    const data = {
        flash: 'get article',
        message: "sucess get",
        data: await RndArticle(id)
    }

    // On ajoute bien le .json
    if (MODE === "test") res.json(data);
    // On revoit notre page article_id avec les data
    else res.render('article_id', data)
    
}

exports.CreateArticle = async function (req, res) {
    const { title, price } = req.body;

    // console.log('img create', req.body, req.file)

    if (!title || !price) return res.status(403).send('Il manque un champs dans le form !');

    // Ajout d'un article
    const art = await db.query(`INSERT INTO articles (title, price, image) VALUES ('${title}', '${price}', '${req.file.completed}');`)

    // On ajoute bien le .json
    if (MODE === 'test') res.json({
        id:art.insertId,
        message: "sucess create"
    })
    // Redirection vers la page d'avant
    else res.redirect('/');
}

exports.EditArticle = async function (req, res) {
    const { id } = req.params;
    const { title, price } = req.body;

    if(!title || !price || !id) {
        // On ajoute bien le .json
        if (MODE === "test") res.status(403).send('Il manque un champs dans le form !');
        // On revoit notre page article_id avec les data
        else  res.redirect('/admin');
    }

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

    // On ajoute bien le .json
    if (MODE === 'test') res.json({message: "sucess update"});
    // Redirection vers la page admin
    else res.redirect('/admin');

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

    // On ajoute bien le .json
    if (MODE === 'test') res.json({message: "sucess delete"});
    // Redirection vers la page admin
    else res.redirect('/admin');
};
