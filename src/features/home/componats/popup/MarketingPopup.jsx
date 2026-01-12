import { useMarketingPopup } from "../../hooks/useMarketingPopup";
import "./MarketingPopup.css";

const MarketingPopup = () => {
  const {
    popup,
    isLoading,
    isVisible,
    timeLeft,
    formatTime,
    handleClose,
    handleAction
  } = useMarketingPopup();

  if (isLoading || !popup || !isVisible) return null;

  return (
    <div className="marketing-popup-overlay" onClick={handleClose}>
      <div className="marketing-popup" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close-btn" onClick={handleClose}>
          ×
        </button>

        <div className="popup-image-side">
          <img
            src={popup.image || "/imges/games.png"}
            alt={popup.title}
            onError={(e) => (e.target.src = "/imges/games.png")}
          />
        </div>

        <div className="popup-content-side">
          <div className="popup-header">
            <span className="limited-badge">🔥 Limited Offer</span>
            {timeLeft > 0 && (
              <span className="popup-timer">
                Expires in: {formatTime(timeLeft)}
              </span>
            )}
          </div>

          <h2 className="popup-title">{popup.title}</h2>
          <p className="popup-desc">{popup.description}</p>

          <button className="popup-cta-btn" onClick={handleAction}>
            {popup.button_text || "Get Offer Now"} ➔
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketingPopup;
