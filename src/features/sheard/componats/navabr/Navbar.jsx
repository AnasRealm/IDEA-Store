import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useNavbar } from "../../hooks/useNavbar";

const Navbar = () => {
  const {
    isLoggedIn,
    userData,
    isMenuOpen,
    toggleMenu,
    handleProfileClick,
    handleProtectedNavigation,
  } = useNavbar();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/imges/logo.png" alt="IDEA" />
        </Link>

        <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          {isLoggedIn && (
            <Link
              to="/my-orders"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "500",
                marginRight: "10px",
                fontSize: "15px",
                transition: "color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.color = "#00b894")}
              onMouseOut={(e) => (e.target.style.color = "white")}
              onClick={toggleMenu}
            >
              My Orders
            </Link>
          )}

          <span
            onClick={() => handleProtectedNavigation("/my-listings")}
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "500",
              marginRight: "15px",
              fontSize: "15px",
              transition: "color 0.3s",
              cursor: "pointer",
            }}
            onMouseOver={(e) => (e.target.style.color = "#FFDD15")}
            onMouseOut={(e) => (e.target.style.color = "white")}
          >
            My Listings
          </span>

          <span
            onClick={() => handleProtectedNavigation("/my-purchases")}
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "500",
              marginRight: "15px",
              fontSize: "15px",
              transition: "color 0.3s",
              cursor: "pointer",
            }}
            onMouseOver={(e) => (e.target.style.color = "#FFDD15")}
            onMouseOut={(e) => (e.target.style.color = "white")}
          >
            My Purchases
          </span>

          <span
            onClick={() => handleProtectedNavigation("/dashboard")}
            style={{
              color: "white",
              marginRight: "15px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Dashboard
          </span>

          <span
            onClick={() => handleProtectedNavigation("/wallet")}
            className="navbar-balance"
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            <span className="balance-text">0.000$</span>
          </span>

          <button className="navbar-profile" onClick={handleProfileClick}>
            {isLoggedIn && userData?.avatar ? (
              <img
                src={userData.avatar}
                alt="Profile"
                className="profile-icon"
              />
            ) : (
              <img
                src="/imges/user.png"
                alt="Profile"
                className="profile-icon"
              />
            )}
          </button>
        </div>

        <button
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
