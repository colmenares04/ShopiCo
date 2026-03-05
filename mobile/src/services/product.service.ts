import { Product } from '../types';
import { api } from './api';

export const productService = {
    // Retorna una promesa con un arreglo de productos
    getAllProducts: async (): Promise<Product[]> => {
        try {
            const response = await api.get<Product[]>('/products');
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error; // Propagamos el error para que la pantalla lo maneje
        }
    },
};