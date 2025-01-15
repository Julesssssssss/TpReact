import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="wishlist-container">
      <h1>Ma Wishlist</h1>
      <p>
        Vous avez {wishlist.length} film{wishlist.length !== 1 && "s"} dans
        votre wishlist
      </p>

      <div className="wishlist-items">
        {wishlist.length === 0 ? (
          <p>Aucun film dans la wishlist</p>
        ) : (
          wishlist.map(movie => (
            <div key={movie.id} className="wishlist-item">
              <div className="wishlist-item-info">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="wishlist-item-image"
                />
                <div>
                  <h2>{movie.title}</h2>
                  <p>{movie.release_date}</p>
                  <p>Note : {movie.vote_average.toFixed(2)} / 10</p>
                  <Link to={`/movie/${movie.id}`} className="details-button">
                    Voir les détails
                  </Link>
                </div>
              </div>
              <button
                onClick={() => removeFromWishlist(movie.id)}
                className="remove-button"
              >
                Supprimer
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;
