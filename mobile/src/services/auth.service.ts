import { api } from './api';

export const authService = {
    login: async (email: string, pass: string) => {
        const response = await api.post('/auth/login', { email, password: pass });
        return response.data; // Formato que entrega los datos: { access_token, user }
    },

    register: async (fullName: string, email: string, pass: string) => {
        const response = await api.post('/auth/register', {
            full_name: fullName,
            email,
            password: pass
        });
        return response.data;
    },
};