import React from "react";
import { Movie } from "../types/movie";
import { MovieCard } from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MovieSliderProps {
  title: string;
  movies: Movie[];
  id: string;
}

export const MovieSlider: React.FC<MovieSliderProps> = ({
  title,
  movies,
  id,
}) => {

  const handleSlide = (direction: "prev" | "next") => {
    const slider = document.querySelector(`#${id}`) as HTMLElement;
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
    <div className="py-4 md:py-6 lg:py-8 relative md:px-12 text-primaryText">
      <h2 className="mb-4 text-2xl font-bold ">{title}</h2>
      <div className="overflow-hidden">
        <div
          id={id}
          className="custom-slider flex transition-transform duration-300 ease-in-out"
          onTouchStart={(e) => {
            const slider = e.currentTarget;
            slider.dataset.startX = e.touches[0].clientX.toString();
            slider.dataset.currentTransform = getComputedStyle(slider).transform.split(",")[4] || "0";
          }}
          onTouchMove={(e) => {
            const slider = e.currentTarget;
            const startX = parseFloat(slider.dataset.startX || "0");
            const currentTransform = parseFloat(slider.dataset.currentTransform || "0");
            const deltaX = e.touches[0].clientX - startX;
            slider.style.transform = `translateX(${currentTransform + deltaX}px)`;
          }}
          onTouchEnd={(e) => {
            const slider = e.currentTarget;
            const startX = parseFloat(slider.dataset.startX || "0");
            const currentTransform = parseFloat(slider.dataset.currentTransform || "0");
            const deltaX = e.changedTouches[0].clientX - startX;
            const slideWidth = slider.firstElementChild?.clientWidth || 0;

            if (Math.abs(deltaX) > slideWidth / 4) {
              const direction = deltaX > 0 ? "prev" : "next";
              const newTransform =
          direction === "prev"
            ? Math.min(currentTransform + slideWidth, 0)
            : currentTransform - slideWidth;
              slider.style.transform = `translateX(${newTransform}px)`;
            } else {
              slider.style.transform = `translateX(${currentTransform}px)`;
            }
          }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="custom-slide flex-shrink-0 px-2">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
        <button
          className="custom-slider-prev hidden md:block absolute left-0 top-1/2 lg:h-10 lg:w-10 w-8 h-8 transform -translate-y-1/2 bg-sliderButtonPrimary  p-2 rounded-full"
          onClick={() => handleSlide("prev")}
        >
          <ChevronLeft className="lg:w-6 lg:h-6 w-4 h-4" />
        </button>
        <button
          className="custom-slider-next hidden md:block absolute right-0 top-1/2 lg:h-10 lg:w-10 w-8 h-8 transform -translate-y-1/2 bg-sliderButtonPrimary  p-2 rounded-full"
          onClick={() => handleSlide("next")}
        >
          <ChevronRight className="lg:w-6  lg:h-6 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
