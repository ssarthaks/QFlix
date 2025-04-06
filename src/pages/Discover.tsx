import { useState } from "react";
import { Filter, X, Sliders } from "lucide-react";
import Container from "../components/Container";
import { useMovies } from "../context/useMovies";
import { getImageUrl } from "../lib/tmdb";
import MovieCardPlay from "../components/MovieCardPlay";

const Discover = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { genres, nowPlaying, topRated } = useMovies();

  const combinedMovies = [...nowPlaying, ...topRated];

  return (
    <div className="bg-gray-900 text-white pt-10">
      <Container>
        <main className="container mx-auto">
          <div className=" flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="mb-4 text-3xl font-bold md:mb-0">Discover Movies</h1>
            {/* Desktop Filters */}
            <div className="hidden md:flex md:items-center md:gap-4">
              <div className="flex items-center gap-2">
                <select
                  name="rating"
                  className="rounded-lg bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">All Ratings</option>
                  <option value="1">1 Star & Up</option>
                  <option value="2">2 Stars & Up</option>
                  <option value="3">3 Stars & Up</option>
                  <option value="4">4 Stars & Up</option>
                  <option value="5">5 Stars</option>
                </select>
                <select
                  name="release_date"
                  className="rounded-lg bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Release Date</option>
                  <option value="release_date.desc">Newest to Oldest</option>
                  <option value="release_date.asc">Oldest to Newest</option>
                </select>
                <select
                  name="time_duration"
                  className="rounded-lg bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">All Durations</option>
                  <option value="short">Short (&lt; 90 mins)</option>
                  <option value="medium">Medium (90-120 mins)</option>
                  <option value="long">Long (&gt; 120 mins)</option>
                </select>
                <select className="rounded-lg bg-gray-800 px-4 py-2 text-white transition-all focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="">All Genres</option>
                  {genres &&
                    Array.isArray(genres) &&
                    genres.map((genre) => (
                      <option key={genre.id} value={genre.id}>
                        {genre.name}
                      </option>
                    ))}
                </select>

                <button className="flex items-center gap-1 rounded-lg bg-gray-700 px-3 py-2 text-sm hover:bg-gray-600">
                  <X className="h-4 w-4" /> Clear
                </button>
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

          {/* Mobile Filters Panel */}
          <div
            className={`mb-6 rounded-lg bg-gray-800 p-4 transition-all duration-300 md:hidden ${
              isFilterOpen
                ? "max-h-96 opacity-100"
                : "max-h-0 overflow-hidden opacity-0"
            }`}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">Filters</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="rounded-full p-1 hover:bg-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-gray-400">
                  Sort By
                </label>
                <select
                  name="release_date"
                  className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="popularity.desc">Popular</option>
                  <option value="vote_average.desc">Top Rated</option>
                  <option value="release_date.desc">Newest</option>
                </select>
                <select
                  name="time_duration"
                  className="rounded-lg bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">All Durations</option>
                  <option value="short">Short (&lt; 90 mins)</option>
                  <option value="medium">Medium (90-120 mins)</option>
                  <option value="long">Long (&gt; 120 mins)</option>
                </select>
                <select className="rounded-lg bg-gray-800 px-4 py-2 text-white transition-all focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="">All Genres</option>
                  {genres &&
                    Array.isArray(genres) &&
                    genres.map((genre) => (
                      <option key={genre.id} value={genre.id}>
                        {genre.name}
                      </option>
                    ))}
                </select>
              </div>
              <button className="w-full rounded-lg bg-gray-700 py-2 text-center hover:bg-gray-600">
                Reset Filters
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between py-6">
            <p className="text-gray-400">
              Showing{" "}
              <span className="font-medium text-white">
                {combinedMovies.length}
              </span>{" "}
              results
            </p>
            {/* Desktop View Toggle (optional) */}
            <div className="hidden items-center gap-2 md:flex">
              <button className="rounded-lg bg-gray-800 p-2 text-purple-500">
                <Sliders className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Movie Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 pb-12">
            {combinedMovies.map((movie) => (
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
