// Création de la class type (Model) Article
class Article {

    // Notre contrustor qui permet d'instancier les variable dans this a partir du paramètre
    constructor(article) {
        this.id = article.id
        this.title = article.title
        this.price = article.price
        this.image = article.image
    }

    // Et nos Méthodes ratacher à notre Obj
    ///////////////////////////////////////
    
    async GetAll () {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await db.query(`SELECT * FROM articles`);
                // On renvoi les data
                resolve(data)

            } catch (err) {
                // On renvoit l'err
                reject(err)

            }
        })
    }

    async GetId (id) {
        return new Promise(async (resolve, reject) => {
            try {
                const [article] = await db.query(`SELECT * FROM articles WHERE id=${this.id}`);
                let commentaires = [];

                if (article) commentaires = await db.query(`
                        SELECT commentaires.*, users.name 
                        FROM commentaires
                        INNER JOIN users
                        ON commentaires.user_id=users.id
                        WHERE commentaires.article_id=${this.id}
                    `);

                resolve({
                    article,
                    commentaires
                })

            } catch (err) {
                reject(err)

            }
        })
    }

    async GetImage () {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await db.query(`SELECT image FROM articles WHERE id =${this.id}`);
                resolve(data[0])

            } catch (err) {
                reject(err)

            }
        })
    }

    async DeleteId () {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await db.query(`DELETE FROM articles WHERE id=${this.id}`)
                resolve(data[0])

            } catch (err) {
                reject(err)

            }
        })
    }

    async Create (file) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await db.query(`INSERT INTO articles SET title=:title, price=:price, image="${file}"`, {
                    title: this.title,
                    price: this.price
                })
                resolve(data)

            } catch (err) {
                reject(err)

            }
        })
    }

    async Update () {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await db.query(`UPDATE articles SET title=:title, price=:price WHERE id=${this.id};`, {
                    title: this.title,
                    price: this.price
                })
                resolve(data)

            } catch (err) {
                reject(err)

            }
        })
    }

    async UpdateImg (file) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await db.query(`UPDATE articles SET image="${file}" WHERE id=${this.id};`)
                resolve(data)

            } catch (err) {
                reject(err)

            }
        })
    }
}

module.exports = Article