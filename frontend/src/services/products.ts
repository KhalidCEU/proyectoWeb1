import axios from "axios";
import 'dotenv/config';

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

    const getProductById = async (productId: string ) => {
        try {
            const response = await axios.get(`${url}/products/${productId}`,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    const rateProduct = async (productId: string, userId: string, ratingValue: number) => {
        try {
            const response = await axios.post(`${url}/products/${productId}/rate`,
                { userId: userId, rating: ratingValue },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    const likeProduct = async (productId: string) => {
        try {
            const response = await axios.post(`${url}/products/${productId}/like`, {},
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    const commentProduct = async (productId: string, comment: string) => {
        try {
            const response = await axios.post(`${url}/products/${productId}/comment`,
                { comment: comment},
                { withCredentials: true }
            );
            return response.data;
        } catch (error){
            throw error;
        }
    }

    const searchProducts = async (query: string) => {
        const response = await fetch(`${url}/search?search=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error("Error searching products");
        }
        return await response.json();
    };

    return { getProducts, getProductById, rateProduct, likeProduct, commentProduct, searchProducts};
}