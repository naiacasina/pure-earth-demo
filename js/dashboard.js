/* ============================================================================
   Pure Earth Toxic Sites Identification Program
   Dashboard Interactivity
   ========================================================================== */

let map;
let heatmapLayer;
let verifiedMarkers = [];
let detectedMarkers = [];
let selectedSite = null;
let currentFilter = {
  region: 'NCR Delhi',
  siteTypes: {
    ulab: true,
    smelter: true,
    verified: true
  },
  riskThreshold: 0.0,
  timeLimit: null
};
let isTimelineAnimating = false;

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeMap();
  initializeFilters();
  initializeTimeline();
  updateFilteredSites();
  // Hide loading overlay
  setTimeout(() => {
    const loadingEl = document.getElementById('map-loading');
    if (loadingEl) loadingEl.classList.add('hidden');
  }, 800);
  Toast.show('Dashboard loaded. Use filters to explore toxic sites.', 'info', 2000);
});

// ============================================================================
// Map Initialization
// ============================================================================

function initializeMap() {
  map = L.map('map').setView([28.65, 77.2], 11);

  // CartoDB Dark basemap
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© CartoDB',
    subdomains: 'abcd',
    maxZoom: 19,
    className: 'leaflet-tile-dark'
  }).addTo(map);

  // Initialize heatmap layer
  updateHeatmapLayer();

  // Initialize verified sites markers
  updateVerifiedMarkers();

  // Initialize detected sites markers
  updateDetectedMarkers();

  // Add map controls
  L.control.zoom({ position: 'topright' }).addTo(map);
}

function updateHeatmapLayer() {
  if (heatmapLayer) {
    map.removeLayer(heatmapLayer);
  }

  let heatData = HEATMAP_DATA;

  // Apply risk threshold filter
  heatData = heatData.filter(point => point[2] >= currentFilter.riskThreshold);

  // Apply time limit filter
  if (currentFilter.timeLimit) {
    const timePoint = new Date(currentFilter.timeLimit);
    const detectedPoints = [
      ...DETECTED_ULAB_SITES.filter(s => currentFilter.siteTypes.ulab && new Date(s.dateDetected) <= timePoint),
      ...DETECTED_SMELTER_SITES.filter(s => currentFilter.siteTypes.smelter && new Date(s.dateDetected) <= timePoint)
    ];

    // Filter heatmap to roughly match detected areas
    if (detectedPoints.length > 0) {
      const detectedLocs = detectedPoints.map(p => [p.lat, p.lng]);
      heatData = heatData.filter(point => {
        return detectedLocs.some(loc => {
          const dist = Utils.getDistance(point[0], point[1], loc[0], loc[1]);
          return dist < 5;
        });
      });
    }
  }

  heatmapLayer = L.heatLayer(heatData, {
    radius: 30,
    blur: 25,
    max: 1.0,
    minOpacity: 0.3,
    gradient: {
      0.0: '#1e293b',
      0.2: '#0d9488',
      0.5: '#14b8a6',
      0.8: '#f97316',
      1.0: '#ef4444'
    }
  }).addTo(map);
}

function updateVerifiedMarkers() {
  // Remove old markers
  verifiedMarkers.forEach(marker => map.removeLayer(marker));
  verifiedMarkers = [];

  if (!currentFilter.siteTypes.verified) return;

  VERIFIED_ULAB_SITES.forEach(site => {
    const marker = L.circleMarker([site.lat, site.lng], {
      radius: 8,
      fillColor: '#9333ea',
      fillOpacity: 0.9,
      color: '#c084fc',
      weight: 2,
      className: 'verified-marker'
    });

    marker.bindPopup(`
      <div style="width: 200px;">
        <h4 style="margin: 0 0 8px 0; color: #c084fc;">${site.name}</h4>
        <p style="margin: 4px 0; font-size: 12px; color: #cbd5e1;">
          <strong>Type:</strong> Verified ULAB<br>
          <strong>Lat/Lng:</strong> ${Utils.formatLatLng(site.lat, site.lng)}<br>
          <strong>Status:</strong> <span style="color: #22c55e;">Confirmed</span>
        </p>
      </div>
    `);

    marker.addTo(map);
    verifiedMarkers.push(marker);
  });
}

function updateDetectedMarkers() {
  // Remove old markers
  detectedMarkers.forEach(marker => map.removeLayer(marker));
  detectedMarkers = [];

  // Get filtered sites
  let sites = [];

  if (currentFilter.siteTypes.ulab) {
    sites = sites.concat(DETECTED_ULAB_SITES.filter(s => s.riskScore >= currentFilter.riskThreshold));
  }

  if (currentFilter.siteTypes.smelter) {
    sites = sites.concat(DETECTED_SMELTER_SITES.filter(s => s.riskScore >= currentFilter.riskThreshold));
  }

  // Apply time limit
  if (currentFilter.timeLimit) {
    const timePoint = new Date(currentFilter.timeLimit);
    sites = sites.filter(s => new Date(s.dateDetected) <= timePoint);
  }

  sites.forEach(site => {
    const isSmelter = site.id.includes('SMELTER');
    const color = Utils.getRiskColor(site.riskScore);

    const marker = L.circleMarker([site.lat, site.lng], {
      radius: 7,
      fillColor: color,
      fillOpacity: 0.8,
      color: color,
      weight: 1,
      dashArray: isSmelter ? '5,5' : 'none'
    });

    marker.on('click', () => {
      showSitePanel(site, isSmelter ? 'smelter' : 'ulab');
    });

    marker.addTo(map);
    detectedMarkers.push(marker);
  });
}

// ============================================================================
// Sidebar Filters
// ============================================================================

function initializeFilters() {
  // Region selector
  const regionSelect = document.getElementById('region-select');
  if (regionSelect) {
    regionSelect.addEventListener('change', (e) => {
      currentFilter.region = e.target.value;
      updateFilteredSites();
      Toast.show(`Region changed to ${e.target.value}`, 'info', 1500);
    });
  }

  // Site type checkboxes
  ['ulab', 'smelter', 'verified'].forEach(type => {
    const checkbox = document.getElementById(`filter-${type}`);
    if (checkbox) {
      checkbox.addEventListener('change', (e) => {
        currentFilter.siteTypes[type] = e.target.checked;
        updateFilteredSites();
      });
    }
  });

  // Risk threshold slider
  const riskSlider = document.getElementById('risk-slider');
  const riskValue = document.getElementById('risk-value');
  if (riskSlider) {
    riskSlider.addEventListener('input', (e) => {
      const value = parseFloat(e.target.value);
      currentFilter.riskThreshold = value;
      if (riskValue) {
        riskValue.textContent = value.toFixed(2);
      }
      updateFilteredSites();
    });
  }

  // Export buttons
  document.getElementById('export-csv')?.addEventListener('click', exportCSV);
  document.getElementById('export-report')?.addEventListener('click', exportReport);

  // Analytics toggle
  document.getElementById('analytics-toggle')?.addEventListener('click', toggleAnalytics);
}

function updateFilteredSites() {
  updateHeatmapLayer();
  updateVerifiedMarkers();
  updateDetectedMarkers();
  updateAnalyticsPanel();
  updateTopBar();
}

function updateTopBar() {
  // Count visible sites
  let detectedCount = 0;
  if (currentFilter.siteTypes.ulab) {
    detectedCount += DETECTED_ULAB_SITES.filter(s => s.riskScore >= currentFilter.riskThreshold).length;
  }
  if (currentFilter.siteTypes.smelter) {
    detectedCount += DETECTED_SMELTER_SITES.filter(s => s.riskScore >= currentFilter.riskThreshold).length;
  }

  const filterCount = document.querySelector('.filter-count');
  if (filterCount) {
    filterCount.textContent = detectedCount;
  }
}

// ============================================================================
// Timeline
// ============================================================================

function initializeTimeline() {
  const timelineSlider = document.getElementById('timeline-slider');
  const timelineDate = document.getElementById('timeline-date');
  const playBtn = document.getElementById('timeline-play');

  if (timelineSlider) {
    timelineSlider.min = 0;
    timelineSlider.max = Math.floor((TIMELINE_END - TIMELINE_START) / (1000 * 60 * 60 * 24));
    timelineSlider.value = timelineSlider.max;

    timelineSlider.addEventListener('input', (e) => {
      const days = parseInt(e.target.value);
      const date = new Date(TIMELINE_START.getTime() + days * 24 * 60 * 60 * 1000);
      currentFilter.timeLimit = date;
      updateFilteredSites();
      if (timelineDate) {
        timelineDate.textContent = Utils.formatDate(date);
      }
    });
  }

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      animateTimeline();
    });
  }

  // Set initial date
  if (timelineDate) {
    timelineDate.textContent = Utils.formatDate(TIMELINE_END);
  }
}

function animateTimeline() {
  if (isTimelineAnimating) return;
  isTimelineAnimating = true;

  const timelineSlider = document.getElementById('timeline-slider');
  const playBtn = document.getElementById('timeline-play');
  const maxDays = parseInt(timelineSlider.max);

  let currentDay = 0;
  const interval = setInterval(() => {
    timelineSlider.value = currentDay;
    timelineSlider.dispatchEvent(new Event('input'));

    currentDay++;
    if (currentDay > maxDays) {
      clearInterval(interval);
      isTimelineAnimating = false;
    }
  }, 50);
}

// ============================================================================
// Site Panel
// ============================================================================

function showSitePanel(site, type) {
  selectedSite = { ...site, type };

  const panel = document.getElementById('site-panel') || createSitePanel();

  let nearestVerified = null;
  let minDistance = Infinity;

  VERIFIED_ULAB_SITES.forEach(vSite => {
    const dist = Utils.getDistance(site.lat, site.lng, vSite.lat, vSite.lng);
    if (dist < minDistance) {
      minDistance = dist;
      nearestVerified = vSite;
    }
  });

  const features = type === 'smelter' ? SMELTER_FEATURES : ULAB_FEATURES;

  let html = `
    <div class="panel-header">
      <div>
        <h3 style="margin: 0 0 8px 0;">${site.id}</h3>
        <span class="badge ${type === 'smelter' ? 'badge-smelter' : 'badge-ulab'}">
          ${type === 'smelter' ? 'Industrial Smelter' : 'ULAB Recycling'}
        </span>
      </div>
      <button class="panel-close" onclick="closeSitePanel()">×</button>
    </div>

    <div class="panel-body">
      <div class="panel-section">
        <div class="risk-score">
          <div class="risk-score-value ${Utils.getRiskClass(site.riskScore)}">${site.riskScore.toFixed(2)}</div>
          <div class="risk-score-label">${Utils.getRiskLabel(site.riskScore)}</div>
        </div>
        <span class="badge badge-${site.status === 'Pending Verification' ? 'pending' : site.status === 'Scheduled for Visit' ? 'scheduled' : 'reviewing'}">
          ${site.status}
        </span>
      </div>

      <div class="panel-section">
        <div class="panel-section-title">Location</div>
        <p style="margin: 0; font-size: 14px; color: #cbd5e1;">
          ${Utils.formatLatLng(site.lat, site.lng)}
        </p>
        <p style="margin: 8px 0 0 0; font-size: 13px; color: #94a3b8;">
          Detected: ${Utils.formatDate(site.dateDetected)}
        </p>
      </div>

      <div class="panel-section">
        <div class="panel-section-title">Why Flagged</div>
        <p style="margin: 0; font-size: 13px; color: #cbd5e1; line-height: 1.6;">
          ${site.flaggedBecause}
        </p>
      </div>

      <div class="panel-section">
        <div class="panel-section-title">Feature Importance</div>
        ${features.map((f, i) => `
          <div class="feature-bar">
            <div class="feature-name">
              <span style="color: #cbd5e1; font-size: 12px;">${f.name}</span>
              <span style="color: #94a3b8; font-size: 12px;">${(f.importance * 100).toFixed(0)}%</span>
            </div>
            <div class="feature-bar-bg">
              <div class="feature-bar-fill" style="width: ${f.importance * 100}%"></div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="panel-section">
        <div class="panel-section-title">Nearby Context</div>
        <p style="margin: 0 0 8px 0; font-size: 13px; color: #cbd5e1;">
          <strong>Nearest verified site:</strong> ${nearestVerified ? minDistance.toFixed(1) + ' km away (' + nearestVerified.name + ')' : 'No verified sites within search radius'}
        </p>
      </div>

      <div class="panel-section">
        <div class="panel-section-title">Recommended Action</div>
        <p style="margin: 0; font-size: 13px; color: #cbd5e1; line-height: 1.6;">
          ${site.riskScore > 0.85 ? 'High priority for field verification. Schedule visit within 2 weeks.' : site.riskScore > 0.7 ? 'Schedule field visit for further investigation.' : 'Monitor for changes; consider future verification.'}
        </p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 12px;">
        <button class="btn btn-small btn-secondary" onclick="scheduleVisit()">Schedule Visit</button>
        <button class="btn btn-small btn-secondary" onclick="markReviewed()">Mark Reviewed</button>
      </div>
    </div>
  `;

  panel.innerHTML = html;
  panel.classList.remove('hidden');
}

function createSitePanel() {
  const panel = document.createElement('div');
  panel.id = 'site-panel';
  panel.className = 'dashboard-panel';
  const main = document.querySelector('.dashboard-main');
  main.appendChild(panel);
  return panel;
}

function closeSitePanel() {
  const panel = document.getElementById('site-panel');
  if (panel) {
    panel.classList.add('hidden');
  }
  selectedSite = null;
}

function scheduleVisit() {
  if (!selectedSite) return;
  Toast.show(`Visit scheduled for ${selectedSite.id}`, 'success');
}

function markReviewed() {
  if (!selectedSite) return;
  Toast.show(`${selectedSite.id} marked as reviewed`, 'success');
}

// ============================================================================
// Analytics Panel
// ============================================================================

function updateAnalyticsPanel() {
  const stats = generateAnalyticsData(
    DETECTED_ULAB_SITES,
    DETECTED_SMELTER_SITES,
    currentFilter.timeLimit
  );

  // Update stat cards
  const elTotal = document.getElementById('stat-total');
  const elHighRisk = document.getElementById('stat-high-risk');
  const elPending = document.getElementById('stat-pending');
  const elVerified = document.getElementById('stat-verified');
  if (elTotal) elTotal.textContent = stats.totalDetected;
  if (elHighRisk) elHighRisk.textContent = stats.highRisk;
  if (elPending) elPending.textContent = stats.pending;
  if (elVerified) elVerified.textContent = stats.verified;

  // Update charts
  updateSiteTypeChart(stats.siteTypes);
  updateRiskDistributionChart(stats.riskDistribution);
}

function updateSiteTypeChart(data) {
  const ctx = document.getElementById('chart-site-type');
  if (!ctx) return;

  // Remove existing chart if any
  const existingChart = Chart.getChart(ctx);
  if (existingChart) existingChart.destroy();

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['ULAB', 'Smelter', 'Verified'],
      datasets: [{
        data: [data.ulab, data.smelter, data.verified],
        backgroundColor: ['#9333ea', '#f97316', '#22c55e'],
        borderColor: '#1e293b',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#cbd5e1',
            font: { size: 11 }
          }
        }
      }
    }
  });
}

function updateRiskDistributionChart(data) {
  const ctx = document.getElementById('chart-risk-dist');
  if (!ctx) return;

  const existingChart = Chart.getChart(ctx);
  if (existingChart) existingChart.destroy();

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['0.5-0.6', '0.6-0.7', '0.7-0.8', '0.8-0.9', '0.9-1.0'],
      datasets: [{
        label: 'Sites',
        data: [data['0.5-0.6'], data['0.6-0.7'], data['0.7-0.8'], data['0.8-0.9'], data['0.9-1.0']],
        backgroundColor: '#14b8a6',
        borderColor: '#0d9488',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          ticks: { color: '#94a3b8' },
          grid: { color: '#334155' }
        },
        y: {
          ticks: { color: '#94a3b8' },
          grid: { display: false }
        }
      }
    }
  });
}

function toggleAnalytics() {
  const drawer = document.getElementById('analytics-drawer');
  if (drawer) {
    drawer.classList.toggle('open');
  }
}

// ============================================================================
// Export Functions
// ============================================================================

function exportCSV() {
  let sites = [];

  if (currentFilter.siteTypes.ulab) {
    sites = sites.concat(DETECTED_ULAB_SITES.filter(s => s.riskScore >= currentFilter.riskThreshold));
  }

  if (currentFilter.siteTypes.smelter) {
    sites = sites.concat(DETECTED_SMELTER_SITES.filter(s => s.riskScore >= currentFilter.riskThreshold));
  }

  const csvData = sites.map(s => ({
    'Site ID': s.id,
    'Type': s.id.includes('SMELTER') ? 'Smelter' : 'ULAB',
    'Latitude': s.lat,
    'Longitude': s.lng,
    'Risk Score': s.riskScore,
    'Status': s.status,
    'Date Detected': s.dateDetected,
    'Flagged Reason': s.flaggedBecause
  }));

  CSVExport.download('toxic_sites_' + new Date().toISOString().split('T')[0] + '.csv', csvData);
  Toast.show('CSV exported successfully', 'success');
}

function exportReport() {
  const stats = generateAnalyticsData(DETECTED_ULAB_SITES, DETECTED_SMELTER_SITES, currentFilter.timeLimit);

  Modal.open('Export Report', `
    <div style="color: #cbd5e1;">
      <h4 style="margin-top: 0;">Toxic Sites Screening Report</h4>
      <p>Region: <strong>${currentFilter.region}</strong></p>
      <p>Report Date: <strong>${Utils.formatDate(new Date())}</strong></p>
      <hr style="border-color: #334155; margin: 16px 0;">

      <h4>Summary Statistics</h4>
      <ul style="list-style: none; padding: 0;">
        <li style="margin: 8px 0;"><strong>Total Detected Sites:</strong> ${stats.totalDetected}</li>
        <li style="margin: 8px 0;"><strong>High Risk Sites:</strong> ${stats.highRisk}</li>
        <li style="margin: 8px 0;"><strong>Pending Verification:</strong> ${stats.pending}</li>
        <li style="margin: 8px 0;"><strong>Verified ULAB Sites:</strong> ${stats.verified}</li>
      </ul>

      <h4>Site Breakdown</h4>
      <ul style="list-style: none; padding: 0;">
        <li style="margin: 8px 0;"><strong>ULAB Sites:</strong> ${stats.siteTypes.ulab}</li>
        <li style="margin: 8px 0;"><strong>Smelter Sites:</strong> ${stats.siteTypes.smelter}</li>
      </ul>

      <p style="margin-top: 16px; font-size: 12px; color: #94a3b8;">
        This report includes sites filtered by: Risk threshold >= ${currentFilter.riskThreshold.toFixed(2)}
      </p>
    </div>
  `, [
    { label: 'Print', onClick: 'window.print()', style: 'primary' },
    { label: 'Close', onClick: 'Modal.close()', style: 'secondary' }
  ]);
}
