'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CircularProgress }  from '@mui/material';
import { useAuthService } from '@/services';

const authService = useAuthService();

export default function Logout () {
    const router = useRouter();

    const logout = async () => {
        try {
            await authService.logout();
            router.push('/login');
        } catch (error) {
            console.error('Logout failed: ', error);
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