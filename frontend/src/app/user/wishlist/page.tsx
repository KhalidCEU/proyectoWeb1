

import React from 'react';
import ProductCard from '@/components/ProductCard';
import WishlistTestData from '@/testJsons/wishlist.json'

export default function Wishlist() {
    const testData = WishlistTestData.wishlist;

    return (
        <div className="container mx-auto">
            <p className="text-2xl ml-20">My Wishlist</p>
            <div className="px-4 sm:px-6 lg:px-8 my-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-20">
                </div>
            </div>
        </div>
    )
};
