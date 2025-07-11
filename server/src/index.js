const cors = require('cors');
const express = require('express');
const { PORT, CLIENT_URL, NODE_ENV } = require('./config/env');
const { initSession } = require('./config/session');
const { connectMongoDB } = require('./db');
const { errorMiddleware } = require('./middleware/error');
const appRouter = require('./router');

const app = express();

connectMongoDB()
    .then(conn => {
        // request body parser middleware
        app.use(express.json({ limit: '1 MB' }));
        app.use(express.urlencoded({ extended: true }));

        // proxy
        if (NODE_ENV === 'production') app.set('trust proxy', 1);

        // cors
        app.use(
            cors({
                origin: CLIENT_URL,
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                allowedHeaders: ['Content-Type'],
                credentials: true
            })
        );

        // session
        app.use(initSession());

        // api router
        app.use('/api', appRouter);

        // error handler middleware
        app.use(errorMiddleware);

        // catchall route
        app.use((_, res, next) =>
            res.status(404).json({ success: false, error: 'Invalid request!' })
        );

        // listen
        app.listen(PORT, () => {
            console.log(
                `✅✅✅...Connected to MongoDB on: ${conn.connection.host}...✅✅✅`
            );

            console.log(`🚀🚀🚀...Server listening on port: ${PORT}...🚀🚀🚀`);
        });
    })
    .catch(error => {
        console.log(`❌❌❌...Server listen error: ${error.message}...❌❌❌`);

        process.exit(1);
    });
