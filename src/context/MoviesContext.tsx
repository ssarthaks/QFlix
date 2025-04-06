import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";

export const MoviesContext = createContext({
  movies: [] as any[],
  fetchMovieData: async () => {},
});

interface MoviesProviderProps {
  children: ReactNode;
}

export const MoviesProvider: React.FC<MoviesProviderProps> = ({ children }) => {
  const [movies, setMovies] = useState<any[]>([]);

  const validMovieIds = [
    2, 3, 5, 6, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25,
    26, 27, 28, 33, 35, 38, 55, 58, 59, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
    73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 85, 86, 87, 88, 89, 90, 91, 92,
    93, 94, 95, 96, 97, 98, 99, 100,
  ];

  const fetchMovieData = async () => {
    const fetchedMovies: any[] = [];
    for (const id of validMovieIds) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            headers: {
              Authorization: `Bearer ${
                import.meta.env.VITE_TMDB_API_ACCESS_TOKEN
              }`,
            },
          }
        );
        fetchedMovies.push(response.data);
      } catch (error: any) {
        console.error(
          `Error fetching movie ID ${id}:`,
          error.response?.data || error.message
        );
      }
    }
    setMovies(fetchedMovies);
  };

  useEffect(() => {
    fetchMovieData();
  }, []);

  return (
    <MoviesContext.Provider value={{ movies, fetchMovieData }}>
      {children}
    </MoviesContext.Provider>
  );
};
