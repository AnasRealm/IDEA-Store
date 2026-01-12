import "./OrderDetails.css";
import { useOrderDetails } from "../hooks/useOrderDetails";

const OrderDetails = () => {
  const {
    order,
    isLoading,
    isError,
    handleBack,
    getStatusColor,
    formatDate,
    formatInputLabel,
  } = useOrderDetails();

  if (isLoading)
    return <div className="loading-details">Loading Details...</div>;
  
  if (isError || !order)
    return <div className="error-details">Order not found</div>;

  return (
    <div className="order-details-page">
      <div className="details-container">
        <button className="back-btn" onClick={handleBack}>
          ← Back to Orders
        </button>

        <div className="details-header">
          <h2>Order #{order.id}</h2>
          <span
            className="status-badge"
            style={{
              color: getStatusColor(order.status),
              borderColor: getStatusColor(order.status),
              background: `${getStatusColor(order.status)}15`,
            }}
          >
            {order.status}
          </span>
        </div>

        <div className="summary-card">
          <div className="summary-row">
            <span>Date Placed</span>
            <span>{formatDate(order.created_at)}</span>
          </div>
          <div className="summary-row">
            <span>Total Price</span>
            <span className="total-price">${order.total_price}</span>
          </div>
        </div>

        <h3 className="section-title">Order Items</h3>
        <div className="items-list">
          {order.order_data?.map((item, index) => (
            <div key={index} className="item-card">
              <div className="item-header">
                <h4>{item.product_name}</h4>
                <span className="item-qty">Qty: {item.quantity}</span>
              </div>

              <div className="item-inputs">
                <h5>Provided Information:</h5>
                <div className="inputs-grid">
                  {Object.entries(item.inputs || {}).map(([key, value]) => (
                    <div key={key} className="input-group">
                      <label>{formatInputLabel(key)}</label>
                      <div className="input-value">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;