import "./Navbar.css";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleProfileClick = () => {
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/imges/logo.png" alt="IDEA" />
        </Link>

        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <div className="navbar-balance">
            <span className="balance-text">0.000$</span>
          </div>

          <button className="navbar-profile" onClick={handleProfileClick}>
            <img src="/imges/user.png" alt="Profile" className="profile-icon" />
          </button>
        </div>

        <button className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
