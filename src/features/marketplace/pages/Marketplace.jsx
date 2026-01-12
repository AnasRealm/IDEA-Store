import { useMarketplace } from "../hooks/useMarketplace";
import "./Marketplace.css";
import { navigate } from "react-router-dom";
const Marketplace = () => {
const {
    page,
    listings,
    meta,
    isLoading,
    handlePageChange,
    handleBuyClick
  } = useMarketplace();

  if (isLoading)
    return <div className="loading-screen">Loading Marketplace...</div>;

  return (
    <div className="marketplace-page">
      <div className="marketplace-container">
        <div className="page-header">
          <div>
            <h2 className="page-title">Marketplace</h2>
            <p className="page-subtitle">
              Buy accounts and items from other players
            </p>
          </div>
          <button
            className="add-listing-btn"
            onClick={() => navigate("/my-listings")}
          >
            Sell Your Item
          </button>
        </div>

        {listings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🛒</div>
            <h3>Marketplace is empty</h3>
            <p>Be the first to list an item!</p>
          </div>
        ) : (
          <>
            <div className="listings-grid">
              {listings.map((item) => (
                <div key={item.id} className="listing-card">
                  <div className="listing-image">
                    <img
                      src={
                        item.images && item.images.length > 0
                          ? item.images[0].url
                          : "/imges/games.png"
                      }
                      alt={item.title}
                      onError={(e) => (e.target.src = "/imges/games.png")}
                    />
                    <span className="price-tag">${item.price}</span>
                  </div>

                  <div className="listing-content">
                    <h3 className="listing-title">{item.title}</h3>
                    <div
                      className="seller-info"
                      style={{
                        fontSize: "0.85rem",
                        color: "#00b894",
                        marginBottom: "5px",
                      }}
                    >
                      👤 Seller: {item.user?.name || "Unknown"}
                    </div>
                    <p className="listing-desc">{item.description}</p>

                    <div className="listing-footer">
                      <span className="listing-date">
                        📅 {new Date(item.created_at).toLocaleDateString()}
                      </span>

                      <button
                        className="buy-now-btn"
                        onClick={() => handleBuyClick(item)}
                      >
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {meta && meta.last_page > 1 && (
              <div className="pagination">
                <button
                  disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                >
                  Previous
                </button>
                <span>
                  Page {page} of {meta.last_page}
                </span>
                <button
                  disabled={page === meta.last_page}
                  onClick={() => handlePageChange(page + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
