"use client"

import React from 'react';
import { useEffect, useState } from 'react';
import ProductCard from "@/components/ProductCard";
import { toast } from 'sonner';

import { Product } from './types/Product';
import { useProductsService } from '@/services';

import testDataFile from "@/testJsons/items.json";

export default function Home() {
  const[products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const[searchedWord, setSearchedWord] = useState('');

  const productsService = useProductsService();

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const filtered = products?.filter((item) =>
        item.name.toLowerCase().includes(searchedWord.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchedWord, products]);


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
      <h3 className="text-center text-2xl font-bold mb-8">Featured Items</h3>
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
    </div>
  );
}
