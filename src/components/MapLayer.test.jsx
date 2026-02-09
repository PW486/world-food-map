import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MapLayer from './MapLayer';

// Mock dependencies
vi.mock("../data/foodData", () => ({
  foodData: {
    "Test Country": { some: "data" },
    "Long Country Name For Testing": { some: "data" }
  }
}));

vi.mock("../utils/countryMapping", () => ({
  mapGeoName: (name) => name,
  getClimateType: () => "TEMPERATE",
  LABEL_MIN_ZOOM: { 
    "Test Country": 1,
    "Long Country Name For Testing": 1 
  },
  MANUAL_CENTROIDS: {},
  MAP_COLORS: {
    LIGHT: { OCEAN: "#fff", TEXT: "#000", STROKE: "#333", LAND_DEFAULT: "#eee", LAND_TEMPERATE: "#aaa" },
    DARK: { OCEAN: "#000", TEXT: "#fff", STROKE: "#ccc", LAND_DEFAULT: "#333", LAND_TEMPERATE: "#555" }
  }
}));

// Mock react-simple-maps
vi.mock("react-simple-maps", () => ({
  ComposableMap: ({ children }) => <svg>{children}</svg>,
  ZoomableGroup: ({ children }) => <g>{children}</g>,
  Geographies: ({ children }) => {
    const geographies = [
      { rsmKey: "geo-1", properties: { name: "Test Country" } },
      { rsmKey: "geo-2", properties: { name: "Long Country Name For Testing" } }
    ];
    return children({ geographies });
  },
  Geography: () => <path data-testid="geography" />,
  Marker: ({ children }) => <g data-testid="marker">{children}</g>
}));

// Mock d3-geo
vi.mock("d3-geo", () => ({
  geoCentroid: () => [0, 0]
}));

describe('MapLayer', () => {
  it('renders labels with correct transform scaling', () => {
    const props = {
      width: 800,
      height: 600,
      position: { zoom: 2, coordinates: [0, 0] },
      handleMoveEnd: vi.fn(),
      handleCountryClick: vi.fn(),
      selectedCountry: null,
      setTooltipContent: vi.fn(),
      animationMode: null,
      darkMode: false,
      onMapClick: vi.fn(),
      isTouchDevice: false
    };

    render(<MapLayer {...props} />);

    // --- Single Line Label Test ---
    const textElement = screen.getByText("Test Country").closest('text');
    expect(textElement).toBeInTheDocument();
    
    // Check for transform scale
    // Desktop baseFontSize = 10.0
    // labelFontSize = 10.0 / Math.pow(2, 0.8) ≈ 5.743
    // virtualFontSize = 10
    // scale = 0.5743
    const transform = textElement.getAttribute('transform');
    expect(transform).toMatch(/scale\(0\.57/);

    // Check fontSize is virtualFontSize (10)
    expect(textElement).toHaveAttribute('font-size', '10');
    
    // Check dominant-baseline
    expect(textElement).toHaveAttribute('dominant-baseline', 'central');


    // --- Multi-line Label Test ---
    // "Long Country Name For Testing" (5 words, > 15 chars) -> Should be multi-line
    // We can't query by full text because it's split into tspans.
    // Let's find one of the words.
    const wordElement = screen.getByText("Long").closest('text');
    expect(wordElement).toBeInTheDocument();

    const tspanElements = wordElement.querySelectorAll('tspan');
    expect(tspanElements.length).toBe(5); // 5 words

    // Check y coordinates of tspans
    // i=0: y = -2 * 11 = -22
    // i=1: y = -1 * 11 = -11
    // i=2: y = 0 * 11 = 0
    // i=3: y = 1 * 11 = 11
    // i=4: y = 2 * 11 = 22
    
    // Check first tspan (i=0)
    expect(tspanElements[0].getAttribute('y')).toBe("-22");
    
    // Check middle tspan (i=2)
    expect(tspanElements[2].getAttribute('y')).toBe("0");

    // Check last tspan (i=4)
    expect(tspanElements[4].getAttribute('y')).toBe("22");
  });
});
