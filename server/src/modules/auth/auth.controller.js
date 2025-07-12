const { ValidationError } = require('yup');
const { APIError } = require('../../common/APIError');
const destroySession = require('./session.utils');
const AuthModel = require('./auth.model');
const PasswordUtils = require('./password.utils');
const {
    loginRequestBodySchema,
    signupRequestBodySchema
} = require('./auth.validations');

class AuthControllers {
    active = async (req, res, next) => {
        try {
            if (!req.session.userID || !req.user)
                throw new APIError(401, 'Unauthorized request!');

            return res.status(200).json({
                success: true,
                data: {
                    user: req.user
                }
            });
        } catch (error) {
            if (error instanceof APIError) return next(error);

            return next(
                new APIError(500, 'Error occurred while fetching active user.')
            );
        }
    };

    signup = async (req, res, next) => {
        try {
            if (req.session.userID)
                throw new APIError(400, "You're already authenticated");

            const signupRequestBody = await signupRequestBodySchema.validate(
                req.body
            );

            const checkUserExists = await AuthModel.findOne({
                $or: [
                    { username: signupRequestBody.username },
                    { email: signupRequestBody.email }
                ]
            });

            if (checkUserExists !== null)
                throw new APIError(400, 'Username or email already in use');

            const hashedPassword = await PasswordUtils.hash(
                signupRequestBody.password
            );

            const newUser = await AuthModel.create({
                username: signupRequestBody.username,
                email: signupRequestBody.email,
                password: hashedPassword
            });

            req.session.userID = newUser.id;

            return res.status(201).json({
                success: true,
                data: {
                    user: {
                        id: newUser.id,
                        email: newUser.email,
                        username: newUser.username
                    }
                }
            });
        } catch (error) {
            if (error instanceof APIError) return next(error);

            if (error instanceof ValidationError)
                return next(new APIError(400, error.message));

            return next(
                new APIError(500, 'Error occurred while signing up new user.')
            );
        }
    };

    login = async (req, res, next) => {
        try {
            if (req.session.userID)
                throw new APIError(400, "You're already authenticated");

            const loginRequestBody = await loginRequestBodySchema.validate(
                req.body
            );

            const userToLogin = await AuthModel.findOne({
                $or: [
                    { username: loginRequestBody.emailOrUsername },
                    { email: loginRequestBody.emailOrUsername }
                ]
            });

            if (!userToLogin)
                throw new APIError(404, 'User not found! Sign up required!');

            const doPasswordsMatch = await PasswordUtils.verify(
                userToLogin.password,
                loginRequestBody.password
            );

            if (!doPasswordsMatch)
                throw new APIError(400, 'Incorrect password');

            req.session.userID = userToLogin.id;

            return res.status(200).json({
                success: true,
                data: {
                    user: {
                        id: userToLogin.id,
                        username: userToLogin.username,
                        email: userToLogin.email
                    }
                }
            });
        } catch (error) {
            if (error instanceof ValidationError)
                return next(new APIError(400, error.message));

            if (error instanceof APIError) return next(error);

            return next(
                new APIError(500, 'Error occurred while logging in a user.')
            );
        }
    };

    logout = async (req, res, next) => {
        try {
            if (!req.session || !req.session.userID)
                throw new APIError(401, 'Unauthorized request!');

            const isSessionDestroyed = await destroySession(req.session);

            res.clearCookie('connect.sid');

            return res.status(200).json({
                success: isSessionDestroyed
            });
        } catch (error) {
            if (error instanceof APIError) return next(error);

            return next(
                new APIError(500, 'Error occurred while logging out a user.')
            );
        }
    };
}

module.exports = AuthControllers;
