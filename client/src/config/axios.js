import axios from 'axios';
import { SERVER_URL } from './env';

const request = axios.create({
    baseURL: SERVER_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

export { request };
