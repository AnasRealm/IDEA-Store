import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../api/authApi";
import { toast } from "react-toastify";
import "../components/login/auth.css";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (!token || !email) {
      toast.error('Invalid link. Please try "Forgot Password" again.');
    }
  }, [token, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.warning("Passwords do not match");
    }

    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await resetPassword({
        email,
        token,
        password,
        password_confirmation: confirmPassword,
      });

      if (response.status === 1) {
        toast.success(response.message || "Password reset successfully! 🔒");

        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(response.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Link expired or invalid.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-sidebar">
          <div className="auth-logo">
            <Link to="/">
              <img src="/imges/logo.png" alt="logo" />
            </Link>
          </div>
          <div className="auth-welcome-text">
            <h1>Reset Password</h1>
            <p>Secure your account with a new password.</p>
          </div>
        </div>

        <div className="auth-content">
          <div className="auth-form-box">
            <h2>Set New Password</h2>

            {message.text && (
              <div
                style={{
                  color: message.type === "error" ? "#e74c3c" : "#2ecc71",
                  marginBottom: "15px",
                  textAlign: "center",
                  padding: "10px",
                  background:
                    message.type === "error"
                      ? "rgba(231, 76, 60, 0.1)"
                      : "rgba(46, 204, 113, 0.1)",
                  borderRadius: "5px",
                }}
              >
                {message.text}
              </div>
            )}

            {!token || !email ? (
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Link
                  to="/login"
                  className="btn-submit"
                  style={{ textDecoration: "none", display: "inline-block" }}
                >
                  Go to Login
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="input-field">
                  <label>New Password</label>
                  <div className="password-input-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                    <i
                      className="eye-icon"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        className="eye-img"
                        src="/imges/eye.png"
                        alt="toggle"
                      />
                    </i>
                  </div>
                </div>

                <div className="input-field">
                  <label>Confirm Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Repeat new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            )}

            <p className="footer-text">
              Back to <Link to="/login">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
