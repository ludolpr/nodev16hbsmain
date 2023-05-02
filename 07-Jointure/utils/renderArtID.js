exports.RenderArt = async (id) => {
    // Ici on creer une promesse pour nous return un resultat (resolve) et en cas d'erreur l'err (reject)
    return new Promise(async (resolve, reject) => {
        try {
            // Ici nous récupérons l'article via son ID
            const articles = await db.query(`SELECT * FROM articles WHERE id=${id}`);
            let commentaires = [];

            // Si l'on a 1 ou plus commentaires alors on affect nous tableaux de commentaires a commentaires
            // Ici la jointure / la relation (la cardinalitée) est faites entre users et commentaires
            // on récupère * de commentaires et name de users
            // depuis la table commentaire
            // sur la quel on join users
            // de la manière suivante : quand tu me récupère un commentaire alors je veux aussi que tu me récupère l'user équivalent au commentaires.user_id
            // lesquels ? les commentaires ayant comme articles_id (donc la référence) l'id de l'article récupérer via l'id passer en paramètre de l'URL
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

/*
const data = await db.query(`
SELECT articles.*, commentaires.*, users.name 
FROM commentaires
right JOIN articles
ON articles.id=commentaires.article_id
LEFT JOIN users
ON commentaires.user_id=users.id
WHERE articles.id=${id}`)
*/