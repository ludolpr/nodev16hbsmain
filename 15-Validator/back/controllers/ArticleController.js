const path = require('path'),
  fs = require('fs'),
  Article = require('../models/ArticleModel');

const { RndProdOrJson } = require('../utils');
  
exports.GetArticles = async function (req, res) {
    // On formate les datas
    const data = {
        flash: 'get article',
        message: "sucess get",
        articles: await new Article({}).GetAll()
    }

    RndProdOrJson(res, 200, 'articles', data);
    
}

exports.GetArticle = async function (req, res) {
    const { id } = req.params;

    // On formate les datas
    const data = {
        flash: 'get article',
        message: "sucess get",
        data: await new Article({id}).GetId()
    }

    RndProdOrJson(res, 200, 'article_id', data);
    
}

exports.CreateArticle = async function (req, res) {
    const { title, price } = req.body;

    // console.log('img create', req.body, req.file)

    if (!title || !price) return RndProdOrJson(res, 403, '/', { message: "Il manque un champs dans le form !" });

    // Ajout d'un article
    const art = await new Article({title, price}).Create(req.file.completed)
    
    RndProdOrJson(res, 200, '/', {
        id: art.insertId,
        message: "sucess create"
    });
}

exports.EditArticle = async function (req, res) {
    const { id } = req.params;
    const { title, price } = req.body;

    if(!title || !price || !id) {        
        RndProdOrJson(res, 403, '/admin', {
            id: art.insertId,
            message: "Il manque un champs dans le form !"
        });
    }

    // Edition de l'article par rapport a son id
    await new Article({ id, title, price }).Update()
    
    if(req.file){
        const img = await new Article({id}).GetImage()
        console.log('img', img)
        

        if(img.image !== "default.png"){
            pathImg = path.resolve("public/images/" + img.image)
            fs.unlink(pathImg, (err) => {
                if (err) throw err;
            })
        }
        await new Article({ id }).UpdateImg(req.file.completed)
    }

    RndProdOrJson(res, 200, '/admin', {
        message: "sucess update !"
    });

}

exports.DeleteArticle = async function (req, res) {
    const { id } = req.params;
    const img = await new Article({ id }).GetImage()

    if(img.image !== "default.png"){
        pathImg = path.resolve("public/images/" + img.image)
        fs.unlink(pathImg, (err) => {
            if (err) throw err;
        })
    }
        
    // Supression de l'article par rapport a son id
    await new Article({ id }).DeleteId()

    RndProdOrJson(res, 200, '/admin', {
        message: "sucess delete !"
    });
};
