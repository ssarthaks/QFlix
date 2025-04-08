import { useState, useEffect, useCallback } from "react";
import { Play, ChevronLeft, ChevronRight, Pause } from "lucide-react";
import type { Movie } from "../types/movie";
import { getImageUrl } from "../lib/tmdb";
import { Link } from "react-router-dom";

// Custom classNames utility instead of cn from shadcn
function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

interface HeroSectionProps {
  movies: Movie[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const currentMovie = movies[currentIndex];

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  }, [movies.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  }, [movies.length]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      goToNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  if (!movies.length) return null;

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Featured movies carousel"
    >
      {/* Background Images with Crossfade */}
      {movies.map(
        (movie, index) =>
          movie.backdrop_path && (
            <div
              key={movie.id}
              className={classNames(
                "absolute inset-0 transition-opacity duration-1000",
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              )}
            >
              <img
                src={getImageUrl(movie.backdrop_path, "original")}
                alt=""
                className="h-full w-full object-cover mt-16"
                onLoad={() => setIsLoading(false)}
              />
            </div>
          )
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 z-30 p-8 pb-20 text-white md:p-16">
        <div className="animate-fadeIn">
          <h1 className="text-3xl font-bold md:text-6xl">
            {currentMovie?.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base md:text-lg opacity-90 md:line-clamp-none line-clamp-3">
            {currentMovie?.overview}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link  to={`/movie/${currentMovie.id}`}>
              <button
                className="flex items-center gap-2 rounded-lg bg-purple-600 md:px-6 md:py-3 px-4 py-2 font-semibold text-white transition-all hover:bg-purple-700 hover:scale-105 text-sm md:text-base"
                aria-label="Watch now"
              >
                <Play className="md:h-5 md:w-5 w-4 h-4" />
                Movie Details
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-20 right-8 z-30 flex items-center gap-4 md:bottom-16 md:right-16">
        <button
          onClick={goToPrevious}
          className="rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50"
          aria-label="Previous movie"
        >
          <ChevronLeft className="md:h-6 h-4 md:w-6 w-4" />
        </button>

        <button
          onClick={() => setIsPaused(!isPaused)}
          className="rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50"
          aria-label={isPaused ? "Resume autoplay" : "Pause autoplay"}
        >
          {isPaused ? (
            <Play className="md:h-6 h-4 md:w-6 w-4" />
          ) : (
            <Pause className="md:h-6 h-4 md:w-6 w-4" />
          )}
        </button>

        <button
          onClick={goToNext}
          className="rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50"
          aria-label="Next movie"
        >
          <ChevronRight className="md:h-6 h-4 md:w-6 w-4" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={classNames(
              "h-1.5 rounded-full transition-all",
              index === currentIndex
                ? "w-8 bg-purple-600"
                : "w-2 bg-white/50 hover:bg-white/80"
            )}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? "true" : "false"}
          />
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-purple-600" />
        </div>
      )}
    </div>
  );
};
