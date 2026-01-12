import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchUserStatistics } from "../api/profileApi";

export const useUserStatistics = () => {
  const navigate = useNavigate();

  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ["userStatisticsPage"],
    queryFn: fetchUserStatistics,
  });

  const data = apiResponse?.data;

  const summary = data?.["ملخص المستخدم"] || {};
  const orderStatus = data?.["حالات الطلبات"] || {};
  const history = data?.["سجل الشراء"] || [];

  const handleBack = () => {
    navigate("/profile");
  };

  const navigateToOrderDetails = (orderId) => {
    navigate(`/my-orders/${orderId}`);
  };

  return {
    isLoading,
    data,
    summary,
    orderStatus,
    history,
    handleBack,
    navigateToOrderDetails,
  };
};
