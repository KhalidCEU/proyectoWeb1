import React from 'react';
import Link from 'next/link';
import { Rating } from "@mui/material";
import { UserCardProps } from '@/types';
import {
    Settings as SettingsIcon
} from '@mui/icons-material';
import { IconButton } from '@mui/material';

const UserCard = ({ id, name, imageUrl }: UserCardProps) => {
    return (
        <Link href={`/user/${id}`}>
            <div className="w-full p-4">
                <div className="flex flex-col border border-gray-300 rounded-lg shadow-md overflow-hidden h-[30vh]">
                    <div className="flex-grow relative h-[70%]">
                        <img
                            className="absolute inset-0 w-full h-full object-cover"
                            src={imageUrl}
                            alt={name}
                        />
                    </div>
                    <div className="flex flex-col justify-between flex-grow p-1">
                        <h2 className="text-center text-l font-bold my-1">{name}</h2>
                        <div className="flex justify-center space-x-2">
                            <IconButton aria-label="edit">
                                <SettingsIcon className="text-black"/>
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default UserCard;