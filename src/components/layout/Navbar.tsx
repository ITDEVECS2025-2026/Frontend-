import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { HiOutlineCpuChip, HiOutlinePrinter, HiOutlineUser } from 'react-icons/hi2';

const links = [
  {
    href: '/about',
    icon: <HiOutlineUser size={24} />,
  },
  {
    href: '/project',
    icon: <HiOutlineCpuChip size={24} />,
  },
  {
    href: '/print',
    icon: <HiOutlinePrinter size={24} />,
  },
];

const NavbarItem = () => {
  const { pathname } = useRouter();

  return (
    <>
     
      <div className="fixed bottom-0 w-screen z-[999999] flex h-[56px] bg-user-Gray justify-around items-center lg:hidden">
        {links.map(({ href, icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center justify-center px-4 py-2 transition duration-200 ease-in-out
              ${pathname === href ? 'text-white font-semibold' : 'text-secondary-200'}
            `}
          >
            {icon}
          </Link>
        ))}
      </div>

      <div className="hidden lg:flex fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-user-Gray rounded-full px-6 py-2 shadow-lg items-center gap-6">
        {links.map(({ href, icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center justify-center transition duration-200 ease-in-out
              ${pathname === href ? 'text-white font-semibold' : 'text-secondary-200'}
            `}
          >
            {icon}
          </Link>
        ))}
      </div>
    </>
  );
};

export default NavbarItem;

