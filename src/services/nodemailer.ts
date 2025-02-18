import baseUrl from "@utils/baseUrl";
import nodemailerConfig from "@config/nodemailer.config";
const nodemailer = require('nodemailer');

export const transporter = () => {
    return nodemailer.createTransport({
        host: nodemailerConfig.host,
        port: nodemailerConfig.port,
        secure: false, // true for port 465, false for other ports
        auth: {
            user: nodemailerConfig.username,
            pass: nodemailerConfig.password,
        },
    });
}

export const mailOptions = (email : string , token : string) => {
    return {
    from: nodemailerConfig.email,
    to: email,
    subject: 'Password Reset',
    text: `Click the following link to reset your password: ${baseUrl}/reset-password/${token}`,
}};
export default {
    transporter,
    mailOptions,
}
