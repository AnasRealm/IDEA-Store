import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "../../../contexts/AuthContext";
import {
  fetchProducts,
  fetchProductDetails,
  fetchProductsByCategory,
  fetchProductSuggestions,
  fetchProductsSearch,
} from "../api/gamesApi";
import { placeOrder } from "../../orders/api/ordersApi";

export const useGames = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");

  const [selectedGameId, setSelectedGameId] = useState(null);
  const [formData, setFormData] = useState({});
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  const [lastCategory, setLastCategory] = useState(categoryFilter);

  if (categoryFilter !== lastCategory) {
    setLastCategory(categoryFilter);
    setPage(1);
    setSearchTerm("");
    setSubmittedSearch("");
    setSuggestions([]);
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.length > 1 && searchTerm !== submittedSearch) {
        try {
          const data = await fetchProductSuggestions(searchTerm);
          if (data.success && data.suggestions) {
            setSuggestions(data.suggestions);
            setShowSuggestions(true);
          }
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, submittedSearch]);

  const {
    data: apiResponse,
    isLoading: isListLoading,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["products", page, categoryFilter, submittedSearch],
    queryFn: () => {
      if (submittedSearch) {
        return fetchProductsSearch(submittedSearch, page);
      }
      if (categoryFilter) {
        return fetchProductsByCategory(categoryFilter, page);
      }
      return fetchProducts(page);
    },
    placeholderData: (previousData) => previousData,
    keepPreviousData: true,
  });

  const { data: detailResponse } = useQuery({
    queryKey: ["product", selectedGameId],
    queryFn: () => fetchProductDetails(selectedGameId),
    enabled: !!selectedGameId,
  });

  const products = apiResponse?.data || [];
  const meta = apiResponse?.meta || apiResponse?.pagination;

  const productInList = products.find((p) => p.id === selectedGameId);
  const productDetails = detailResponse?.data || productInList;

  const filteredGames = products.filter((game) => {
    if (searchTerm !== submittedSearch) {
      return (game.name || "").toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  const getProductInputs = (details) => {
    if (!details) return [];
    let inputs =
      details.input_fields || details.fields || details.provider_fields || [];

    if (!inputs || inputs.length === 0) {
      return [
        {
          name: "Game User ID",
          data_name: "game_user_id",
          type: "text",
          required: true,
          placeholder: "Ex: 12345678",
        },
        {
          name: "Game Password",
          data_name: "game_password",
          type: "password",
          required: true,
          placeholder: "Enter password",
        },
        {
          name: "Game Username",
          data_name: "game_username",
          type: "text",
          required: true,
          placeholder: "Ex: CrossoutWarrior",
        },
        {
          name: "Game Email",
          data_name: "game_email",
          type: "text",
          required: true,
          placeholder: "user@example.com",
        },
      ];
    }
    return inputs;
  };

  const orderMutation = useMutation({
    mutationFn: placeOrder,
    onSuccess: (data) => {
      closePopup();
      alert(data.message || "Order placed successfully!");
      navigate("/my-orders");
    },
    onError: (error) => {
      const errorMsg =
        error.response?.data?.message || "Failed to place order.";
      alert(errorMsg);
      if (errorMsg.toLowerCase().includes("balance")) {
        navigate("/wallet");
      }
    },
  });

  const handleGameClick = (id) => {
    setSelectedGameId(id);
    setFormData({});
  };

  const closePopup = () => {
    setSelectedGameId(null);
    setFormData({});
  };

  const handleInputChange = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleLoginRedirect = () => {
    navigate("/login");
    setShowLoginPrompt(false);
  };

  const handleSuggestionClick = (gameId) => {
    handleGameClick(gameId);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSubmittedSearch(searchTerm);
      setPage(1);
      setShowSuggestions(false);
    }
  };

  const handlePrevPage = () => setPage((old) => Math.max(old - 1, 1));

  const handleNextPage = () => {
    if (meta && page < meta.last_page) setPage((old) => old + 1);
  };

  const handleBuyClick = () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }

    const currentInputs = getProductInputs(productDetails);
    const requiredFields = currentInputs.filter(
      (f) => f.required && !formData[f.data_name]
    );

    if (requiredFields.length > 0) {
      alert(
        `Please fill: ${requiredFields
          .map((f) => f.name || f.label)
          .join(", ")}`
      );
      return;
    }

    const dataToSend = new FormData();
    dataToSend.append("items[0][product_id]", productDetails.id);
    dataToSend.append("items[0][quantity]", 1);

    Object.keys(formData).forEach((key) => {
      dataToSend.append(`items[0][inputs][${key}]`, formData[key]);
    });

    orderMutation.mutate(dataToSend);
  };

  return {
    page,
    searchTerm,
    setSearchTerm,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    submittedSearch,
    selectedGameId,
    showLoginPrompt,
    setShowLoginPrompt,
    formData,
    isListLoading,
    isPlaceholderData,
    filteredGames,
    meta,
    productDetails,
    orderMutation,
    handleGameClick,
    closePopup,
    handleInputChange,
    handleLoginRedirect,
    handleSuggestionClick,
    handleKeyDown,
    handlePrevPage,
    handleNextPage,
    handleBuyClick,
    getProductInputs,
  };
};
