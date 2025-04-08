import React from "react";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { useMovies } from "../context/useMovies";
import { MovieSlider } from "../components/MovieSlider";

export const Home: React.FC = () => {
  const { nowPlaying, loading, error, upcoming, topRated } = useMovies();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      {nowPlaying && nowPlaying.length > 0 && (
        <HeroSection movies={nowPlaying} />
      )}
      <div className="mx-auto max-w-7xl px-4 md:py-8">
        {nowPlaying && nowPlaying.length > 0 && (
          <MovieSlider title="Now Playing" movies={nowPlaying} />
        )}
        {upcoming && upcoming.length > 0 && (
          <MovieSlider title="Upcoming Movies" movies={upcoming} />
        )}
        {topRated && topRated.length > 0 && (
          <MovieSlider title="Top Rated" movies={topRated} />
        )}
      </div>
    </div>
  );
};
