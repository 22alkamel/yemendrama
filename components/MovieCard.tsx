'use client';

import Link from 'next/link';
import { useState } from 'react';


type ContentType = 'series' | 'movies' | 'kids' | 'programs' | 'podcasts' | 'plays';

interface Movie {
  id: string;
  title: string;
  description:string;
  genre:string;
  cardimg: string;      // صورة الكرت
  image?: string;       // اختياري (للبوستر أو hero)
  rating: number;
  year: string | number; 
  
}


interface MovieCardProps {
  movie: Movie;
  type?: ContentType | string; // اختياري + مرن
}

export default function MovieCard({ movie, type }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // لو فيه type استخدم /watch/[type]/[id]، وإلا استخدم المسار القديم كـ fallback
  const watchHref = type ? `/watch/${type}/${movie.id}` : `/watch/${movie.id}`;

  const detailHref = type ? `/details/${type}/${movie.id}` : `/details/${movie.id}`;

  return (
    <div
      className="relative group cursor-pointer transform transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg bg-gray-800">
        <div className="aspect-[2/3] w-full">
          <img
            src={movie.cardimg}
            alt={movie.title}
            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {isHovered && (
          <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
            <div className="space-y-2">
              <h3 className="font-bold text-sm md:text-base line-clamp-2">
                {movie.title}
              </h3>

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-300">{movie.year}</span>
                <div className="flex items-center">
                  <i className="ri-star-fill text-yellow-400 w-3 h-3 flex items-center justify-center ml-1"></i>
                  <span>{movie.rating}</span>
                </div>
              </div>

              <div className="flex items-center space-x-reverse space-x-2">
                <Link
                  href={watchHref}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center space-x-reverse space-x-1"
                >
                  <i className="ri-play-fill w-3 h-3 flex items-center justify-center"></i>
                  <span>مشاهدة</span>
                </Link>

                <Link
                  href={detailHref}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center space-x-reverse space-x-1"
                >
                  <i className="ri-information-line w-3 h-3 flex items-center justify-center"></i>
                  <span>تفاصيل</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="absolute top-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
          <div className="flex items-center">
            <i className="ri-star-fill text-yellow-400 w-3 h-3 flex items-center justify-center mr-1"></i>
            <span>{movie.rating}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 md:hidden">
        <h3 className="text-white font-medium text-sm line-clamp-2">
          {movie.title}
        </h3>
        <p className="text-gray-400 text-xs mt-1">{movie.year}</p>
      </div>
    </div>
  );
}
