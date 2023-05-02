import env from "dotenv"
env.config()
const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } = process.env

console.log('dbConfig', DB_DATABASE)

export const configDB = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
};