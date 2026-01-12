import "./Profile.css";
import { useProfile } from "./hooks/useProfile";

const Profile = () => {
  const {
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
    navigateToStatistics
  } = useProfile();

  if (isLoading)
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "white" }}>
        Loading...
      </div>
    );

  return (
    <div className="profile">
      <div className="profile__container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
            marginTop: "45px",
          }}
        >
          <h1 style={{ margin: 0, color: "white" }}>My Profile</h1>

          <button
            onClick={navigateToStatistics}
            style={{
              background: "linear-gradient(90deg, #FFDD15 0%, #f39c12 100%)",
              border: "none",
              padding: "10px 20px",
              borderRadius: "25px",
              color: "#1a1a1a",
              fontWeight: "bold",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 15px rgba(243, 156, 18, 0.3)",
            }}
          >
            <span>📊</span> View Detailed Stats
          </button>
        </div>

        {/* Messages */}
        {message.text && (
          <div
            style={{
              padding: "15px",
              marginBottom: "30px",
              borderRadius: "8px",
              backgroundColor:
                message.type === "success"
                  ? "rgba(76, 175, 80, 0.9)"
                  : "rgba(244, 67, 54, 0.9)",
              color: "white",
              textAlign: "center",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            {message.text}
          </div>
        )}

        <section className="profile__section">
          <h2 className="profile__title">Personal Info</h2>
          <div className="profile__field">
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              value={profileData.first_name}
              onChange={handleProfileChange}
            />
          </div>
          <div className="profile__field">
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              value={profileData.last_name}
              onChange={handleProfileChange}
            />
          </div>
          <div className="profile__field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={profileData.username}
              onChange={handleProfileChange}
            />
          </div>
          <div className="profile__field">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={profileData.phone}
              onChange={handleProfileChange}
            />
          </div>
          <div className="profile__field">
            <label>Email</label>
            <input
              type="email"
              value={profileData.email}
              readOnly
              style={{ opacity: 0.6, cursor: "not-allowed" }}
            />
          </div>
          <button
            className="profile__save-btn"
            onClick={handleProfileSubmit}
            disabled={profileMutation.isPending}
          >
            {profileMutation.isPending ? "Updating..." : "Update Info"}
          </button>
        </section>

        <hr
          style={{ borderColor: "rgba(255,255,255,0.1)", margin: "40px 0" }}
        />

        <section className="profile__section">
          <h2 className="profile__title">Change Password</h2>
          <div className="profile__field">
            <label>Current Password</label>
            <input
              type="password"
              name="current_password"
              value={passwordData.current_password}
              onChange={handlePasswordChange}
              placeholder="Enter current password"
            />
          </div>
          <div className="profile__field">
            <label>New Password</label>
            <input
              type="password"
              name="new_password"
              value={passwordData.new_password}
              onChange={handlePasswordChange}
              placeholder="Enter new password"
            />
          </div>
          <div className="profile__field">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="new_password_confirmation"
              value={passwordData.new_password_confirmation}
              onChange={handlePasswordChange}
              placeholder="Confirm new password"
            />
          </div>
          <button
            className="profile__save-btn"
            onClick={handlePasswordSubmit}
            disabled={passwordMutation.isPending}
          >
            {passwordMutation.isPending ? "Changing..." : "Change Password"}
          </button>
        </section>

        <hr
          style={{ borderColor: "rgba(255,255,255,0.1)", margin: "40px 0" }}
        />

        <button
          className="profile__save-btn"
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
          style={{
            background: "linear-gradient(135deg, #004030 0%, #01af6a 100%)",
            marginTop: "20px",
          }}
        >
          {logoutMutation.isPending ? "Logging out..." : "Log Out"}
        </button>
      </div>
    </div>
  );
};

export default Profile;