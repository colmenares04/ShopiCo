import axios from 'axios';
import { useAuthStore } from '../context/authStore';
import { API_URL } from '../config/env';

export const api = axios.create({
    baseURL: API_URL,
    timeout: 5000,
});


api.interceptors.request.use(async (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});