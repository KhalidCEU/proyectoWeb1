"use client"

import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AccountMenu from './AccountMenu';
import SearchBar from './SearchBar';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const handleSearch = (term: string) => {
      setSearchTerm(term);

      if (term) {
        router.push(`/?search=${encodeURIComponent(term)}`);
      } else {
        router.push('/');
      }
    };

    return (
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
                        <SearchBar onSearch={handleSearch} />
                        <AccountMenu />
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;