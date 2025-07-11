require('dotenv/config');

const NODE_ENV = process.env.NODE_ENV ?? 'development';
const PORT = parseInt(process.env.PORT) ?? 5000;
const DATABASE_URL = process.env.DATABASE_URL ?? '';
const CLIENT_URL = process.env.CLIENT_URL ?? 'http://localhost:3000';
const SESSION_SECRET = process.env.SESSION_SECRET ?? 'ssshhhh!!';

module.exports = {
    NODE_ENV,
    PORT,
    DATABASE_URL,
    CLIENT_URL,
    SESSION_SECRET
};
