import React from 'react';
import { Rating } from "@mui/material";

const ProductCard = () => {
    return (
        <div className="w-full p-4">
            <div className="flex flex-col border border-gray-300 rounded-lg shadow-md overflow-hidden h-[50vh]">
                <div className="h-1/2 relative">
                    <img
                        className="absolute inset-0 w-full h-full object-cover"
                        src="nike_vapormax.png"
                        alt="Nike Vapormax"
                    />
                </div>
                <div className="p-4 justify-between">
                    <div>
                        <h2 className="text-center text-xl font-bold mb-4">Nike Vapormax</h2>
                        <p className="text-gray-700 mb-8">
                            This is a text for testing the caard ! It is not long enough
                            so I'm still writing
                        </p>
                        <div className="flex justify-center">
                            <Rating
                                value={4.5} precision={0.5} readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;