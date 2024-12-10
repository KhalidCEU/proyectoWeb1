"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AccountMenu from './AccountMenu';
import SearchBar from './SearchBar';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link href="/">
                                <Image
                                    aria-hidden
                                    src="/logo_no_bg.svg"
                                    alt="File icon"
                                    width={50}
                                    height={50}
                                    className="hover:opacity-80 transition-opacity duration-300"
                                />
                            </Link>
                        </div>
                        {/* Navigation Links */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-8">
                                <Link
                                    href="/about"
                                    className="text-lg font-medium hover:text-gray-200 transition duration-300"
                                >
                                    About
                                </Link>
                                <Link
                                    href="/"
                                    className="text-lg font-medium hover:text-gray-200 transition duration-300"
                                >
                                    Trending
                                </Link>
                                <Link
                                    href="/map"
                                    className="text-lg font-medium hover:text-gray-200 transition duration-300"
                                >
                                    Go Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* Right Section */}
                    <div className="flex items-center space-x-6">
                        <SearchBar onSearch={() => {}} />
                        <AccountMenu />
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            <div className="md:hidden bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 shadow-md">
                <div className="flex items-center justify-between">
                    <Link href="/">
                        <Image
                            src="/logo_no_bg.svg"
                            alt="Logo"
                            width={40}
                            height={40}
                            className="hover:opacity-80 transition-opacity duration-300"
                        />
                    </Link>
                    <div className="space-x-4 flex items-center">
                        <SearchBar onSearch={() => {}} />
                        <AccountMenu />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
