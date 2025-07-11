class APIError extends Error {
    constructor(
        statusCode = 500,
        message = 'Something went wrong! Please try again later.'
    ) {
        super(message);

        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = { APIError };
