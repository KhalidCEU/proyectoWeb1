import 'dotenv/config';
import axios from 'axios';
import { Product } from '@/app/types/Product';

export function useProductsService() {
    const url = process.env.NEXT_PUBLIC_API_URL;

    const getProducts = async () => {
        try {
            const response = await axios.get(`${url}/products`,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }


    const createProduct = async (productData: Product) => {
        try {
            const response = await axios.post(`${url}/products`, productData,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    const updateProduct = async (productId: string, productData: Product) => {
        try {
            const response = await axios.put(`${url}/products/${productId}`,
                productData,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    const deleteProduct = async (productId: string) => {
        try {
            const response = await axios.delete(`${url}/products/${productId}`,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }


    return { getProducts, createProduct, updateProduct, deleteProduct };
}
