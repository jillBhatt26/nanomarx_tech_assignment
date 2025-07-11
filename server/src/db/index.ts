import { APIError } from '@common/APIError';
import { DATABASE_URL } from '@config/env';
import { connect, MongooseError, Mongoose } from 'mongoose';

const connectMongoDB = (): Promise<Mongoose> =>
    new Promise<Mongoose>(async (resolve, reject) => {
        try {
            const conn = await connect(DATABASE_URL);

            return resolve(conn);
        } catch (error: unknown) {
            if (error instanceof MongooseError)
                return reject(new APIError(500, error.message));

            return reject(new APIError(500, 'Failed to connect with MongoDB'));
        }
    });

export { connectMongoDB };
