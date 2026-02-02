import React, { useState, useEffect, useRef } from "react";
import { Sun, Moon, Search, X } from "lucide-react";
import { geoCentroid } from "d3-geo";
import { foodData } from "./data/foodData";
import Header from "./components/Header";
import ZoomControls from "./components/ZoomControls";
import Sidebar from "./components/Sidebar";
import MapLayer from "./components/MapLayer";
import { mapGeoName, LABEL_MIN_ZOOM } from "./utils/countryMapping";
import "./App.css";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [tooltipContent, setTooltipContent] = useState("");
  const [animationMode, setAnimationMode] = useState(null);
  const [geographies, setGeographies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const { width, height } = useWindowSize();
  const isMobile = width < 600;
  const [position, setPosition] = useState({ 
    coordinates: isMobile ? [15, 35] : [15, 15], 
    zoom: isMobile ? 4 : 2 
  });

  // Load Map Data
  useEffect(() => {
    fetch(GEO_URL)
      .then(res => res.json())
      .then(data => {
        if (data.objects?.countries) {
          import("topojson-client").then(topojson => {
            const countries = topojson.feature(data, data.objects.countries).features;
            setGeographies(countries);
          });
        }
      });
  }, []);

  // Global Event Listeners
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setIsSearchActive(false);
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") { setSelectedCountry(null); setIsSearchActive(false); }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Search Logic
  useEffect(() => {
    if (searchQuery.trim() === "") { setSearchResults([]); return; }
    const filtered = Object.keys(foodData).filter(c => 
      c.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 10);
    setSearchResults(filtered);
  }, [searchQuery]);

  useEffect(() => {
    if (isSearchActive) inputRef.current?.focus();
    else setSearchQuery("");
  }, [isSearchActive]);

  // Theme Sync
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.documentElement.classList.toggle("dark-mode", darkMode);
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  // Desktop Scroll Zoom
  useEffect(() => {
    const handleWheel = (e) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      const factor = Math.exp(-e.deltaY * 0.01);
      
      setPosition(pos => {
        const newZoom = Math.min(Math.max(pos.zoom * factor, 1), 128);
        if (newZoom === pos.zoom) return pos;

        const container = document.getElementById("map-container");
        if (!container) return { ...pos, zoom: newZoom };

        const rect = container.getBoundingClientRect();
        const dx = (e.clientX - rect.left) - rect.width / 2;
        const dy = (e.clientY - rect.top) - rect.height / 2;
        const pixelToDegree = ((isMobile ? width / 6.5 : 150) * Math.PI) / 180;
        const diff = (1 / pos.zoom) - (1 / newZoom);

        return {
          coordinates: [pos.coordinates[0] + (dx / pixelToDegree) * diff, pos.coordinates[1] - (dy / pixelToDegree) * diff],
          zoom: newZoom
        };
      });
    };
    const container = document.getElementById("map-container");
    container?.addEventListener("wheel", handleWheel, { passive: false });
    return () => container?.removeEventListener("wheel", handleWheel);
  }, [width, height, isMobile]);

  const handleZoomIn = () => {
    setAnimationMode("fast");
    setPosition(pos => ({ ...pos, zoom: Math.min(pos.zoom * 1.5, 128) }));
    setTimeout(() => setAnimationMode(null), 300);
  };

  const handleZoomOut = () => {
    setAnimationMode("fast");
    setPosition(pos => ({ ...pos, zoom: Math.max(pos.zoom / 1.5, 1) }));
    setTimeout(() => setAnimationMode(null), 300);
  };

  const flyToCountry = (name, centroid, forceZoom = false) => {
    const baseMinZoom = LABEL_MIN_ZOOM[name] || 4.5;
    let targetZoom;
    
    if (isMobile) {
      const offset = baseMinZoom > 5.5 ? 12.0 : (baseMinZoom <= 1.5 ? 4.0 : 7.0);
      targetZoom = Math.max(baseMinZoom + offset, 9.0);
    } else {
      targetZoom = Math.max(baseMinZoom + 3.0, 5.0);
    }

    setAnimationMode("slow");
    setPosition(pos => ({ coordinates: centroid, zoom: forceZoom ? targetZoom : Math.max(pos.zoom, targetZoom) }));
    setTimeout(() => setAnimationMode(null), 500);
  };

  const handleCountrySelect = (name, force = false) => {
    setSelectedCountry(name);
    setIsSearchActive(false);
    const targetGeo = geographies.find(g => mapGeoName(g.properties.name) === name);
    if (targetGeo) flyToCountry(name, geoCentroid(targetGeo), force);
  };

  const handleCountryClick = (geo, centroid) => {
    const name = mapGeoName(geo.properties.name);
    if (foodData[name]) { setSelectedCountry(name); flyToCountry(name, centroid, false); }
    else setSelectedCountry(null);
  };

  return (
    <div className={`font-sans ${darkMode ? "dark-mode-app" : ""}`} style={{ width: "100%", height: "100dvh", overflow: "hidden", position: "relative", backgroundColor: darkMode ? "#1a1a1a" : "#f0f7ff", touchAction: "none", transition: "background-color 0.3s ease" }}>
      <MapLayer width={width} height={height} position={position} handleMoveEnd={p => setPosition(p)} handleCountryClick={handleCountryClick} selectedCountry={selectedCountry} setTooltipContent={setTooltipContent} animationMode={animationMode} darkMode={darkMode} onMapClick={() => setIsSearchActive(false)} />
      <Header darkMode={darkMode} />

      {/* Left Bottom: Search & Random */}
      <div ref={searchRef} className="position-absolute bottom-0 start-0 m-4 d-flex flex-column gap-2" style={{ zIndex: 20 }}>
        <button onClick={() => handleCountrySelect(Object.keys(foodData)[Math.floor(Math.random() * Object.keys(foodData).length)], true)} className="btn shadow-sm d-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px", borderRadius: "15px", backgroundColor: darkMode ? "#333333" : "white", color: darkMode ? "#f0f0f0" : "#333333", border: "none", fontSize: "1.5rem" }}>🎲</button>
        <div className={`search-container ${isSearchActive ? "active" : ""}`}>
          {isSearchActive && searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map(c => <div key={c} className="search-item" onClick={() => handleCountrySelect(c, true)}>{c}</div>)}
            </div>
          )}
          <div className="position-absolute d-flex align-items-center justify-content-center" style={{ top: 0, left: 0, width: "50px", height: "50px", cursor: "pointer", zIndex: 120 }} onClick={() => setIsSearchActive(!isSearchActive)}>
            <Search size={22} style={{ color: darkMode ? "#f0f0f0" : "#333333" }} />
          </div>
          <input ref={inputRef} type="text" className="search-input shadow-sm" placeholder={isSearchActive ? "Search country..." : ""} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onFocus={() => setIsSearchActive(true)} style={{ backgroundColor: darkMode ? "#333333" : "white", color: darkMode ? "#f0f0f0" : "#333333" }} />
          {isSearchActive && searchQuery && (
            <div className="position-absolute d-flex align-items-center justify-content-center" style={{ top: 0, right: 0, width: "50px", height: "50px", cursor: "pointer", zIndex: 120 }} onClick={() => setSearchQuery("")}>
              <X size={18} style={{ color: darkMode ? "#f0f0f0" : "#333333" }} />
            </div>
          )}
        </div>
      </div>

      {/* Right Bottom: Theme & Zoom */}
      <div className="position-absolute bottom-0 end-0 m-4 d-flex flex-column gap-2 sync-transition" style={{ zIndex: 10, transform: (!isMobile && selectedCountry) ? "translateX(-400px)" : "translateX(0)" }}>
        <button onClick={() => setDarkMode(!darkMode)} className="btn shadow-sm d-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px", borderRadius: "15px", backgroundColor: darkMode ? "#333333" : "white", color: darkMode ? "#FFD93D" : "#3b82f6", border: "none" }}>{darkMode ? <Sun size={24} /> : <Moon size={24} />}</button>
        <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} darkMode={darkMode} />
      </div>

      {!isMobile && tooltipContent && (
        <div className="position-absolute top-0 start-50 translate-middle-x mt-3 px-3 py-1 shadow-sm" style={{ zIndex: 20, backgroundColor: darkMode ? "#333333" : "white", color: darkMode ? "#f0f0f0" : "#333333", fontWeight: "bold", borderRadius: "12px" }}>{tooltipContent}</div>
      )}
      <Sidebar selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} width={width} darkMode={darkMode} />
    </div>
  );
};

export default App;