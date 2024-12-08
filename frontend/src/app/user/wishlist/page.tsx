"use client"

import React from 'react';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { toast } from 'sonner';
import { CircularProgress } from '@mui/material';

import { Product } from '@/app/types/Product';
import { useWishlistService } from '@/services/wishlist';
import { useProductsService } from '@/services';

export default function Wishlist() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const wishlistService = useWishlistService();
    const productService = useProductsService();

    useEffect(() => {
        loadWishlist();
    }, []);

    const loadWishlist = async () => {
        try {
            const response = await wishlistService.getWishlist();
            toast.success(response.message);

            const productsResponse = await Promise.all(
                response.items.map(async (item: any) => {
                    const product = await productService.getProductById(item.productId);
                    return product.item;
                })
            );
            setProducts(productsResponse);
            setLoading(false);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
            toast.error(errorMessage);
            setLoading(false);
        }
    };



    return (
        loading ? (
            <div className="flex flex-col justify-center items-center h-screen pt-20 md:pb-32 lg:pt-0">
                <CircularProgress />
            </div>
        ) : (
            <div className="container mx-auto">
                <p className="text-2xl ml-20">My Wishlist</p>
                <div className="px-4 sm:px-6 lg:px-8 my-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-20">
                        {products.length > 0 ? (
                            products.map((product: Product) => (
                            <ProductCard
                                key={product._id}
                                _id={product._id}
                                productData={product}
                            />
                        ))
                        ) : (
                            <p>No products found in your wishlist</p>
                        )}
                    </div>
                </div>
            </div>
        )
    )
};
