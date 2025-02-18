import 'dotenv/config'

export default {
        username : process.env.NODEMAILER_USERNAME || 'maddison53@ethereal.email',
        password : process.env.NODEMAILER_PASSWORD || 'jn7jnAPss4f63QBp6D',
        port : process.env.NODEMAILER_PORT || '506' ,
        host : process.env.NODEMAILER_HOST || 'smtp.ethereal.email',
        email : process.env.NODEMAILER_EMAIL || 'nodemailer@express.api'
}