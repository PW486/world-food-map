import React from "react";
import logo from "../assets/logo.png";

const Header = ({ darkMode }) => {
  return (
    <header 
      className="position-absolute start-0 m-3 p-3 shadow rounded-4 d-flex align-items-center gap-3" 
      style={{ 
        zIndex: 10, 
        maxWidth: "400px",
        top: "env(safe-area-inset-top, 0px)",
        backgroundColor: darkMode ? "#333333" : "white",
        transition: "all 0.3s ease"
      }}
    >
      <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 overflow-hidden" style={{ width: "40px", height: "40px" }}>
        <img src={logo} alt="World Food Map Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div>
        <h1 className="h6 m-0 fw-bold" style={{ color: darkMode ? "#f0f0f0" : "#333333" }}>World Food Map</h1>
        <p className="m-0 small" style={{ fontSize: '0.8rem', color: darkMode ? "#aaaaaa" : "#666666" }}>Zoom & Click to explore</p>
      </div>
    </header>
  );
};

export default Header;