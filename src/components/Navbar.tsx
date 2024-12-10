import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AccountMenu from './AccountMenu';
import SearchBar from './SearchBar';

const Navbar = () => {
    return (
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
