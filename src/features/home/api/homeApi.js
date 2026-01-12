import api from "../../../api/axios";

export const fetchCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
};
export const fetchCategoryDetails = async (id) => {
  const response = await api.get(`/categories/${id}`);
  return response.data;
};
export const fetchPromotions = async () => {
  const response = await api.get("/promotions");
  return response.data;
};
export const fetchPromotionDetails = async (id) => {
  const response = await api.get(`/promotions/${id}`);
  return response.data;
};
export const fetchActivePopup = async () => {
  const response = await api.get("/popups/active");
  return response.data;
};
export const dismissPopup = async (id) => {
  const response = await api.post(`/popups/${id}/dismiss`);
  return response.data;
};
