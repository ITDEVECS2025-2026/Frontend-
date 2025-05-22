import React from 'react';
import Image from 'next/image';
import { CarddosenProps } from '@/types/Card';
import Typography from '../Typography/Typography';
import clsxm from '@/lib/clsxm';

const Carddosen: React.FC<CarddosenProps> = ({
  Header,
  ImageSrc,
  ImageAlt,
  SintaLink,
  className,
  LectureText,
}) => {
  return (
    <div className={clsxm("w-[216px] h-[299px] rounded-3xl relative", className)}>
      
      
      <div className="backdrop-blur-sm bg-white/0 shadow-lg rounded-b-3xl z-20 w-full h-20 absolute bottom-0" />



      
      {ImageSrc && (
        <Image
          src={ImageSrc}
          alt={ImageAlt || 'Foto Dosen'}
          width={226}
          height={226}
          className="absolute object-cover bottom-0 rounded-b-3xl z-10"
        />
      )}

      
      <Image
        src="https://itdevecs2025-2026.github.io/Images-frontend/image%2020.png"
        alt="BG"
        width={363}
        height={379}
        className="absolute object-cover rounded-3xl w-full h-full"
      />

     
      <Typography
        size="xs"
        variant="Header"
        className="font-semibold text-secondary-200 absolute top-8 left-9"
      >
        {LectureText}
      </Typography>

      
      {SintaLink && (
        <a
          href={SintaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-2xl z-30 shadow-[inset_0px_-1px_4px_rgba(0,0,0,0.6)] w-[59.82px] h-[25px] absolute flex bottom-5 right-3 items-center justify-center gap-2 px-2"
        >
          <Image
            src="https://itdevecs2025-2026.github.io/Images-frontend/Frame%20197.png"
            alt="Sinta Icon"
            width={11.81}
            height={11.81}
            className="rounded-full w-3 h-3"
          />
          <Typography
            size="xs"
            variant="Header"
            className="font-normal text-secondary-200 text-[8.29px]"
          >
            Sinta
          </Typography>
        </a>
      )}
    </div>
  );
};

export default Carddosen;
