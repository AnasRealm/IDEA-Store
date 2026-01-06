import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import "./Games.css";

const Games = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const tradingGames = [
    {
      id: 1,
      title: "Crypto Trader Pro",
      developer: "TradingStudio",
      price: "$29.99",
      image: "/imges/about.png",
    },
    {
      id: 2,
      title: "Stock Market Simulator",
      developer: "FinanceGames",
      price: "$19.99",
      image: "/imges/tr1.png",
    },
    {
      id: 3,
      title: "Forex Master",
      developer: "CurrencyPro",
      price: "$39.99",
      image: "/imges/tr2.png",
    },
  ];

  const allGames = [
    ...tradingGames,
    {
      id: 4,
      title: "Adventure Quest",
      developer: "GameStudio",
      price: "$24.99",
      image: "/imges/tr3.png",
    },
    {
      id: 5,
      title: "Racing Championship",
      developer: "SpeedGames",
      price: "$34.99",
      image: "/imges/tr4.png",
    },
    {
      id: 6,
      title: "Strategy Empire",
      developer: "WarGames",
      price: "$44.99",
      image: "/imges/games.png",
    },
  ];

  const filteredGames = allGames.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGameClick = (game) => {
    setSelectedGame(game);
  };

  const handleBuyClick = () => {
    if (isLoggedIn) {
      navigate('/wallet');
    } else {
      setShowLoginPrompt(true);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
    setShowLoginPrompt(false);
  };

  return (
    <div className="games-page">
      <div className="games-search">
        <input
          type="text"
          placeholder="shearch games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <section className="trading-games-section">
        <h2 className="section-title">Trading Games</h2>
        <div className="games-grid">
          {tradingGames.map((game) => (
            <div 
              key={game.id} 
              className="game-card"
              onClick={() => handleGameClick(game)}
            >
              <div className="game-card__image">
                <img src={game.image} alt={game.title} />
              </div>
              <div className="game-card__info">
                <h3 className="game-card__title">{game.title}</h3>
                <p className="game-card__developer">{game.developer}</p>
                <span className="game-card__price">{game.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="all-games-section">
        <h2 className="section-title">All Games</h2>
        <div className="games-grid">
          {filteredGames.map((game) => (
            <div 
              key={game.id} 
              className="game-card"
              onClick={() => handleGameClick(game)}
            >
              <div className="game-card__image">
                <img src={game.image} alt={game.title} />
              </div>
              <div className="game-card__info">
                <h3 className="game-card__title">{game.title}</h3>
                <p className="game-card__developer">{game.developer}</p>
                <span className="game-card__price">{game.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedGame && (
        <div
          className="popup-overlay"
          onClick={() => setSelectedGame(null)}
        >
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup__image">
              <img src={selectedGame.image} alt={selectedGame.title} />
            </div>
            <div className="popup__content">
              <h2 className="popup__title">{selectedGame.title}</h2>
              <div className="popup__section">
                <label>Bundle</label>
                <select className="popup__select">
                  <option>1.00 Bang Bang</option>
                </select>
              </div>
              <div className="popup__section">
                <label>ID Player</label>
                <input
                  type="text"
                  className="popup__input"
                  placeholder="Enter your ID"
                />
              </div>
              <div className="popup__total">
                <span>Total Price</span>
                <span className="popup__price">{selectedGame.price}</span>
              </div>
              <button className="popup__buy-btn" onClick={handleBuyClick}>Buy</button>
            </div>
          </div>
        </div>
      )}
      {showLoginPrompt && (
        <div className="login-prompt-overlay" onClick={() => setShowLoginPrompt(false)}>
          <div className="login-prompt" onClick={(e) => e.stopPropagation()}>
            <h3>Please Login First</h3>
            <p>You need to be logged in to make a purchase</p>
            <div className="login-prompt-buttons">
              <button onClick={handleLoginRedirect} className="login-btn">Login</button>
              <button onClick={() => setShowLoginPrompt(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Games;