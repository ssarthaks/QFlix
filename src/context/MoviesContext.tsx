import React, {
  createContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import { Movie, Genre } from "../types/movie";
import * as tmdb from "../lib/tmdb";

interface MovieContextType {
  nowPlaying: Movie[];
  upcoming: Movie[];
  topRated: Movie[];
  genres: Genre[];
  loading: boolean;
  error: string | null;
  fetchInitialData: () => Promise<void>;
  getMovieById: (id: number) => Promise<Movie | null>;
}

export const MovieContext = createContext<MovieContextType | undefined>(
  undefined
);

export const MovieProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInitialData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [nowPlayingData, upcomingData, topRatedData, genresData] =
        await Promise.all([
          tmdb.getNowPlayingMovies(),
          tmdb.getUpcomingMovies(),
          tmdb.getTopRatedMovies(),
          tmdb.getGenres(),
        ]);

      setNowPlaying(nowPlayingData.results);
      setUpcoming(upcomingData.results);
      setTopRated(topRatedData.results);
      setGenres(genresData.genres);
      console.log("Movies fetching done");
    } catch (error) {
      setError("Failed to fetch movies");
      console.error("Error fetching movie data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitialData();
    getMovieById(2);
  }, []);

  const getMovieById = useCallback(
    async (id: number): Promise<Movie | null> => {
      try {
        const movie = await tmdb.getMovieDetails(id);
        return movie;
      } catch (error) {
        console.error("Error fetching movie details:", error);
        return null;
      }
    },
    []
  );

  return (
    <MovieContext.Provider
      value={{
        nowPlaying,
        upcoming,
        topRated,
        genres,
        loading,
        error,
        fetchInitialData,
        getMovieById,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
