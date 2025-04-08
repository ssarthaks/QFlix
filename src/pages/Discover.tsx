import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, Search, X } from "lucide-react";
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
  const [searchParams, setSearchParams] = useSearchParams();

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
    setSearchParams({ query: "" });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParams({ query: value });
  };

  return (
    <div className="bg-gray-900 text-white pt-26">
      <Container>
        <main className="container mx-auto">
          {/* Top Header and Filters */}
          <div className="flex flex-col md:flex-col md:justify-between">
            <h1 className="mb-4 text-3xl font-bold md:mb-6">Discover Movies</h1>
            <div className="flex gap-2 items-center justify-center relative">
              <div className="relative md:hidden w-full">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full rounded-full bg-gray-800 py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                className="flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 font-medium md:hidden"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="h-5 w-5" />
              </button>
              {/* Mobile Filter Button */}
              <div className="realtive">
                {isFilterOpen && (
                  <div className="absolute left-0 w-full top-14 right-0 z-10 mt-2 rounded-lg bg-gray-800 p-4 shadow-lg md:hidden">
                    <div className="flex flex-col gap-4">
                      <select
                        name="rating"
                        value={selectedRating}
                        onChange={(e) => {
                          setSelectedRating(e.target.value);
                          setIsFilterOpen(false);
                        }}
                        className="rounded-lg bg-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                        onChange={(e) => {
                          setSelectedReleaseDate(e.target.value);
                          setIsFilterOpen(false);
                        }}
                        className="rounded-lg bg-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Release Date</option>
                        <option value="release_date.desc">
                          Newest to Oldest
                        </option>
                        <option value="release_date.asc">
                          Oldest to Newest
                        </option>
                      </select>
                      <select
                        name="time_duration"
                        value={selectedDuration}
                        onChange={(e) => {
                          setSelectedDuration(e.target.value);
                          setIsFilterOpen(false);
                        }}
                        className="rounded-lg bg-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">All Durations</option>
                        <option value="short">Short (&lt; 90 mins)</option>
                        <option value="medium">Medium (90-120 mins)</option>
                        <option value="long">Long (&gt; 120 mins)</option>
                      </select>
                      <select
                        value={selectedGenre}
                        onChange={(e) => {
                          setSelectedGenre(e.target.value);
                          setIsFilterOpen(false);
                        }}
                        className="rounded-lg bg-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                          onClick={() => {
                            handleClearFilters();
                            setIsFilterOpen(false);
                          }}
                          className="flex items-center gap-1 rounded-lg bg-gray-600 px-3 py-2 text-sm hover:bg-gray-500"
                        >
                          <X className="h-4 w-4" /> Clear
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Mobile Selected Filters List */}
            <div>
              {(selectedRating ||
                selectedReleaseDate ||
                selectedDuration ||
                selectedGenre) && (
                <div className="mt-4 flex flex-wrap gap-2 md:hidden">
                  {selectedRating && (
                    <div className="flex items-center gap-2 rounded-full bg-purple-600 px-3 py-1 text-sm">
                      <span>Rating: {selectedRating}+</span>
                      <button
                        onClick={() => setSelectedRating("")}
                        className="text-white hover:text-gray-300"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                  {selectedReleaseDate && (
                    <div className="flex items-center gap-2 rounded-full bg-purple-600 px-3 py-1 text-sm">
                      <span>
                        Release:{" "}
                        {selectedReleaseDate === "release_date.desc"
                          ? "Newest to Oldest"
                          : "Oldest to Newest"}
                      </span>
                      <button
                        onClick={() => setSelectedReleaseDate("")}
                        className="text-white hover:text-gray-300"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                  {selectedDuration && (
                    <div className="flex items-center gap-2 rounded-full bg-purple-600 px-3 py-1 text-sm">
                      <span>Duration: {selectedDuration}</span>
                      <button
                        onClick={() => setSelectedDuration("")}
                        className="text-white hover:text-gray-300"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                  {selectedGenre && (
                    <div className="flex items-center gap-2 rounded-full bg-purple-600 px-3 py-1 text-sm">
                      <span>
                        Genre:{" "}
                        {
                          genres?.find(
                            (genre) => genre.id === parseInt(selectedGenre)
                          )?.name
                        }
                      </span>
                      <button
                        onClick={() => setSelectedGenre("")}
                        className="text-white hover:text-gray-300"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Desktop Filters */}
            <div className="hidden md:flex md:items-center md:gap-4">
              <div className="grid md:grid-cols-4 lg:grid-cols-5 items-center gap-2">
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

                <div>
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
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between py-6">
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
