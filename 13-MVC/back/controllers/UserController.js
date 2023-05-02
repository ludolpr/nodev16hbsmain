/*
 * Controller: Profil
 * **************** */
const User = require('../models/UserModel')

const { RndProdOrJson } = require('../utils');

exports.ProfilPage = function (req, res) {
    RndProdOrJson(res, 200, 'profil');
}

exports.ProfilEdit = async function (req, res) {
    const { name, email, password } = req.body
    
    if (name) User.UpdateName(id, name)
    if (email) User.UpdateName(id, email)
    if (password) {
        bcrypt.hash(password, bcrypt_salt, async function (err, hash) {
            User.UpdateName(id, hash)
        });
    }

    let userget = await User.GetId(req.session.user.id) 
    let user = userget[0];
  
    req.session.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      account_create: user.create_time,
      isAdmin: user.isAdmin
    };

    RndProdOrJson(res, 200, '/profil');

}
