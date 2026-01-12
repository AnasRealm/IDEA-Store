import { useLogin } from "../../hooks/useLogin";
import { Link } from 'react-router-dom';
import "./auth.css";

const LoginForm = () => {
  const {
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
  } = useLogin();

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
            <h1>Welcome to IDEA</h1>
            <p>Log in to access your account.</p>
          </div>
        </div>

        <div className="auth-content">
          <div className="auth-form-box">
            <h2>Login to your account</h2>

            {error && (
              <div
                style={{
                  color: "red",
                  marginBottom: "10px",
                  fontSize: "0.9rem",
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="input-field">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-field">
                <label>Password</label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter Your Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="forgot-password-link">
                <span
                  onClick={() => setIsForgotOpen(true)}
                  style={{ color: "#0E8679" }}
                >
                  Forgot Password?
                </span>
              </div>

              <button type="submit" className="btn-submit" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Log in"}
              </button>

              <button
                type="button"
                className="btn-google-login"
                onClick={handleGoogleLogin}
              >
                <img src="/imges/Google - Original.png" alt="Google" />
                Continue with Google
              </button>
            </form>

            <p className="footer-text">
              Don't Have An Account? <Link to="/signup"> Sign Up</Link>
            </p>
          </div>
        </div>
      </div>

      {isForgotOpen && (
        <div className="modal-overlay" onClick={() => setIsForgotOpen(false)}>
          <div
            className="modal-content forgot-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Reset Password</h3>
            <p>
              Enter your email address and we'll send you a link to reset your
              password.
            </p>

            <form onSubmit={handleForgotSubmit}>
              <div className="input-field">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  autoFocus
                  style={{
                    color: "white",
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsForgotOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="confirm-btn"
                  disabled={resetLoading}
                >
                  {resetLoading ? "Sending..." : "Send Link"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
