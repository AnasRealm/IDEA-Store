import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchOrderDetails } from "../api/ordersApi";

export const useOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orderDetails", id],
    queryFn: () => fetchOrderDetails(id),
    enabled: !!id,
  });

  const order = apiResponse?.data;

  const handleBack = () => {
    navigate("/my-orders");
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "#2ecc71";
      case "pending":
        return "#f1c40f";
      case "cancelled":
        return "#e74c3c";
      default:
        return "#95a5a6";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  const formatInputLabel = (key) => {
    return key.replace(/game_|user_/g, "").replace(/_/g, " ");
  };

  return {
    order,
    isLoading,
    isError,
    handleBack,
    getStatusColor,
    formatDate,
    formatInputLabel,
  };
};
