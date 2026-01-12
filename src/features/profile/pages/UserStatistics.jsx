import "./UserStatistics.css";
import { useUserStatistics } from "../hooks/useUserStatistics";

const UserStatistics = () => {
  const {
    isLoading,
    data,
    summary,
    orderStatus,
    history,
    handleBack,
    navigateToOrderDetails,
  } = useUserStatistics();

  if (isLoading)
    return <div className="loading-stats">Loading Statistics...</div>;
  
  if (!data) return <div className="error-stats">No data available</div>;

  return (
    <div className="stats-page">
      <div className="stats-container">
        {/* Header */}
        <div className="stats-header">
          <button className="back-btn" onClick={handleBack}>
            ← Back to Profile
          </button>
          <h2>My Activity & Stats</h2>
        </div>

        {/* User Info Card */}
        <div className="user-info-card">
          <div className="user-avatar-placeholder">
            {summary.name ? summary.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="user-details">
            <h3>{summary.name}</h3>
            <p className="email">{summary.email}</p>
            <div className="user-dates">
              <span className="badge">Member since: {summary["عضو منذ"]}</span>
              <span className="badge active">
                Last login: {summary.last_login}
              </span>
            </div>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="highlights-grid">
          <div className="highlight-card gold">
            <div className="h-icon">💎</div>
            <div className="h-content">
              <span className="h-label">Total Spent</span>
              <span className="h-value">${summary.total_spent}</span>
            </div>
          </div>
          <div className="highlight-card blue">
            <div className="h-icon">📦</div>
            <div className="h-content">
              <span className="h-label">Total Orders</span>
              <span className="h-value">{summary.total_orders}</span>
            </div>
          </div>
          <div className="highlight-card green">
            <div className="h-icon">📈</div>
            <div className="h-content">
              <span className="h-label">Avg. Order Value</span>
              <span className="h-value">
                ${summary["متوسط قيمة الطلب"]}
              </span>
            </div>
          </div>
        </div>

        {/* Orders Status Grid */}
        <h3 className="section-title">Orders Status</h3>
        <div className="status-grid">
          <div className="status-box completed">
            <span className="s-count">{orderStatus.completed}</span>
            <span className="s-label">Completed</span>
          </div>
          <div className="status-box processing">
            <span className="s-count">{orderStatus.processing}</span>
            <span className="s-label">Processing</span>
          </div>
          <div className="status-box pending">
            <span className="s-count">{orderStatus.pending}</span>
            <span className="s-label">Pending</span>
          </div>
          <div className="status-box cancelled">
            <span className="s-count">{orderStatus.cancelled}</span>
            <span className="s-label">Cancelled</span>
          </div>
        </div>

        {/* Recent Purchase History */}
        <h3 className="section-title">Recent Purchase History</h3>
        <div className="history-container">
          {history.length === 0 ? (
            <div className="empty-history">No purchases yet.</div>
          ) : (
            <div className="history-list">
              {history.map((order) => (
                <div
                  key={order.order_id}
                  className="history-item"
                  onClick={() => navigateToOrderDetails(order.order_id)}
                >
                  <div className="h-left">
                    <div className="h-id">Order #{order.order_id}</div>
                    <div className="h-date">{order.date}</div>
                  </div>

                  <div className="h-mid">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="h-product">
                        {item.product_name}{" "}
                        <span className="x-qty">x{item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="h-right">
                    <span className={`status-pill ${order.status}`}>
                      {order.status_label}
                    </span>
                    <span className="h-total">${order.total_amount}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserStatistics;