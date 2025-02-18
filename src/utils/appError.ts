

type StatusCode = number
type isOperational = true | false

class AppError extends Error {
    statusCode : StatusCode
    isOperational : isOperational

    constructor(message: string, statusCode: number, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}

export { AppError }