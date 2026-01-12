import { usePromotions } from "../../hooks/usePromotions";
import "./Promotions.css";

const Promotions = () => {
  const {
    selectedPromoId,
    promoLoading,
    productsLoading,
    hasPromotions,
    itemsToShow,
    sectionTitle,
    isDetailLoading,
    promoDetail,
    isPromoActive,
    detailResponse,
    handleCardClick,
    closePopup,
    handleGoToProduct,
    formatDate,
    getDisplayPrice,
  } = usePromotions();

  if (promoLoading || (productsLoading && !hasPromotions)) return null;
  if (itemsToShow.length === 0) return null;

  return (
    <section className="promotions-section">
      <div className="promotions-container">
        <h2 className="section-title">{sectionTitle}</h2>

        <div className="promotions-grid">
          {itemsToShow.map((item) => (
            <div
              key={item.id}
              className={`promo-card ${hasPromotions ? "is-offer" : ""}`}
              onClick={() => handleCardClick(item)}
            >
              <div className="promo-image-wrapper">
                <img
                  src={item.image || "/imges/games.png"}
                  alt={item.title || item.name}
                  onError={(e) => (e.target.src = "/imges/games.png")}
                />
                {hasPromotions && <div className="promo-badge">Save Big</div>}
              </div>

              <div className="promo-content">
                <h3 className="promo-title">{item.title || item.name}</h3>
                <p className="promo-desc">
                  {hasPromotions
                    ? item.description
                    : item.category?.name || "Instant Delivery"}
                </p>

                <div className="promo-footer">
                  <div className="promo-price">{getDisplayPrice(item)}</div>

                  <button className="promo-btn">
                    {hasPromotions ? "View Deal" : "Buy Now"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPromoId && (
        <div className="promo-popup-overlay" onClick={closePopup}>
          <div className="promo-popup" onClick={(e) => e.stopPropagation()}>
            <button className="promo-close-btn" onClick={closePopup}>
              ×
            </button>

            {isDetailLoading ? (
              <div
                style={{ padding: "40px", textAlign: "center", color: "white" }}
              >
                Loading Offer...
              </div>
            ) : !isPromoActive || !promoDetail ? (
              <div
                style={{ padding: "40px", textAlign: "center", color: "white" }}
              >
                <h3>Offer Unavailable</h3>
                <p>
                  {detailResponse?.message ||
                    "This promotion is no longer active."}
                </p>
              </div>
            ) : (
              <>
                <div className="promo-popup-image">
                  <img
                    src={promoDetail.image || "/imges/games.png"}
                    alt={promoDetail.title}
                    onError={(e) => (e.target.src = "/imges/games.png")}
                  />
                  {promoDetail.discount_percent && (
                    <div className="discount-tag">
                      -{promoDetail.discount_percent}% OFF
                    </div>
                  )}
                </div>

                <div className="promo-popup-content">
                  <h2>{promoDetail.title}</h2>
                  <p className="promo-popup-desc">{promoDetail.description}</p>

                  <div className="promo-dates">
                    <div className="date-item">
                      <span>Starts:</span> {formatDate(promoDetail.starts_at)}
                    </div>
                    <div className="date-item">
                      <span>Ends:</span> {formatDate(promoDetail.ends_at)}
                    </div>
                  </div>

                  <div className="promo-action-area">
                    <div className="promo-final-price">
                      {promoDetail.product?.price > 0 && (
                        <>
                          <span className="original-price">
                            ${promoDetail.product.price}
                          </span>
                          <span className="arrow">➔</span>
                        </>
                      )}
                      <span className="deal-price">
                        {promoDetail.discount_amount
                          ? `Save $${promoDetail.discount_amount}`
                          : "Special Price"}
                      </span>
                    </div>
                    <button
                      className="promo-popup-btn"
                      onClick={handleGoToProduct}
                    >
                      Get It Now
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Promotions;
