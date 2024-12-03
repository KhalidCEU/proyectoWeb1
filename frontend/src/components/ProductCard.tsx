import React from 'react';
import { Rating } from "@mui/material";
import { ProductCardProps } from '@/types';
import {
    Edit as EditIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';

const ProductCard = ({ _id, productData, editable = false,
        onDelete, onEdit
    }: ProductCardProps) => {

    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/product/${_id}`);
    }

    const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); // avoid triggering redirection on the button
        onEdit?.(productData);
    }

    const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onDelete?.(_id);
    }

    return (
        <div className="w-full p-4 hover:cursor-pointer" onClick={handleCardClick}>
            <div className="flex flex-col border border-gray-300 rounded-lg shadow-md overflow-h_den h-[50vh]">
                <div className="h-1/2 relative">
                    <img
                        className="absolute inset-0 w-full h-full object-cover"
                        src={productData.imageUrl || '../adidas_ultraboost.png'} // TODO: remove static image once I handle images upload
                        alt={productData.name}
                    />
                </div>
                <div className="p-4 justify-between">
                    <div>
                        <h2 className="text-center text-xl font-bold mb-4">{productData.name}</h2>
                        <p className="text-gray-700 mb-8">
                            {productData.description}
                        </p>
                        {!editable ? (
                            <div className="flex justify-center">
                                <Rating
                                    value={productData.rating} precision={0.5} readOnly
                                />
                            </div>
                        ) : (
                            <div className="flex justify-center space-x-2">
                                <IconButton onClick={handleEditClick} aria-label="edit">
                                    <EditIcon className="text-black"/>
                                </IconButton>
                                <IconButton onClick={handleDeleteClick} aria-label="delete">
                                    <DeleteIcon className="text-red-500"/>
                                </IconButton>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;