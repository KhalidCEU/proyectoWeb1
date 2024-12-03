"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Rating, IconButton, CircularProgress } from "@mui/material";
import {
    Favorite,
    FavoriteBorderOutlined
} from '@mui/icons-material';
import CommentsInput from "@/components/CommentsInput";
import { useProductsService } from "@/services";
import { toast } from "sonner";
import { Product } from "@/app/types/Product";


const ProductPage = () => {
    const [productData, setProductData] = useState<Product>();
    const { id } = useParams();

    const productsService = useProductsService();

    const loadProduct = async (productId: string ) => {
        try {
            const response = await productsService.getProductById(productId);
            setProductData(response.items);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
            toast.error(errorMessage);
        }
    }

    const handleRating = async (ratingValue: number) => {
        try {
            if (typeof id === 'string') {
                const productId = id;
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    toast.error('User not logged in.');
                    return;
                }
                const updatedProduct = await productsService.rateProduct(productId, userId, ratingValue);
                setProductData(prevData => {
                    if (!prevData) return prevData;
                    return {
                        ...prevData,
                        averageRating: updatedProduct.item.averageRating
                    };
                });
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
            toast.error(errorMessage);
        }
    }

    useEffect(() => {
        if (id && !Array.isArray(id)) {
            loadProduct(id);
        }
    }, [id])

    if (!productData) {
        return (
            <div className="flex flex-col justify-center items-center h-screen pt-20 md:pb-32 lg:pt-0">
                <CircularProgress />
                <p className="mt-5 text-center">Loading</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">

                <div className="flex flex-col items-center mt-10">
                    <img
                        className="w-full max-w-md mb-4"
                        src={productData.imageUrl || "../adidas_ultraboost.png"} // TODO: remove it when uploading images is done
                        alt={productData.name}
                    />
                    <div className="text-2xl font-semibold mb-4"> {productData.name} </div>
                    <Rating
                        className="mb-2"
                        value={productData.averageRating || 0}
                        precision={0.5}
                        onChange={(e, newValue) => {
                            if (newValue !== null) {
                                handleRating(newValue);
                            }
                        }}
                    />
                    <p className="text-gray-500 font-semibold text-xs mb-4">{productData.averageRating} / 5</p>
                    <IconButton>
                        {productData.isFavorite ?
                            <Favorite sx={{ color: 'red'}}/>
                            :
                            <FavoriteBorderOutlined sx={{ color: 'black'}}/>
                        }
                    </IconButton>
                </div>

                <div className="flex flex-col w-full sm:ml-5 mt-0 sm:mt-20 px-4 sm:px-0">
                    {productData.estimatedPrice && (
                        <p className="text-3xl font-semibold mb-7">
                            {productData.estimatedPrice.minPrice} $
                            - {productData.estimatedPrice.maxPrice} $
                        </p>
                    )}

                    <p className="mb-16"> {productData.description} </p>
                    <CommentsInput />

                    <div className="flex flex-col items-center mt-20">
                        {productData.comments && productData.comments.length > 0 ?
                            productData.comments.map((comment, index) =>
                                <p key={index} className="mb-2 w-full max-w-md">
                                    <span className="font-semibold">@{comment.author}: </span>
                                    {comment.comment}
                                </p>
                            ) : (
                                <p className="text-gray-500 italic">
                                    Be the first one to comment !
                                </p>
                            )
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductPage;