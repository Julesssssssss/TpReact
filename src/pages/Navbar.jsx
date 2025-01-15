import { Link } from "react-router";
import { useWishlist } from "../context/WishlistContext";

const Navbar = () => {
  const { wishlist } = useWishlist();

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/wishlist">
            Wishlist <span className="wishlist-count">({wishlist.length})</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
