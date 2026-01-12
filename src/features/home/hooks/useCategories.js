import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchCategories } from "../api/homeApi";

export const useCategories = () => {
  const navigate = useNavigate();

  const categoryImages = {
    Games: "/imges/games.png",
    "Game Credits": "/imges/games.png",
    "Gift Cards": "/imges/Digital cards.png",
    "Payment Services": "/imges/Electronic payment.png",
    "Social Media Services": "/imges/Chat applications.png",
    "Ping Reducers": "/imges/Subscriptions.png",
    Uncategorized: "/imges/account.png",
  };

  const getCategoryImage = (categoryName) => {
    return categoryImages[categoryName] || "/imges/games.png";
  };

  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const categories = apiResponse?.data || [];

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.id}`);
  };

  return {
    categories,
    isLoading,
    isError,
    getCategoryImage,
    handleCategoryClick,
  };
};
