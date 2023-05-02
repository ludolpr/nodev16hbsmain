const Article = require('../models/ArticleModel')
const Comentaire = require('../models/CommentModel')
const { RndProdOrJson } = require('../utils');

exports.CreateComment = async function (req, res) {
    const { id } = req.params;
    const { comment } = req.body;
    const article = await new Article({ id }).GetId();
    console.log(article);
    if (!comment) return RndProdOrJson(res, 200, 'article_id', {
        data: article,
        flash: "Vous devez remplir tout les champs de sasis !",
    })

    await new Comentaire({ comment }).create(id, req.session.user.id)

    RndProdOrJson(res, 200, `/article/${article.article.id}`)

}

exports.DeleteComment = async function (req, res) {
    const { id } = req.params;
    const data = await new Comentaire({ id }).getById()

    if (data !== []) {
        if (req.session.user.id === data.user_id) {
            await new Comentaire({ id }).DeleteId()
            RndProdOrJson(res, 200, `/article/${data.article_id}`)

        } else return RndProdOrJson(res, 301, 'article_id', {
            data: await new Article({ id:data.article_id }).GetId(),
            flash: "Vous n'avez pas les droits !"
        })

    } else return RndProdOrJson(res, 301, 'article_id', {
        data: await new Article({ id:data.article_id }).GetId(),
        flash: "Le commentaire n'existe pas !"
    })

};