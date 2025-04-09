import React from "react";
import { HeroSection } from "../components/HeroSection";
import { useMovies } from "../context/useMovies";
import { MovieSlider } from "../components/MovieSlider";
import Container from "../components/Container";

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
    <div className="min-h-screen">
      {nowPlaying && nowPlaying.length > 0 && (
        <HeroSection movies={nowPlaying} />
      )}
      <Container>
        <div className="mx-auto px-4 md:py-8">
          {nowPlaying && nowPlaying.length > 0 && (
            <MovieSlider
              id="now-playing-slider"
              title="Now Playing"
              movies={nowPlaying}
            />
          )}
          {upcoming && upcoming.length > 0 && (
            <MovieSlider
              id="upcoming-slider"
              title="Upcoming Movies"
              movies={upcoming}
            />
          )}
          {topRated && topRated.length > 0 && (
            <MovieSlider
              id="top-rated-slider"
              title="Top Rated"
              movies={topRated}
            />
          )}
        </div>
      </Container>
    </div>
  );
};
