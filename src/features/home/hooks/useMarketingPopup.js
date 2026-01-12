import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchActivePopup, dismissPopup } from "../api/homeApi";

export const useMarketingPopup = () => {
  const navigate = useNavigate();

  const { data: popupResponse, isLoading } = useQuery({
    queryKey: ["activePopup"],
    queryFn: fetchActivePopup,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const popup = popupResponse?.data;

  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (isLoading) return;

    if (popupResponse?.status === 0) {
      console.warn("⚠️ API Response: No active popup.");
    }
  }, [popupResponse, isLoading, popup]);

  useEffect(() => {
    if (popup && popup.is_active_now) {
      const hasSeen = localStorage.getItem(`popup_seen_${popup.id}`);

      if (popup.show_once_per_user && hasSeen) {
        console.log("🚫 Popup blocked: User saw it before.");
        return;
      }

      const timer = setTimeout(() => {
        setIsVisible(true);

        if (popup.countdown_seconds) {
          setTimeLeft(popup.countdown_seconds);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [
    popup?.id,
    popup?.is_active_now,
    popup?.show_once_per_user,
    popup?.countdown_seconds,
    popup,
  ]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    if (!seconds || seconds < 0) return "00:00:00";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleClose = () => {
    setIsVisible(false);

    if (popup) {
      localStorage.setItem(`popup_seen_${popup.id}`, "true");

      dismissPopup(popup.id)
        .then(() => console.log("Popup dismissed on server"))
        .catch((err) =>
          console.warn("Failed to dismiss on server (user might be guest)", err)
        );
    }
  };

  const handleAction = () => {
    handleClose();

    navigate("/games");
  };

  return {
    popup,
    isLoading,
    isVisible,
    timeLeft,
    formatTime,
    handleClose,
    handleAction,
  };
};
