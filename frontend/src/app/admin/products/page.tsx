"use client"

import React from "react";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { Button } from "@mui/material";
import CreateProductModal from "@/components/admin/CreateProductModal";
import { useAdminProductsService } from "@/services";
import { Product } from "@/app/types/Product";
import { toast } from "sonner";

export default function AdminProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const [searchedWord, setSearchedWord] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [isModalOpen, setOpenModal] = useState(false);
    const [isEditMode, setEditMode] = useState(false);

    const productsService = useAdminProductsService();

    useEffect(() => {
        loadProducts();
    }, []);

    useEffect(() => {
        console.log("Products: ", products)
        const filtered = products.filter((item) =>
            item?.name.toLowerCase().includes(searchedWord.toLowerCase())
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

    const handleEditModal = (product: Product) => {
        setCurrentProduct(product);
        setEditMode(true);
        setOpenModal(true);
    }

    const createProduct = async (productData: Product)=> {
        try {
            const response = await productsService.createProduct(productData);
            setProducts(prevProducts => [...prevProducts, response.item]);
            handleCloseModal();
            toast.success(response.message);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
            toast.error(errorMessage);
        }
    }

    const updateProduct = async (productId: string, productData: Product ) => {
        try {
            const response = await productsService.updateProduct(productId, productData);
            setFilteredProducts(prevProducts =>
                prevProducts.map(product =>
                    product._id === productId ? {...product, ...productData} : product
                )
            );
            setEditMode(false);
            handleCloseModal();
            toast.success(response.message);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
            toast.error(errorMessage);
        }
    }

    const deleteProduct = async (productId: string) => {
        try {
            const response = await productsService.deleteProduct(productId);
            setProducts(prevProducts => prevProducts.filter(p => p._id !== productId));
            toast.success(response.message);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
            toast.error(errorMessage);
        }
    }

    const handleSearch = (word: string) => {
        setSearchedWord(word);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };


    return (
        <div className="container mx-auto px-4 mt-10">
            <div className="mb-10">
            <Button
                className="font-bold rounded-md mb-3 ml-7 py-2 px-4 bg-black text-white"
                onClick={handleOpenModal}
            >
                    + Create Product
            </Button>

                <SearchBar onSearch={handleSearch}/>

            {isModalOpen && (
                <CreateProductModal
                    open={isModalOpen}
                    handleClose={handleCloseModal}
                    handleCreate={createProduct}
                    handleUpdate={updateProduct}
                    productData={isEditMode ? currentProduct : null}
                />
            )}

            </div>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product._id}
                            _id={product._id}
                            productData={product}
                            editable={true}
                            onDelete={deleteProduct}
                            onEdit={handleEditModal}
                        />
                    ))}
                </div>
            </div>
        </div>
)};