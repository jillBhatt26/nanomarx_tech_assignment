const os = require('os');
const { Router } = require('express');

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

module.exports = appRouter;
