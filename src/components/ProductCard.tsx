import React from 'react';
import Link from 'next/link';
import { Rating } from "@mui/material";
import { ProductCardProps } from '@/types';
import {
    Edit as EditIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';
import { IconButton } from '@mui/material';

const ProductCard = ({ id, name, description, imageUrl, rating, editable = false }: ProductCardProps) => {
    return (
        <Link href={`/product/${id}`}>
            <div className="w-full p-4">
                <div className="flex flex-col border border-gray-300 rounded-lg shadow-md overflow-hidden h-[50vh]">
                    <div className="h-1/2 relative">
                        <img
                            className="absolute inset-0 w-full h-full object-cover"
                            src={imageUrl}
                            alt={name}
                        />
                    </div>
                    <div className="p-4 justify-between">
                        <div>
                            <h2 className="text-center text-xl font-bold mb-4">{name}</h2>
                            <p className="text-gray-700 mb-8">
                                {description}
                            </p>
                            {!editable ? (
                                <div className="flex justify-center">
                                    <Rating
                                        value={rating} precision={0.5} readOnly
                                    />
                                </div>
                            ) : (
                                <div className="flex justify-center space-x-2">
                                    <IconButton aria-label="edit">
                                        <EditIcon className="text-black"/>
                                    </IconButton>
                                    <IconButton aria-label="delete">
                                        <DeleteIcon className="text-red-500"/>
                                    </IconButton>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;