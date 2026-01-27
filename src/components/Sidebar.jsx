import React, { useEffect, useRef } from "react";
import { foodData } from "../data/foodData";
import WikiFoodImage from "./WikiFoodImage";

const Sidebar = ({ selectedCountry, setSelectedCountry, width }) => {
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.scrollTop = 0;
    }
  }, [selectedCountry]);

  if (!selectedCountry) return null;

  return (
    <div 
      ref={sidebarRef}
      className="position-absolute top-0 end-0 h-100 bg-white shadow-lg overflow-auto" 
      style={{ 
        zIndex: 30, 
        width: width < 600 ? "100vw" : "350px", 
        animation: "slideInRight 0.3s ease-out",
        paddingBottom: "env(safe-area-inset-bottom, 0px)"
      }}
    >
        <div className="p-4 pt-0">
            <div className="sticky-top bg-white py-4 mb-4 shadow-sm" style={{ zIndex: 5, margin: "0 -1.5rem", padding: "1.5rem" }}>
                <div className="d-flex align-items-center justify-content-between">
                    <h2 className="h5 fw-bold m-0" style={{ color: "#1e3a8a" }}>
                            <span style={{ color: "#3b82f6" }}>{selectedCountry}</span> Cuisine
                    </h2>
                    <button onClick={() => setSelectedCountry(null)} className="btn btn-close"></button>
                </div>
            </div>
            
            <div className="d-flex flex-column gap-4">
                {foodData[selectedCountry].map((food, index) => (
                    <div key={index} className="card border-0 shadow-sm">
                        <div className="position-relative overflow-hidden rounded-top" style={{ height: "160px" }}>
                            <WikiFoodImage 
                                foodName={food.name} 
                                className="w-100 h-100 object-fit-cover"
                            />
                        </div>
                        <div className="card-body">
                            <h6 className="card-title fw-bold" style={{ color: "#1e3a8a" }}>{food.name}</h6>
                            <p className="card-text text-muted small">{food.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default Sidebar;
