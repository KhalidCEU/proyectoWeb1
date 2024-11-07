import Link from 'next/link';

const UserSidebar = () => {
  return (
    <div className="w-44 bg-gray-50 h-screen fixed left-0 top-0 p-4 pt-20">
      <nav>
        <p className="text-2xl font-semibold mb-10">User</p>
        <ul className="flex flex-col items-start gap-6 pl-4">
          <li className="mb-2">
            <Link href="/user/profile" className="hover:text-green-600">Profile</Link>
          </li>
          <li className="mb-2">
            <Link href="/user/wishlist" className="hover:text-green-600">Wishlist</Link>
          </li>
          <li className="mb-2">
            <Link href="/user/settings" className="hover:text-green-600">Settings</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserSidebar;