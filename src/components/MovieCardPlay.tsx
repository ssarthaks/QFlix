import { Play, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
}
interface MovieCardPlayProps {
  movie: Movie;

  getImageUrl: (path: string, size?: "w500" | "original") => string;
}

const MovieCardPlay: React.FC<MovieCardPlayProps> = ({
  movie,
  getImageUrl,
}) => {
  return (
    <div
      key={movie.id}
      className="group relative overflow-hidden rounded-lg bg-gray-800 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={getImageUrl(movie.backdrop_path, "original")}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
        <h3 className="text-md font-medium line-clamp-1">{movie.title}</h3>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-sm text-gray-400">
            {movie.release_date.split("-")[0]}
          </span>
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
            <span className="text-sm font-medium">{movie.vote_average}</span>
          </div>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Link to={`/movie/${movie.id}`}>
          <button className="flex items-center justify-center rounded-full bg-purple-600 p-4 text-white hover:bg-purple-700">
            <Play className="h-6 w-6" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MovieCardPlay;
