const APIError = require('../common/APIError');
const AuthModel = require('../modules/auth/auth.model');

const authMiddleware = async (req, res, next) => {
    try {
        if (!req.session || !req.session.userID)
            throw new APIError(401, 'Unauthorized Request!');

        const authUser = await AuthModel.findById(req.session.userID, {
            password: 0
        });

        if (!authUser)
            throw new APIError(404, 'User not found! Signup required.');

        // append user details to request object
        req.user = {
            userID: authUser.id,
            username: authUser.username,
            email: authUser.email
        };

        return next();
    } catch (error) {
        if (error instanceof APIError) {
            return next(error);
        }

        return next(
            new APIError(500, 'Error occurred while authenticating user')
        );
    }
};

module.exports = authMiddleware;
