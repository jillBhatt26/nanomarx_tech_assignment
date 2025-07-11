import 'reflect-metadata';
import cors from 'cors';
import express, { Application } from 'express';
import { CLIENT_URL, PORT } from '@config/env';
import { connectMongoDB } from '@db';

const app: Application = express();

connectMongoDB()
    .then(conn => {
        // middleware
        app.use(express.json({ limit: '1 MB' }));
        app.use(express.urlencoded({ extended: true }));

        app.use(
            cors({
                origin: CLIENT_URL,
                credentials: true,
                allowedHeaders: ['Content-Type'],
                methods: ['GET', 'POST', 'PUT', 'DELETE']
            })
        );

        // listen
        app.listen(PORT, () => {
            console.log(
                `✅✅✅...Connected to MongoDB on host: ${conn.connection.host}...✅✅✅`
            );

            console.log(
                `🚀🚀🚀...API server listening on port: ${PORT}...🚀🚀🚀`
            );
        });
    })
    .catch(error => {
        console.log(`Server listen error: ${error.message}`);
        process.exit(1);
    });
