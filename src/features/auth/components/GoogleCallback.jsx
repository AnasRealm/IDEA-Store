import { useGoogleCallback } from "../hooks/useGoogleCallback";
const GoogleCallback = () => {
 useGoogleCallback();
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#002924",
        color: "#FFDD15",
      }}
    >
     <div className="spinner" style={{ fontSize: "3rem" }}>🚀</div>
      <h2>Processing Login... Please wait</h2>
    </div>
  );
};

export default GoogleCallback;
