/*
 * Controller: Profil
 * **************** */

exports.ProfilPage = function (req, res) {
    res.render('profil');
}

exports.ProfilEdit = async function (req, res) {
    const { name, email, password } = req.body
    
    if (name) {
        await db.query(`UPDATE users SET name="${name}" WHERE id=${req.session.user.id}`)
    }
    if (email) {
        await db.query(`UPDATE users SET email="${email}" WHERE id=${req.session.user.id}`)
    }
    if (password) {
        bcrypt.hash(password, bcrypt_salt, async function (err, hash) {
            await db.query(`UPDATE users SET password="${hash}" WHERE id=${req.session.user.id}`)
        });
    }

    let userget = await db.query(`SELECT * FROM users WHERE id="${req.session.user.id}" `)
    let user = userget[0];
  
    req.session.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      account_create: user.create_time,
      isAdmin: user.isAdmin
    };

    res.redirect('/profil');
}
