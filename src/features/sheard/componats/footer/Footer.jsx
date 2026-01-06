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
              <img src="/public/imges/logo.png" alt="" />
            </Link>
            <p className="footer-description">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <p className="footer-email">@Lorem</p>
          </div>

          <div className="footer-section">
            <h4>About us</h4>
            <ul>
              <li>
                <Link to="#zeux">Zeux</Link>
              </li>
              <li>
                <Link to="#portfolio">Portfolio</Link>
              </li>
              <li>
                <Link to="#careers">Careers</Link>
              </li>
              <li>
                <Link to="#contact">Contact us</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact us</h4>
            <p className="footer-contact-text">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <p className="footer-phone">+963930105556</p>
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
          <p>Copyright © 2022 prodesigner All rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
