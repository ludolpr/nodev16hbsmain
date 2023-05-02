// Import modules
const assert = require('assert');
const mysql = require('mysql');

// Config DB
let configDB = {
    host: 'localhost',
    user: 'tuto',
    password: 'tuto$',
    database: 'mydb'
};

// Création de la connection avec les paramètres donner
let db = mysql.createConnection(configDB);

// Config ASYNC
const util = require("util");
db.query = util.promisify(db.query).bind(db);

describe('Test data', function () {

    it('Test connexion DB', function () {
        // Connexion de la db mysql
        db.connect((err) => {
            if (err) console.error('error connecting: ', err.stack);
            // console.log('connected as id ', db.threadId);
            assert.equal(typeof 0, typeof db.threadId);
        });
    });

    describe('Test database', function () {
        let article = {}

        beforeEach(async () => {
            console.log("beforeEach")
            let art = await db.query(`INSERT INTO articles (title, price, image) VALUES ("TITRE 1", "1", "oops")`)
            let res = await db.query(`SELECT * FROM articles WHERE id = ${art.insertId}`)
            article = res[0]
        })

        afterEach(async () => {
            console.log("after each")
            await db.query(`DELETE FROM articles WHERE id = ${article.id}`)
        })

        it('Test Async getArticles', async function () {
            console.log('it')
            let res = await db.query('Select * from articles')
            assert.strictEqual(typeof res, typeof []);
        });

        it('Test Get ID', async function () {
            console.log('it')
            const data = await db.query(`Select * from articles WHERE id = ${ article.id }`)
            assert.strictEqual(typeof data[0], typeof {});
        });

        // it('Delete All', async function () {
        //     await db.query(`DELETE from articles`)
        //     let all = await db.query('SELECT * from articles')
        //     // console.log('all', all)
        //     assert(all.length < 1);
        // })

    });
});