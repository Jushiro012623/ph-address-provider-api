import { NextFunction, Request, Response } from "express";
import 'dotenv/config'
import { AppError } from "../utils/appError";
import { HTTP_STATUS } from '@src/constants'
import appConfig from '@config/app.config'

interface ErrorResponse {
    message : string,
    timestamp : string ,
    success : true | false,
    stackTrace : string;
    statusCode : StatusCode
}
type StatusCode = number
type Message = string

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) : void => {
    let statusCode : StatusCode = HTTP_STATUS.SERVER_ERROR;
    let message : Message = 'An unknown error occurred';
    
    if (error instanceof AppError) {
        statusCode = error.statusCode;
        message = error.message;
    } else {
        message = 'Something went wrong';
    }
    const response : Partial<ErrorResponse> = {
        success: false,
        message
    }
    if(appConfig.env === 'development'){
        response.statusCode = statusCode,
        response.stackTrace = error.stack;
    }
    res.status(statusCode).json(response);
}; 

export default errorHandler 