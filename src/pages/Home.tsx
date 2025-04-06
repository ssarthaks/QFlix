import React from "react";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { useMovies } from "../context/useMovies";

export const Home: React.FC = () => {
  const { nowPlaying, loading, error } = useMovies();

  console.log("Now Playing Movies:", nowPlaying);
  
  
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
    </div>
  );
};
