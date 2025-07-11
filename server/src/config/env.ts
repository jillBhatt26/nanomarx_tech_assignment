import 'dotenv/config';

const NODE_ENV = process.env.NODE_ENV ?? 'development';
const PORT = parseInt(process.env.PORT!) ?? 5000;
const HOST = process.env.HOST ?? 'localhost';
const DATABASE_URL = process.env.DATABASE_URL ?? '';
const FE_URL = process.env.FE_URL ?? 'http://localhost:3000';
const SESSION_SECRET = process.env.SESSION_SECRET ?? 'shhhh!!!';

export { NODE_ENV, HOST, PORT, DATABASE_URL, FE_URL, SESSION_SECRET };
