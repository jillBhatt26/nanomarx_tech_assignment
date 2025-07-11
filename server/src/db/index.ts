import { APIError } from '@common/APIError';
import { DB_URL } from '@config/env';
import { connect, Mongoose, MongooseError } from 'mongoose';

const connectMongoDB = (): Promise<Mongoose> =>
    new Promise<Mongoose>(async (resolve, reject) => {
        try {
            const conn = await connect(DB_URL);

            resolve(conn);
        } catch (error: unknown) {
            if (error instanceof MongooseError)
                reject(new APIError(500, error.message));

            reject(new APIError(500, 'Failed to connect with MongoDB'));
        }
    });

export { connectMongoDB };
