import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Movie } from "../types/movie";
import { getImageUrl } from "../lib/tmdb";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="overflow-hidden rounded-lg text-primaryText">
        <div className="group relative  transition-transform duration-300 hover:scale-105 w-36 md:w-48 lg:w-56">
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent lg:opacity-0 transition-opacity duration-300 lg:group-hover:opacity-100">
            <div className="absolute bottom-0 p-4">
              <h3 className="text-base lg:text-lg font-semibold">
                {movie.title}
              </h3>
              <div className="mt-2 flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
