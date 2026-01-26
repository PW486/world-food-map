import React, { useState, useEffect } from "react";
import { foodData } from "./data/foodData";
import Header from "./components/Header";
import ZoomControls from "./components/ZoomControls";
import Sidebar from "./components/Sidebar";
import MapLayer from "./components/MapLayer";
import "./App.css";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [tooltipContent, setTooltipContent] = useState("");
  const { width, height } = useWindowSize();
  const [position, setPosition] = useState({ 
    coordinates: [10, 10], 
    zoom: window.innerWidth < 600 ? 3 : 2 
  });

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        // Doubled intensity for even faster zooming
        const zoomIntensity = 0.003;
        const factor = Math.exp(-e.deltaY * zoomIntensity);
        setPosition(pos => ({
          ...pos,
          zoom: Math.min(Math.max(pos.zoom * factor, 0.5), 24)
        }));
      }
    };

    const container = document.getElementById("map-container");
    if (container) container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      if (container) container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handleZoomIn = () => {
    if (position.zoom < 24) setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom > 0.5) setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleMoveEnd = (newPosition) => setPosition(newPosition);

  const handleCountryClick = (geo) => {
    const { name } = geo.properties;
    
    // Map Data Name -> Our Data Key Mapping
    const nameMap = {
      "United States of America": "USA",
      "Czech Republic": "Czechia",
      // Add more mappings if needed
    };

    const countryName = nameMap[name] || name;

    if (foodData[countryName]) setSelectedCountry(countryName);
    else setSelectedCountry(null);
  };

  return (
    <div className="font-sans" style={{ width: "100%", height: "100dvh", overflow: "hidden", position: "relative", backgroundColor: "#f0f7ff", touchAction: "none" }}>
      
      <MapLayer 
        width={width} 
        height={height} 
        position={position} 
        handleMoveEnd={handleMoveEnd} 
        handleCountryClick={handleCountryClick} 
        selectedCountry={selectedCountry}
        setTooltipContent={setTooltipContent}
      />

      <Header />

      <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />

      {tooltipContent && (
        <div className="position-absolute top-0 start-50 translate-middle-x mt-3 text-white px-3 py-1 rounded-pill shadow-sm opacity-90" style={{ zIndex: 20, backgroundColor: "#1e3a8a", pointerEvents: "none" }}>
            {tooltipContent}
        </div>
      )}

      <Sidebar selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} width={width} />
      
      <style>{`
        @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default App;
