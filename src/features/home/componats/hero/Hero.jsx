import Navbar from "../../../sheard/componats/navabr/Navbar";
import OurPurpose from "../ourPurpose/OurPurpose";
import { useNavigate } from 'react-router-dom';
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  const handleExploreGames = () => {
    navigate('/games');
  };
  return (
    <>
      <section className="hero">
        
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              SMART DIGITAL
              <br />
              TOP UPS,INSTANT
              <br />
              POWER
            </h1>
            <p className="hero-description">
              Recharge games and digital services instantly with competitive
              prices
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={handleExploreGames}>EXPLORE GAMES</button>
              <button className="btn-secondary">VIEW OFFERS</button>
            </div>
          </div>
          <div className="hero-image">
            <img src="/imges/hero.png" alt="Gaming Character" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
