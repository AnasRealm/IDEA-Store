import { useGames } from "../hooks/useGames";
import "./Games.css";

const Games = () => {
  const {
    page,
    searchTerm,
    setSearchTerm,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    submittedSearch,
    selectedGameId,
    showLoginPrompt,
    setShowLoginPrompt,
    formData,
    isListLoading,
    isPlaceholderData,
    filteredGames,
    meta,
    productDetails,
    orderMutation,
    handleGameClick,
    closePopup,
    handleInputChange,
    handleLoginRedirect,
    handleSuggestionClick,
    handleKeyDown,
    handlePrevPage,
    handleNextPage,
    handleBuyClick,
    getProductInputs,
  } = useGames();

  const renderField = (index, fieldConfig) => {
    return (
      <div className="popup__section" key={index}>
        <label>
          {fieldConfig.name || fieldConfig.label}{" "}
          {fieldConfig.required && <span style={{ color: "red" }}>*</span>}
        </label>
        <input
          type={
            fieldConfig.type === "number"
              ? "number"
              : fieldConfig.type === "password"
              ? "password"
              : "text"
          }
          className="popup__input"
          placeholder={fieldConfig.placeholder || `Enter ${fieldConfig.name}`}
          value={formData[fieldConfig.data_name] || ""}
          onChange={(e) =>
            handleInputChange(fieldConfig.data_name, e.target.value)
          }
        />
      </div>
    );
  };

  return (
    <div className="games-page">
      <div className="games-search">
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="search-input"
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            onFocus={() => searchTerm.length > 1 && setShowSuggestions(true)}
          />

          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="suggestion-item"
                  onMouseDown={() => handleSuggestionClick(suggestion.id)}
                >
                  <div className="suggestion-icon">🎮</div>
                  <div className="suggestion-text">{suggestion.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <section className="all-games-section">
        <h2 className="section-title">
          {submittedSearch
            ? `Results for "${submittedSearch}"`
            : "All Services"}
        </h2>

        {isListLoading && !isPlaceholderData ? (
          <div style={{ textAlign: "center", color: "white", padding: "50px" }}>
            Loading...
          </div>
        ) : (
          <>
            <div className="games-grid">
              {filteredGames.length > 0 ? (
                filteredGames.map((game) => (
                  <div
                    key={game.id}
                    className="game-card"
                    onClick={() => handleGameClick(game.id)}
                  >
                    <div className="game-card__image">
                      <img src="/imges/games.png" alt={game.name} />
                    </div>
                    <div className="game-card__info">
                      <h3 className="game-card__title">{game.name}</h3>
                      <p className="game-card__developer">
                        {game.category?.name || "Service"}
                      </p>
                      <span className="game-card__price">
                        $
                        {game.display_price || game.selling_price || game.price}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    gridColumn: "1/-1",
                    textAlign: "center",
                    color: "white",
                    padding: "40px",
                  }}
                >
                  <h3>No games found matching your search.</h3>
                </div>
              )}
            </div>

            {meta && meta.last_page > 1 && (
              <div
                className="pagination-controls"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                  marginTop: "40px",
                  color: "white",
                }}
              >
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className="login-btn"
                  style={{ opacity: page === 1 ? 0.5 : 1 }}
                >
                  Previous
                </button>
                <span style={{ alignSelf: "center" }}>
                  Page {meta.current_page} of {meta.last_page}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={page === meta.last_page}
                  className="login-btn"
                  style={{ opacity: page === meta.last_page ? 0.5 : 1 }}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {selectedGameId && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            {!productDetails ? (
              <div
                style={{ padding: "40px", color: "white", textAlign: "center" }}
              >
                Loading...
              </div>
            ) : (
              <>
                <div className="popup__image" style={{ height: "150px" }}>
                  <img
                    src="/imges/games.png"
                    alt="Service"
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
                <div className="popup__content">
                  <h3
                    className="popup__title"
                    style={{ fontSize: "20px", marginBottom: "20px" }}
                  >
                    {productDetails.name}
                  </h3>

                  <div className="dynamic-fields">
                    {getProductInputs(productDetails).map((field, index) =>
                      renderField(index, field)
                    )}
                  </div>

                  <div className="popup__total">
                    <span>Price</span>
                    <span className="popup__price">
                      $
                      {productDetails.display_price ||
                        productDetails.selling_price ||
                        productDetails.price}
                    </span>
                  </div>

                  <button
                    className="popup__buy-btn"
                    onClick={handleBuyClick}
                    disabled={orderMutation.isPending}
                    style={{
                      opacity: orderMutation.isPending ? 0.7 : 1,
                      cursor: orderMutation.isPending ? "wait" : "pointer",
                    }}
                  >
                    {orderMutation.isPending
                      ? "Processing Order..."
                      : "Buy Now"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {showLoginPrompt && (
        <div
          className="login-prompt-overlay"
          onClick={() => setShowLoginPrompt(false)}
        >
          <div className="login-prompt" onClick={(e) => e.stopPropagation()}>
            <h3>Please Login First</h3>
            <p>You need to be logged in to make a purchase</p>
            <div className="login-prompt-buttons">
              <button onClick={handleLoginRedirect} className="login-btn">
                Login
              </button>
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Games;