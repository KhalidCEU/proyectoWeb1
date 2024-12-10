"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import Search from "@mui/icons-material/Search";
import { grey } from "@mui/material/colors";
import { useProductsService } from "@/services"; 
import { SearchBarProps } from "@/types"; 

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [query, setQuery] = useState(""); 
    const router = useRouter();
    const productsService = useProductsService();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault(); 

        try {
            const response = await productsService.searchProducts(query);

            if (response.items.length > 0) {
                // Redirige al primer producto encontrado
                router.push(`/product/${response.items[0]._id}`);
            } else {
                alert("No se encontraron productos.");
            }
        } catch (error) {
            console.error("Error al buscar productos:", error);
            alert("Ocurrió un error al buscar productos.");
        }
    };

    return (
        <div>
            <form
                className="flex items-center max-w-sm mx-auto"
                onSubmit={handleSearch} // Manejar la búsqueda al enviar el formulario
            >
                <label htmlFor="search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none focus:ring-green-300">
                        <Search sx={{ color: grey[700] }} />
                    </div>
                    <input
                        type="text"
                        id="search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                        block w-full ps-10 p-2.5 focus:outline-green-500"
                        placeholder="Search..."
                        value={query} // Conecta el estado local con el input
                        onChange={(e) => {
                            setQuery(e.target.value); // Actualiza el estado local
                            onSearch(e.target.value); // Notifica al padre si se pasa un callback
                        }}
                        required
                    />
                </div>
            </form>
        </div>
    );
};

export default SearchBar;
