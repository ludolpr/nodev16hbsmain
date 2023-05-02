import env from 'dotenv';
env.config()
import bcrypt from 'bcrypt';
const bcrypt_salt = 10;
import User from '../models/UserModel.js';

import RndProdOrJson from '../utils/index.js';
export default {

    login: async function (req, res) {
        const { email, password } = req.body
        const user = await new User({ email }).GetInfo()

        if (!user) return RndProdOrJson(res, 301, 'connexion', {
            flash: "Ce compte n'existe pas"
        });

        bcrypt.compare(password, user.password, async function (err, result) {
            if (err || !result) RndProdOrJson(res, 301, 'connexion', {
                flash: "L\'email ou le mot de passe n\'est pas correct !"
            })
            
            else if (result) {

                let user = await new User({ email }).GetInfo()

                req.session.user = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    account_create: user.create_time,
                    isAdmin: user.isAdmin,
                    isVerified: user.isVerified,
                }

                RndProdOrJson(res, 200, '/profil', {
                    name: user.name,
                    flash: "sucess login"
                });
            }
        });
    },

    register: async function (req, res) {
        const { name, email, password } = req.body;
        console.log('register', req.body)

        if (!name || !email || !password) return RndProdOrJson(res, 301, 'connexion', {
            flash: "Vous devez remplir tout les champs !!"
        })

        const mailExist = await new User({ email }).GetInfo(email)

        if (!mailExist) {

            bcrypt.hash(password, bcrypt_salt, async function (err, hash) {
                await new User({ name, email, password: hash }).Create()

                RndProdOrJson(res, 200, 'connexion', {
                    flash: "Register success"
                })

            })

        } else return RndProdOrJson(res, 200, 'connexion', {
            flash: "Email non disponible."
        })
    },

    logout: async function (req, res) {
        req.session.destroy(() => {
            res.clearCookie('poti-gato');
            console.log("Clear Cookie session :", req.sessionID);

            RndProdOrJson(res, 200, '/')

        })
    }
}