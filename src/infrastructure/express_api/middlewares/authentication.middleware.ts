import {NextFunction, Request, Response} from 'express'
import {extractToken} from "../../../infrastructure/express_api/utils/extract-token";
import container from "../../../infrastructure/express_api/config/dependecy-injection";


declare module 'express-serve-static-core' {
    interface Request {
        user?: any
    }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const credentials = req.headers.authorization
        if (!credentials) {
            return res.jsonError('Unauthorized', 403)
        }

        const token = extractToken(credentials)
        if (token === null) {
            return res.jsonError('Unauthorized', 403)
        }

        req.user = await container.resolve('authenticator').authenticate(token)
        next()
    } catch (error) {
        next(error)
    }
}