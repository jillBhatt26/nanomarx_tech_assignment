const { connect, MongooseError } = require('mongoose');
const { DATABASE_URL } = require('../config/env');
const { APIError } = require('../common/APIError');

const connectMongoDB = () =>
    new Promise(async (resolve, reject) => {
        try {
            const conn = await connect(DATABASE_URL);

            return resolve(conn);
        } catch (error) {
            if (error instanceof MongooseError)
                return reject(new APIError(500, error.message));

            return reject(new APIError(500, 'Failed to connect with MongoDB!'));
        }
    });

module.exports = { connectMongoDB };
