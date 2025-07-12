const os = require('os');
const { Router } = require('express');
const authRouter = require('../modules/auth/auth.router');

const appRouter = Router();

// invoke server / info / health route
appRouter.get('/info', (_, res) => {
    return res.status(200).json({
        success: true,
        data: {
            host: os.hostname(),
            sysTime: new Date().toLocaleString()
        }
    });
});

appRouter.use('/auth', authRouter);

module.exports = appRouter;
