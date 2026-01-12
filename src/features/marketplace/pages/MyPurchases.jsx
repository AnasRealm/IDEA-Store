import { useMyPurchases } from "../hooks/useMyPurchases";
import "./MyListings.css";

const MyPurchases = () => {
 const {
    page,
    purchases,
    meta,
    isLoading,
    cancelMutation,
    handlePageChange,
    handleCancelClick,
    getStatusStyle,
  } = useMyPurchases();

  if (isLoading)
    return <div className="loading-screen">Loading Purchases...</div>;

  return (
    <div className="marketplace-page">
      <div className="marketplace-container">
        <div className="page-header">
          <div>
            <h2 className="page-title">My Purchases</h2>
            <p className="page-subtitle">
              History of accounts/items you bought
            </p>
          </div>
        </div>

        {purchases.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🛍️</div>
            <h3>No purchases yet</h3>
            <p>Explore the marketplace and find great deals!</p>
          </div>
        ) : (
          <>
            <div className="listings-grid">
              {purchases.map((item) => {
                const statusStyle = getStatusStyle(item.status);
                const canCancel =
                  item.status === "pending" ||
                  item.status === "pending_transfer";

                return (
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
                      <span
                        className="status-tag"
                        style={{
                          background: statusStyle.bg,
                          color: statusStyle.color,
                        }}
                      >
                        {item.status_label || item.status}
                      </span>
                    </div>

                    <div className="listing-content">
                      <h3 className="listing-title">{item.title}</h3>
                      {item.user && (
                        <div className="seller-info">
                          👤 Seller:{" "}
                          <span style={{ color: "white" }}>
                            {item.user.name}
                          </span>
                        </div>
                      )}
                      <p className="listing-desc">{item.description}</p>

                      <div className="listing-footer">
                        <span className="listing-date">
                          📅 {new Date(item.created_at).toLocaleDateString()}
                        </span>

                        {canCancel && (
                          <button
                            className="cancel-btn-small"
                            onClick={() => handleCancelClick(item)}
                            disabled={cancelMutation.isPending}
                            title="Cancel Order & Refund"
                          >
                            {cancelMutation.isPending ? "..." : "Cancel"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
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

export default MyPurchases;
