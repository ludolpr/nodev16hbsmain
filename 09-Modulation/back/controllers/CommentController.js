const { RndArticle } = require('../utils/render')

exports.CreateComment = async function (req, res) {
    const { id } = req.params;
    const { comment } = req.body
    if (!comment) return res.render('article_id', {
            data: await RndArticle(id),
            flash: "Vous devez remplir tout les champs de sasis !"
        })
        
    await db.query(`INSERT INTO commentaires SET comment="${comment}", article_id="${id}" ,user_id="${req.session.user.id}"`)
    res.redirect('back')

}
exports.DeleteComment = async function (req, res) {
    const { id } = req.params;

    const data = await db.query(`SELECT user_id FROM commentaires WHERE id=${id}`)

    if (data !== []) {
        if (req.session.user.id === data[0].user_id) {
            await db.query(`DELETE FROM commentaires WHERE id=${id}`)
            res.redirect('back')

        } else return res.render('article_id', {
            data: await RndArticle(id),
            flash: "Vous n'avez pas les droits !"
        })

    } else return res.render('article_id', {
        data: await RndArticle(id),
        flash: "Le commentaire n'existe pas !"
    })

};
