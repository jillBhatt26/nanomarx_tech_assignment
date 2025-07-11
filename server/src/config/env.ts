import 'dotenv/config';

const NODE_ENV: string = process.env.NODE_ENV ?? 'development';
const PORT: number = parseInt(process.env.PORT!) ?? 5000;
const HOST: string = process.env.HOST ?? 'localhost';
const CLIENT_URL: string = process.env.CLIENT_URL ?? 'http://localhost:3000';
const DB_URL: string = process.env.DATABASE_URL ?? '';
const SESSION_SECRET: string =
    process.env.SESSION_SECRET ?? 'my_session_secret';

export { NODE_ENV, PORT, HOST, CLIENT_URL, DB_URL, SESSION_SECRET };
