const os = require('os');
const cors = require('cors');
const express = require('express');
const { PORT, CLIENT_URL, NODE_ENV } = require('./config/env');
const { connectMongoDB } = require('./db');

const app = express();

connectMongoDB()
    .then(conn => {
        app.use(express.json({ limit: '1 MB' }));
        app.use(express.urlencoded({ extended: true }));

        if (NODE_ENV === 'production') app.set('trust proxy', 1);

        app.use(
            cors({
                origin: CLIENT_URL,
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                allowedHeaders: ['Content-Type'],
                credentials: true
            })
        );

        // invoke server / info / health route
        app.get('/info', (_, res) => {
            return res.status(200).json({
                success: true,
                data: {
                    host: os.hostname()
                }
            });
        });

        // catchall route
        app.use((_, res, next) =>
            res.status(404).json({ success: false, error: 'Invalid request!' })
        );

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
