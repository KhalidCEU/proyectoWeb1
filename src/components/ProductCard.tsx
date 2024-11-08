import React from 'react';
import Link from 'next/link';
import { Rating } from "@mui/material";
import { ProductCardProps } from '@/types';

const ProductCard = ({ id, name, description, imageUrl, rating }: ProductCardProps) => {
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
                            <div className="flex justify-center">
                                <Rating
                                    value={rating} precision={0.5} readOnly
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;