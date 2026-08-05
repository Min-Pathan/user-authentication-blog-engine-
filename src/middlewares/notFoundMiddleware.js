import AppError from "../Errors/AppError.js"

const notFoundMiddleware = (req, res, next) =>{
    return next(
        new AppError(
            `Route ${req.method} ${req.originalUrl} not found`, 404
        )
    )
}

export default notFoundMiddleware;