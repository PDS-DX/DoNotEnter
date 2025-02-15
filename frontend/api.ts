import axios from 'axios';

export const api = axios.create({
    // TODO: use env vars for host name and port
    baseURL: 'http://localhost:8000/api',
});