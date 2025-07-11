const { APIError } = require('../common/APIError');

const errorMiddleware = async (error, req, res, next) => {
    if (error instanceof APIError) {
        return res.status(error.statusCode).json({
            success: false,
            error: error.message
        });
    }

    const defaultAPIError = new APIError();

    return res.status(defaultAPIError.statusCode).json({
        success: false,
        error: defaultAPIError.message
    });
};

module.exports = { errorMiddleware };
