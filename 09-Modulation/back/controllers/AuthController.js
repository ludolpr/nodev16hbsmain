const bcrypt = require('bcrypt');
const bcrypt_salt = 10;

exports.login = async function (req, res) {
    const { email, password } = req.body
    const user = await db.query(`SELECT password FROM users WHERE email="${email}"`)

    if (!user[0]) return res.render('connexion', { flash: "Ce compte n'existe pas" })
    bcrypt.compare(password, user[0].password, async function (err, result) {
        if (result) {
            let userget = await db.query(`SELECT * FROM users WHERE email="${email}" `)
            let user = userget[0];

            req.session.user = {
                id: user.id,
                email: user.email,
                name: user.name,
                account_create: user.create_time,
                isAdmin: user.isAdmin
            }

            res.redirect('/profil')
        }
        else res.render('connexion', { flash: "L\'email ou le mot de passe n\'est pas correct !" });
    });
}
exports.register = async function (req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) return res.render('connexion', { flash: "Vous devez remplir tout les champs !!" })

    const [mailExist] = await db.query(`SELECT email FROM users WHERE email="${email}"`)

    if (!mailExist) {

        bcrypt.hash(password, bcrypt_salt, async function (err, hash) {
            await db.query(`INSERT INTO users SET name="${name}", email="${email}", password="${hash}", isAdmin=0`)
            return res.redirect('/connexion');
        })

    } else return res.render('connexion', { flash: "L'email n'est pas disponible !!" })
}
exports.logout = async function (req, res) {
    req.session.destroy(() => {
        res.clearCookie('poti-gato');
        console.log("Clear Cookie session :", req.sessionID);
        res.redirect('/');
    })
};
