import "./MyOrders.css";
import { useMyOrders } from "../hooks/useMyOrders";

const MyOrders = () => {
  const {
    page,
    isLoading,
    orders,
    meta,
    handlePageChange,
    navigateToGames,
    navigateToOrderDetails,
    getStatusColor,
  } = useMyOrders();

  if (isLoading) return <div className="loading-screen">Loading Orders...</div>;

  return (
    <div className="my-orders-page">
      <div className="orders-container">
        <h2 className="page-title">My Orders</h2>

        {orders.length === 0 ? (
          <div className="empty-state">
            <img
              src="/imges/shopping-bag.png"
              alt="No Orders"
              className="empty-icon"
              onError={(e) => (e.target.style.display = "none")}
            />
            <h3>No orders found</h3>
            <p>You haven't placed any orders yet.</p>
            <button className="browse-btn" onClick={navigateToGames}>
              Browse Games
            </button>
          </div>
        ) : (
          <>
            <div className="orders-list">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="order-card"
                  onClick={() => navigateToOrderDetails(order.id)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="order-header">
                    <span className="order-id">Order #{order.id}</span>
                    <span className="order-date">
                      {order.created_at
                        ? new Date(order.created_at).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>

                  <div className="order-body">
                    <div className="order-info">
                      <h4>{order.service_name || "Service Purchase"}</h4>
                      <p className="order-desc">
                        Total:{" "}
                        <span className="price">
                          ${order.total_price || order.amount || 0}
                        </span>
                      </p>
                    </div>

                    <div
                      className="order-status"
                      style={{
                        color: getStatusColor(order.status),
                        borderColor: getStatusColor(order.status),
                        background: `${getStatusColor(order.status)}15`,
                      }}
                    >
                      {order.status || "Processing"}
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

export default MyOrders;
