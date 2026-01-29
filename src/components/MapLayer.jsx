import React from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import { foodData } from "../data/foodData";
import { getCountryColor, mapGeoName } from "../utils/countryMapping";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

const MapLayer = ({ width, height, position, handleMoveEnd, handleCountryClick, selectedCountry, setTooltipContent, animationMode, darkMode, onMapClick }) => {
  const isMobile = width < 600;
  const getScale = () => {
    if (width < 600) return (width / 6.5);
    return 150;
  };

  return (
    <div 
      id="map-container"
      className="position-absolute top-0 start-0 w-100 h-100" 
      style={{ zIndex: 0, touchAction: "none" }} 
      onClick={onMapClick}
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
          minZoom={1}
          maxZoom={128}
          className={animationMode === "fast" ? "map-animating-fast" : (animationMode === "slow" ? "map-animating-slow" : "")}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) => (
              <>
                {geographies.map((geo) => {
                  const geoName = mapGeoName(geo.properties.name);
                  const isSelected = selectedCountry === geoName;
                  const hasData = !!foodData[geoName];
                  const countryColor = getCountryColor(geoName);
                  
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => !isMobile && setTooltipContent(geoName)}
                      onMouseLeave={() => !isMobile && setTooltipContent("")}
                      onClick={() => {
                        const centroid = geoCentroid(geo);
                        handleCountryClick(geo, centroid);
                      }}
                      style={{
                        default: {
                          fill: hasData ? countryColor : (darkMode ? "#2d2d2d" : "#f8fafc"),
                          outline: "none",
                          stroke: darkMode ? "#444444" : "#666666",
                          strokeWidth: 0.5,
                          vectorEffect: "non-scaling-stroke",
                          opacity: isSelected ? 1 : (hasData ? 0.7 : 1),
                          transition: "all 0.3s ease"
                        },
                        hover: {
                          fill: hasData ? countryColor : (darkMode ? "#3d3d3d" : "#f1f5f9"),
                          outline: "none",
                          stroke: darkMode ? "#555555" : "#666666",
                          strokeWidth: 0.5,
                          vectorEffect: "non-scaling-stroke",
                          opacity: 1,
                          cursor: hasData ? "pointer" : "default",
                        },
                        pressed: {
                          fill: hasData ? countryColor : (darkMode ? "#1d1d1d" : "#cbd5e1"),
                          outline: "none",
                          stroke: darkMode ? "#555555" : "#666666",
                          strokeWidth: 0.5,
                          vectorEffect: "non-scaling-stroke",
                          opacity: 0.8
                        },
                      }}
                    />
                  );
                })}
              </>
            )}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default MapLayer;