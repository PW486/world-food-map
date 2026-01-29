// Centralized name mapping: GeoJSON names -> Our Data Keys
export const geoNameMap = {
    "United States of America": "USA",
    "United States": "USA",
    "United Kingdom": "UK",
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
    "Bosnia and Herz.": "Bosnia and Herz.",
    "Bosnia and Herzegovina": "Bosnia and Herz.",
    "Trinidad and Tobago": "Trinidad and Tobago",
    "Dem. Rep. Congo": "Democratic Republic of the Congo",
    "Congo, Dem. Rep. of the": "Democratic Republic of the Congo",
    "Congo": "Republic of the Congo",
    "Republic of the Congo": "Republic of the Congo",
    "Brunei Darussalam": "Brunei",
    "Central African Rep.": "Central African Republic",
    "Eq. Guinea": "Equatorial Guinea",
    "S. Sudan": "South Sudan",
    "South Sudan": "South Sudan",
    "Solomon Is.": "Solomon Islands",
    "W. Sahara": "Western Sahara",
    "eSwatini": "Eswatini",
    "Falkland Is.": "Falkland Islands",
    "Timor-Leste": "East Timor",
    "Puerto Rico": "Puerto Rico",
    "Bermuda": "Bermuda",
    "Cabo Verde": "Cape Verde",
    "Guinea-Bissau": "Guinea-Bissau",
    "Sao Tome and Principe": "Sao Tome and Principe",
    "Somaliland": "Somaliland",
    "Bahrain": "Bahrain",
    "Belize": "Belize",
    "N. Cyprus": "Northern Cyprus"
};

export const mapGeoName = (name) => geoNameMap[name] || name;

// ISO 2-letter codes for FlagCDN
export const countryCodeMapping = {
    "Afghanistan": "af", "Albania": "al", "Algeria": "dz", "Andorra": "ad", "Angola": "ao", "Argentina": "ar",
    "Armenia": "am", "Australia": "au", "Austria": "at", "Azerbaijan": "az", "Bahamas": "bs", "Bahrain": "bh",
    "Bangladesh": "bd", "Belarus": "by", "Belgium": "be", "Belize": "bz", "Benin": "bj", "Bermuda": "bm", "Bhutan": "bt",
    "Bolivia": "bo", "Bosnia and Herz.": "ba", "Botswana": "bw", "Brazil": "br", "Brunei": "bn", "Bulgaria": "bg",
    "Burkina Faso": "bf", "Burundi": "bi", "Cambodia": "kh", "Cameroon": "cm", "Canada": "ca", "Cape Verde": "cv",
    "Central African Republic": "cf", "Chad": "td", "Chile": "cl", "China": "cn", "Colombia": "co", "Comoros": "km",
    "Republic of the Congo": "cg", "Costa Rica": "cr", "Croatia": "hr", "Cuba": "cu", "Cyprus": "cy", "Czechia": "cz",
    "Denmark": "dk", "Djibouti": "dj", "Dominican Republic": "do", "Democratic Republic of the Congo": "cd",
    "East Timor": "tl", "Ecuador": "ec", "Egypt": "eg", "El Salvador": "sv", "Equatorial Guinea": "gq",
    "Eritrea": "er", "Estonia": "ee", "Eswatini": "sz", "Ethiopia": "et", "Fiji": "fj", "Finland": "fi",
    "France": "fr", "Gabon": "ga", "Gambia": "gm", "Georgia": "ge", "Germany": "de", "Ghana": "gh",
    "Greece": "gr", "Greenland": "gl", "Guatemala": "gt", "Guinea": "gn", "Guinea-Bissau": "gw", "Guyana": "gy",
    "Haiti": "ht", "Honduras": "hn", "Hong Kong": "hk", "Hungary": "hu", "Iceland": "is", "India": "in",
    "Indonesia": "id", "Iran": "ir", "Iraq": "iq", "Ireland": "ie", "Israel": "il", "Italy": "it",
    "Ivory Coast": "ci", "Jamaica": "jm", "Japan": "jp", "Jordan": "jo", "Kazakhstan": "kz", "Kenya": "ke",
    "South Korea": "kr", "Kosovo": "xk", "Kuwait": "kw", "Kyrgyzstan": "kg", "Laos": "la", "Latvia": "lv",
    "Lebanon": "lb", "Lesotho": "ls", "Liberia": "lr", "Libya": "ly", "Liechtenstein": "li", "Lithuania": "lt",
    "Luxembourg": "lu", "Madagascar": "mg", "Malawi": "mw", "Malaysia": "my", "Maldives": "mv", "Mali": "ml",
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
    "Tunisia": "tn", "Turkey": "tr", "Turkmenistan": "tm", "UAE": "ae", "Uganda": "ug", "UK": "gb",
    "Ukraine": "ua", "Uruguay": "uy", "USA": "us", "Uzbekistan": "uz", "Venezuela": "ve", "Vietnam": "vn",
    "Western Sahara": "eh", "Yemen": "ye", "Zambia": "zm", "Zimbabwe": "zw"
};

export const getCountryCode = (name) => countryCodeMapping[name] || null;

const PINK = "#FF6B6B";
const ORANGE = "#FFA552"; 
const YELLOW = "#FFD93D";
const GREEN = "#6BCB77";
const BLUE = "#4D96FF";
const PURPLE = "#9D4EDD";

export const countryColorMapping = {
    "Afghanistan": GREEN, "Albania": BLUE, "Algeria": GREEN, "Andorra": PINK, "Angola": PINK, "Argentina": PINK,
    "Armenia": ORANGE, "Australia": YELLOW, "Austria": YELLOW, "Azerbaijan": YELLOW, "Bahamas": PURPLE, "Bahrain": BLUE,
    "Bangladesh": ORANGE, "Belarus": PURPLE, "Belgium": BLUE, "Belize": GREEN, "Benin": PINK, "Bermuda": ORANGE, "Bhutan": BLUE,
    "Bolivia": YELLOW, "Bosnia and Herz.": GREEN, "Botswana": YELLOW, "Brazil": GREEN, "Brunei": YELLOW, "Bulgaria": PURPLE,
    "Burkina Faso": GREEN, "Burundi": BLUE, "Cambodia": PURPLE, "Cameroon": YELLOW, "Canada": PURPLE, "Cape Verde": ORANGE,
    "Central African Republic": GREEN, "Chad": PURPLE, "Chile": BLUE, "China": ORANGE, "Colombia": PURPLE, "Comoros": YELLOW,
    "Republic of the Congo": ORANGE, "Costa Rica": PINK, "Croatia": PINK, "Cuba": PINK, "Cyprus": BLUE, "Czechia": PINK,
    "Denmark": BLUE, "Djibouti": BLUE, "Dominican Republic": BLUE, "Democratic Republic of the Congo": PURPLE,
    "East Timor": YELLOW, "Ecuador": ORANGE, "Egypt": PINK, "El Salvador": BLUE, "Equatorial Guinea": ORANGE,
    "Eritrea": GREEN, "Estonia": PINK, "Eswatini": GREEN, "Ethiopia": YELLOW, "Fiji": YELLOW, "Finland": GREEN,
    "France": PINK, "Gabon": PINK, "Gambia": GREEN, "Georgia": GREEN, "Germany": ORANGE, "Ghana": YELLOW,
    "Greece": ORANGE, "Greenland": BLUE, "Guatemala": YELLOW, "Guinea": BLUE, "Guinea-Bissau": PINK, "Guyana": BLUE,
    "Haiti": GREEN, "Honduras": PURPLE, "Hong Kong": PINK, "Hungary": GREEN, "Iceland": ORANGE, "India": PURPLE,
    "Indonesia": PINK, "Iran": BLUE, "Iraq": PURPLE, "Ireland": YELLOW, "Israel": YELLOW, "Italy": BLUE,
    "Ivory Coast": PINK, "Jamaica": YELLOW, "Japan": PURPLE, "Jordan": PINK, "Kazakhstan": PURPLE, "Kenya": ORANGE,
    "South Korea": PINK, "Kosovo": PINK, "Kuwait": PINK, "Kyrgyzstan": GREEN, "Laos": BLUE, "Latvia": YELLOW,
    "Lebanon": PINK, "Lesotho": GREEN, "Liberia": ORANGE, "Libya": YELLOW, "Liechtenstein": GREEN, "Lithuania": GREEN,
    "Luxembourg": YELLOW, "Madagascar": ORANGE, "Malawi": BLUE, "Malaysia": BLUE, "Maldives": ORANGE, "Mali": ORANGE,
    "Malta": ORANGE, "Mauritania": PINK, "Mauritius": PURPLE, "Mexico": PINK, "Moldova": PINK, "Mongolia": PINK,
    "Montenegro": YELLOW, "Morocco": BLUE, "Mozambique": PURPLE, "Myanmar": PINK, "Namibia": GREEN, "Nepal": PINK,
    "Netherlands": GREEN, "New Zealand": GREEN, "Nicaragua": ORANGE, "Niger": BLUE, "Nigeria": GREEN, "North Korea": YELLOW,
    "North Macedonia": GREEN, "Northern Cyprus": YELLOW, "Norway": PINK, "Oman": YELLOW, "Pakistan": YELLOW,
    "Palestine": GREEN, "Panama": YELLOW, "Papua New Guinea": PURPLE, "Paraguay": ORANGE, "Peru": BLUE, "Philippines": YELLOW,
    "Poland": YELLOW, "Portugal": GREEN, "Puerto Rico": PURPLE, "Qatar": BLUE, "Romania": BLUE, "Russia": BLUE,
    "Rwanda": GREEN, "Sao Tome and Principe": BLUE, "Saudi Arabia": ORANGE, "Senegal": YELLOW, "Serbia": ORANGE,
    "Seychelles": ORANGE, "Sierra Leone": PURPLE, "Singapore": PURPLE, "Slovakia": PURPLE, "Slovenia": PURPLE,
    "Somalia": PURPLE, "Somaliland": BLUE, "South Africa": PINK, "South Sudan": PINK, "Spain": YELLOW, "Sri Lanka": BLUE,
    "Sudan": ORANGE, "Suriname": YELLOW, "Sweden": YELLOW, "Switzerland": GREEN, "Syria": BLUE, "Taiwan": PURPLE,
    "Tajikistan": BLUE, "Tanzania": PINK, "Thailand": ORANGE, "Togo": GREEN, "Trinidad and Tobago": ORANGE,
    "Tunisia": PURPLE, "Turkey": PINK, "Turkmenistan": YELLOW, "UAE": GREEN, "Uganda": YELLOW, "UK": PURPLE,
    "Ukraine": ORANGE, "Uruguay": YELLOW, "USA": ORANGE, "Uzbekistan": PINK, "Venezuela": PINK, "Vietnam": GREEN,
    "Western Sahara": GREEN, "Yemen": PINK, "Zambia": ORANGE, "Zimbabwe": GREEN
};

export const getCountryColor = (name) => countryColorMapping[name] || "#f8fafc";
