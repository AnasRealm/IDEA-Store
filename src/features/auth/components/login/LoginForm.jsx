import { Link } from "react-router-dom";
import { useState } from "react";
import "./auth.css";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

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
            <p>
              Every game, every top-up, and every offer all <br /> in one place.
              <br />
              Sign in and let your idea reach faster.
            </p>
          </div>
        </div>

        <div className="auth-content">
          <div className="auth-form-box">
            <h2>Login to your account</h2>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="input-field">
                <label>Email</label>
                <input type="email" placeholder="balamba@gmail.com" />
              </div>

              <div className="input-field">
                <label>Password</label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                  />
                  <i
                    className="eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      className="eye-img"
                      src={
                        showPassword
                          ? "/imges/eye.png"
                          : "/imges/eye.png"
                      }
                      alt="toggle password visibility"
                    />
                  </i>
                </div>
              </div>

              <button type="submit" className="btn-submit">
                Login now
              </button>

              <button type="button" className="btn-google-login">
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
    </div>
  );
};

export default LoginForm;