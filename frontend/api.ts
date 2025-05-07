import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const ipApi = axios.create({
    baseURL: import.meta.env.VITE_IP_API_BASE_URL,
});
