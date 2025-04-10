import { useState, useRef } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Search, Menu, X, Home, Compass, Clapperboard } from "lucide-react";

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
    <nav className="fixed left-0 right-0 top-0 z-50 bg-navbarBackground/95 px-4 py-2 md:py-3 backdrop-blur-sm text-primaryText">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl md:text-2xl font-bold transition-transform hover:scale-105"
        >
          <Clapperboard className="md:h-8 md:w-8 h-6 w-6 text-buttonPrimary" />
          <span>QFlix</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-8">
          <div className="flex items-center gap-6 text-description">
            <Link
              to="/"
              className={`flex items-center gap-1.5 hover:text-primaryText ${
                location.pathname === "/" ? "text-primaryText font-medium" : ""
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              to="/discover"
              className={`flex items-center gap-1.5 hover:text-primaryText ${
                location.pathname === "/discover"
                  ? "text-primaryText font-medium"
                  : ""
              }`}
            >
              <Compass className="h-4 w-4" />
              <span>Discover</span>
            </Link>
          </div>

          {isDiscoverPage && (
            <div className="relative" ref={searchRef}>
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-description" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full rounded-full bg-gray-800 py-3 pl-10 pr-10 placeholder-description focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchParams({ query: "" }), setSearchQuery("");
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-description hover:text-primaryText"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="rounded-lg p-2 hover:bg-gray-800 md:hidden"
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
        className={`fixed inset-0 top-14 z-40 transform bg-primaryBackground/95 h-screen backdrop-blur-md transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-6">
          <div className="flex flex-col space-y-4 text-lg">
            <Link
              to="/"
              className={`flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-hoverBackground ${
                isHomePage ? "bg-hoverBackground/50" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="h-5 w-5 text-buttonPrimary" />
              <span>Home</span>
            </Link>
            <Link
              to="/discover"
              className={`flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-hoverBackground ${
                isDiscoverPage ? "bg-hoverBackground/50" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Compass className="h-5 w-5 text-buttonPrimary" />
              <span>Discover</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
