# World Food Map 🍴🌍

An interactive, high-performance web application built with React and Vite that allows users to explore famous traditional cuisines from around the globe. Simply click on a country to discover its most iconic dishes, complete with high-quality imagery and cultural descriptions.

## 🚀 Features

- **Extreme Map Magnification**: Seamlessly zoom up to **128x** to explore even the smallest geographic details using `react-simple-maps`.
- **Pixel-Perfect Precision**: Advanced **Zoom-to-Mouse** logic ensures the map expands exactly where your cursor points, providing a professional navigation experience.
- **Global Cuisine Database**: Detailed, verified information for **28+ countries**, including:
  - **Asia**: South Korea, Japan, China, Thailand, Vietnam, Indonesia, Malaysia, Taiwan.
  - **Europe**: Italy, France, Spain, Germany, UK, Greece, Turkey, Switzerland, Belgium, Netherlands, Sweden, Denmark, Norway, Finland, Estonia, Latvia, Lithuania, Poland, Slovakia, Hungary, Ireland, Czechia, Austria.
  - **Americas & Oceania**: USA, Canada, Australia, New Zealand.
- **Verified Visuals**: Authentic food images sourced via direct **Wikimedia Commons API** links, ensuring reliable and high-quality loading.
- **Mobile-Responsive Layout**: Optimized for various screen sizes, including:
  - **Dynamic Viewport Height (dvh)** support to prevent bottom UI elements from being cut off by browser bars.
  - **Safe Area Support**: Ergonomic placement of controls to avoid overlapping with device notches or indicators.
- **Clean Architecture**: Highly modularized data structure with independent country modules for effortless maintenance and scaling.

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite
- **Mapping**: react-simple-maps, d3-geo
- **Icons**: Lucide React
- **Styling**: Bootstrap 5, Modern CSS (DVH, Safe Areas)
- **Deployment**: GitHub Pages

## 📂 Project Structure

```
src/
├── assets/             # Global assets (Logo, Favicon)
├── components/         # Modular UI (MapLayer, Sidebar, Header, ZoomControls)
├── data/               # Central data management
│   └── countries/      # Independent JS modules for each country's cuisine
├── App.jsx             # Main application and event logic
└── main.jsx            # Entry point
```

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/PW486/world-food-map.git
   cd world-food-map
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run in development mode**
   ```bash
   npm run dev
   ```

---
Developed with ❤️ for food lovers and explorers.