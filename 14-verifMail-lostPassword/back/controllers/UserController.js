/*
 * Controller: Profil
 * **************** */
const { transporter } = require('../config/other/nodemailerConfig');
const User = require('../models/UserModel')

const { RndProdOrJson } = require('../utils');

require('dotenv').config()

const { MAIL_USER, DOMAIN } = process.env

/*
 * Profile
 * ******* */
exports.ProfilPage = function (req, res) {
    RndProdOrJson(res, 200, 'profil');
}
exports.ProfilEdit = async function (req, res) {
    const { name, email, password } = req.body

    const editUser = new User({ id: req.session.user.id, name, email, password })

    if (name) await editUser.UpdateName()
    if (email) await editUser.UpdateEmail()
    if (password) await editUser.UpdatePassword()

    let user = await new User({ id: req.session.user.id }).GetId()

    req.session.user = {
        id: user.id,
        email: user.email,
        name: user.name,
        account_create: user.create_time,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified
    };

    RndProdOrJson(res, 200, '/profil');

}

/*
 * Verification MAIL
 * ***************** */ 
// Page verifMail (button confirmer la vérification) (lien du mail)
exports.GetVerifMail = (req, res) => {
    console.log('GetVerifMail', req.body)
    res.render('verifMail')
}
// Action du button de la page profil
exports.PostVerifMail = async (req, res) => {
    console.log('PostVerifMail', req.body)
    const { email } = req.session.user;

    // Envoi du mail
    const infoMail = await transporter.sendMail({
        from: `Bruno Email Pro <${MAIL_USER}>`,
        to: email,
        subject: 'Verification du mail',
        html: `
            <h2>Cliquer sur le lien pour accèder à la verification du mail</h2>
            <a href='${DOMAIN}/verifmail'> > Clikez ici < </a>
        `
    });
    transporter.close();
    console.log('infoMail', infoMail)

    RndProdOrJson(res, 200, 'profil', {
        flash: `Un mail vous a été envoyer à ${email}`
    })
}
// Action du button de la page verifMail (confirmez la vérifiaction)
exports.PutVerifMail = async (req, res) => {
    console.log('PutVerifMail', req.body)

    const editUser = new User({ id: req.session.user.id, isVerified: "1" })
    editUser.VerifiedUser()

    const user = await new User({ id: req.session.user.id }).GetById()

    req.session.user = {
        id: user.id,
        email: user.email,
        name: user.name,
        account_create: user.create_time,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified
    };
    RndProdOrJson(res, 200, 'profil', {
        flash: `Félicitation votre email (${req.session.user.email}) à bien été vérifier.`
    })
}

/*
 * Reset Password
 * ************** */
// Page Formulaire resetPassword (lien du mail)
exports.GetResetPassword = (req, res) => {
    console.log('GetResetPassword', req.body)
    RndProdOrJson(res, 200, 'resetPassword');
}
// Action du formulaire de la page connexion (email)
exports.PostResetPassword = async (req, res) => {
    console.log('PostResetPassword', req.body)
    const { email } = req.body;
    // const user = new User({ email })

    // Envoie du mail
    const infoMail = await transporter.sendMail({
        from: `Bruno Email Pro <${MAIL_USER}>`,
        to: email,
        subject: 'Recovery password',
        html: `
            <h2>Cliquer sur le lien pour accèder au reset password</h2>
            <a href='${DOMAIN}/resetpassword'> > Clikez ici < </a>
        `
    });
    transporter.close();
    console.log('infoMail', infoMail)

    // On stock le mail dans la session visiteur
    req.session.user = { email }
    
    RndProdOrJson(res, 200, 'connexion', {
        flash: `Un mail vous a été envoyer à ${email}`
    })
}
// Action du formulaire de page resetPassword (password, confirmPassword)
exports.PutResetPassword = async (req, res) => {
    console.log('PutResetPassword', req.body)
    const { password, confirmPassword } = req.body
    // On récupère le mail dans la session
    const { email } = req.session.user

    if (!password || !confirmPassword) return res.redirect("/")
    if (password !== confirmPassword) return res.redirect("/")

    // On récupère les info user grace au mail
    const user = await new User({ email }).GetByEmail()
    // On set notre mot de passe
    await new User({ id: user.id.toString(), password }).UpdatePassword()

    
    RndProdOrJson(res, 200, 'connexion', {
        flash: `success`
    })

}
