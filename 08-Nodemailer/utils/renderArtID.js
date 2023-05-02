exports.RenderArt = async (id) => {
    // Ici on creer une promesse pour nous return un resultat (resolve) et en cas d'erreur l'err (reject)
    return new Promise(async (resolve, reject) => {
        try {
            const articles = await db.query(`SELECT * FROM articles WHERE id=${id}`);
            let commentaires = [];

            if (articles[0]) commentaires = await db.query(`
                    SELECT commentaires.*, users.name 
                    FROM commentaires
                    INNER JOIN users
                    ON commentaires.user_id=users.id
                    WHERE commentaires.article_id=${articles[0].id}
                `);

            // On renvoi les data
            resolve({
                articles,
                commentaires
            })
        } catch (err) {
            // On renvoit l'err
            reject(err)
        }
    })
}
