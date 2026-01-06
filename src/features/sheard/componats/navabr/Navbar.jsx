import "./Navbar.css";
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/public/imges/logo.png" alt="IDEA" />
        </Link>

        <div className="navbar-links">
          <div className="navbar-balance">
            <span className="balance-text">0.000$</span>
          </div>

          <button className="navbar-profile" onClick={handleProfileClick}>
            <img
              src="/public/imges/user.png"
              alt="Profile"
              className="profile-icon"
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
