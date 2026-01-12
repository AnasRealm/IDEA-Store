import api from "../../../api/axios";

export const fetchMyOrders = async (page = 1) => {
  const response = await api.get(`/user/orders?page=${page}`);
  return response.data;
};

export const placeOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

export const fetchOrderDetails = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};
