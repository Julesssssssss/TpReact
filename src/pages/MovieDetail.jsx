import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useApi } from "../context/ApiContext";

const MovieDetail = () => {
  const { apiKey } = useApi();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
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
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id, apiKey]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <div className="movie-detail-container">
      <div className="movie-card">
        <div className="movie-card-text">
          <h1>{movie.title}</h1>
          <p className="overview">{movie.overview}</p>
          <p>
            <strong>Date de sortie:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Note:</strong> {movie.vote_average.toFixed(2)} / 10
          </p>
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
