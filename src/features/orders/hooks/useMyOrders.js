import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { fetchMyOrders } from "../api/ordersApi";

export const useMyOrders = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ["myOrders", page],
    queryFn: () => fetchMyOrders(page),
    keepPreviousData: true,
  });

  const orders = apiResponse?.data?.data || [];
  const meta = apiResponse?.data?.meta;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (meta?.last_page || 1)) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navigateToGames = () => navigate("/games");

  const navigateToOrderDetails = (orderId) => navigate(`/my-orders/${orderId}`);

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

  return {
    page,
    isLoading,
    orders,
    meta,
    handlePageChange,
    navigateToGames,
    navigateToOrderDetails,
    getStatusColor,
  };
};
