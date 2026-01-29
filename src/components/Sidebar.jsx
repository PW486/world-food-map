import React, { useEffect, useRef, useState } from "react";
import { foodData } from "../data/foodData";
import WikiFoodImage from "./WikiFoodImage";
import { getCountryColor, getCountryCode } from "../utils/countryMapping";

const Sidebar = ({ selectedCountry, setSelectedCountry, width, darkMode }) => {
  const sidebarRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);
  const [displayCountry, setDisplayCountry] = useState(selectedCountry);

  useEffect(() => {
    if (selectedCountry) {
      setDisplayCountry(selectedCountry);
      setIsClosing(false);
      if (sidebarRef.current) {
        sidebarRef.current.scrollTop = 0;
      }
    } else if (displayCountry) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setDisplayCountry(null);
        setIsClosing(false);
      }, 300); // 0.3s matches animation duration
      return () => clearTimeout(timer);
    }
  }, [selectedCountry, displayCountry]);

  if (!displayCountry) return null;

  const countryColor = getCountryColor(displayCountry);
  const countryCode = getCountryCode(displayCountry);

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedCountry(null);
  };

  return (
    <div 
      ref={sidebarRef}
      onClick={(e) => e.stopPropagation()}
      className={`position-absolute top-0 end-0 h-100 shadow-lg overflow-auto ${darkMode ? "bg-dark text-white" : "bg-white text-dark"}`} 
      style={{ 
        zIndex: 30, 
        width: width < 600 ? "100vw" : "350px", 
        animation: isClosing ? "slideOutRight 0.3s ease-in forwards" : "slideInRight 0.3s ease-out",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        backgroundColor: darkMode ? "#1a1a1a" : "white",
        transition: "background-color 0.3s ease"
      }}
    >
        <div className="p-4 pt-0">
            <div className={`sticky-top py-4 mb-4 shadow-sm ${darkMode ? "bg-dark" : "bg-white"}`} style={{ zIndex: 5, margin: "0 -1.5rem", padding: "1.5rem", backgroundColor: darkMode ? "#1a1a1a" : "white", transition: "background-color 0.3s ease" }}>
                <div className="d-flex align-items-start justify-content-between">
                    <h2 className="h5 fw-bold m-0" style={{ color: darkMode ? "#f0f0f0" : "#333333", lineHeight: "1.5" }}>
                        {countryCode && (
                            <img 
                                src={`https://flagcdn.com/w40/${countryCode}.png`} 
                                alt={`${displayCountry} flag`}
                                style={{ 
                                    width: "24px", 
                                    borderRadius: "2px", 
                                    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                                    marginRight: "10px",
                                    verticalAlign: "middle",
                                    marginBottom: "3px"
                                }}
                            />
                        )}
                        <span style={{ color: countryColor }}>{displayCountry}</span>
                        <span> Cuisine</span>
                    </h2>
                    <button onClick={handleClose} className={`btn ${darkMode ? "btn-close btn-close-white" : "btn-close"} ms-3 flex-shrink-0`} style={{ marginTop: "4px" }}></button>
                </div>
            </div>
            
            <div className="d-flex flex-column gap-4">
                {foodData[displayCountry] && foodData[displayCountry].map((food, index) => (
                    <div key={index} className={`card border-0 shadow-sm ${darkMode ? "bg-secondary text-white" : "bg-white text-dark"}`} style={{ backgroundColor: darkMode ? "#2d2d2d" : "white" }}>
                        <div className="position-relative overflow-hidden rounded-top" style={{ height: "160px" }}>
                            <WikiFoodImage 
                                foodName={food.name} 
                                className="w-100 h-100 object-fit-cover"
                            />
                        </div>
                        <div className="card-body">
                            <h6 className="card-title fw-bold" style={{ color: darkMode ? "#f0f0f0" : "#333333" }}>{food.name}</h6>
                            <p className="card-text small" style={{ color: darkMode ? "#bbbbbb" : "#555555" }}>{food.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default Sidebar;
