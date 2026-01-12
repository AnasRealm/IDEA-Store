import { useWallet } from "./hooks/usewallet";
import "./Wallet.css";

const Wallet = () => {
  const {
    page,
    activeTab,
    setActiveTab,
    isTransferOpen,
    setIsTransferOpen,
    isDepositOpen,
    setIsDepositOpen,
    selectedGatewayId,
    transferForm,
    setTransferForm,
    depositForm,
    setDepositForm,
    balanceInfo,
    stats,
    isStatsLoading,
    listItems,
    meta,
    isListLoading,
    gateways,
    accounts,
    isAccountsLoading,
    historyList,
    historyTitle,
    isHistoryLoading,
    transferMutation,
    depositMutation,
    handlePageChange,
    handleTransferSubmit,
    handleDepositFileChange,
    handleDepositSubmit,
    handleGatewayChange,
    getAmountStyle,
    getStatusColor,
    selectedAccountId,
  } = useWallet();

  return (
    <div className="wallet-page">
      <div className="wallet-container">
        <div className="balance-card">
          <div className="balance-header">
            <h3>Available Balance</h3>
            <div className="balance-amount">
              ${balanceInfo.available_balance}
            </div>
          </div>
          <div className="balance-stats">
            <div className="stat-item">
              <span className="stat-label">Total Balance</span>
              <span className="stat-value">${balanceInfo.total_balance}</span>
            </div>
            <div className="stat-item frozen">
              <span className="stat-label">Frozen (Pending)</span>
              <span className="stat-value">${balanceInfo.frozen_balance}</span>
            </div>
          </div>
          <div className="wallet-actions">
            <button
              className="deposit-btn"
              onClick={() => setIsDepositOpen(true)}
            >
              Add Funds +
            </button>
            <button
              className="transfer-btn"
              onClick={() => setIsTransferOpen(true)}
            >
              Transfer ⇄
            </button>
          </div>
        </div>

        {!isStatsLoading && (
          <div className="stats-section">
            <h3 className="section-title">Financial Overview</h3>
            <div className="stats-grid">
              <div className="stat-box deposit">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <span className="stat-title">Total Deposits</span>
                  <span className="stat-number">${stats.total_deposits}</span>
                </div>
              </div>
              <div className="stat-box purchase">
                <div className="stat-icon">🛒</div>
                <div className="stat-info">
                  <span className="stat-title">Total Purchases</span>
                  <span className="stat-number">${stats.total_purchases}</span>
                </div>
              </div>
            </div>
            <h4 className="subsection-title">Orders Summary</h4>
            <div className="orders-stats-bar">
              <div className="order-stat">
                <span className="dot completed"></span>
                <span className="label">Completed</span>
                <span className="count">{stats.orders.completed}</span>
              </div>
              <div className="order-stat">
                <span className="dot pending"></span>
                <span className="label">Pending</span>
                <span className="count">{stats.orders.pending}</span>
              </div>
              <div className="order-stat">
                <span className="dot processing"></span>
                <span className="label">Processing</span>
                <span className="count">{stats.orders.processing}</span>
              </div>
              <div className="order-stat">
                <span className="dot rejected"></span>
                <span className="label">Rejected</span>
                <span className="count">{stats.orders.rejected}</span>
              </div>
            </div>
          </div>
        )}

        <div className="list-header">
          <h3
            className="section-title"
            style={{ margin: 0, border: "none", padding: 0 }}
          >
            History
          </h3>
          <div className="wallet-tabs">
            <button
              className={`tab-btn ${
                activeTab === "transactions" ? "active" : ""
              }`}
              onClick={() => setActiveTab("transactions")}
            >
              Transactions
            </button>
            <button
              className={`tab-btn ${activeTab === "deposits" ? "active" : ""}`}
              onClick={() => setActiveTab("deposits")}
            >
              Deposits
            </button>
          </div>
        </div>

        {isListLoading ? (
          <div className="loading-wallet">Loading...</div>
        ) : listItems.length === 0 ? (
          <div className="empty-wallet">No records found.</div>
        ) : (
          <>
            <div className="transactions-list">
              {listItems.map((item) => (
                <div key={item.id} className="transaction-item">
                  <div className="trans-icon">
                    {activeTab === "deposits"
                      ? "📥"
                      : item.amount > 0
                      ? "↓"
                      : "↑"}
                  </div>
                  <div className="trans-details">
                    <div className="trans-type">
                      {activeTab === "deposits"
                        ? `Deposit #${item.id}`
                        : item.type_label || item.type}
                    </div>
                    <div className="trans-desc">
                      {activeTab === "deposits" ? (
                        <span
                          className={`status-badge ${item.status?.toLowerCase()}`}
                        >
                          {item.status || "Pending"}
                        </span>
                      ) : (
                        item.description
                      )}
                    </div>
                    <div className="trans-date">
                      {new Date(item.created_at).toLocaleString()}
                    </div>
                  </div>
                  <div
                    className="trans-amount"
                    style={getAmountStyle(item.amount)}
                  >
                    {activeTab === "deposits"
                      ? "+"
                      : item.amount > 0
                      ? "+"
                      : ""}
                    {item.amount}$
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

      {isTransferOpen && (
        <div className="modal-overlay" onClick={() => setIsTransferOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Transfer Money</h3>
            <p className="modal-subtitle">
              Send money instantly to another user.
            </p>
            <form onSubmit={handleTransferSubmit}>
              <div className="form-group">
                <label>Recipient Email</label>
                <input
                  type="email"
                  required
                  value={transferForm.email}
                  onChange={(e) =>
                    setTransferForm({ ...transferForm, email: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Amount ($)</label>
                <input
                  type="number"
                  required
                  value={transferForm.amount}
                  onChange={(e) =>
                    setTransferForm({ ...transferForm, amount: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  value={transferForm.description}
                  onChange={(e) =>
                    setTransferForm({
                      ...transferForm,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsTransferOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="confirm-btn"
                  disabled={transferMutation.isPending}
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDepositOpen && (
        <div className="modal-overlay" onClick={() => setIsDepositOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Deposit Funds</h3>
            <p className="modal-subtitle">
              Follow the steps to recharge your wallet.
            </p>

            <form onSubmit={handleDepositSubmit}>
              <div className="form-group">
                <label>1. Select Payment Method</label>
                <select
                  required
                  value={selectedGatewayId}
                  onChange={handleGatewayChange}
                  className="modal-select"
                >
                  <option value="">Select Gateway</option>
                  {gateways.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedGatewayId && (
                <div className="form-group">
                  <label>2. Transfer To Account</label>
                  {isAccountsLoading ? (
                    <div style={{ color: "rgba(255,255,255,0.5)" }}>
                      Loading accounts...
                    </div>
                  ) : accounts.length > 0 ? (
                    <>
                      <select
                        required
                        value={depositForm.gateway_account_id}
                        onChange={(e) =>
                          setDepositForm({
                            ...depositForm,
                            gateway_account_id: e.target.value,
                          })
                        }
                        className="modal-select"
                        style={{ marginBottom: "10px" }}
                      >
                        <option value="">Select Account</option>
                        {accounts.map((acc) => (
                          <option key={acc.id} value={acc.id}>
                            {acc.account_holder} - {acc.account_info}
                          </option>
                        ))}
                      </select>
                      {depositForm.gateway_account_id && (
                        <div className="account-details-box">
                          {(() => {
                            const selectedAcc = accounts.find(
                              (a) =>
                                a.id.toString() ===
                                depositForm.gateway_account_id
                            );
                            return selectedAcc ? (
                              <>
                                <div>
                                  <strong>Number:</strong>{" "}
                                  {selectedAcc.account_info}
                                </div>
                                <div>
                                  <strong>Holder:</strong>{" "}
                                  {selectedAcc.account_holder}
                                </div>
                                <div
                                  style={{
                                    fontSize: "0.8rem",
                                    color: "#f1c40f",
                                    marginTop: "5px",
                                  }}
                                >
                                  Min Deposit: ${selectedAcc.min_deposit_amount}
                                </div>
                              </>
                            ) : null;
                          })()}
                        </div>
                      )}
                    </>
                  ) : (
                    <div style={{ color: "#e74c3c" }}>
                      No accounts available.
                    </div>
                  )}
                </div>
              )}

              <div className="form-group">
                <label>3. Amount Sent ($)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  required
                  value={depositForm.amount}
                  onChange={(e) =>
                    setDepositForm({ ...depositForm, amount: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>4. Upload Proof (Receipt)</label>
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={handleDepositFileChange}
                  style={{ paddingTop: "10px" }}
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsDepositOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="confirm-btn"
                  disabled={
                    depositMutation.isPending || !depositForm.gateway_account_id
                  }
                >
                  {depositMutation.isPending
                    ? "Uploading..."
                    : "Submit Deposit"}
                </button>
              </div>
            </form>

            {(selectedGatewayId || selectedAccountId) && (
              <div className="mini-history-section">
                <div className="mini-history-title">{historyTitle}</div>
                {isHistoryLoading ? (
                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "0.8rem",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    Loading history...
                  </div>
                ) : historyList.length === 0 ? (
                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "0.8rem",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    No recent deposits found.
                  </div>
                ) : (
                  <div className="mini-history-list">
                    {historyList.slice(0, 3).map((item) => (
                      <div key={item.id} className="mini-history-item">
                        <span className="mini-date">
                          {new Date(item.created_at).toLocaleDateString()}
                        </span>
                        <span className="mini-amount">${item.amount}</span>
                        <span
                          className="mini-status"
                          style={{ color: getStatusColor(item.status) }}
                        >
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
