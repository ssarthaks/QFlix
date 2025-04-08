import { useState, useRef } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Search, Film, Menu, X, Home, Compass } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [, setSearchParams] = useSearchParams();
  const isHomePage = location.pathname === "/";
  const isDiscoverPage = location.pathname === "/discover";

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (isDiscoverPage) {
      setSearchParams({ query });
    }
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-black/95 px-4 py-2 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl md:text-2xl font-bold text-white transition-transform hover:scale-105"
        >
          <Film className="md:h-8 md:w-8 h-6 w-6 text-purple-500" />
          <span>QFlix</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-8">
          <div className="flex items-center gap-6 text-gray-300">
            <Link
              to="/"
              className={`flex items-center gap-1.5 hover:text-white ${
                location.pathname === "/" ? "text-white font-medium" : ""
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              to="/discover"
              className={`flex items-center gap-1.5 hover:text-white ${
                location.pathname === "/discover"
                  ? "text-white font-medium"
                  : ""
              }`}
            >
              <Compass className="h-4 w-4" />
              <span>Discover</span>
            </Link>
          </div>

          {isDiscoverPage && (
            <div className="relative" ref={searchRef}>
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-64 rounded-full bg-gray-800 py-2 pl-10 pr-4 text-white placeholder-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="rounded-lg p-2 text-white hover:bg-gray-800 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 top-14 z-40 transform bg-black/95 h-screen backdrop-blur-md transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-6">
          <div className="flex flex-col space-y-4 text-lg">
            <Link
              to="/"
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-white hover:bg-gray-800 ${
                isHomePage ? "bg-gray-800/50" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="h-5 w-5 text-purple-500" />
              <span>Home</span>
            </Link>
            <Link
              to="/discover"
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-white hover:bg-gray-800 ${
                isDiscoverPage ? "bg-gray-800/50" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Compass className="h-5 w-5 text-purple-500" />
              <span>Discover</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
