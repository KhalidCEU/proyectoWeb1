import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AccountMenu from './AccountMenu';
import SearchBar from './SearchBar';

const Navbar = () => {
    return (
        <nav className="bg-gray-50">
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
                        <SearchBar/>
                        <AccountMenu />
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;