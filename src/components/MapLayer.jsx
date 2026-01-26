import React from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { foodData } from "../data/foodData";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

const MapLayer = ({ width, height, position, handleMoveEnd, handleCountryClick, selectedCountry, setTooltipContent }) => {
  const getScale = () => {
    if (width < 600) return (width / 6.5);
    return 150;
  };

  return (
    <div 
      id="map-container"
      className="position-absolute top-0 start-0 w-100 h-100" 
      style={{ zIndex: 0, touchAction: "none" }} 
    >
      <ComposableMap 
          width={width}
          height={height}
          projection="geoMercator" 
          projectionConfig={{ scale: getScale() }} 
      >
          <ZoomableGroup 
              zoom={position.zoom}
              center={position.coordinates}
              onMoveEnd={handleMoveEnd}
              minZoom={0.5}
              maxZoom={24}
          >
          <Geographies geography={GEO_URL}>
              {({ geographies }) => (
              <>
                  {geographies.map((geo) => {
                      const isSelected = selectedCountry === geo.properties.name || (selectedCountry === 'USA' && geo.properties.name === "United States of America");
                      const hasData = foodData[geo.properties.name] || (geo.properties.name === "United States of America" && foodData["USA"]);
                      
                      return (
                      <Geography
                          key={geo.rsmKey + "-fill"}
                          geography={geo}
                          onMouseEnter={() => setTooltipContent(geo.properties.name)}
                          onMouseLeave={() => setTooltipContent("")}
                          onClick={() => handleCountryClick(geo)}
                          style={{
                          default: {
                              fill: isSelected ? "#1e3a8a" : (hasData ? "#3b82f6" : "#ffffff"),
                              outline: "none",
                              transition: "fill 0.3s ease"
                          },
                          hover: {
                              fill: hasData ? "#1e3a8a" : "#e0f2fe",
                              outline: "none",
                              cursor: "pointer"
                          },
                          pressed: {
                              fill: "#172554",
                              outline: "none",
                          },
                          }}
                      />
                      );
                  })}
                  
                  {geographies.map((geo) => (
                      <Geography
                          key={geo.rsmKey + "-stroke"}
                          geography={geo}
                          style={{
                              default: {
                                  fill: "none",
                                  stroke: "#cbd5e1",
                                  strokeWidth: 0.5,
                                  strokeLinejoin: "round",
                                  strokeLinecap: "round",
                                  pointerEvents: "none",
                                  vectorEffect: "non-scaling-stroke"
                              }
                          }}
                      />
                  ))}
              </>
              )}
          </Geographies>
          </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default MapLayer;
