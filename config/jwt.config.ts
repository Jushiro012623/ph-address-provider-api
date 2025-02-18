import 'dotenv/config'



export default {
    secret : process.env.JWT_SECRET_KEY || 'secret',
    expiration : Number(process.env.JWT_EXPIRATION) || 3600
};