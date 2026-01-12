import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchPromotions, fetchPromotionDetails } from "../api/homeApi";
import { fetchProducts } from "../../games/api/gamesApi";

export const usePromotions = () => {
  const navigate = useNavigate();
  const [selectedPromoId, setSelectedPromoId] = useState(null);

  const { data: promoResponse, isLoading: promoLoading } = useQuery({
    queryKey: ["promotions"],
    queryFn: fetchPromotions,
  });

  const promotions = promoResponse?.data || [];
  const hasPromotions = promotions.length > 0;

  const { data: productsResponse, isLoading: productsLoading } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: () => fetchProducts(1),
    enabled: !promoLoading && !hasPromotions,
  });

  const products = productsResponse?.data || [];

  const { data: detailResponse, isLoading: isDetailLoading } = useQuery({
    queryKey: ["promotionDetails", selectedPromoId],
    queryFn: () => fetchPromotionDetails(selectedPromoId),
    enabled: !!selectedPromoId,
  });

  const promoDetail = detailResponse?.data;
  const isPromoActive = detailResponse?.status === 1;

  const itemsToShow = hasPromotions ? promotions : products.slice(0, 4);
  const sectionTitle = hasPromotions
    ? "Special Offers 🔥"
    : "Top Trending Games 🚀";

  const handleCardClick = (item) => {
    if (hasPromotions) {
      setSelectedPromoId(item.id);
    } else {
      navigate("/games");
    }
  };

  const closePopup = () => setSelectedPromoId(null);

  const handleGoToProduct = () => navigate("/games");

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDisplayPrice = (item) => {
    if (hasPromotions) {
      return item.product?.price > 0 ? `$${item.product.price}` : "Check Price";
    } else {
      const price = item.display_price || item.selling_price || item.price;
      return price ? `$${price}` : "Free";
    }
  };

  return {
    selectedPromoId,
    promoLoading,
    productsLoading,
    hasPromotions,
    itemsToShow,
    sectionTitle,
    isDetailLoading,
    promoDetail,
    isPromoActive,
    detailResponse,
    handleCardClick,
    closePopup,
    handleGoToProduct,
    formatDate,
    getDisplayPrice,
  };
};
