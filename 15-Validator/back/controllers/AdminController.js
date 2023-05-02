const transporter = require('../config/other/nodemailerConfig')
const Article = require('../models/ArticleModel')

const { RndProdOrJson } = require('../utils')

exports.AdminPage = async function (req, res) {
    // Rendu de la page admin avec les data de la requête précédente
    const article = new Article({})

    RndProdOrJson(
        res, 200, 'admin', {
            layout: "admin",
            articles: await article.GetAll()
        }
    )
}

exports.ContactMail = async function (req, res) {
    try {
        const { content, sujet, email } = req.body;
        const article = new Article({})

        const infoMail = await transporter.sendMail({
            from: `Bruno Email Pro <${process.env.MAIL_USER}>`,
            to: email,
            subject: sujet,
            html: content
        });
        transporter.close();

        console.log("infoMail", infoMail)

        // Rendu de la page admin avec les data de la requête précédente
        RndProdOrJson(
            res, 200, 'admin', {
                layout: "admin",
                articles: await article.GetAll(),
                flash: "Mail envoyer avec succes !"
            })
    } catch {
        RndProdOrJson(res, 301, '/')
    }
};