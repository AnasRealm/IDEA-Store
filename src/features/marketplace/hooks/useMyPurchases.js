import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchMyPurchases, cancelPurchase } from "../api/marketplaceApi";

export const useMyPurchases = () => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ["myPurchases", page],
    queryFn: () => fetchMyPurchases(page),
    keepPreviousData: true,
  });

  const purchases = apiResponse?.data?.data || [];
  const meta = apiResponse?.data?.meta;

  const cancelMutation = useMutation({
    mutationFn: cancelPurchase,
    onSuccess: (data) => {
      toast.success(
        data.message || "Order canceled successfully. Refund processed ✅"
      );
      queryClient.invalidateQueries(["myPurchases"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to cancel order ❌");
    },
  });

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (meta?.last_page || 1)) {
      setPage(newPage);
    }
  };

  const handleCancelClick = (item) => {
    const phone = window.prompt(
      "To cancel this order, please verify your phone number:"
    );

    if (phone && phone.trim() !== "") {
      if (
        window.confirm(
          "Are you sure you want to cancel? The amount will be refunded to your wallet."
        )
      ) {
        cancelMutation.mutate({ id: item.id, buyer_phone: phone });
      }
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
        return {
          bg: "rgba(46, 204, 113, 0.2)",
          color: "#2ecc71",
          label: "Completed",
        };
      case "pending":
        return {
          bg: "rgba(241, 196, 15, 0.2)",
          color: "#f1c40f",
          label: "Pending",
        };
      default:
        return {
          bg: "rgba(255, 255, 255, 0.1)",
          color: "#ccc",
          label: status,
        };
    }
  };

  return {
    page,
    purchases,
    meta,
    isLoading,
    cancelMutation,
    handlePageChange,
    handleCancelClick,
    getStatusStyle,
  };
};
