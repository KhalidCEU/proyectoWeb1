"use client"

import React from "react";
import ProductCard from "@/components/ProductCard";
import testDataFile from "@/testJsons/items.json";
import SearchBar from "@/components/SearchBar";
import { useState, useEffect } from "react";

export default function AdminProducts() {
    const testData = testDataFile.items;
    const[searchedWord, setSearchedWord] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(testData);

    useEffect(() => {
        const filtered = testData.filter((item) =>
            item.name.toLowerCase().includes(searchedWord.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchedWord]);

    const handleSearch = (word: string) => {
        setSearchedWord(word);
    };

    return (
        <div className="container mx-auto px-4 mt-10">
            <div className="mb-10">
                <SearchBar onSearch={handleSearch}/>
            </div>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredProducts.map((product) => (
                        <ProductCard
                        key={product.id}
                        id={product.id}
                        imageUrl={product.imageUrl}
                        name={product.name}
                        description={product.description}
                        rating={product.rating}
                        editable={true}
                        />
                    ))}
                </div>
            </div>
        </div>
)};