"use client"

import React, { useState } from 'react';
import Search from '@mui/icons-material/Search';
import { grey } from '@mui/material/colors';
import { SearchBarProps } from '@/types';

const SearchBar = ({ onSearch } : SearchBarProps) => {
    return (
        <div>
            <form className="flex items-center max-w-sm mx-auto">
                <label htmlFor="search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none focus:ring-green-300">
                        <Search sx={{ color: grey[700] }}/>
                    </div>
                    <input
                        type="text"
                        id="search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                        block w-full ps-10 p-2.5 focus:outline-green-500 "
                        placeholder="Search..."
                        required
                        onChange={(e) => onSearch(e.target.value)}
                     />
                </div>
            </form>
        </div>
    );
};

export default SearchBar;