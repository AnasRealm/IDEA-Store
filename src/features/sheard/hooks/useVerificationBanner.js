import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../contexts/AuthContext";

import { resendVerificationEmail } from "../../auth/api/authApi";

export const useVerificationBanner = () => {
  const { userData, isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);

  const shouldShowBanner =
    isLoggedIn && userData && userData.email_verified_at === null;

  const handleResend = async () => {
    setLoading(true);
    try {
      const response = await resendVerificationEmail();
      if (response.status === 1) {
        toast.success(
          response.message ||
            "Verification link sent successfully! Check your inbox."
        );
      } else {
        toast.warning("Failed to send link. Please try again.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Too many requests. Please wait."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    shouldShowBanner,
    handleResend,
  };
};
