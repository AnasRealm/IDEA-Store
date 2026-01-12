import { useVerificationBanner } from "../../hooks/useVerificationBanner";

const VerificationBanner = () => {
  const { loading, shouldShowBanner, handleResend } = useVerificationBanner();

  if (!shouldShowBanner) return null;

  return (
    <div style={styles.banner}>
      <div style={styles.content}>
        <span>
          ⚠️ Your email address is not verified. Please check your inbox.
        </span>
        <button onClick={handleResend} disabled={loading} style={styles.button}>
          {loading ? "Sending..." : "Resend Verification Link"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  banner: {
    backgroundColor: "rgba(0, 66, 37, 0.9)",
    color: "white",
    padding: "10px 20px",
    gap: "30px",
    textAlign: "center",
    fontSize: "14px",
    position: "relative",
    zIndex: 1000,
  },
  content: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: "white",
    color: "#1d6f43",
    border: "none",
    padding: "5px 15px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "12px",
    transition: "0.3s",
  },
};

export default VerificationBanner;
