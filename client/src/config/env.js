const PORT = import.meta.env.VITE_PORT || 3000;
const NODE_ENV = import.meta.env.VITE_NODE_ENV || 'development';
const SERVER_URL =
    import.meta.env.VITE_SERVER_URL ?? 'http://localhost:5000/api';

export { PORT, NODE_ENV, SERVER_URL };
