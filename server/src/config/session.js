const MongoStore = require('connect-mongo');
const session = require('express-session');
const { DATABASE_URL, SESSION_SECRET, NODE_ENV } = require('./env');

const initSession = () => {
    const mongoStore = MongoStore.create({
        mongoUrl: DATABASE_URL,
        collectionName: 'sessions'
    });

    return session({
        secret: SESSION_SECRET,
        saveUninitialized: false,
        resave: true,
        store: mongoStore,
        cookie: {
            sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
            httpOnly: NODE_ENV === 'production',
            secure: NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 * 1 // 1 day
        }
    });
};

module.exports = { initSession };
