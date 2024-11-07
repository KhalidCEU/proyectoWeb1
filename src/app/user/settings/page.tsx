import React from 'react';
import Image from 'next/image';
import Button from '@mui/material/Button';
import CustomTextField from '@/components/CustomTextField';

export default function UserSettings() {
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

                    <CustomTextField label="Name" placeholder="John Doe" />
                    <CustomTextField label="Username" placeholder="@johndoe" />
                    <CustomTextField label="Password" placeholder="*********" />
                    <CustomTextField label="Confirm Password" placeholder="*********" />

                    <Button className="w-1/2 bg-black text-white p-2 rounded-md mt-4">
                        Update Profile
                    </Button>

                    <div className="w-full pt-8 mt-auto flex justify-center">
                        <Button className="w-full max-w-md bg-red-500 text-white p-2 rounded-md mt-2">
                                Delete Account
                        </Button>
                    </div>
                </div>
            </div>
        </div>
)};
