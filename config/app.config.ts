import 'dotenv/config'

export default {
    port : parseInt(process.env.PORT || '5000'),
    env : process.env.NODE_ENV || 'development',
    url : process.env.BASE_URL || '/api/v1',
    timezone: 'asia/manila',
    locale : 'en',
    debug: process.env.APP_DEBUG || false
}