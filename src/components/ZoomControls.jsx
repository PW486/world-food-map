import React from "react";
import { ZoomIn, ZoomOut } from "lucide-react";

const ZoomControls = ({ onZoomIn, onZoomOut }) => {
  return (
    <div 
      className="position-absolute d-flex flex-column gap-2" 
      style={{ 
          zIndex: 10, 
          right: "20px",
          bottom: "calc(20px + env(safe-area-inset-bottom, 0px))"
      }}
    >
      <button 
          className="btn btn-white bg-white shadow-lg rounded-circle d-flex align-items-center justify-content-center border-0" 
          style={{ width: "44px", height: "44px", padding: 0, color: "#1e3a8a", transition: "transform 0.1s" }}
          onClick={onZoomIn} 
          onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.95)"}
          onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
          aria-label="Zoom In"
      >
          <ZoomIn size={22} />
      </button>
      <button 
          className="btn btn-white bg-white shadow-lg rounded-circle d-flex align-items-center justify-content-center border-0" 
          style={{ width: "44px", height: "44px", padding: 0, color: "#1e3a8a", transition: "transform 0.1s" }}
          onClick={onZoomOut} 
          onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.95)"}
          onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
          aria-label="Zoom Out"
      >
          <ZoomOut size={22} />
      </button>
    </div>
  );
};

export default ZoomControls;
