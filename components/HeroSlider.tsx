"use client";

import { useState, useEffect } from "react";
import Link from "next/link";


interface Movie {
  id: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  year: string | number; 
  genre: string;
}

interface HeroSliderProps {
  movies: Movie[];
}

export default function HeroSlider({ movies }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % movies.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [movies.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (movies.length === 0) return null;

  const movie = movies[currentSlide]; // نجيب الفيلم الحالي فقط

  return (
    <div
      className="w-full h-screen relative bg-cover bg-center bg-no-repeat relative transition-all duration-1000"
      style={{ backgroundImage: `url(${movie.image})` }}
    >
      {/* Layer غامق لتوضيح النص */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* المحتوى */}
      <div className="relative h-full flex items-center px-4 md:px-8 lg:px-16">
        <div className="max-w-2xl space-y-reverse space-y-6 z-10">
          <div className="flex items-center space-x-reverse space-x-4">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              جديد
            </span>
            <span className="text-gray-300 text-sm">{movie.year}</span>
            <span className="text-gray-300 text-sm">{movie.genre}</span>
            <div className="flex items-center">
              <i className="ri-star-fill text-yellow-400 w-4 h-4 flex items-center justify-center mr-1"></i>
              <span className="text-white text-sm">{movie.rating}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight md:pt-4">
            {movie.title}
          </h1>

          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-xl">
            {movie.description}
          </p>

          <div className="flex items-center space-x-reverse space-x-4">
            <Link
              href={`/watch/series/${movie.id}`}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-reverse space-x-2 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-play-fill w-5 h-5 flex items-center justify-center"></i>
              <span>مشاهدة الآن</span>
            </Link>

            <Link
              href={`/details/series/${movie.id}`}
              className="bg-gray-800/80 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-reverse space-x-2 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-information-line w-5 h-5 flex items-center justify-center"></i>
              <span>تفاصيل</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
