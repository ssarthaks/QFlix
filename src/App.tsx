import { useMovies } from "./context/useMovies";

function App() {
  const { nowPlaying } = useMovies();

  return (
    <>
      <h1 className="text-2xl text-center ">Hello World Qflix</h1>
      <div className="movies-list">
        {nowPlaying.length > 0 ? (
          nowPlaying.map((movie, index) => (
            <div key={index} className="movie-item">
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
            </div>
          ))
        ) : (
          <p>Loading movies...</p>
        )}
      </div>
    </>
  );
}

export default App;
