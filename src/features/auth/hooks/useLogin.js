import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from ".././../../contexts/AuthContext";
import { toast } from "react-toastify";
import { login as loginApi, forgotPassword } from "../api/authApi";

export const useLogin = () => {
const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await loginApi({
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 1) {
        const { access_token, refresh_token, user } = response.data;
        login(access_token, user, refresh_token);
        toast.success(`Welcome back, ${user.name || "User"}! 👋`);
        navigate("/");
      } else {
        toast.error(response.message || "Invalid credentials");
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Login failed. Please check your connection.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://127.0.0.1:8000/auth/google";
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    if (!resetEmail) return;

    setResetLoading(true);
    try {
      const response = await forgotPassword(resetEmail);
      if (response.status === 1) {
        toast.success(response.message || "Reset link sent to your email! 📧");
        setIsForgotOpen(false);
        setResetEmail("");
      } else {
        toast.error(response.message || "Failed to send link");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setResetLoading(false);
    }
  };

  return {
    formData,
    showPassword,
    error,
    isLoading,
    isForgotOpen,
    setIsForgotOpen,
    resetEmail,
    setResetEmail,
    resetLoading,
    handleChange,
    handleSubmit,
    handleGoogleLogin,
    handleForgotSubmit,
  };
};
