"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const UserSidebar = () => {
  const pathname = usePathname();

  const getLinkClass = (linkPath: string) => {
    return pathname == linkPath ? 'text-green-600' : 'text-black'
  }

  return (
    <div className="w-44 bg-gray-50 h-screen fixed left-0 top-0 p-4 pt-20">
      <nav>
        <p className="text-2xl font-semibold mb-10">User</p>
        <ul className="flex flex-col items-start gap-6 pl-4">
          <li className="mb-2">
            <Link href="/user/profile" className={getLinkClass('/user/profile')}>Profile</Link>
          </li>
          <li className="mb-2">
            <Link href="/user/wishlist" className={getLinkClass('/user/wishlist')}>Wishlist</Link>
          </li>
          <li className="mb-2">
            <Link href="/user/settings" className={getLinkClass('/user/settings')}>Settings</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserSidebar;