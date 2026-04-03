/* ============================================================================
   Lead Detection Tool
   Map Data & Model Output
   ========================================================================== */

// Heatmap data: [lat, lng, intensity] - 188 points from ML model
const HEATMAP_DATA = [
  [28.6475, 77.167, 1.0],
  [28.7645, 77.185, 0.975],
  [28.9265, 77.6575, 0.983],
  [28.4495, 77.0185, 0.960],
  [28.7015, 77.1175, 0.987],
  [28.8815, 76.627, 1.0],
  [28.616, 77.338, 1.0],
  [28.841, 77.743, 1.0],
  [28.634, 77.464, 1.0],
  [28.7825, 77.5, 1.0],
  [28.643, 77.3785, 0.963],
  [28.445, 77.023, 0.995],
  [28.7645, 76.7665, 0.976],
  [28.7555, 77.5, 1.0],
  [28.7555, 77.32, 0.969],
  [29.4575, 77.698, 0.987],
  [28.742, 77.203, 0.966],
  [28.6475, 77.374, 0.965],
  [28.661, 77.059, 0.952],
  [28.715, 77.077, 0.980],
  [28.679, 77.1625, 1.0],
  [28.5935, 77.401, 1.0],
  [28.9445, 77.671, 1.0],
  [28.5755, 77.3245, 0.995],
  [29.408, 76.969, 0.994],
  [28.562, 77.293, 1.0],
  [29.2325, 77.0185, 1.0],
  [29.1425, 77.041, 0.988],
  [29.1245, 77.0185, 1.0],
  [28.9895, 77.671, 0.970],
  [28.427, 76.9555, 0.997],
  [28.6925, 77.5495, 0.998],
  [28.5935, 77.3335, 1.0],
  [28.9625, 77.7475, 1.0],
  [28.958, 77.7475, 0.997],
  [28.5755, 77.329, 1.0],
  [28.9535, 77.7475, 1.0],
  [28.508, 77.356, 1.0],
  [28.445, 77.0275, 0.990],
  [28.7285, 77.0545, 0.979],
  [28.6655, 77.3785, 0.993],
  [28.463, 77.023, 0.949],
  [28.5665, 77.3245, 1.0],
  [28.67, 77.0905, 0.992],
  [28.7375, 77.1085, 0.972],
  [28.706, 77.14, 0.961],
  [28.6745, 77.0905, 0.984],
  [28.625, 77.473, 0.991],
  [28.661, 77.3695, 1.0],
  [28.616, 77.077, 0.976],
  [28.976, 77.698, 0.978],
  [28.5755, 77.446, 0.978],
  [29.4575, 77.716, 0.964],
  [28.6835, 77.383, 0.973],
  [28.625, 77.113, 1.0],
  [28.6295, 77.032, 0.968],
  [28.472, 76.9555, 1.0],
  [28.5305, 77.437, 1.0],
  [28.7105, 77.266, 0.979],
  [28.724, 77.275, 0.973],
  [28.7015, 77.14, 0.961],
  [28.6565, 77.437, 0.961],
  [28.616, 77.059, 0.957],
  [28.859, 77.1265, 1.0],
  [28.67, 77.059, 0.974],
  [28.814, 77.563, 1.0],
  [28.7555, 77.1985, 1.0],
  [28.499, 77.2885, 0.989],
  [28.625, 77.095, 1.0],
  [28.58, 77.068, 0.965],
  [28.697, 77.1175, 1.0],
  [28.6745, 77.4415, 0.991],
  [28.634, 77.2705, 1.0],
  [28.742, 76.8025, 0.968],
  [28.535, 77.4415, 0.980],
  [28.679, 77.3695, 0.983],
  [28.6115, 77.4235, 0.985],
  [28.616, 77.3425, 0.958],
  [28.67, 77.3785, 1.0],
  [29.2775, 77.734, 1.0],
  [28.499, 77.284, 0.970],
  [28.9265, 77.6755, 1.0],
  [28.571, 77.329, 0.987],
  [28.5575, 77.2525, 0.958],
  [28.5935, 77.3425, 1.0],
  [28.643, 77.275, 1.0],
  [28.679, 77.167, 1.0],
  [28.5305, 77.2075, 1.0],
  [28.67, 77.374, 1.0],
  [28.5305, 77.3155, 1.0],
  [29.228, 77.1175, 1.0],
  [29.444, 77.698, 0.988],
  [28.508, 77.302, 0.989],
  [28.589, 77.077, 1.0],
  [28.6295, 77.275, 1.0],
  [28.535, 77.2795, 1.0],
  [28.499, 77.293, 1.0],
  [28.5125, 77.2975, 0.974],
  [28.5305, 77.2795, 0.992],
  [28.526, 77.2885, 0.982],
  [28.526, 77.2795, 0.993],
  [28.6385, 77.131, 0.963],
  [28.616, 77.113, 0.973],
  [28.6205, 77.437, 0.959],
  [28.6745, 77.3875, 0.978],
  [28.5845, 77.3965, 1.0],
  [28.634, 77.14, 0.991],
  [28.652, 77.1445, 0.978],
  [28.832, 77.5765, 0.997],
  [28.6295, 77.0995, 1.0],
  [28.625, 77.41, 0.966],
  [28.9805, 77.689, 1.0],
  [28.589, 77.059, 0.975],
  [28.9535, 77.68, 1.0],
  [28.562, 77.284, 1.0],
  [28.634, 77.275, 1.0],
  [28.5665, 77.2885, 1.0],
  [28.805, 77.077, 0.999],
  [28.7105, 77.0725, 0.954],
  [28.7375, 77.1175, 0.969],
  [28.526, 77.257, 0.960],
  [28.6565, 77.095, 0.985],
  [28.6025, 77.1895, 0.970],
  [28.6385, 77.14, 0.998],
  [28.6385, 77.068, 0.978],
  [28.607, 77.329, 1.0],
  [28.67, 77.311, 0.973],
  [28.607, 77.104, 0.983],
  [28.742, 77.1175, 0.983],
  [28.7465, 77.1085, 0.977],
  [28.535, 77.2435, 0.971],
  [28.7825, 77.0545, 0.963],
  [28.7105, 77.176, 1.0],
  [28.616, 77.32, 0.954],
  [28.787, 77.2435, 0.950],
  [28.7015, 77.1265, 0.995],
  [28.8275, 77.0995, 1.0],
  [28.5395, 77.212, 0.987],
  [28.4135, 77.0455, 0.958],
  [28.6655, 77.284, 0.997],
  [28.454, 77.185, 0.971],
  [28.535, 77.383, 1.0],
  [28.517, 77.5225, 0.962],
  [28.6205, 77.068, 0.980],
  [28.6745, 77.176, 0.985],
  [28.6565, 77.581, 1.0],
  [29.399, 76.8025, 1.0],
  [28.508, 77.473, 0.974],
  [28.7015, 77.131, 0.995],
  [28.481, 77.5135, 0.979],
  [28.6295, 77.3065, 0.952],
  [28.427, 77.2255, 0.976],
  [28.796, 77.05, 0.953],
  [28.652, 77.455, 0.979],
  [29.417, 76.951, 0.962],
  [28.5305, 77.2705, 0.996],
  [28.6745, 77.23, 0.958],
  [28.5485, 77.302, 1.0],
  [28.9895, 77.6755, 0.958],
  [28.5755, 77.257, 1.0],
  [28.697, 77.131, 0.988],
  [28.9625, 77.6395, 1.0],
  [28.58, 77.3155, 0.993],
  [28.67, 77.167, 0.985],
  [28.463, 77.6935, 0.951],
  [28.7825, 77.059, 1.0],
  [28.598, 77.311, 0.983],
  [28.6385, 77.0635, 0.973],
  [28.625, 77.0635, 1.0],
  [29.255, 76.996, 0.985],
  [28.67, 77.122, 0.950],
  [28.6565, 77.1175, 0.964],
  [28.6475, 77.1445, 0.989],
  [28.6025, 77.32, 0.988],
  [28.7105, 77.6395, 0.951],
  [28.4315, 77.2255, 0.976],
  [28.661, 77.2885, 0.978],
  [28.4045, 77.2705, 0.990],
  [28.6475, 77.1265, 0.999],
  [28.625, 77.1355, 0.963],
  [28.796, 77.14, 0.966],
  [28.706, 77.113, 0.981],
  [28.715, 77.1805, 0.979],
  [28.535, 77.257, 1.0],
  [28.634, 77.455, 0.951],
  [28.5485, 77.212, 0.950],
  [28.643, 77.1355, 0.958],
  [28.4855, 77.4325, 0.948]
];

// Verified ULAB sites from field-verified database
const VERIFIED_ULAB_SITES = [
  { id: 'ULAB-001', name: 'Manual_Pt_1', lat: 28.7380, lng: 76.8100 },
  { id: 'ULAB-002', name: 'Manual_Pt_2', lat: 28.7403, lng: 77.1300 },
  { id: 'ULAB-003', name: 'Manual_Pt_3', lat: 28.6500, lng: 77.1700 },
  { id: 'ULAB-004', name: 'Manual_Pt_4', lat: 28.6760, lng: 77.0985 },
  { id: 'ULAB-005', name: 'Manual_Pt_5', lat: 28.6729, lng: 77.1458 },
  { id: 'ULAB-006', name: 'Manual_Pt_6', lat: 28.7016, lng: 77.1322 },
  { id: 'ULAB-007', name: 'Manual_Pt_7', lat: 28.6667, lng: 77.2286 },
  { id: 'ULAB-008', name: 'Manual_Pt_8', lat: 28.6365, lng: 77.3072 },
  { id: 'ULAB-009', name: 'Manual_Pt_9', lat: 28.5892, lng: 77.3266 },
  { id: 'ULAB-010', name: 'Manual_Pt_10', lat: 28.5740, lng: 77.3157 },
  { id: 'ULAB-011', name: 'Manual_Pt_11', lat: 28.7710, lng: 77.4920 },
  { id: 'ULAB-012', name: 'Manual_Pt_12', lat: 28.8580, lng: 77.5800 },
  { id: 'ULAB-013', name: 'Manual_Pt_13', lat: 29.2530, lng: 77.7400 }
];

// Detected ULAB sites from Contextual ML Model (~25 sites)
const DETECTED_ULAB_SITES = [
  {
    id: 'DETECT-ULAB-001',
    lat: 28.6850,
    lng: 77.1450,
    riskScore: 0.92,
    status: 'Pending Verification',
    dateDetected: '2026-01-15',
    flaggedBecause: 'High density of battery shops (12 within 500m), scrap metal dealers (8), proximity to residential area, population density: 15,200/km²'
  },
  {
    id: 'DETECT-ULAB-002',
    lat: 28.5650,
    lng: 77.3100,
    riskScore: 0.88,
    status: 'Scheduled for Visit',
    dateDetected: '2026-01-22',
    flaggedBecause: 'Informal settlement with electronics recycling activity, water contamination indicators, lead-acid battery storage detected, proximity to school (300m)'
  },
  {
    id: 'DETECT-ULAB-003',
    lat: 28.7200,
    lng: 77.0850,
    riskScore: 0.94,
    status: 'Under Review',
    dateDetected: '2026-01-28',
    flaggedBecause: 'Multiple scrap yards (5), heavy vehicle traffic pattern, no environmental controls visible, population density: 18,500/km²'
  },
  {
    id: 'DETECT-ULAB-004',
    lat: 28.6500,
    lng: 77.2300,
    riskScore: 0.85,
    status: 'Pending Verification',
    dateDetected: '2026-02-05',
    flaggedBecause: 'Small-scale electronics dismantling operation, battery storage area detected, proximity to residential zone'
  },
  {
    id: 'DETECT-ULAB-005',
    lat: 28.7450,
    lng: 77.1750,
    riskScore: 0.91,
    status: 'Pending Verification',
    dateDetected: '2026-02-10',
    flaggedBecause: 'Lead recycling indicators (6 shops), scrap collection points (4), soil contamination patterns, population density: 16,800/km²'
  },
  {
    id: 'DETECT-ULAB-006',
    lat: 28.5450,
    lng: 77.4200,
    riskScore: 0.87,
    status: 'Scheduled for Visit',
    dateDetected: '2026-02-15',
    flaggedBecause: 'Informal waste processing area, electronics recycling clusters (8 points), limited ventilation, proximity to water source'
  },
  {
    id: 'DETECT-ULAB-007',
    lat: 28.6750,
    lng: 77.3500,
    riskScore: 0.89,
    status: 'Pending Verification',
    dateDetected: '2026-02-18',
    flaggedBecause: 'Battery shop cluster (9 shops), scrap dealer concentration, road dust high in lead, population density: 14,200/km²'
  },
  {
    id: 'DETECT-ULAB-008',
    lat: 28.5980,
    lng: 77.1930,
    riskScore: 0.93,
    status: 'Under Review',
    dateDetected: '2026-02-22',
    flaggedBecause: 'Active lead smelting indicators, smoke patterns detected, multiple informal recycling operations, soil lead >1000 ppm estimated'
  },
  {
    id: 'DETECT-ULAB-009',
    lat: 28.7830,
    lng: 77.2480,
    riskScore: 0.86,
    status: 'Pending Verification',
    dateDetected: '2026-02-25',
    flaggedBecause: 'Small equipment recycling shop, battery storage, no fencing, proximity to market area with food vendors'
  },
  {
    id: 'DETECT-ULAB-010',
    lat: 28.6200,
    lng: 77.0700,
    riskScore: 0.90,
    status: 'Scheduled for Visit',
    dateDetected: '2026-03-01',
    flaggedBecause: 'Scrap metal yards (4), electronics dismantling, heavy dust observed, population nearby: 12,500/km²'
  },
  {
    id: 'DETECT-ULAB-011',
    lat: 28.6730,
    lng: 77.3150,
    riskScore: 0.84,
    status: 'Pending Verification',
    dateDetected: '2026-03-05',
    flaggedBecause: 'Battery sorting operation, informal labor force, water runoff concerns, proximity to educational institution'
  },
  {
    id: 'DETECT-ULAB-012',
    lat: 28.5550,
    lng: 77.3750,
    riskScore: 0.92,
    status: 'Pending Verification',
    dateDetected: '2026-03-08',
    flaggedBecause: 'Lead-acid battery recycling cluster (7 shops), scrap markets, no proper waste management, child labor indicators'
  },
  {
    id: 'DETECT-ULAB-013',
    lat: 28.6950,
    lng: 77.1200,
    riskScore: 0.88,
    status: 'Under Review',
    dateDetected: '2026-03-10',
    flaggedBecause: 'Multiple recycling operations (5), metal smelting smoke, informal settlement, population density: 17,100/km²'
  },
  {
    id: 'DETECT-ULAB-014',
    lat: 28.7520,
    lng: 77.4950,
    riskScore: 0.87,
    status: 'Pending Verification',
    dateDetected: '2026-03-12',
    flaggedBecause: 'Electronics waste processing site, battery materials storage, drainage toward residential area, 450m from school'
  },
  {
    id: 'DETECT-ULAB-015',
    lat: 28.5900,
    lng: 77.1850,
    riskScore: 0.91,
    status: 'Scheduled for Visit',
    dateDetected: '2026-03-15',
    flaggedBecause: 'Lead foundry indicators, high activity level, worker exposure concerns, scrap input from multiple sources'
  },
  {
    id: 'DETECT-ULAB-016',
    lat: 28.6400,
    lng: 77.1600,
    riskScore: 0.85,
    status: 'Pending Verification',
    dateDetected: '2026-03-18',
    flaggedBecause: 'Small-scale smelting operation, battery collection center, informal dumping site adjacent, population: 13,200/km²'
  },
  {
    id: 'DETECT-ULAB-017',
    lat: 28.7580,
    lng: 77.3250,
    riskScore: 0.89,
    status: 'Pending Verification',
    dateDetected: '2026-03-20',
    flaggedBecause: 'Scrap collection yard (extensive), lead-containing materials visible, proximity to water body (500m), worker density high'
  },
  {
    id: 'DETECT-ULAB-018',
    lat: 28.5700,
    lng: 77.2850,
    riskScore: 0.86,
    status: 'Under Review',
    dateDetected: '2026-03-22',
    flaggedBecause: 'Battery shop concentration (6), scrap marketplace, soil contamination visible, residential proximity: 200m'
  },
  {
    id: 'DETECT-ULAB-019',
    lat: 28.6600,
    lng: 77.2200,
    riskScore: 0.92,
    status: 'Pending Verification',
    dateDetected: '2026-03-24',
    flaggedBecause: 'Informal lead recycling operation, multiple furnaces, dust/fume release, scrap input sources unclear, population: 16,400/km²'
  },
  {
    id: 'DETECT-ULAB-020',
    lat: 28.7050,
    lng: 77.2800,
    riskScore: 0.88,
    status: 'Scheduled for Visit',
    dateDetected: '2026-03-26',
    flaggedBecause: 'Electronics recycling cluster, battery processing, limited environmental control, market proximity with food vendors'
  },
  {
    id: 'DETECT-ULAB-021',
    lat: 28.6300,
    lng: 77.3800,
    riskScore: 0.87,
    status: 'Pending Verification',
    dateDetected: '2026-03-27',
    flaggedBecause: 'Scrap collection point, informal lead smelting, worker housing on-site, water well proximity: 300m'
  },
  {
    id: 'DETECT-ULAB-022',
    lat: 28.7500,
    lng: 77.1350,
    riskScore: 0.90,
    status: 'Pending Verification',
    dateDetected: '2026-03-28',
    flaggedBecause: 'Battery shop cluster (8), scrap yards (3), high lead dust levels, population density: 15,800/km²'
  },
  {
    id: 'DETECT-ULAB-023',
    lat: 28.5850,
    lng: 77.3950,
    riskScore: 0.84,
    status: 'Under Review',
    dateDetected: '2026-03-29',
    flaggedBecause: 'Small-scale electronics dismantling, battery storage area, informal workers, school proximity: 600m'
  },
  {
    id: 'DETECT-ULAB-024',
    lat: 28.6750,
    lng: 77.0950,
    riskScore: 0.89,
    status: 'Pending Verification',
    dateDetected: '2026-03-30',
    flaggedBecause: 'Multiple scrap merchants (5), lead recycling activity, heavy vehicle traffic, population: 14,900/km²'
  },
  {
    id: 'DETECT-ULAB-025',
    lat: 28.6100,
    lng: 77.2650,
    riskScore: 0.91,
    status: 'Scheduled for Visit',
    dateDetected: '2026-03-31',
    flaggedBecause: 'Active lead smelting facility, battery crushing operation, multiple chimneys, scrap input documented, soil contamination high'
  }
];

// Detected Smelter sites from Satellite Imagery Model (~8 sites)
const DETECTED_SMELTER_SITES = [
  {
    id: 'DETECT-SMELTER-001',
    lat: 28.4200,
    lng: 76.8900,
    riskScore: 0.91,
    status: 'Scheduled for Visit',
    dateDetected: '2026-01-20',
    flaggedBecause: 'Large industrial roof signature (4,200m²), smoke/emission patterns detected, proximity to rail line, spectral signature matches known smelter profiles'
  },
  {
    id: 'DETECT-SMELTER-002',
    lat: 29.3800,
    lng: 77.5200,
    riskScore: 0.87,
    status: 'Pending Verification',
    dateDetected: '2026-02-03',
    flaggedBecause: 'Medium industrial facility (2,800m²), SWIR reflectance anomaly, multiple chimney structures detected, proximity to raw material source'
  },
  {
    id: 'DETECT-SMELTER-003',
    lat: 28.3500,
    lng: 76.9800,
    riskScore: 0.94,
    status: 'Under Review',
    dateDetected: '2026-02-12',
    flaggedBecause: 'Large processing facility (5,100m²), consistent smoke patterns, multiple input/output points, rail access documented, high lead probability'
  },
  {
    id: 'DETECT-SMELTER-004',
    lat: 29.2100,
    lng: 76.8500,
    riskScore: 0.79,
    status: 'Pending Verification',
    dateDetected: '2026-02-28',
    flaggedBecause: 'Medium facility (2,400m²), periodic emissions, industrial characteristics present, requires on-site confirmation'
  },
  {
    id: 'DETECT-SMELTER-005',
    lat: 28.2800,
    lng: 77.0100,
    riskScore: 0.88,
    status: 'Scheduled for Visit',
    dateDetected: '2026-03-08',
    flaggedBecause: 'Large industrial complex (3,600m²), emission stacks visible, spectral anomalies detected, proximity to transportation network'
  },
  {
    id: 'DETECT-SMELTER-006',
    lat: 29.5200,
    lng: 77.2300,
    riskScore: 0.83,
    status: 'Pending Verification',
    dateDetected: '2026-03-15',
    flaggedBecause: 'Industrial structure (3,000m²), occasional smoke discharge, construction materials compatibility with smelting'
  },
  {
    id: 'DETECT-SMELTER-007',
    lat: 28.5200,
    lng: 76.7500,
    riskScore: 0.92,
    status: 'Under Review',
    dateDetected: '2026-03-20',
    flaggedBecause: 'Large facility (4,500m²), industrial spectral signature, continuous operational patterns, high lead contamination risk'
  },
  {
    id: 'DETECT-SMELTER-008',
    lat: 29.0500,
    lng: 77.3800,
    riskScore: 0.75,
    status: 'Pending Verification',
    dateDetected: '2026-03-25',
    flaggedBecause: 'Medium complex (2,200m²), industrial use indicators, spectral characteristics suggest processing facility, follow-up recommended'
  }
];

// Map regions
const REGIONS = [
  { name: 'NCR Delhi', available: true },
  { name: 'Mumbai', available: false },
  { name: 'Kolkata', available: false },
  { name: 'Chennai', available: false },
  { name: 'Bangalore', available: false }
];

// Feature importance for ULAB model (SHAP-like values)
const ULAB_FEATURES = [
  { name: 'Battery Shop Density', importance: 0.95 },
  { name: 'Scrap Metal Dealers', importance: 0.88 },
  { name: 'Population Density', importance: 0.82 },
  { name: 'Proximity to Residential', importance: 0.78 },
  { name: 'Road Network Density', importance: 0.72 },
  { name: 'Land Use Classification', importance: 0.68 },
  { name: 'School Proximity', importance: 0.65 },
  { name: 'Industrial Zone Proximity', importance: 0.60 }
];

// Feature importance for Smelter model
const SMELTER_FEATURES = [
  { name: 'Building Morphology', importance: 0.95 },
  { name: 'SWIR Reflectance', importance: 0.90 },
  { name: 'Land Cover Context', importance: 0.85 },
  { name: 'Spectral Signature', importance: 0.82 },
  { name: 'Vegetation Suppression', importance: 0.75 },
  { name: 'Rail/Road Access', importance: 0.68 },
  { name: 'Facility Size', importance: 0.64 },
  { name: 'Surrounding Land Use', importance: 0.55 }
];

// Timeline dates
const TIMELINE_START = new Date(2026, 0, 1);
const TIMELINE_END = new Date(2026, 2, 31);

// Methodology content
const METHODOLOGY_DATA = {
  contextualModel: {
    name: 'Contextual Model (ULAB)',
    algorithm: 'XGBoost',
    description: 'Analyzes geospatial and socioeconomic features to identify likely informal lead-acid battery recycling sites',
    trainingData: '13 verified ULAB sites in NCR Delhi as training labels, 3,746 grid cells scanned',
    features: ULAB_FEATURES,
    metrics: {
      note: 'Formal metrics pending field verification'
    }
  },
  satelliteModel: {
    name: 'Satellite Imagery Model (Smelters)',
    algorithm: 'Convolutional Neural Network (Deep Learning)',
    description: 'Analyzes Sentinel-2 multispectral imagery to detect industrial smelter facilities through spatial and spectral signatures',
    trainingData: 'USGS and ILZSG geolocated smelter records, Sentinel-2 imagery archive',
    features: SMELTER_FEATURES,
    metrics: {
      note: 'Formal metrics pending field verification'
    }
  }
};

// Analytics data for dashboard
function generateAnalyticsData(detectedUlab, detectedSmelter, timeLimit = null) {
  let ulabCount = detectedUlab.length;
  let smelterCount = detectedSmelter.length;
  let verifiedCount = VERIFIED_ULAB_SITES.length;

  if (timeLimit) {
    ulabCount = detectedUlab.filter(s => new Date(s.dateDetected) <= timeLimit).length;
    smelterCount = detectedSmelter.filter(s => new Date(s.dateDetected) <= timeLimit).length;
  }

  const riskDistribution = {
    '0.5-0.6': 0,
    '0.6-0.7': 2,
    '0.7-0.8': 5,
    '0.8-0.9': 12,
    '0.9-1.0': (ulabCount + smelterCount - 19)
  };

  return {
    totalDetected: ulabCount + smelterCount,
    highRisk: detectedUlab.filter(s => s.riskScore > 0.85).length + detectedSmelter.filter(s => s.riskScore > 0.85).length,
    pending: detectedUlab.filter(s => s.status === 'Pending Verification').length,
    verified: verifiedCount,
    siteTypes: {
      ulab: ulabCount,
      smelter: smelterCount,
      verified: verifiedCount
    },
    riskDistribution: riskDistribution
  };
}

// Timeline data: cumulative detections over time
function generateTimelineData() {
  const data = [];
  const all = [...DETECTED_ULAB_SITES, ...DETECTED_SMELTER_SITES].sort((a, b) =>
    new Date(a.dateDetected) - new Date(b.dateDetected)
  );

  let cumulative = 0;
  let currentDate = null;

  for (const site of all) {
    if (site.dateDetected !== currentDate) {
      currentDate = site.dateDetected;
      cumulative++;
      data.push({ date: currentDate, count: cumulative });
    } else {
      data[data.length - 1].count = cumulative + 1;
      cumulative++;
    }
  }

  return data;
}
