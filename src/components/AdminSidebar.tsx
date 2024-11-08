"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const AdminSidebar = () => {
  const pathname = usePathname();

  const getLinkClass = (linkPath: string) => {
    return pathname == linkPath ? 'text-green-600' : 'text-black'
  }

  return (
    <div className="w-44 bg-gray-50 h-screen fixed left-0 top-0 p-4 pt-20">
      <nav>
        <p className="text-2xl font-semibold mb-10">Admin</p>
        <ul className="flex flex-col items-start gap-6 pl-4">
          <li className="mb-2">
            <Link href="/admin/products" className={getLinkClass('/admin/products')}>Products</Link>
          </li>
          <li className="mb-2">
            <Link href="/admin/users" className={getLinkClass('/admin/users')}>Users</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;