import { Link } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
import "../login/auth.css";

const Signup = () => {
  const {
    formData,
    isLoading,
    showPassword,
    handleChange,
    handleSubmit,
    handleGoogleLogin,
    togglePasswordVisibility,
  } = useSignup();

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
            <h2>Create an account</h2>

            <form onSubmit={handleSubmit}>
              <div className="name-fields">
                <div className="input-field">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Ahmad"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-field">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Alshra"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="input-field">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="ahmad_alshra"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-field">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="balamba@gmail.com"
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
                    minLength={6}
                  />
                  <i
                    className="eye-icon"
                    onClick={togglePasswordVisibility}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      className="eye-img"
                      src="/imges/eye.png"
                      alt="toggle password visibility"
                    />
                  </i>
                </div>
              </div>
              <button type="submit" className="btn-submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create account"}
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
              Already Have An Account? <Link to="/login"> Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;