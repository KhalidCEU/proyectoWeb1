
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '@mui/material/Button';
import CustomTextField from '@/components/CustomTextField';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function UserSettings() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [profileImage, setProfileImage] = useState('/static/unknown.jpg');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();


    useEffect(() => {
        const fetchUserData = async () => {
            try {

                const response = await fetch('http://localhost:8080/api/user/profile', {
                    method: 'GET', 
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json' 
                        
                    },
                    
                });
    
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
    
                const data = await response.json();

                //console.log('Fetched user data:', data); 
                
                setName(data.name || ''); 
                setUsername(data.username || ''); 
                setProfileImage(data.imageURL || '/elon.png');
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
    
        fetchUserData();
    }, []); 

    const handleUpdateProfile = async () => {
        if (password !== confirmedPassword) {
            toast.error("Passwords don't match");
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/user/profile', {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    username,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Error updating profile');
        }
    };

    const handleDeleteAccount = async () => {
        if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/user/profile', {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete account');
            }

            toast.success('Account deleted successfully!');
            router.push('/'); 
        } catch (error) {
            console.error('Error deleting account:', error);
            toast.error('Error deleting account');
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <CustomTextField label="Username" placeholder="@johndoe"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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

                    {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}


                    <Button className="w-1/2 bg-black text-white p-2 rounded-md mt-4"
                    onClick={handleUpdateProfile}>
                        Update Profile
                    </Button>

                    <div className="w-full pt-8 mt-auto flex justify-center">
                        <Button className="w-full max-w-md bg-red-500 text-white p-2 rounded-md mt-2"
                        onClick={handleDeleteAccount}>
                                Delete Account
                        </Button>
                    </div>
                </div>
            </div>
        </div>
)};
   

