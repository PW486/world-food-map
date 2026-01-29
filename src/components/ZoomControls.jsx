import React from "react";
import { ZoomIn, ZoomOut } from "lucide-react";

const ZoomControls = ({ onZoomIn, onZoomOut, darkMode }) => {
  return (
    <div className="d-flex flex-column gap-2">
      <button 
          className="btn shadow-lg rounded-circle d-flex align-items-center justify-content-center border-0" 
          style={{ 
            width: "50px", 
            height: "50px", 
            padding: 0, 
            backgroundColor: darkMode ? "#333333" : "white",
            color: darkMode ? "#f0f0f0" : "#333333", 
            transition: "all 0.3s ease" 
          }}
          onClick={onZoomIn} 
          aria-label="Zoom In"
      >
          <ZoomIn size={24} />
      </button>
      <button 
          className="btn shadow-lg rounded-circle d-flex align-items-center justify-content-center border-0" 
          style={{ 
            width: "50px", 
            height: "50px", 
            padding: 0, 
            backgroundColor: darkMode ? "#333333" : "white",
            color: darkMode ? "#f0f0f0" : "#333333", 
            transition: "all 0.3s ease" 
          }}
          onClick={onZoomOut} 
          aria-label="Zoom Out"
      >
          <ZoomOut size={24} />
      </button>
    </div>
  );
};

export default ZoomControls;
