import { useMyListings } from "../hooks/useMyListings";
import "./MyListings.css";

const MyListings = () => {
  const {
    page,
    isModalOpen,
    setIsModalOpen,
    formData,
    isLoading,
    listings,
    meta,
    createMutation,
    deleteMutation,
    handlePageChange,
    handleInputChange,
    handleFileChange,
    handleDeleteClick,
    handleSubmit,
    getStatusStyle,
  } = useMyListings();

  if (isLoading)
    return <div className="loading-screen">Loading Listings...</div>;
  return (
    <div className="marketplace-page">
      <div className="marketplace-container">
        <div className="page-header">
          <div>
            <h2 className="page-title">My Market Listings</h2>
            <p className="page-subtitle">
              Manage your accounts and items for sale
            </p>
          </div>
          <button
            className="add-listing-btn"
            onClick={() => setIsModalOpen(true)}
          >
            + Add New Listing
          </button>
        </div>

        {listings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🏪</div>
            <h3>No listings yet</h3>
            <p>Start selling your game accounts today!</p>
            <button className="browse-btn">Create Your First Listing</button>
          </div>
        ) : (
          <>
            <div className="listings-grid">
              {listings.map((item) => {
                const statusStyle = getStatusStyle(item.status);
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
                        {item.status_label || statusStyle.label}
                      </span>
                    </div>

                    <div className="listing-content">
                      <h3 className="listing-title">{item.title}</h3>
                      <p className="listing-desc">{item.description}</p>

                      <div className="listing-footer">
                        <span className="listing-date">
                          📅 {new Date(item.created_at).toLocaleDateString()}
                        </span>
                        <div className="listing-actions">
                          <button
                            className="icon-btn delete"
                            title="Delete"
                            onClick={() => handleDeleteClick(item.id)}
                            disabled={deleteMutation.isPending}
                            style={{
                              opacity: deleteMutation.isPending ? 0.5 : 1,
                            }}
                          >
                            🗑️
                          </button>
                        </div>
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
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Sell an Item</h3>
            <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "20px" }}>
              Fill in the details. Admin approval required.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="E.g. PUBG Account Lvl 75"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Price ($)</label>
                <input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  required
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  rows="4"
                  placeholder="Describe items, skins, levels..."
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                  className="modal-textarea"
                ></textarea>
              </div>

              <div className="form-group">
                <label>Contact Info (Hidden from public)</label>
                <input
                  type="text"
                  name="contact_info"
                  placeholder="Telegram user, WhatsApp..."
                  required
                  value={formData.contact_info}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Images (Select multiple)</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  style={{ paddingTop: "10px" }}
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="confirm-btn"
                  disabled={createMutation.isPending}
                >
                  {createMutation.isPending
                    ? "Publishing..."
                    : "Publish Listing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
