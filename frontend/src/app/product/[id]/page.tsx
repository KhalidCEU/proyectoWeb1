'use client';

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Rating, IconButton } from "@mui/material";
import {
    Favorite,
    FavoriteBorderOutlined
} from '@mui/icons-material';
import CommentsInput from "@/components/CommentsInput";
import testProductData from "@/testJsons/product.json";

const ProductPage = () => {
    const { id } = useParams();

    const testData = testProductData.product;

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">

                <div className="flex flex-col items-center mt-10">
                    <img
                        className="w-full max-w-md mb-4"
                        src={testData.imageUrl}
                        alt={testData.name}
                    />
                    <div className="text-2xl font-semibold mb-4"> {testData.name} </div>
                    <Rating
                        className="mb-2"
                        value={testData.rating} precision={0.5} readOnly
                    />
                    <p className="text-gray-500 font-semibold text-xs mb-4">{testData.rating} / 5</p>
                    <IconButton>
                        { testData.isLiked ?
                            <Favorite sx={{ color: 'red'}}/>
                            :
                            <FavoriteBorderOutlined sx={{ color: 'black'}}/>
                        }
                    </IconButton>
                </div>

                <div className="flex flex-col w-full sm:ml-5 mt-0 sm:mt-20 px-4 sm:px-0">
                    <p className="text-3xl font-semibold mb-7">{
                        testData.estimatedPrice.minPrice} $
                        - {testData.estimatedPrice.maxPrice} $</p>
                    <p className="mb-16"> {testData.description} </p>
                    <CommentsInput />

                    <div className="flex flex-col items-center mt-20">
                        { testData.comments && testData.comments.length > 0 ?
                            testData.comments.map((comment, index) =>
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