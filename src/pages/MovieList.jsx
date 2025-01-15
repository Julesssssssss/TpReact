import React from "react";
import { Link } from "react-router";
import { useApi } from "../context/ApiContext";

const MovieList = () => {
  const { apiKey } = useApi();
  const [movies, setMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [category, setCategory] = React.useState("popular");

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des films");
      }

      const { results } = await response.json();
      setMovies(results);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchMovies();
  }, [category, apiKey]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <div>
      <h1>
        Liste des films{" "}
        {category === "popular" ? "populaires" : category.replace("_", " ")}
      </h1>

      <div className="category-select-container">
        <label htmlFor="category-select">Choisir une catégorie: </label>
        <select
          id="category-select"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="popular">Populaires</option>
          <option value="now_playing">Now Playing</option>
          <option value="top_rated">Top Rated</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>

      <div className="movie-popular-list-container">
        {movies.map(movie => (
          <div key={movie.id} className="movie-popular-container">
            <h2>{movie.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-info">
              <div>{movie.vote_average.toFixed(2)} / 10</div>
              <Link to={`/movie/${movie.id}`} className="details-button">
                Voir les détails
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
