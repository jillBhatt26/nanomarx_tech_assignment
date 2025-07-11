import 'reflect-metadata';
import express, { Application } from 'express';
import { PORT } from '@config/env';
import { connectMongoDB } from '@db';

const app: Application = express();

connectMongoDB()
    .then(conn => {
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.listen(PORT, () => {
            console.log(`MongoDB connected on host: ${conn.connection.host}`);
            console.log(`Server listening on port: ${PORT}`);
        });
    })
    .catch(error => {
        console.log(`Server listen error: ${error.message}`);
        process.exit(1);
    });
