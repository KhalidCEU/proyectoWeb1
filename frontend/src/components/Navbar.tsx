"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AccountMenu from './AccountMenu';
import SearchBar from './SearchBar';

const Navbar = () => {
    return (
<<<<<<< HEAD:frontend/src/components/Navbar.tsx
        <nav className="fixed top-0 left-0 right-0 h-16 bg-gray-50 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link href="/">
                                <Image
                                    aria-hidden
                                    src="/logo_no_bg.svg"
                                    alt="File icon"
                                    width={60}
                                    height={60}
                                />
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link href="/about">About</Link>
                                <Link href="/">Trending</Link>
                            </div>
                        </div>
                    </div>
                    {/* <div className="-mr-2 flex md:hidden">
                    </div> */}
                    <div className="flex items-center ml-4 space-x-4">
                        <SearchBar onSearch={() => {}} />
                        <AccountMenu />
                    </div>

=======
        <nav className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-md fixed w-full top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <Link href="/">
                        <Image
                            aria-hidden
                            src="/logo_no_bg.svg"
                            alt="Logo"
                            width={60}
                            height={60}
                            className="hover:opacity-90"
                        />
                    </Link>
                </div>
                {/* Links */}
                <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-8">
                        <Link
                            href="/about"
                            className="text-lg font-medium hover:text-gray-200"
                        >
                            About
                        </Link>
                        <Link
                            href="/"
                            className="text-lg font-medium hover:text-gray-200"
                        >
                            Trending
                        </Link>
                    </div>
>>>>>>> feat/HomePage:src/components/Navbar.tsx
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-6">
                <SearchBar />
                <AccountMenu />
            </div>
        </div>
    </div>
</nav>

    );
};

export default Navbar;
