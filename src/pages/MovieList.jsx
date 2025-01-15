import React from "react";
import { useApi } from "../context/ApiContext";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router";

const MovieList = () => {
  const { apiKey } = useApi();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [movies, setMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [category, setCategory] = React.useState("popular");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  React.useEffect(() => {
    setPage(1);
  }, [category]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&page=${page}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des films");
      }

      const { results, total_pages } = await response.json();
      setMovies(results);
      setTotalPages(total_pages);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchMovies();
  }, [category, page, apiKey]);

  const filteredMovies = movies.filter(movie => {
    return movie.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleWishlistToggle = movie => {
    const isAlreadyInWishlist = wishlist.some(m => m.id === movie.id);
    if (isAlreadyInWishlist) {
      removeFromWishlist(movie.id);
    } else {
      addToWishlist(movie);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <>
      <h1>
        Liste des films{" "}
        {category === "popular" ? "populaires" : category.replace("_", " ")}
      </h1>

      <div className="category-search-container">
        <div>
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

        <div>
          <label htmlFor="search-bar">Rechercher un film: </label>
          <input
            id="search-bar"
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="movie-popular-list-container">
        {filteredMovies.map(movie => (
          <div key={movie.id} className="movie-popular-container">
            <h2>{movie.title}</h2>
            <div className="movie-image-container">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <span
                className={`wishlist-icon ${
                  wishlist.some(m => m.id === movie.id) ? "added" : ""
                }`}
                onClick={() => handleWishlistToggle(movie)}
              >
                ★
              </span>
            </div>
            <div className="movie-info">
              <div className="movie-info-note">
                {movie.vote_average.toFixed(2)} / 10
              </div>
              <Link to={`/movie/${movie.id}`} className="details-button">
                Voir les détails
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination-container">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="pagination-button"
        >
          Précédent
        </button>
        <span>{`Page ${page} sur ${totalPages}`}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="pagination-button"
        >
          Suivant
        </button>
      </div>
    </>
  );
};

export default MovieList;
