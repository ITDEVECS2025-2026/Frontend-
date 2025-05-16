import React from 'react';
import Image from 'next/image';
import { HiOutlineGlobeAlt } from 'react-icons/hi2';
import Typography from '../Typography/Typography';


const NavbarHeader = () => {
  return (
    <div className="fixed top-6 left-0 w-full flex justify-between items-center px-8 z-50">
      {/* Logo kiri */}
      <div className="flex items-center">
        <Image
          src="https://itdevecs2025-2026.github.io/Images-frontend/Frame%20136.png" 
          alt="ECS Logo"
          width={114}
          height={78}
          className="text-[#AFACA2]"
        />
      </div>

      {/* Tengah kosong */}
      <div className="flex-1" />

      {/* Kanan */}
      <div className="flex items-center gap-2 text-[#AFACA2]  ">
        
        <Typography variant='Paragraph' size='base'>Based in </Typography> 
        <HiOutlineGlobeAlt size={24} />
        <Typography variant='Paragraph' size='base'> Surabaya</Typography> 
      </div>
    </div>
  );
};

export default NavbarHeader;
