const { Router } = require('express');
const authMiddleware = require('../../middleware/auth');
const AuthControllers = require('./auth.controller');

const authRouter = Router();

const authControllers = new AuthControllers();

authRouter.get('/', authMiddleware, authControllers.active);

authRouter.post('/signup', authControllers.signup);

authRouter.post('/login', authControllers.login);

authRouter.post('/logout', authControllers.logout);

module.exports = authRouter;
