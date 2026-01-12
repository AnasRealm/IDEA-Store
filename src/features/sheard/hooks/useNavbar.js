import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export const useNavbar = () => {
 const navigate = useNavigate();
  const { isLoggedIn, userData } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const handleProtectedNavigation = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      navigate("/login");
    }
    setIsMenuOpen(false); 
  };

  return {
    isLoggedIn,
    userData,
    isMenuOpen,
    toggleMenu,
    handleProfileClick,
    handleProtectedNavigation
  };
};