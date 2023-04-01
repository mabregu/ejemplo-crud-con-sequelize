class CustomError extends Error {
    /**
     * Custom error class
     * @param {string} message
     * @param {string} technicalMessage
     * @param {number} code
     */
    constructor(message = 'An error occurred.', technicalMessage, code = 500) {
        super((message) + ' Please try again later.');
        this.technicalMessage = technicalMessage;
        this.code = code;
        this.success = false;
    }
    
    getTechnicalMessage() {
        return this.technicalMessage;
    }
    
    getCode() {
        return this.code;
    }
    
    getSuccess() {
        return this.success;
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