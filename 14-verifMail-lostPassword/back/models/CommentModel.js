// Création de la class type (Model) Comment
class Comment {

    // Notre contrustor qui permet d'instancier les variable dans this a partir du paramètre
    constructor(com) {
        this.id = com.id
        this.comment = com.comment
        this.user_id = com.user_id
        this.article_id = com.article_id
        this.create_time = com.create_time
    }

    // Et nos Méthodes ratacher à notre Obj
    ///////////////////////////////////////

    async create(article_id, user_id) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await db.query(`INSERT INTO commentaires SET comment=:comment, article_id="${article_id}" ,user_id="${user_id}"`, {
                    comment: this.comment
                })
                resolve(data)

            } catch (err) {
                reject(err)
                
            }
        })
    }

    async getById() {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await db.query(`SELECT user_id, article_id FROM commentaires WHERE id=${this.id}`)
                resolve(data[0])

            } catch (err) {
                reject(err)

            }
        })
    }

    async DeleteId() {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await db.query(`DELETE FROM commentaires WHERE id=${this.id}`)
                resolve(data)

            } catch (err) {
                reject(err)

            }
        })
    }

}

module.exports = Comment