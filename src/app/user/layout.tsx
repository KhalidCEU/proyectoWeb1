import UserSidebar from '@/components/UserSidebar';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <UserSidebar />
      <div className="flex-1 overflow-y-auto pt-10 sm:px-36 md:px-36 lg:pl-44">
        {children}
      </div>
    </div>
  );
}