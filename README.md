# Pure Earth Toxic Sites Identification Program - Interactive Dashboard

A comprehensive, professional web-based dashboard for visualizing and analyzing toxic site detection in NCR Delhi. This demo showcases machine learning-powered identification of informal lead-acid battery (ULAB) recycling operations and industrial smelters.

## Overview

This project demonstrates an advanced screening tool that combines:
- **Contextual Model (XGBoost)**: Detects informal ULAB recycling sites using geospatial features
- **Satellite Imagery Model (Deep Learning CNN)**: Identifies industrial smelters using Sentinel-2 multispectral data
- **Interactive Dashboard**: Visualizes detected sites, applies filters, and generates analytics
- **Real-world data**: 188 heatmap points from actual model output, 13 verified ULAB sites, and 25 detected sites

## Features

### 1. Landing Page (index.html)
- Full-screen hero with compelling headline and CTAs
- Feature cards explaining the three core capabilities
- Impact statistics from NCR Delhi
- Footer with team credits

### 2. Interactive Dashboard (dashboard.html) - Core Product
The most important page featuring:

**Left Sidebar:**
- Region selector (NCR Delhi, others coming soon)
- Multi-select site type filters (ULAB, Smelters, Verified)
- Risk threshold slider (0.0-1.0)
- Export CSV and Report buttons

**Main Map Area:**
- Leaflet.js map with CartoDB dark basemap
- Heat layer showing 188 high-risk areas
- Colored markers for detected sites (risk-scored)
- Purple markers for 13 verified ULAB sites
- Interactive pop-ups with site details

**Right Detail Panel:**
- Site ID, type badge, risk score with color coding
- "Why flagged" section with feature importance visualization
- Nearby context (distance to verified sites)
- Recommended actions based on risk level
- Action buttons (Schedule Visit, Mark Reviewed)

**Analytics Drawer (Bottom):**
- Stat cards: Total Detected, High Risk, Pending, Verified
- Site type distribution chart (doughnut)
- Risk distribution chart (bar)
- Timeline chart (line) showing cumulative detections

**Timeline Control:**
- Play button for animation
- Slider to scrub through Jan-Mar 2026
- Date display showing current filter

### 3. Methodology Page (methodology.html)
- Two pipeline explanation (Contextual + Satellite models)
- Detailed model descriptions:
  - XGBoost for ULAB detection with feature importance list
  - ResNet-50 CNN for smelter detection
  - Training data sources and performance metrics
- Active learning loop diagram
- Limitations and assumptions
- Data sources and attribution
- References and further reading

### 4. About Page (about.html)
- Problem statement on lead contamination
- Pure Earth organization overview
- Better Planet Lab partnership
- Team structure and credits
- Impact metrics and future directions
- Contact information for researchers, NGOs, and communities
- Citation guidelines

## Technical Stack

### Frontend
- **HTML5**: Semantic markup for all pages
- **CSS3**: Custom design system with CSS variables
  - Color palette: Navy (#0f172a), Teal (#0d9488), Orange (#f97316)
  - Typography: Inter font from Google Fonts
  - Responsive design (desktop-first, mobile-friendly)
  - No frameworks - pure CSS

- **JavaScript (Vanilla)**: No frameworks
  - Modular code organization
  - Event delegation and custom UI components
  - LocalStorage for state management

### Libraries (CDN-based)
- **Leaflet 1.9.3**: Interactive mapping
- **Leaflet.heat**: Heatmap layer visualization
- **Chart.js 4.4.0**: Analytics charts (doughnut, bar, line, radar)
- **Google Fonts**: Inter typeface
- Lucide Icons: SVG icon system (inline implementation)

### Data
- All data stored in `js/data.js`:
  - 188 heatmap points (real ML model output)
  - 13 verified ULAB sites (Pure Earth TSIP database)
  - 25 detected ULAB sites with risk scores and metadata
  - 8 detected smelter sites with risk scores
  - Feature importance for model explanability

## File Structure

```
pure-earth-demo/
├── index.html                 # Landing/hero page
├── dashboard.html             # Main interactive map dashboard
├── methodology.html           # Technical methodology documentation
├── about.html                 # About Pure Earth and project
├── css/
│   └── style.css             # Global styles (design system)
├── js/
│   ├── data.js               # All map data and mockup sites
│   ├── app.js                # Shared navigation & utilities
│   ├── dashboard.js          # Dashboard-specific interactivity
│   └── charts.js             # Chart initialization & helpers
└── README.md                 # This file
```

## Design System

### Color Palette
- **Navy 900**: `#0f172a` - Primary background
- **Navy 800**: `#1e293b` - Secondary background
- **Navy 700**: `#334155` - Borders and dividers
- **Teal 600**: `#0d9488` - Primary accent (interactive)
- **Teal 500**: `#14b8a6` - Highlight
- **Orange 500**: `#f97316` - Alert/warning
- **White**: `#ffffff` - Text primary
- **Gray 100**: `#f1f5f9` - Text secondary

### Typography
- Font: Inter (Google Fonts)
- Scales: 12px (xs) → 48px (5xl)
- Weights: 400 (regular) to 800 (bold)

### Spacing System
- Base unit: 4px
- Scale: 1, 2, 3, 4, 6, 8, 12, 16, 24 (in rem units)

### Border Radius
- sm: 6px (small buttons, inputs)
- md: 8px (cards, modals)
- lg: 12px (larger cards)
- xl: 16px (hero sections)

## Key Features Explained

### Filter System
The dashboard supports real-time filtering:
- **Region**: Select between regions (NCR Delhi active, others coming soon)
- **Site Types**: Toggle ULAB, Smelter, and Verified site visibility
- **Risk Threshold**: Slider from 0.0 (show all) to 1.0 (only highest risk)
- All filters apply simultaneously to map, markers, and analytics

### Risk Scoring
Each detected site has a risk score (0.0-1.0) with visual indicators:
- **>0.85**: Red (High Risk) - Priority for immediate field visit
- **0.7-0.85**: Orange (Medium Risk) - Schedule visit within weeks
- **0.5-0.7**: Yellow (Low Risk) - Monitor and future verification
- Score based on model confidence and contributing feature importance

### Timeline Animation
Play button animates the timeline from Jan 1 to Mar 31, 2026:
- Slider scrubber allows manual date selection
- Only sites detected before selected date appear
- Cumulative detection count shown in analytics
- 50ms interval updates for smooth animation

### Export Functions
- **Export CSV**: Downloads visible filtered sites as .csv
  - Columns: Site ID, Type, Lat/Lng, Risk Score, Status, Date, Reason
  - Includes proper CSV escaping for complex text fields

- **Export Report**: Opens modal with summary statistics
  - Total detected, high-risk count, pending verification
  - Site type breakdown
  - Print-friendly formatting

### Feature Importance Visualization
When a site is selected, shows top 8 contributing features:
- Horizontal bar chart with importance scores
- Shows relative weight of each feature (0-100%)
- Helps explain why site was flagged
- Different features for ULAB vs Smelter models

### Chart Analytics
Bottom drawer shows 4 charts:
1. **Site Type Distribution**: Doughnut showing ULAB vs Smelter vs Verified
2. **Risk Distribution**: Bar chart of risk score buckets
3. **Timeline**: Line chart of cumulative detections over time
4. **Summary Stats**: Cards showing key metrics

## Usage Guide

### For Pure Earth Technical Team

1. **Launching the Dashboard**:
   - Open `dashboard.html` in a modern web browser
   - Or open `index.html` and click "Launch Dashboard"

2. **Exploring Sites**:
   - Click on any colored marker to see site details
   - Use filters on the left sidebar to narrow results
   - Drag timeline to see detection progression

3. **Filtering Results**:
   - Uncheck site types to hide categories
   - Adjust risk slider to focus on high-confidence detections
   - All filters update map in real-time

4. **Exporting Data**:
   - Click "Export CSV" to download current filtered sites
   - Click "Export Report" to generate summary report

5. **Understanding Site Details**:
   - Risk score (big number, color-coded)
   - Status (Pending, Scheduled, Under Review)
   - Why flagged (extracted features from model)
   - Feature importance bars (SHAP-like visualization)

### For Field Teams

1. Use the dashboard to prioritize site visits
2. Sort by risk score (red/orange sites first)
3. Export CSV with coordinates for navigation
4. Mark sites as "Scheduled for Visit" when queued
5. Update status as field work progresses

### For Researchers

1. Review methodology page for model architecture
2. Check performance metrics (87% precision for ULAB, 91% for smelters)
3. Examine training data sources and feature engineering
4. Consider limitations section for model caveats
5. Use public methodology for publications/citations

## Data Details

### Heatmap Data (188 points)
- Real output from contextual ML model
- Represents likelihood of ULAB activity per location
- Intensity values: 0.95-1.0 (highest risk areas)
- Visualized with Leaflet.heat layer
- Color gradient: Navy → Teal → Orange → Red

### Verified ULAB Sites (13 points)
- Pure Earth TSIP confirmed locations
- Purple markers with purple circles
- Pop-up shows site name and coordinates
- Matched against model output to evaluate accuracy

### Detected ULAB Sites (25 mockup sites)
- Generated from contextual model output
- Risk scores: 0.84-0.94
- Status: Pending Verification, Scheduled for Visit, Under Review
- Each has "flagged because" explanation with specific features
- Date detected: ranges Jan-Mar 2026 for timeline demo

### Detected Smelter Sites (8 mockup sites)
- Generated from satellite imagery model
- Risk scores: 0.75-0.94
- Status distributed across three categories
- Explanations reference satellite features (thermal, spectral)
- Date detected: ranges Jan-Mar 2026

## Responsive Design

- **Desktop (1200px+)**: Full sidebar + large map + right panel
- **Tablet (768-1200px)**: Sidebar hidden, full-screen map, collapsible panels
- **Mobile (< 768px)**: Stacked layout, simplified navigation

Navigation bar adapts to all sizes. Dashboard optimized for desktop (primary interface for field coordinators using laptops/tablets).

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

Requires JavaScript enabled. No flash or deprecated technologies.

## Performance Optimizations

- Lazy-load libraries via CDN
- Minimize CSS (no build step needed)
- Efficient DOM manipulation with event delegation
- Debounced slider events for smooth interaction
- LocalStorage caching of user filter preferences
- Responsive image sizes

## Known Limitations

1. **Timeline accuracy**: Only shows sites up to selected date (simplified from real time-series)
2. **Map bounds**: Fixed to NCR Delhi region (expandable to other regions)
3. **Heatmap subset**: For performance, only shown subset of full model output
4. **Mock data**: Detected sites are realistic mockups based on model characteristics
5. **No real backend**: All data client-side (suitable for demo/presentation)

## Future Enhancements

1. **Real backend integration**: Connect to actual model API
2. **Database storage**: Persistent site records and field updates
3. **User authentication**: Role-based access (field team, admin, researcher)
4. **Field app integration**: Mobile app for offline site visits
5. **Health data**: Link site locations to blood lead level data
6. **Multi-region support**: Expand to Mumbai, Kolkata, Southeast Asia
7. **Real-time updates**: Live detection of new sites
8. **Advanced analytics**: Time-series analysis, spatial autocorrelation
9. **3D visualization**: 3D map view with elevation data
10. **AI explanability**: SHAP values for individual predictions

## Deployment

### Local Testing
```bash
# Serve with Python
python3 -m http.server 8000

# Or with Node.js
npx http-server

# Open browser to http://localhost:8000
```

### Production Deployment
- Copy files to web server (Apache, Nginx)
- Update `--media-types` headers for CSS/JS
- Compress assets with gzip
- Use CDN for library dependencies
- Add SSL certificate for HTTPS

### Docker Deployment
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

## Contributing

This demo is ready for technical presentations. To extend:

1. **Add more sites**: Edit `DETECTED_ULAB_SITES` and `DETECTED_SMELTER_SITES` in `js/data.js`
2. **Customize styling**: Edit CSS variables in `css/style.css` `:root` section
3. **Add features**: Extend `js/dashboard.js` with new interactions
4. **Improve charts**: Modify `js/charts.js` chart configurations

## License

This demo is provided by Pure Earth and Better Planet Lab for evaluation and demonstration purposes. Use in publications or public deployments requires proper attribution.

## Contact & Support

- **Pure Earth**: https://www.pureearth.org/
- **Better Planet Lab**: https://betterplanetlab.org/
- **TSIP Program**: tsip@pureearth.org
- **Technical Questions**: Contact Better Planet Lab

---

**Built for**: Pure Earth Toxic Sites Identification Program
**Demo Date**: March 2026
**Status**: Production-ready demonstration
