import React, { useState, useEffect } from "react";
import { foodData } from "./data/foodData";
import Header from "./components/Header";
import ZoomControls from "./components/ZoomControls";
import Sidebar from "./components/Sidebar";
import MapLayer from "./components/MapLayer";
import { mapGeoName } from "./utils/countryMapping";
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
  const isMobile = width < 600;
  const [position, setPosition] = useState({ 
    coordinates: isMobile ? [15, 35] : [15, 15], 
    zoom: isMobile ? 4 : 2 
  });

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const zoomIntensity = 0.01;
        const factor = Math.exp(-e.deltaY * zoomIntensity);
        
        setPosition(pos => {
          const newZoom = Math.min(Math.max(pos.zoom * factor, 1), 128);
          if (newZoom === pos.zoom) return pos;

          const container = document.getElementById("map-container");
          if (!container) return { ...pos, zoom: newZoom };

          const rect = container.getBoundingClientRect();
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          // Mercator projection scaling factor
          const baseScale = width < 600 ? width / 6.5 : 150;
          
          // Distance from center in pixels
          const dx = mouseX - centerX;
          const dy = mouseY - centerY;

          // Convert pixel displacement to geographic coordinate displacement
          // In D3 Mercator, 1 degree lon approx = (baseScale * PI / 180) pixels
          const pixelToDegree = (baseScale * Math.PI) / 180;
          
          // Calculate how much the center needs to move to keep the point under the mouse fixed
          const diff = (1 / pos.zoom) - (1 / newZoom);
          const newLong = pos.coordinates[0] + (dx / pixelToDegree) * diff;
          const newLat = pos.coordinates[1] - (dy / pixelToDegree) * diff;

          return {
            coordinates: [newLong, newLat],
            zoom: newZoom
          };
        });
      }
    };

    const container = document.getElementById("map-container");
    if (container) container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      if (container) container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handleZoomIn = () => {
    if (position.zoom < 128) setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom > 1) setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleMoveEnd = (newPosition) => setPosition(newPosition);

  const handleCountryClick = (geo) => {
    const countryName = mapGeoName(geo.properties.name);

    if (foodData[countryName]) setSelectedCountry(countryName);
    else setSelectedCountry(null);
  };

  const handleRandomCountry = () => {
    const countries = Object.keys(foodData);
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    setSelectedCountry(randomCountry);
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

      <button
        onClick={handleRandomCountry}
        className="position-absolute bottom-0 start-0 m-4 btn shadow-sm d-flex align-items-center justify-content-center"
        style={{ 
          zIndex: 10, 
          width: "50px", 
          height: "50px", 
          borderRadius: "15px", 
          backgroundColor: "white", 
          border: "none",
          fontSize: "1.5rem"
        }}
        title="Random Country"
      >
        🎲
      </button>

      {!isMobile && tooltipContent && (
        <div className="position-absolute top-0 start-50 translate-middle-x mt-3 text-white px-3 py-1 rounded-pill shadow-sm opacity-90" style={{ zIndex: 20, backgroundColor: "#333333", pointerEvents: "none" }}>
            {tooltipContent}
        </div>
      )}

      <Sidebar selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} width={width} />
    </div>
  );
};

export default App;
