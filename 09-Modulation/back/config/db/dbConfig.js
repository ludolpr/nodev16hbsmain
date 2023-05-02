const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } = process.env

let configDB = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
};

module.exports = { configDB }