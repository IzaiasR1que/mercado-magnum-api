exports.AppError = class extends Error {
    statusCode
    constructor(message, statusCode = 500){
        super(message)
        this.statusCode = statusCode
    }
}

