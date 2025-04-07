import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, X } from "lucide-react";
import Container from "../components/Container";
import { useMovies } from "../context/useMovies";
import { getImageUrl } from "../lib/tmdb";
import MovieCardPlay from "../components/MovieCardPlay";

const Discover = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedReleaseDate, setSelectedReleaseDate] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchParams] = useSearchParams();

  const { genres, nowPlaying, topRated } = useMovies();
  const combinedMovies = [...nowPlaying, ...topRated];

  const searchQuery = searchParams.get("query") || "";

  // Helper function to filter movies
  const filteredMovies = combinedMovies.filter((movie) => {
    const searchPass =
      !searchQuery ||
      movie.title.toLowerCase().includes(searchQuery.toLowerCase());

    const ratingPass =
      !selectedRating || movie.vote_average >= parseInt(selectedRating);

    const durationPass = (() => {
      const runtime = movie.runtime || 0;
      if (!selectedDuration) return true;
      if (selectedDuration === "short") return runtime < 90;
      if (selectedDuration === "medium") return runtime >= 90 && runtime <= 120;
      if (selectedDuration === "long") return runtime > 120;
      return true;
    })();

    const genrePass =
      !selectedGenre ||
      (movie.genre_ids && movie.genre_ids.includes(parseInt(selectedGenre)));

    return searchPass && ratingPass && durationPass && genrePass;
  });

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (selectedReleaseDate === "release_date.desc") {
      return (
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      );
    } else if (selectedReleaseDate === "release_date.asc") {
      return (
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
      );
    }
    return 0;
  });

  const handleClearFilters = () => {
    setSelectedRating("");
    setSelectedReleaseDate("");
    setSelectedDuration("");
    setSelectedGenre("");
  };

  return (
    <div className="bg-gray-900 text-white pt-26">
      <Container>
        <main className="container mx-auto">
          {/* Top Header and Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="mb-4 text-3xl font-bold md:mb-0">Discover Movies</h1>

            {/* Desktop Filters */}
            <div className="hidden md:flex md:items-center md:gap-4">
              <div className="flex items-center gap-2">
                <select
                  name="rating"
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="rounded-lg bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">All Ratings</option>
                  <option value="5">5+ Stars</option>
                  <option value="6">6+ Stars</option>
                  <option value="7">7+ Stars</option>
                  <option value="8">8+ Stars</option>
                  <option value="9">9+ Stars</option>
                </select>
                <select
                  name="release_date"
                  value={selectedReleaseDate}
                  onChange={(e) => setSelectedReleaseDate(e.target.value)}
                  className="rounded-lg bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Release Date</option>
                  <option value="release_date.desc">Newest to Oldest</option>
                  <option value="release_date.asc">Oldest to Newest</option>
                </select>
                <select
                  name="time_duration"
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="rounded-lg bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">All Durations</option>
                  <option value="short">Short (&lt; 90 mins)</option>
                  <option value="medium">Medium (90-120 mins)</option>
                  <option value="long">Long (&gt; 120 mins)</option>
                </select>
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="rounded-lg bg-gray-800 px-4 py-2 text-white transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">All Genres</option>
                  {genres?.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
                </select>

                {(selectedRating ||
                  selectedReleaseDate ||
                  selectedDuration ||
                  selectedGenre) && (
                  <button
                    onClick={handleClearFilters}
                    className="flex items-center gap-1 rounded-lg bg-gray-700 px-3 py-2 text-sm hover:bg-gray-600"
                  >
                    <X className="h-4 w-4" /> Clear
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Filter Button */}
            <button
              className="flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 font-medium md:hidden"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-5 w-5" />
              Filters
            </button>
          </div>

          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between py-6">
            <p className="text-gray-400">
              Showing{" "}
              <span className="font-medium text-white">
                {sortedMovies.length}
              </span>{" "}
              results
            </p>
          </div>

          {/* Movie Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 pb-12">
            {sortedMovies.map((movie) => (
              <MovieCardPlay
                key={movie.id}
                movie={movie}
                getImageUrl={getImageUrl}
              />
            ))}
          </div>
        </main>
      </Container>
    </div>
  );
};

export default Discover;