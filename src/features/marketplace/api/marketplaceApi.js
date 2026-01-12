import api from "../../../api/axios";

export const fetchMyListings = async (page = 1) => {
  const response = await api.get(`/user/marketplace/my-listings?page=${page}`);
  return response.data;
};

export const createListing = async (listingData) => {
  const response = await api.post("/user/marketplace", listingData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteListing = async (id) => {
  const response = await api.delete(`/user/marketplace/${id}`);
  return response.data;
};

export const fetchMyPurchases = async (page = 1) => {
  const response = await api.get(`/user/marketplace/my-purchases?page=${page}`);
  return response.data;
};
export const purchaseListing = async ({ id, buyer_phone }) => {
  const response = await api.post(`/user/marketplace/${id}/purchase`, {
    buyer_phone: buyer_phone,
  });
  return response.data;
};

export const fetchMarketplaceListings = async (page = 1) => {
  try {
    const response = await api.get(`/marketplace/listings?page=${page}`);
    return response.data;
  } catch {
    console.warn("Public marketplace API not found. Returning empty list.");
    return { data: [], meta: {} };
  }
};

export const cancelPurchase = async ({ id, buyer_phone }) => {
  const response = await api.post(`/user/marketplace/${id}/cancel-purchase`, {
    buyer_phone: buyer_phone,
  });
  return response.data;
};
