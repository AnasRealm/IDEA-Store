import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuth } from "../../../contexts/AuthContext";
import {
  fetchUserProfile,
  updateUserProfile,
  changeUserPassword,
  logoutUser,
} from "../api/profileApi";

export const useProfile = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone: "",
    avatar: null,
  });

  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });

  const user = apiResponse?.data;

  const [lastUser, setLastUser] = useState(null);

  if (user && user !== lastUser) {
    setLastUser(user);
    setProfileData((prev) => ({
      ...prev,
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      username: user.username || "",
      email: user.email || "",
      phone: user.phone || "",
    }));
  }

  const profileMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      toast.success(data.message || "Profile updated successfully! ✨");
      queryClient.invalidateQueries(["userProfile"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });

  const passwordMutation = useMutation({
    mutationFn: changeUserPassword,
    onSuccess: (data) => {
      toast.success(data.message || "Password changed successfully! 🔒");
      setPasswordData({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to change password");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      toast.info("Logged out successfully 👋");
      logout();
      navigate("/login");
    },
    onError: (error) => {
      console.error("Logout failed on server", error);
      logout();
      navigate("/login");
    },
  });

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = () => {
    setMessage({ type: "", text: "" });
    const dataToSend = new FormData();
    dataToSend.append("first_name", profileData.first_name);
    dataToSend.append("last_name", profileData.last_name);
    dataToSend.append("username", profileData.username);
    dataToSend.append("phone", profileData.phone);
    dataToSend.append("_method", "PUT");

    if (profileData.avatar) {
      dataToSend.append("avatar", profileData.avatar);
    }

    profileMutation.mutate(dataToSend);
  };

  const handlePasswordSubmit = () => {
    if (passwordData.new_password !== passwordData.new_password_confirmation) {
      return toast.error("New passwords do not match! ⚠️");
    }
    if (passwordData.new_password.length < 6) {
      return toast.warning("Password must be at least 6 characters");
    }
    passwordMutation.mutate(passwordData);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logoutMutation.mutate();
    }
  };

  const navigateToStatistics = () => {
    navigate("/profile/statistics");
  };

  return {
    profileData,
    passwordData,
    message,
    isLoading,
    profileMutation,
    passwordMutation,
    logoutMutation,
    handleProfileChange,
    handlePasswordChange,
    handleProfileSubmit,
    handlePasswordSubmit,
    handleLogout,
    navigateToStatistics,
  };
};
