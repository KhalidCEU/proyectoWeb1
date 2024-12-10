import axios from "axios";
import 'dotenv/config';

export function useUserService() {
    const url = process.env.NEXT_PUBLIC_API_URL;

    const getUserProfile = async () => {
        try {
            const response = await axios.get(`${url}/user/profile`
                , { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    const updateUserProfile = async (name: string, username: string, password: string) => {
        try {
            const response = await axios.put(`${url}/user/profile/update`,
                { name, username, password },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    const deleteUser = async () => {
        try {
            const response = await axios.delete(`${url}/user/profile/delete`,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    return { getUserProfile, updateUserProfile, deleteUser };
}

