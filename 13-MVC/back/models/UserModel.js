// Création de la class type (Model) User
class User {
    // Notre contrustor qui permet d'instancier les variable dans this a partir du paramètre
    constructor(user) {
        this.id = user.id
        this.name = user.name
        this.email = user.email
        this.password = user.password
        this.create_time = user.create_time
        this.isAdmin = user.isAdmin
    }

    // Et nos Méthodes ratacher à notre Obj
    ///////////////////////////////////////
    
    async GetInfo () {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await db.query(`SELECT * FROM users WHERE email="${this.email}"`)
                // On renvoi les data
                resolve(data[0])
                
            } catch (err) {
                // On renvoit l'err
                reject(err)

            }
        })
    }

    async GetId () {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await db.query(`SELECT * FROM users WHERE id="${this.id}"`)
                resolve(data[0])

            } catch (err) {
                reject(err)

            }
        })
    }

    async Create () {
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

    async UpdateName () {
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

    async UpdateEmail () {
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

    async UpdatePassword () {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await db.query(`UPDATE users SET password="${this.password}" WHERE id=${this.id}`)
                resolve(data)

            } catch (err) {
                reject(err)

            }
        })
    }


}

module.exports = User