const os = require('os');
const express = require('express');
const { PORT } = require('./config/env');
const { connectMongoDB } = require('./db');

const app = express();

connectMongoDB()
    .then(conn => {
        app.get('/info', (_, res) => {
            return res.status(200).json({
                success: true,
                data: {
                    host: os.hostname()
                }
            });
        });

        app.listen(PORT, () => {
            console.log(
                `✅✅✅...Connected to MongoDB on: ${conn.connection.host}...✅✅✅`
            );

            console.log(`🚀🚀🚀...Server listening on port: ${PORT}...🚀🚀🚀`);
        });
    })
    .catch(error => {
        console.log(`Server listen error: ${error.message}`);
    });
