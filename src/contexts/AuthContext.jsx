/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";
import { register as registerApi } from "../features/auth/api/authApi";
import { toast } from "react-toastify";
import api from "../api/axios";

const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("token");
  });
  const [userData, setUserData] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (token, user, refreshToken) => {
    localStorage.setItem("token", token);

    if (refreshToken) {
      localStorage.setItem("refresh_token", refreshToken);
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setUserData(user);
    }

    setIsLoggedIn(true);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const register = async (data) => {
    try {
      const response = await registerApi(data);
      if (response.status === 1) {
        const { access_token, refresh_token, user } = response.data;
        login(access_token, user, refresh_token);
        toast.success("Account created successfully! Welcome aboard ");
      }
      return response;
    } catch (error) {
      console.error("Registration failed", error);
      const errorMsg =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(errorMsg);

      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserData(null);
    setIsLoggedIn(false);
    delete api.defaults.headers.common["Authorization"];
    toast.info("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userData, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
