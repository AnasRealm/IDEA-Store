import api from "../../../api/axios";

export const fetchProducts = async (page = 1) => {
  const response = await api.get(`/products?page=${page}`);

  return response.data;
};
export const fetchProductDetails = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
export const fetchProductsByCategory = async (categoryId, page = 1) => {
  const response = await api.get(
    `/categories/${categoryId}/products?page=${page}`
  );
  return response.data;
};
export const fetchProductSuggestions = async (query) => {
  const response = await api.get(`/products_suggestions?q=${query}`);
  return response.data;
};
export const fetchProductsSearch = async (query, page = 1) => {
  const response = await api.get(`/products_search?q=${query}&page=${page}`);
  return response.data;
};
