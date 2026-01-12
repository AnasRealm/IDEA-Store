import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export const useGoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");

    if (accessToken) {
      login(accessToken, null, refreshToken);

      navigate("/", { replace: true });
    } else {
      console.error("No token found in URL");
      navigate("/login", { replace: true });
    }
  }, [searchParams, navigate, login]);
};
