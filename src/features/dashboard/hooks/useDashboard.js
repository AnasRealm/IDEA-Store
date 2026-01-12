import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchDashboardData } from "../api/dashboardApi";

export const useDashboard = () => {
  const navigate = useNavigate();

  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: fetchDashboardData,
  });

  const dashboardData = apiResponse?.data;

  const {
    user_summary = {},
    orders_status = {},
    wallet_statistics = {},
    recent_purchases = [],
    quick_stats = {},
  } = dashboardData || {};

  const navigateToGames = () => navigate("/games");
  const navigateToWallet = () => navigate("/wallet");
  const navigateToAllOrders = () => navigate("/my-orders");
  const navigateToOrderDetails = (orderId) => navigate(`/my-orders/${orderId}`);

  return {
    isLoading,
    isError,
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
  };
};
