import axios from "axios";
import 'dotenv/config';

export function useProductsService() {
    const url = process.env.NEXT_PUBLIC_API_URL;
    // console.log("Api url is: ", url);

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

    return { getProducts, getProductById, rateProduct};
}