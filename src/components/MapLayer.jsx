import React, { useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import { foodData } from "../data/foodData";
import { mapGeoName, MAP_COLORS, MANUAL_CENTROIDS, LABEL_MIN_ZOOM, getClimateType } from "../utils/countryMapping";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

/**
 * Geography style generator
 */
const getGeographyStyle = ({ isMobile, isSelected, isHovered, hasData, theme, fillColor }) => {
  const baseStyle = {
    outline: "none",
    strokeWidth: 0.5,
    vectorEffect: "non-scaling-stroke",
    transition: "all 0.3s ease",
  };

  const shouldHighlight = hasData && !isMobile && (isHovered || isSelected);
  const filter = shouldHighlight ? "brightness(0.9)" : "none";

  return {
    default: { ...baseStyle, fill: fillColor, stroke: theme.STROKE, filter, opacity: 1 },
    hover: { 
      ...baseStyle, 
      fill: fillColor, 
      filter: hasData && !isMobile ? "brightness(0.9)" : "none", 
      stroke: theme.STROKE, 
      opacity: 1, 
      cursor: hasData ? "pointer" : "default" 
    },
    pressed: { ...baseStyle, fill: fillColor, stroke: theme.STROKE, opacity: 1 },
  };
};

/**
 * Label visibility logic with staggered tiers for mobile
 */
const getLabelVisibilityThreshold = (countryName, isMobile) => {
  const baseMinZoom = LABEL_MIN_ZOOM[countryName] || 4.5;
  if (!isMobile) return baseMinZoom;

  // Major anchors (Tier 1 & 1.5) always visible
  if (baseMinZoom <= 1.5) return 1.0;

  // Tier 2+ spread out linearly
  return 4.0 + (baseMinZoom - 1.5) * 2.0;
};

const MapLayer = ({ 
  width, height, position, handleMoveEnd, handleCountryClick, 
  selectedCountry, setTooltipContent, animationMode, darkMode, onMapClick 
}) => {
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const isMobile = width < 600;
  const theme = darkMode ? MAP_COLORS.DARK : MAP_COLORS.LIGHT;

  const scale = useMemo(() => (width < 600 ? width / 6.5 : 150), [width]);

  // Dynamic font size: visual size grows slightly with zoom (power 0.8)
  const baseFontSize = isMobile ? 8.0 : 10.0;
  const labelFontSize = baseFontSize / Math.pow(position.zoom, 0.8);

  const labelStyle = {
    fontFamily: "system-ui, -apple-system, sans-serif",
    fill: theme.TEXT,
    paintOrder: "stroke",
    stroke: darkMode ? "#000000" : "#ffffff",
    strokeWidth: labelFontSize / 5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    pointerEvents: "auto",
    cursor: "pointer",
    fontWeight: 600,
    opacity: 0.9
  };

  return (
    <div 
      id="map-container"
      className="position-absolute top-0 start-0 w-100 h-100" 
      style={{ zIndex: 0, touchAction: "none", backgroundColor: theme.OCEAN }} 
      onClick={onMapClick}
    >
      <ComposableMap width={width} height={height} projection="geoMercator" projectionConfig={{ scale }}>
        <ZoomableGroup 
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
          minZoom={1}
          maxZoom={128}
          className={animationMode === "fast" ? "map-animating-fast" : (animationMode === "slow" ? "map-animating-slow" : "")}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) => {
              // Cache centroids to ensure position stability during animations
              const centroids = {};
              geographies.forEach(geo => {
                const name = mapGeoName(geo.properties.name);
                centroids[name] = MANUAL_CENTROIDS[name] || geoCentroid(geo);
              });

              return (
                <>
                  {/* Map Shapes */}
                  {geographies.map((geo) => {
                    const name = mapGeoName(geo.properties.name);
                    const climate = getClimateType(name);
                    const hasData = !!foodData[name];
                    const fillColor = hasData ? theme[`LAND_${climate}`] : theme.LAND_DEFAULT;

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() => !isMobile && (setTooltipContent(name), setHoveredCountry(name))}
                        onMouseLeave={() => !isMobile && (setTooltipContent(""), setHoveredCountry(null))}
                        onClick={() => handleCountryClick(geo, centroids[name])}
                        style={getGeographyStyle({
                          isMobile, isSelected: selectedCountry === name, 
                          isHovered: hoveredCountry === name, hasData, theme, fillColor
                        })}
                      />
                    );
                  })}

                  {/* Labels & Hit Areas */}
                  {geographies.map((geo) => {
                    const name = mapGeoName(geo.properties.name);
                    if (!foodData[name]) return null;
                    if (position.zoom < getLabelVisibilityThreshold(name, isMobile)) return null;

                    const centroid = centroids[name];
                    return (
                      <Marker key={`${geo.rsmKey}-label`} coordinates={centroid}>
                        {/* Invisible expanded hit area for easier mobile tapping */}
                        {isMobile && (
                          <circle
                            r={labelFontSize * 2.5}
                            fill="transparent"
                            style={{ cursor: "pointer", pointerEvents: "auto" }}
                            onClick={(e) => (e.stopPropagation(), handleCountryClick(geo, centroid))}
                          />
                        )}
                        <text
                          dy="0.33em"
                          fontSize={labelFontSize}
                          textAnchor="middle"
                          onMouseEnter={() => !isMobile && (setTooltipContent(name), setHoveredCountry(name))}
                          onMouseLeave={() => !isMobile && (setTooltipContent(""), setHoveredCountry(null))}
                          onClick={(e) => (e.stopPropagation(), handleCountryClick(geo, centroid))}
                          style={labelStyle}
                        >
                          {name}
                        </text>
                      </Marker>
                    );
                  })}
                </>
              );
            }}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default MapLayer;