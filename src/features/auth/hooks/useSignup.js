import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../contexts/AuthContext";

export const useSignup = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://127.0.0.1:8000/auth/google";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      return toast.warning("Passwords do not match");
    }

    setIsLoading(true);

    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.password,
    };

    try {
      const response = await register(payload);
      if (response.status === 1) {
        toast.success("Account created successfully! 🎉");
        navigate("/");
      } else {
        toast.error(response.message || "Failed to register");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    showPassword,
    handleChange,
    handleSubmit,
    handleGoogleLogin,
    togglePasswordVisibility,
  };
};
