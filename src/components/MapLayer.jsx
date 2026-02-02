import React, { useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import { foodData } from "../data/foodData";
import { mapGeoName, MAP_COLORS, MANUAL_CENTROIDS, LABEL_MIN_ZOOM, getClimateType } from "../utils/countryMapping";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

/**
 * Calculates dynamic styles for map geographies based on state.
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
    default: {
      ...baseStyle,
      fill: fillColor,
      stroke: theme.STROKE,
      filter: filter,
      opacity: 1,
    },
    hover: {
      ...baseStyle,
      fill: fillColor,
      filter: hasData && !isMobile ? "brightness(0.9)" : "none",
      stroke: theme.STROKE,
      opacity: 1,
      cursor: hasData ? "pointer" : "default",
    },
    pressed: {
      ...baseStyle,
      fill: fillColor,
      stroke: theme.STROKE,
      opacity: 1,
    },
  };
};

/**
 * Determines when a country label should become visible based on zoom level.
 * Implements a staggered approach for mobile to prevent clutter.
 */
const getLabelVisibilityThreshold = (countryName, isMobile) => {
  const baseMinZoom = LABEL_MIN_ZOOM[countryName] || 4.5;
  if (!isMobile) return baseMinZoom;

  // Tier 1 & 1.5 (Major Anchors): Visible even at lower zooms (zoomed out)
  // Allows visibility down to zoom 2.5 (below initial zoom of 4.0)
  if (baseMinZoom <= 1.5) return 2.5;

  // Tier 2+ (Secondary): Spread out aggressively as user zooms in
  // Formula: InitialZoom + (TierOffset * SpreadFactor)
  // Example: Tier 2 (2.5) -> 4.0 + 1.0 * 2.0 = 6.0
  // Example: Tier 3 (3.5) -> 4.0 + 2.0 * 2.0 = 8.0
  const spreadFactor = 2.0;
  return 4.0 + (baseMinZoom - 1.5) * spreadFactor;
};

const MapLayer = ({ 
  width, 
  height, 
  position, 
  handleMoveEnd, 
  handleCountryClick, 
  selectedCountry, 
  setTooltipContent, 
  animationMode, 
  darkMode, 
  onMapClick 
}) => {
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const isMobile = width < 600;
  const theme = darkMode ? MAP_COLORS.DARK : MAP_COLORS.LIGHT;

  const scale = useMemo(() => {
    return width < 600 ? (width / 6.5) : 150;
  }, [width]);

  // Calculate dynamic font size to keep visual size relatively constant but slightly increasing
  const baseFontSize = isMobile ? 8.0 : 10.0;
  const labelFontSize = baseFontSize / Math.pow(position.zoom, 0.8);

  const getLabelStyle = (theme, labelFontSize, darkMode) => ({
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
  });

  return (
    <div 
      id="map-container"
      className="position-absolute top-0 start-0 w-100 h-100" 
      style={{ 
        zIndex: 0, 
        touchAction: "none",
        backgroundColor: theme.OCEAN 
      }} 
      onClick={onMapClick}
    >
      <ComposableMap 
        width={width}
        height={height}
        projection="geoMercator" 
        projectionConfig={{ scale }} 
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
                {/* 1. Render Map Geometries */}
                {geographies.map((geo) => {
                  const geoName = mapGeoName(geo.properties.name);
                  const isSelected = selectedCountry === geoName;
                  const isHovered = hoveredCountry === geoName;
                  const hasData = !!foodData[geoName];
                  
                  const climate = getClimateType(geoName);
                  const fillColor = hasData ? theme[`LAND_${climate}`] : theme.LAND_DEFAULT;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        if (!isMobile) {
                          setTooltipContent(geoName);
                          setHoveredCountry(geoName);
                        }
                      }}
                      onMouseLeave={() => {
                        if (!isMobile) {
                          setTooltipContent("");
                          setHoveredCountry(null);
                        }
                      }}
                      onClick={() => {
                        const centroid = geoCentroid(geo);
                        handleCountryClick(geo, centroid);
                      }}
                      style={getGeographyStyle({
                        isMobile,
                        isSelected,
                        isHovered,
                        hasData,
                        theme,
                        fillColor
                      })}
                    />
                  );
                })}

                {/* 2. Render Country Labels */}
                {geographies.map((geo) => {
                  const geoName = mapGeoName(geo.properties.name);
                  if (!foodData[geoName]) return null;

                  // Visibility Check
                  const visibilityThreshold = getLabelVisibilityThreshold(geoName, isMobile);
                  if (position.zoom < visibilityThreshold) return null;

                  const centroid = MANUAL_CENTROIDS[geoName] || geoCentroid(geo);
                  
                  return (
                    <Marker key={`${geo.rsmKey}-label`} coordinates={centroid}>
                      <text
                        dy="0.33em"
                        fontSize={labelFontSize}
                        textAnchor="middle"
                        onMouseEnter={() => !isMobile && setHoveredCountry(geoName)}
                        onMouseLeave={() => !isMobile && setHoveredCountry(null)}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCountryClick(geo, centroid);
                        }}
                        style={getLabelStyle(theme, labelFontSize, darkMode)}
                      >
                        {geoName}
                      </text>
                    </Marker>
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
