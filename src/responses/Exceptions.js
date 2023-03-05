// custom exceptions
class CustomError extends Error {
    constructor(message, technicalMessage, code) {
        super(message);
        this.technicalMessage = technicalMessage;
        this.code = code;
    }
    
    getTechnicalMessage() {
        return this.technicalMessage;
    }
    
    getCode() {
        return this.code;
    }
    
    getCustomError() {
        return {
            code: this.code,
            message: this.message,
            technicalMessage: this.technicalMessage,
        };
    }
}

module.exports = CustomError;