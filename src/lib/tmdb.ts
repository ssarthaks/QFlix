const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

export const getImageUrl = (path: string, size: "w500" | "original" = "w500") =>
  `${IMAGE_BASE_URL}/${size}${path}`;

const fetchMovies = async (endpoint: string) => {
  const url = `${BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${url}`);
  }
  return response.json();
};

export const getUpcomingMovies = () => fetchMovies("/movie/upcoming");
export const getTopRatedMovies = () => fetchMovies("/movie/top_rated");
export const getNowPlayingMovies = () => fetchMovies("/movie/now_playing");
export const getMovieDetails = (id: number) => fetchMovies(`/movie/${id}`);
export const getGenres = () => fetchMovies("/genre/movie/list");
