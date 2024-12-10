
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';
import CustomTextField from '@/components/CustomTextField';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useUserService } from '@/services';
import { UserData } from "@/app/types/User";

export default function UserSettings() {
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [profileImage, setProfileImage] = useState('/static/unknown.jpg');
    const [errorMessage, setErrorMessage] = useState('');
    const [userData, setUserData] = useState<UserData>({
        name: '',
        username: '',
        imageUrl: '',
    });

    const router = useRouter();
    const userService = useUserService();
    
    const loadUserData = async () => {
        try {
            const response = await userService.getUserProfile();
            setUserData(response.items);
            toast.success(response.message);

        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
            toast.error(errorMessage);
        }
    };

    useEffect(() => {
        loadUserData();
        console.log(userData);
    }, []); 

    const handleUpdateProfileClick = () => {
        if (password != confirmedPassword) {
            toast.error('Passwords must match');
        } else {
            handleUpdateProfile(userData.name, userData.username, password);
        }
    };

    const handleUpdateProfile = async (name: string, username: string, password: string) => {
        try {
            const response = await userService.updateUserProfile(name, username, password);
            toast.success(response.message);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
            toast.error(errorMessage);
        }
    };
    
    const handleDeleteAccount = async () => {
        try {
            const response  = await userService.deleteUser();
            toast.success(response.message);
            router.push('/'); 
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
            toast.error(errorMessage);
        }
    };

    return (
        <div className="container mx-auto min-h-screen flex flex-col">
            <div className="flex-grow">
                <div className="flex flex-col items-center max-w-xl mx-auto p-6 ">
                    <div className="w-24 h-24 overflow-hidden rounded-full mx-auto mb-10">
                        <Image
                            className="object-cover w-full h-full"
                            src="/elon.png"
                            width={200}
                            height={200}
                            alt="Profile Pic"
                        />
                    </div>

                    <CustomTextField label="Name" placeholder="John Doe"
                        value={userData.name || ''}
                        onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                    />

                    <CustomTextField label="Username" placeholder="@johndoe"
                        value={userData.username || ''}
                        onChange={(e) => setUserData(prev => ({ ...prev, username: e.target.value }))}
                    />
                    <CustomTextField label="Password" placeholder="*********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        isPassword
                    />
                    <CustomTextField label="Confirm Password" placeholder="*********"
                        value={confirmedPassword}
                        onChange={(e) => setConfirmedPassword(e.target.value)}
                        isPassword
                    />

                    <Button
                        className="w-1/2 bg-black text-white p-2 rounded-md mt-4"
                        onClick={handleUpdateProfileClick}
                    >
                        Update Profile
                    </Button>

                    <div className="w-full pt-8 mt-auto flex justify-center">

                        <Button
                            className="w-full max-w-md bg-red-500 text-white p-2 rounded-md mt-2"
                            onClick={handleDeleteAccount}
                        >
                                Delete Account
                        </Button>
                    </div>
                </div>
            </div>
        </div>
)};
   

