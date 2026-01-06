import './SectionGame.css';

const SectionGame = () => {
  return (
    <section className="section-game">
      <div className="SectionGame-container">
        <div className="game-content">
          <div className="game-image">
            <img src="/public/imges/image 54.png" alt="Game Character" />
          </div>
          <div className="game-text">
            <h2>UNLEASH YOUR <br /> POWER. CONTROL <br /> THE GAME.</h2>
            <p>
              Step into an immersive universe filled with action, strategy, 
              and endless challenges. Upgrade your skills, dominate your 
              enemies, and experience next-level gameplay crafted for 
              those who demand more from gaming.
            </p>
            <button className="explore-btn">EXPLORE GAME</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionGame;