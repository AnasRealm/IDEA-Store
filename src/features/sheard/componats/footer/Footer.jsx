import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <Link to="/" className="footer-logo">
              <img src="/imges/logo.png" alt="" />
            </Link>
            <p className="footer-description">
              Your trusted partner for instant digital top-ups, gaming cards, and online services. Fast, secure, and reliable.
            </p>
            <p className="footer-email">support@ideastore.com</p>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li>
                <Link to="/games">Gaming Cards</Link>
              </li>
              <li>
                <Link to="/digital-cards">Digital Cards</Link>
              </li>
              <li>
                <Link to="/subscriptions">Subscriptions</Link>
              </li>
              <li>
                <Link to="/support">Customer Support</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <p className="footer-contact-text">
              24/7 customer support via WhatsApp. Get instant help with your orders and account.
            </p>
            <p className="footer-phone">+963 930 105 556</p>
          </div>

          <div className="footer-section social-section">
            <div className="social-icons">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/imges/facebook.png" alt="Facebook" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/imges/instgram.png" alt="Instagram" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/imges/tiwtier.png" alt="Twitter" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/imges/linkedin.png" alt="LinkedIn" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Copyright © 2024 IDEA Store. All rights reserved. | Instant Digital Solutions</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
