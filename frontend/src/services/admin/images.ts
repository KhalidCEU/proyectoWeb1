
import axios from "axios";
import 'dotenv/config';

export function useAdminImagesService() {
    const url = process.env.NEXT_PUBLIC_API_URL;

    const uploadProductImage = async (productId: string, file: File) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('productId', productId);
            formData.append('type', 'product');


            const response = await axios.post(`${url}/images/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    return { uploadProductImage };
}
