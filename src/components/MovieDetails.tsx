import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { getImageUrl } from "../lib/tmdb";
import { Star, Calendar, Clock } from "lucide-react";
import { Movie } from "../types/movie";
import { useMovies } from "../context/useMovies";

export const MovieDetails: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const { loading, getMovieById } = useMovies();
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      console.error("Movie ID is not defined");
    }

    const fetchMovie = async () => {
      try {
        const response = await getMovieById(Number(id));

        if (response) {
          setMovie(response);
        }
      } catch (error: any) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-primaryText">
        Loading...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex h-screen items-center justify-center text-errorText">
        Movie not found
      </div>
    );
  }

  return (
    <div className="min-h-screen text-primaryText pb-12">
      <Navbar />
      <div className="relative">
        <div className="absolute inset-0">
          <img
            src={getImageUrl(movie.backdrop_path, "original")}
            alt={movie.title}
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primaryBackground to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pt-32">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="w-full md:w-1/3">
              <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                className="w-full rounded-lg shadow-xl"
              />
            </div>

            <div className="w-full md:w-2/3">
              <h1 className="text-3xl font-bold md:text-4xl">{movie.title}</h1>

              <div className="mt-4 flex flex-wrap gap-4 text-description">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
                {movie.runtime && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>{movie.runtime} min</span>
                  </div>
                )}
              </div>

              <p className="mt-6 text-base md:text-lg leading-relaxed text-description">
                {movie.overview}
              </p>

              {movie.genres && movie.genres.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold">Genres</h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="rounded-full bg-movieGenreBackground px-4 py-1 text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
