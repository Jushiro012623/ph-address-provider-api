import { Transport } from "nodemailer";

import nodemailerConfig from "@config/nodemailer.config";
import baseUrl from "@utils/baseUrl";

const nodemailer = require('nodemailer');

export const transporter = () : Transport => {
    return nodemailer.createTransport({
        host: nodemailerConfig.host,
        port: nodemailerConfig.port,
        secure: false,
        auth: {
            user: nodemailerConfig.username,
            pass: nodemailerConfig.password,
        },
    });
}

export const mailOptions = (email : string , token : string)  => {
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
