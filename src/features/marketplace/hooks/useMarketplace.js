import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMarketplace } from "../api/marketplaceApi";

export const useMarketplace = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");

  const debouncedSearch = search;

  const {
    data: apiResponse,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["marketplace", page, debouncedSearch, category, sort],
    queryFn: () =>
      fetchMarketplace({ page, search: debouncedSearch, category, sort }),
    keepPreviousData: true,
  });

  const listings = apiResponse?.data?.data || [];
  const meta = apiResponse?.data?.meta;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (meta?.last_page || 1)) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  const handleBuyClick = (listingId) => {
    console.log("Buy clicked for:", listingId);
  };

  return {
    page,
    search,
    category,
    sort,
    listings,
    meta,
    isLoading,
    isError,
    error,
    handlePageChange,
    handleSearchChange,
    handleCategoryChange,
    handleSortChange,
    handleBuyClick,
  };
};
