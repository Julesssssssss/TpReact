import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useApi } from "../context/ApiContext";
import { useWishlist } from "../context/WishlistContext";

const MovieDetail = () => {
  const { apiKey } = useApi();
  const { id } = useParams();
  const { wishlist, addToWishlist } = useWishlist();
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]); // État pour les acteurs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`,
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des détails du film");
        }
        const data = await response.json();
        setMovie(data);

        // Récupérer les informations des acteurs
        const creditsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`,
        );
        if (!creditsResponse.ok) {
          throw new Error("Erreur lors de la récupération des acteurs");
        }
        const creditsData = await creditsResponse.json();
        setActors(creditsData.cast.slice(0, 5)); // Récupérer les 5 premiers acteurs
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id, apiKey]);

  const handleAddToWishlist = () => {
    addToWishlist(movie);
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;

  const isInWishlist = wishlist.some(m => m.id === movie.id);

  return (
    <div className="movie-detail-container">
      <div className="movie-card">
        <div className="movie-infos">
          <div className="movie-card-text">
            <h1>{movie.title}</h1>
            <p className="overview">{movie.overview}</p>
            <p>
              <strong>Date de sortie:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Note:</strong> {movie.vote_average.toFixed(2)} / 10
            </p>
            <div className="movie-actors">
              <p>
                <strong>Acteurs principaux :</strong>
              </p>
              <div className="actors-list">
                {actors.map(actor => (
                  <div key={actor.id} className="actor-item">
                    <img
                      width="100px"
                      height="150px"
                      src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                      alt={actor.name}
                      className="actor-image"
                    />
                    <p>{actor.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="wishlist-button-container">
            <button
              className={`wishlist-button ${isInWishlist ? "added" : ""}`}
              onClick={handleAddToWishlist}
              disabled={isInWishlist}
            >
              {isInWishlist
                ? "Film déjà dans la wishlist"
                : "Ajouter à la wishlist"}
            </button>
          </div>
        </div>
        <div className="movie-card-image">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
