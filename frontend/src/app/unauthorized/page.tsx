"use client"

import React, { useEffect, useState } from 'react';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import { useRouter } from 'next/navigation';

export default function Unauthorized() {
    const [seconds, setSeconds] = useState(5);
    const router = useRouter();

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    useEffect(() => {
        if (seconds == 0) {
            router.push('/');
        }
    }, [seconds, router]);

    return (
        <div className="flex flex-col justify-center items-center h-screen pt-20 md:pb-32 lg:pt-0">
            <LockPersonOutlinedIcon fontSize='large'/>
            <p className="mt-5 text-center">Sorry, you don't have the rights to access this page.</p>
            <p className="mt-5 text-center">We will automatically redirect you to the home page in {seconds} seconds.</p>
        </div>
    )
}