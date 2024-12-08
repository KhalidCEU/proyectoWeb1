"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CircularProgress }  from '@mui/material';
import { useAuthService } from '@/services';
import { toast } from 'sonner';

const authService = useAuthService();

export default function Logout () {
    const router = useRouter();

    const logout = async () => {
        try {
            const response = await authService.logout();
            toast.success(response.message);
            router.push('/login');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
            toast.error(errorMessage);
        }
    };

    useEffect(() => {
        logout();
    });


    return (
        <div className="flex flex-col justify-center items-center h-screen pt-20 md:pb-32 lg:pt-0">
            <CircularProgress />
            <p className="mt-5 text-center">We're logging you out. Please wait a moment...</p>
        </div>
    );
};