import { Application, NextFunction, Request, Response } from "express";
import bodyParser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import routeMiddleware from './router'
import app_config from '@config/app.config'
import errorHandlerMiddleware from "@middlewares/errorHandlerMiddleware";
import { AppError } from "@utils/appError";

class Server {
    private app : Application

    constructor(app : Application) {
        this.app = app;
    }
    public start() {
        this.setupSecurityMiddleware(this.app);
        this.setupExpressMiddleware(this.app);
        this.setupRouteMiddleware(this.app);
        this.setupServer(this.app);
    }
    private setupRouteMiddleware(app : Application){
        routeMiddleware(app)
        app.all('*', (req : Request, res : Response, next : NextFunction) => {
            return next(new AppError('Route not found', 404))
        })
        app.use(errorHandlerMiddleware)
    }
    private setupExpressMiddleware(app : Application){
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: true }))
    }
    private setupSecurityMiddleware(app : Application){
        const limit = {
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // limit each IP to 100 requests per windowMs
            message: "Too many requests, please try again later."
        }
        app.use(cors())
        app.use(rateLimit(limit))
        app.use(helmet())
        app.use(hpp())
    }

    private setupServer(app : Application) : void {
        const PORT = app_config.port
        app.listen(PORT, () => {
            console.log(`App Running on port ${PORT}`)
        })
    }
}
export default Server