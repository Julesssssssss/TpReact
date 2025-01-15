import { Link } from "react-router";
import { useWishlist } from "../context/WishlistContext";
import styles from "./navbar.module.css";

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
            Wishlist <span className={styles.navbar}>({wishlist.length})</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
