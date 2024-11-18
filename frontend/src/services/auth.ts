import axios from "axios";
import 'dotenv/config';

export function useAuthService() {
    const url = process.env.NEXT_PUBLIC_API_URL;
    // console.log("Api url is: ", url);

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post(`${url}/auth/login`, {username, password},
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    const register = async (username: string, password: string, confirmedPassword: string) => {
        try {
            const response = await axios.post(`${url}/auth/register`, {username, password, confirmedPassword});
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    const logout = async () => {
        try {
            const response = await axios.post(`${url}/auth/logout`, {},
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }


    return { login, register, logout };
}