import nodemailer from "nodemailer";
const { MAIL_SERVICE, MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASSWORD, MAIL_TLS } = process.env;

const transporter = nodemailer.createTransport({
    service: MAIL_SERVICE, // service
    host: MAIL_HOST, // host
    port: MAIL_PORT, // port_smtp
    secure: true, // 
    auth: {
        user: MAIL_USER, // user_gmail
        pass: MAIL_PASSWORD // app_password
    },
    // tls: {
    //     ciphers: MAIL_TLS // tls
    // }
});
export default transporter