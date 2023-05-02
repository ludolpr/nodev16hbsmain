import assert from "assert";
import db from '../back/config/db/dbConnect.js';

describe("MOCHA // CRUD // Articles", () => {
    let com = {};

    // function qui ce lance avant chaque test
    // ordre de lancement: beforeEach -> it(1) // beforeEach -> it(2)
    beforeEach((done) => {
        db.query(`INSERT INTO articles SET title="testunitaire", price="5", image="default.png"`, function (err, data, fields) {
            if (err) throw err;
            com.id = data.insertId;
            assert.strictEqual('number', typeof data.insertId)
            done()
        })
    });

    //////// Create Articles
    //   it("POST // Articles", (done) => {

    //     db.query(`INSERT INTO articles SET title="testunitaire", price="5", image="default.png"`, function (err, data) {
    //       if (err) throw err;
    //       // console.log("POST: ", typeof data.insertid);
    //       assert.strictEqual( 'number' ,typeof data.insertId)
    //       done()
    //     });
    //   });

    ////// Get ALL Articles
    it("GET // ALL Articles ", (done) => {
        let sql = `SELECT * FROM articles`;
        db.query(sql, (err, data) => {
            if (err) throw err;
            //console.log( typeof data, data)
            assert.strictEqual('object', typeof data)
            done()
        })
    });

    ////// Get Articles ID
    it("GET // Articles by id ", (done) => {
        db.query(`SELECT * FROM articles WHERE id=${com.id}`, (err, data) => {
            if (err) throw err;
            //console.log(data)
            assert.strictEqual('object', typeof data)
            done()
        });
    });

    ////// Edit Articles ID
    it("PUT // Articles by id", (done) => {
        db.query(`UPDATE articles SET title="mon edit en tu" WHERE id='${com.id}'`, function (err, data) {
            if (err) throw err;
            // console.log('PUT: ', data)
            assert.strictEqual('object', typeof data)
            done();
        });
    });

    ////// Delete Articles ID
    it("DELETE // Articles by id", (done) => {
        db.query(`DELETE FROM articles WHERE id=${com.id}`, function (err, data) {
            if (err) throw err;
            // console.log('DELETE ID: ', data)
            assert.strictEqual('object', typeof data)
            done();
        });
    });

    // // à décommenter pour tout supprimer
    ////// Delete ALL
    // it("DELETE ALL // Articles", (done) => {
    //   db.query(`DELETE FROM articles`, function (err, data, fields) {
    //     if (err) throw err;
    //     // console.log('DELETE ALL: ', data)
    //     assert.strictEqual('object', typeof data)
    //     done();
    //   });
    // });
});