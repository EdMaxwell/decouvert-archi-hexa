import {NextFunction, Request, Response} from "express";

export function errorHandlerMiddleware(error: any, req: Request, res: Response, next: NextFunction) {
    const formattedError = {
        message: error.message || 'Internal Server Error',
        code: error.code || 500

    }

    res.status(formattedError.code).json({
        success: false,
        data: null,
        error: formattedError
    });
}