import axios from "axios";
import 'dotenv/config';

export function useWishlistService() {
    const url = process.env.NEXT_PUBLIC_API_URL;

    const getWishlist = async () => {
        try {
            const response = await axios.get(`${url}/wishlist`,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    return { getWishlist };
}