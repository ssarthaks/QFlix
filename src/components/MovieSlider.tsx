import React from "react";
import { Movie } from "../types/movie";
import { MovieCard } from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MovieSliderProps {
  title: string;
  movies: Movie[];
}

export const MovieSlider: React.FC<MovieSliderProps> = ({ title, movies }) => {
  const handleSlide = (direction: "prev" | "next") => {
    const slider = document.querySelector(".custom-slider") as HTMLElement;
    if (!slider) return;

    const slideWidth = slider.firstElementChild?.clientWidth || 0;
    const currentTransform = parseFloat(
      getComputedStyle(slider).transform.split(",")[4] || "0"
    );

    if (direction === "prev") {
      slider.style.transform = `translateX(${Math.min(
        currentTransform + slideWidth,
        0
      )}px)`;
    } else if (direction === "next") {
      slider.style.transform = `translateX(${currentTransform - slideWidth}px)`;
    }
  };

  return (
    <div className="py-8 relative md:px-12">
      <h2 className="mb-4 text-2xl font-bold text-white">{title}</h2>
      <div className="overflow-hidden">
        <div className="custom-slider flex transition-transform duration-300 ease-in-out">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="custom-slide flex-shrink-0 w-1/5 px-20"
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
        <button
          className="custom-slider-prev hidden md:block absolute left-0 top-1/2 lg:h-10 lg:w-10 w-8 h-8 transform -translate-y-1/2 bg-purple-600 text-white p-2 rounded-full"
          onClick={() => handleSlide("prev")}
        >
          <ChevronLeft className="lg:w-6 lg:h-6 w-4 h-4" />
        </button>
        <div
          className="custom-slider-touch md:hidden absolute inset-0"
          onTouchStart={(e) => {
            const touchStartX = e.touches[0].clientX;
            e.currentTarget.dataset.touchStartX = touchStartX.toString();
          }}
          onTouchEnd={(e) => {
            const touchStartX = parseFloat(e.currentTarget.dataset.touchStartX || "0");
            const touchEndX = e.changedTouches[0].clientX;
            const touchDifference = touchStartX - touchEndX;

            if (touchDifference > 50) {
              handleSlide("next");
            } else if (touchDifference < -50) {
              handleSlide("prev");
            }
          }}
        />
        <button
          className="custom-slider-next hidden md:block absolute right-0 top-1/2 lg:h-10 lg:w-10 w-8 h-8 transform -translate-y-1/2 bg-purple-600 text-white p-2 rounded-full"
          onClick={() => handleSlide("next")}
        >
          <ChevronRight className="lg:w-6  lg:h-6 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
