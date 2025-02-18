import 'dotenv/config'

export default {
    endpoint : process.env.API_ENDPOINT || "https://api-checkout.pisopay.com.ph",
    version : process.env.API_VERSION || "v1",
    username : process.env.API_USERNAME || "apistai2024",
    password  : process.env.API_PASSWORD ||"0UzD5wCsVjMnmGaGlwbGrS40j0OLSV",
}