import React from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCategoryDetails } from "../api/homeApi";
import "../componats/Categories/Categories.css";

const SubCategories = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["category-details", id],
    queryFn: () => fetchCategoryDetails(id),
  });

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", color: "white", padding: "100px" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ textAlign: "center", color: "red", padding: "100px" }}>
        <h2>Error loading category</h2>
      </div>
    );
  }

  const categoryData = apiResponse?.data;
  const parentCategory = categoryData?.category;
  const children = categoryData?.children || [];

  if (children.length === 0) {
    return <Navigate to={`/games?category=${id}`} replace />;
  }

  const getIconByName = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("facebook")) return "/imges/Chat applications.png";
    if (lowerName.includes("instagram")) return "/imges/Instagram.png";
    if (lowerName.includes("tiktok")) return "/imges/Tik tok.png";
    if (lowerName.includes("youtube")) return "/imges/Youtube.png";
    if (lowerName.includes("twitter")) return "/imges/X.png";
    if (lowerName.includes("telegram")) return "/imges/Telegram.png";
    if (lowerName.includes("spotify")) return "/imges/Spotify.png";
    if (lowerName.includes("game")) return "/imges/games.png";
    return "/imges/Electronic payment.png";
  };

  return (
    <section
      className="categories"
      style={{ paddingTop: "120px", minHeight: "100vh" }}
    >
      <div className="container">
        <h2 className="categories-title">
          {parentCategory?.name || "Sub Categories"}
        </h2>

        <div className="categories-grid">
          {children.map((child) => (
            <div
              key={child.id}
              className="category-card"
              onClick={() => navigate(`/category/${child.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="category-image">
                <img
                  src={getIconByName(child.name)}
                  alt={child.name}
                  onError={(e) => (e.target.src = "/imges/games.png")}
                />
              </div>
              <h3 className="category-title" style={{ fontSize: "15px" }}>
                {child.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubCategories;
