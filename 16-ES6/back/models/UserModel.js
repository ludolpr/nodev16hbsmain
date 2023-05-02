import bcrypt from "bcrypt";
import db from '../config/db/dbConnect.js';

// Création de la class type (Model) User
export default class User {
    // Notre contrustor qui permet d'instancier les variable dans this a partir du paramètre
    constructor(user) {
        this.id = user.id
        this.name = user.name
        this.email = user.email
        this.recovery = user.recovery
        this.password = user.password
        this.create_time = user.create_time
        this.isAdmin = user.isAdmin
        this.isVerified = user.isVerified
        this.saltBcrypt = 10
    }

    // Et nos Méthodes ratacher à notre Obj
    ///////////////////////////////////////

    async GetInfo() {
        return new Promise(async (resolve, reject) => {
            try {
                const [data] = await db.query(`SELECT * FROM users WHERE email="${this.email}"`)
                // On renvoi les data
                resolve(data)

            } catch (err) {
                // On renvoit l'err
                reject(err)

            }
        })
    }

    async GetId() {
        return new Promise(async (resolve, reject) => {
            try {
                const [data] = await db.query(`SELECT * FROM users WHERE id="${this.id}"`)
                resolve(data)

            } catch (err) {
                reject(err)

            }
        })
    }

    async GetById() {
        return new Promise(async (resolve, reject) => {
            try {
                const [data] = await db.query(`SELECT * FROM users WHERE id="${this.id}"`)
                resolve(data)

            } catch (err) {
                reject(err)

            }
        })
    }

    async GetByEmail() {
        return new Promise(async (resolve, reject) => {
            try {
                const [data] = await db.query(`SELECT * FROM users WHERE email="${this.email}"`)
                // On renvoi les data
                resolve(data)

            } catch (err) {
                // On renvoit l'err
                reject(err)

            }
        })
    }

    async Create() {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await db.query(`INSERT INTO users SET name=:name, email=:email, password=:password, isAdmin=0`, {
                    name: this.name,
                    email: this.email,
                    password: this.password
                })
                resolve(data)

            } catch (err) {
                reject(err)

            }
        })
    }

    async UpdateName() {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await db.query(`UPDATE users SET name=:name WHERE id=${this.id}`, {
                    name: this.name
                })
                resolve(data)

            } catch (err) {
                reject(err)

            }
        })
    }

    async UpdateEmail() {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await db.query(`UPDATE users SET email=:email WHERE id=${this.id}`, {
                    email: this.email
                })
                resolve(data)

            } catch (err) {
                reject(err)

            }
        })
    }

    async VerifiedUser() {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await db.query(`UPDATE users SET isVerified=:verif WHERE id=${this.id}`, {
                    verif: this.isVerified
                })
                resolve(data)

            } catch (err) {
                reject(err)

            }
        })
    }

    async UpdatePassword() {
        return new Promise(async (resolve, reject) => {
            try {
                console.log("this", this)
                const data = await db.query(`UPDATE users SET password="${await bcrypt.hash(this.password, this.saltBcrypt)}" WHERE id=${this.id}`)
                resolve(data)

            } catch (err) {
                reject(err)

            }
        })
    }

}