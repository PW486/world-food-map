// Name mapping: GeoJSON names -> Standardized keys used in foodData
export const geoNameMap = {
    "United States of America": "United States",
    "United Arab Emirates": "UAE",
    "Czech Republic": "Czechia",
    "Russian Federation": "Russia",
    "Republic of Korea": "South Korea",
    "Dem. Rep. Korea": "North Korea",
    "Lao PDR": "Laos",
    "Dominican Rep.": "Dominican Republic",
    "Côte d'Ivoire": "Ivory Coast",
    "Syrian Arab Republic": "Syria",
    "Macedonia": "North Macedonia",
    "Dem. Rep. Congo": "DRC",
    "Republic of the Congo": "Congo",
    "Brunei Darussalam": "Brunei",
    "Central African Rep.": "Central African Republic",
    "Eq. Guinea": "Equatorial Guinea",
    "S. Sudan": "South Sudan",
    "Solomon Is.": "Solomon Islands",
    "W. Sahara": "Western Sahara",
    "eSwatini": "Eswatini",
    "Falkland Is.": "Falkland Islands",
    "Timor-Leste": "East Timor",
    "Cabo Verde": "Cape Verde",
    "N. Cyprus": "Northern Cyprus",
    "Macao": "Macau",
    "Bosnia and Herz.": "Bosnia and Herzegovina"
};

export const mapGeoName = (name) => geoNameMap[name] || name;

// ISO 2-letter codes for FlagCDN icons
export const countryCodeMapping = {
    "Afghanistan": "af", "Albania": "al", "Algeria": "dz", "Andorra": "ad", "Angola": "ao", "Argentina": "ar",
    "Armenia": "am", "Australia": "au", "Austria": "at", "Azerbaijan": "az", "Bahamas": "bs", "Bahrain": "bh",
    "Bangladesh": "bd", "Belarus": "by", "Belgium": "be", "Belize": "bz", "Benin": "bj", "Bermuda": "bm", "Bhutan": "bt",
    "Bolivia": "bo", "Bosnia and Herzegovina": "ba", "Botswana": "bw", "Brazil": "br", "Brunei": "bn", "Bulgaria": "bg",
    "Burkina Faso": "bf", "Burundi": "bi", "Cambodia": "kh", "Cameroon": "cm", "Canada": "ca", "Cape Verde": "cv",
    "Central African Republic": "cf", "Chad": "td", "Chile": "cl", "China": "cn", "Colombia": "co", "Comoros": "km",
    "Congo": "cg", "Costa Rica": "cr", "Croatia": "hr", "Cuba": "cu", "Cyprus": "cy", "Czechia": "cz",
    "Denmark": "dk", "Djibouti": "dj", "Dominican Republic": "do", "DRC": "cd",
    "East Timor": "tl", "Ecuador": "ec", "Egypt": "eg", "El Salvador": "sv", "Equatorial Guinea": "gq",
    "Eritrea": "er", "Estonia": "ee", "Eswatini": "sz", "Ethiopia": "et", "Fiji": "fj", "Finland": "fi",
    "France": "fr", "Gabon": "ga", "Gambia": "gm", "Georgia": "ge", "Germany": "de", "Ghana": "gh",
    "Greece": "gr", "Greenland": "gl", "Guatemala": "gt", "Guinea": "gn", "Guinea-Bissau": "gw", "Guyana": "gy",
    "Haiti": "ht", "Honduras": "hn", "Hong Kong": "hk", "Hungary": "hu", "Iceland": "is", "India": "in",
    "Indonesia": "id", "Iran": "ir", "Iraq": "iq", "Ireland": "ie", "Israel": "il", "Italy": "it",
    "Ivory Coast": "ci", "Jamaica": "jm", "Japan": "jp", "Jordan": "jo", "Kazakhstan": "kz", "Kenya": "ke",
    "South Korea": "kr", "Kosovo": "xk", "Kuwait": "kw", "Kyrgyzstan": "kg", "Laos": "la", "Latvia": "lv",
    "Lebanon": "lb", "Lesotho": "ls", "Liberia": "lr", "Libya": "ly", "Liechtenstein": "li", "Lithuania": "lt",
    "Luxembourg": "lu", "Macau": "mo", "Madagascar": "mg", "Malawi": "mw", "Malaysia": "my", "Maldives": "mv", "Mali": "ml",
    "Malta": "mt", "Mauritania": "mr", "Mauritius": "mu", "Mexico": "mx", "Moldova": "md", "Mongolia": "mn",
    "Montenegro": "me", "Morocco": "ma", "Mozambique": "mz", "Myanmar": "mm", "Namibia": "na", "Nepal": "np",
    "Netherlands": "nl", "New Zealand": "nz", "Nicaragua": "ni", "Niger": "ne", "Nigeria": "ng", "North Korea": "kp",
    "North Macedonia": "mk", "Northern Cyprus": "cy", "Norway": "no", "Oman": "om", "Pakistan": "pk",
    "Palestine": "ps", "Panama": "pa", "Papua New Guinea": "pg", "Paraguay": "py", "Peru": "pe", "Philippines": "ph",
    "Poland": "pl", "Portugal": "pt", "Puerto Rico": "pr", "Qatar": "qa", "Romania": "ro", "Russia": "ru",
    "Rwanda": "rw", "Sao Tome and Principe": "st", "Saudi Arabia": "sa", "Senegal": "sn", "Serbia": "rs",
    "Seychelles": "sc", "Sierra Leone": "sl", "Singapore": "sg", "Slovakia": "sk", "Slovenia": "si",
    "Somalia": "so", "Somaliland": "so", "South Africa": "za", "South Sudan": "ss", "Spain": "es", "Sri Lanka": "lk",
    "Sudan": "sd", "Suriname": "sr", "Sweden": "se", "Switzerland": "ch", "Syria": "sy", "Taiwan": "tw",
    "Tajikistan": "tj", "Tanzania": "tz", "Thailand": "th", "Togo": "tg", "Trinidad and Tobago": "tt",
    "Tunisia": "tn", "Turkey": "tr", "Turkmenistan": "tm", "UAE": "ae", "Uganda": "ug", "United Kingdom": "gb",
    "Ukraine": "ua", "Uruguay": "uy", "United States": "us", "Uzbekistan": "uz", "Venezuela": "ve", "Vietnam": "vn",
    "Western Sahara": "eh", "Yemen": "ye", "Zambia": "zm", "Zimbabwe": "zw"
};

export const getCountryCode = (name) => countryCodeMapping[name] || null;

// Theme-based Color Palettes (Google Maps aesthetic)
export const MAP_COLORS = {
    LIGHT: {
        OCEAN: "#aadaff",
        LAND_DEFAULT: "#f5f5f5",
        LAND_TEMPERATE: "#aed581",
        LAND_DESERT: "#faeed1",
        LAND_COLD: "#e1f5fe",
        STROKE: "#ffffff",
        TEXT: "#374151"
    },
    DARK: {
        OCEAN: "#121212",
        LAND_DEFAULT: "#242424",
        LAND_TEMPERATE: "#1b3a20",
        LAND_DESERT: "#4a3728",
        LAND_COLD: "#2c3e50",
        STROKE: "#666666",
        TEXT: "#ffffff"
    }
};

const DESERT_COUNTRIES = new Set([
    "Saudi Arabia", "Egypt", "UAE", "Iraq", "Iran", "Algeria", "Libya", 
    "Oman", "Yemen", "Jordan", "Kuwait", "Qatar", "Bahrain", "Morocco", 
    "Tunisia", "Djibouti", "Somalia", "Sudan", "Chad", "Niger", "Mali", 
    "Mauritania", "Western Sahara", "Australia", "Namibia", "Botswana", 
    "Mexico", "Afghanistan", "Pakistan", "Kazakhstan", "Uzbekistan", 
    "Turkmenistan", "Syria", "Israel", "Mongolia", "Chile", "Eritrea"
]);

const COLD_COUNTRIES = new Set([
    "Russia", "Canada", "Norway", "Sweden", "Finland", "Iceland", 
    "Greenland", "Denmark", "Estonia", "Latvia", "Lithuania"
]);

export const getClimateType = (name) => {
    if (DESERT_COUNTRIES.has(name)) return "DESERT";
    if (COLD_COUNTRIES.has(name)) return "COLD";
    return "TEMPERATE";
};

// Custom centroid overrides for better label placement on fragmented territories
export const MANUAL_CENTROIDS = {
    "France": [2.2137, 46.6033],
    "United States": [-98.5795, 39.8283],
    "Norway": [8.4689, 61.4720],
    "Netherlands": [5.2913, 52.1326],
    "United Kingdom": [-3.4360, 54.5],
    "Spain": [-3.7492, 40.0],
    "Portugal": [-8.0, 39.5],
    "Malaysia": [109.0, 4.0],
    "Indonesia": [113.9213, -0.7893],
    "Japan": [138.2529, 36.2048]
};

// Hierarchical zoom levels for label visibility to prevent spatial clutter
export const LABEL_MIN_ZOOM = {
    // TIER 1: GLOBAL GIANTS & PRIMARY ANCHORS (Zoom 1.0 - 1.5)
    "Russia": 1, "Canada": 1, "United States": 1, "China": 1, "Brazil": 1, "Australia": 1, 
    "India": 1, "Greenland": 1, "South Korea": 1.2, "Japan": 1.2, "United Kingdom": 1.5, 
    "France": 1.5, "Germany": 1.5, "Mexico": 1.5, "Indonesia": 1.5, "Turkey": 1.5, 
    "Argentina": 1.5, "South Africa": 1.5, "Egypt": 1.5,

    // TIER 2: SECONDARY ANCHORS (Zoom 2.5)
    "Algeria": 2.5, "Kazakhstan": 2.5, "Saudi Arabia": 2.5, "Iran": 2.5, "Mongolia": 2.5, 
    "Peru": 2.5, "Sudan": 2.5, "DRC": 2.5, "Libya": 2.5, "Nigeria": 2.5, "Thailand": 2.5,
    "Vietnam": 2.5, "Ukraine": 2.5, "Poland": 2.5, "Italy": 2.5, "Spain": 2.5, "Colombia": 2.5,

    // TIER 3: REGIONAL DETAILS (Zoom 3.5 - 4.2)
    "Chile": 3.5, "Pakistan": 3.5, "Sweden": 3.5, "Norway": 4.0, "Finland": 4.0, "Romania": 4.0, 
    "Myanmar": 3.5, "Ethiopia": 3.5, "Tanzania": 3.5, "Kenya": 3.5, "Zambia": 4.0, 
    "Angola": 4.0, "Venezuela": 4.0, "Bolivia": 4.0, "Uzbekistan": 4.0, "Afghanistan": 4.0,
    "Iraq": 4.2, "Malaysia": 3.8, "Philippines": 3.8, "Morocco": 3.8,

    // TIER 4: DENSE REGIONS STAGE 1 (Zoom 4.8 - 5.5)
    "Portugal": 4.8, "Greece": 4.8, "Ireland": 5.2, "Denmark": 5.2, "Bulgaria": 5.2, 
    "Syria": 5.2, "Jordan": 5.5, "Azerbaijan": 5.5, "Georgia": 5.5, "Armenia": 5.8, 
    "Taiwan": 5.5, "Cambodia": 5.5, "Laos": 5.5, "Sri Lanka": 5.5, "Nepal": 5.5, 
    "Uruguay": 5.2, "Ecuador": 5.2, "Cuba": 4.8, "Ghana": 5.2, "Ivory Coast": 5.2, "Senegal": 5.2,
    "Serbia": 5.8, // Promoted from Tier 6

    // TIER 5: EUROPEAN CORE & MIDDLE EAST (Zoom 6.2 - 6.8)
    "Netherlands": 6.2, "Switzerland": 6.2, "Austria": 6.2, "Belgium": 6.5, "Czechia": 6.5, 
    "Slovakia": 6.5, "Hungary": 6.5, "Israel": 6.2, "Palestine": 6.2, "Lebanon": 6.5, 
    "Cyprus": 6.8, "Tunisia": 4.8, "Estonia": 5.5, "Latvia": 5.8, "Lithuania": 6.2,
    "Croatia": 6.0, "Albania": 6.8, // Promoted from Tier 6

    // TIER 6: HIGH-DENSITY REGIONS (Zoom 7.2 - 7.8)
    "Slovenia": 7.0, "North Macedonia": 7.2, "Bosnia and Herzegovina": 7.5,
    "Montenegro": 7.8, "Kosovo": 8.0,
    "Costa Rica": 7.2, "Panama": 7.2, "Honduras": 7.5, "Guatemala": 7.5, "Nicaragua": 7.5, 
    "El Salvador": 7.8, "Jamaica": 7.5, "Haiti": 7.8, "Dominican Republic": 7.8,

    // TIER 7+: MICROSTATES & SMALL ISLANDS (Zoom 8.5+)
    "Singapore": 8.5, "Hong Kong": 7.5, "Macau": 8.5, "Liechtenstein": 9.5, "Andorra": 9.5, 
    "Monaco": 10.5, "San Marino": 10.5, "Vatican City": 11, "Luxembourg": 7.2, "Malta": 8.5, 
    "Bahrain": 8.5, "Qatar": 7.5, "Kuwait": 7.5, "Brunei": 8.0, "Maldives": 9.5, 
    "Seychelles": 9.5, "Mauritius": 9.0, "Trinidad and Tobago": 7.5, "Cape Verde": 8.0
};
