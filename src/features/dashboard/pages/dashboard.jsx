import { useDashboard } from "../hooks/useDashboard";
import "./Dashboard.css";

const Dashboard = () => {
  const {
    isLoading,
    dashboardData,
    user_summary,
    orders_status,
    wallet_statistics,
    recent_purchases,
    quick_stats,
    navigateToGames,
    navigateToWallet,
    navigateToAllOrders,
    navigateToOrderDetails,
  } =useDashboard();

  if (isLoading)
    return <div className="loading-dashboard">Loading Dashboard...</div>;
if (!dashboardData)
    return <div className="error-dashboard">Failed to load data.</div>;
  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1>Hello, {user_summary.name} 👋</h1>
            <p className="subtitle">
              Here is what's happening with your account today.
            </p>
          </div>
          <button className="browse-btn" onClick={navigateToGames}>
            New Order +
          </button>
        </div>

        {/* Top Stats Cards */}
        <div className="stats-grid-top">
          <div className="stat-card primary">
            <div className="icon">💰</div>
            <div className="info">
              <span className="label">Total Spent</span>
              <span className="value">{quick_stats.total_spent_formatted}</span>
            </div>
          </div>
          <div className="stat-card secondary">
            <div className="icon">📦</div>
            <div className="info">
              <span className="label">Total Orders</span>
              <span className="value">
                {quick_stats.total_orders_formatted}
              </span>
            </div>
          </div>
          <div className="stat-card accent">
            <div className="icon">💳</div>
            <div className="info">
              <span className="label">Avg. Order Value</span>
              <span className="value">${user_summary.avg_order_value}</span>
            </div>
          </div>
        </div>

        <div className="dashboard-sections">
          {/* Wallet Section */}
          <div className="section-card wallet-section">
            <div className="section-header">
              <h3>Wallet Summary</h3>
              <button onClick={navigateToWallet}>View Wallet →</button>
            </div>
            <div className="wallet-details">
              <div className="wallet-row">
                <span>Available Balance</span>
                <span className="amount success">
                  {quick_stats.available_balance_formatted}
                </span>
              </div>
              <div className="wallet-row">
                <span>Frozen (Pending)</span>
                <span className="amount warning">
                  ${wallet_statistics.frozen_balance}
                </span>
              </div>
              <div className="wallet-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${
                        100 - wallet_statistics.total_frozen_percentage
                      }%`,
                    }}
                  ></div>
                </div>
                <span className="progress-text">
                  {wallet_statistics.total_frozen_percentage}% Frozen
                </span>
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <div className="section-card orders-section">
            <div className="section-header">
              <h3>Orders Status</h3>
              <button onClick={navigateToAllOrders}>View All →</button>
            </div>
            <div className="orders-grid">
              <div className="order-stat-box completed">
                <span className="num">{orders_status.completed}</span>
                <span className="txt">Completed</span>
              </div>
              <div className="order-stat-box processing">
                <span className="num">{orders_status.processing}</span>
                <span className="txt">Processing</span>
              </div>
              <div className="order-stat-box pending">
                <span className="num">{orders_status.pending}</span>
                <span className="txt">Pending</span>
              </div>
              <div className="order-stat-box rejected">
                <span className="num">{orders_status.rejected}</span>
                <span className="txt">Rejected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Purchases */}
        <div className="recent-purchases-section">
          <h3>Recent Purchases</h3>
          <div className="recent-list">
            {recent_purchases.map((order) => (
              <div
                key={order.order_id}
                className="recent-item"
                onClick={() => navigateToOrderDetails(order.order_id)}
              >
                <div className="recent-icon">🛒</div>
                <div className="recent-info">
                  <h4>Order #{order.order_id}</h4>
                  <p>{order.date}</p>
                </div>
                <div className="recent-items-names">
                  {order.items
                    .map((i) => i.product_name)
                    .join(", ")
                    .substring(0, 50)}
                  ...
                </div>
                <div className="recent-status">
                  <span className={`badge ${order.status}`}>
                    {order.status_label}
                  </span>
                </div>
                <div className="recent-total">${order.total_amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;