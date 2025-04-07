import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Movie } from '../types/movie';
import { MovieCard } from './MovieCard';
import 'swiper/swiper-bundle.css';

interface MovieSliderProps {
  title: string;
  movies: Movie[];
}

export const MovieSlider: React.FC<MovieSliderProps> = ({ title, movies }) => {
  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold text-white">{title}</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2.2 },
          768: { slidesPerView: 3.2 },
          1024: { slidesPerView: 4.2 },
          1280: { slidesPerView: 5.2 },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};