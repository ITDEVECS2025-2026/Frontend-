import React from 'react';

type CardProps = {
  title: string;
  price: string;
  icon: string;
  selected: boolean;
  onClick: () => void;
};

export default function Card({ title, price, icon, selected, onClick }: CardProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-6  w-36 h-36 rounded-lg shadow-lg cursor-pointer ${
        selected ? 'border-2 border-white text-white' : 'border-2 border-[#83817A] text-[#83817A]'
      }`}
      onClick={onClick}
    >
      <div className='flex flex-col justify-center items-center w-auto text-center'>
        <img src={icon} alt={`${title} icon`} className="w-10 h-10 pb-2" />
        <div className="text-sm mb-2">{title}</div>
        <div className="text-sm">{price}</div>
      </div>
    </div>
  );
}
