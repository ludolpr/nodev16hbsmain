const transporter = require('../config/other/nodemailerConfig')

exports.AdminPage = async function (req, res) {
    // Rendu de la page admin avec les data de la requête précédente
    res.render('admin', {
        layout: "admin",
        articles: await db.query(`SELECT * FROM articles`)
    });
}

exports.ContactMail = async function (req, res) {
    try {
        const { content, sujet, email } = req.body;

        const infoMail = await transporter.sendMail({
            from: `Bruno Email Pro <${process.env.MAIL_USER}>`,
            to: email,
            subject: sujet,
            html: content
        });
        transporter.close();

        console.log("infoMail", infoMail)

        // Rendu de la page admin avec les data de la requête précédente
        res.render('admin', {
            layout: "admin",
            articles: await db.query(`SELECT * FROM articles`),
            flash: "Mail envoyer avec succes !"
        });
    } catch {
        res.redirect('/');
    }
};
