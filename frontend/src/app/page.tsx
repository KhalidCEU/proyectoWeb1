"use client"

import React from 'react';
import { useEffect, useState } from 'react';
import ProductCard from "@/components/ProductCard";
import { toast } from 'sonner';

import { Product } from './types/Product';
import { useProductsService } from '@/services';

export default function Home() {
  const[products, setProducts] = useState<Product[]>([]);
  const[filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const[searchedWord, setSearchedWord] = useState('');
  const[sortOrder, setSortOrder] = useState('default');

  const productsService = useProductsService();

  useEffect(() => {
    loadProducts();
  }, []);

  const sortProducts = (products: Product[], order: string) => {
    return [...products].sort((a, b) => {
      if (order === 'highest') return b.averageRating - a.averageRating;
      if (order === 'lowest') return a.averageRating - b.averageRating;
      return 0;
    });
  };

  useEffect(() => {
    const filtered = products?.filter((item) =>
      item.name.toLowerCase().includes(searchedWord.toLowerCase())
    );
    const sorted = sortProducts(filtered, sortOrder);
    setFilteredProducts(sorted);
  }, [searchedWord, products, sortOrder]);


  const loadProducts = async () => {
      try {
          const response = await productsService.getProducts();
          setProducts(response.items);
      } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
          toast.error(errorMessage);
      }
  }

  return (
    <div className="container mx-auto px-4 mt-32">
      <h3 className="text-center text-2xl font-bold mb-20">Featured Items</h3>
        <div className="flex justify-end items-center mb-4">
          <select
            className="w-48 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Sort by Rating</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
        </div>
        {filteredProducts.length === 0 ? (
          <div className="flex justify-center h-screen">
              <p className="text-center text-lg text-gray-500 italic">There are currently no items available.</p>
          </div>
        ) : (
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product: Product) => (
              <ProductCard
                key={product._id}
                _id={product._id}
                productData={product}
              />
            ))}
          </div>
        </div>
      )}
    </div>

  );
}
