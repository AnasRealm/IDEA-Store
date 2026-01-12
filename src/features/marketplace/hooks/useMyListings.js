import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  fetchMyListings,
  createListing,
  deleteListing,
} from "../api/marketplaceApi";

export const useMyListings = () => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    contact_info: "",
    images: [],
  });

  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ["myListings", page],
    queryFn: () => fetchMyListings(page),
    keepPreviousData: true,
  });

  const listings = apiResponse?.data?.data || [];
  const meta = apiResponse?.data?.meta;

  const createMutation = useMutation({
    mutationFn: createListing,
    onSuccess: (data) => {
      toast.success(data.message || "Item listed for sale successfully! 🚀");
      setIsModalOpen(false);
      setFormData({
        title: "",
        description: "",
        price: "",
        contact_info: "",
        images: [],
      });
      queryClient.invalidateQueries(["myListings"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create listing");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteListing,
    onSuccess: (data) => {
      toast.success(data.message || "Listing removed successfully 🗑️");
      queryClient.invalidateQueries(["myListings"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete listing");
    },
  });

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (meta?.last_page || 1)) {
      setPage(newPage);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, images: e.target.files }));
  };

  const handleDeleteClick = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this listing permanently?"
      )
    ) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("contact_info", formData.contact_info);

    if (formData.images) {
      for (let i = 0; i < formData.images.length; i++) {
        data.append(`images[${i}]`, formData.images[i]);
      }
    }

    createMutation.mutate(data);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return {
          bg: "rgba(46, 204, 113, 0.2)",
          color: "#2ecc71",
          label: "Approved",
        };
      case "rejected":
        return {
          bg: "rgba(231, 76, 60, 0.2)",
          color: "#e74c3c",
          label: "Rejected",
        };
      default:
        return {
          bg: "rgba(241, 196, 15, 0.2)",
          color: "#f1c40f",
          label: "Pending Review",
        };
    }
  };

  return {
    page,
    setPage,
    isModalOpen,
    setIsModalOpen,
    formData,
    isLoading,
    listings,
    meta,
    createMutation,
    deleteMutation,
    handlePageChange,
    handleInputChange,
    handleFileChange,
    handleDeleteClick,
    handleSubmit,
    getStatusStyle,
  };
};
