/* ============================================================================
   Pure Earth Toxic Sites Identification Program
   Chart Utilities
   ========================================================================== */

// Initialize Chart.js with custom defaults
Chart.defaults.color = '#cbd5e1';
Chart.defaults.font.family = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
Chart.defaults.borderColor = '#334155';
Chart.defaults.backgroundColor = 'rgba(13, 148, 136, 0.1)';

// Custom chart theme
const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#cbd5e1',
        usePointStyle: true,
        padding: 15,
        font: { size: 12, weight: '500' }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      titleColor: '#f1f5f9',
      bodyColor: '#cbd5e1',
      borderColor: '#334155',
      borderWidth: 1,
      padding: 12,
      displayColors: true,
      callbacks: {
        labelColor: function (context) {
          return {
            borderColor: context.dataset.borderColor || '#14b8a6',
            backgroundColor: context.dataset.backgroundColor || 'rgba(13, 148, 136, 0.8)'
          };
        }
      }
    }
  },
  scales: {
    x: {
      ticks: { color: '#94a3b8', font: { size: 11 } },
      grid: { color: '#334155', drawBorder: false },
      border: { display: false }
    },
    y: {
      ticks: { color: '#94a3b8', font: { size: 11 } },
      grid: { color: '#334155', drawBorder: false },
      border: { display: false }
    }
  }
};

// Create site type distribution chart
function createSiteTypeChart(containerId, data) {
  const ctx = document.getElementById(containerId);
  if (!ctx) return null;

  return new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['ULAB Recycling', 'Industrial Smelters', 'Verified Sites'],
      datasets: [{
        data: [data.ulab, data.smelter, data.verified],
        backgroundColor: ['#9333ea', '#f97316', '#22c55e'],
        borderColor: '#1e293b',
        borderWidth: 2,
        hoverOffset: 8
      }]
    },
    options: {
      ...chartDefaults,
      plugins: {
        ...chartDefaults.plugins,
        legend: {
          position: 'bottom',
          labels: {
            color: '#cbd5e1',
            usePointStyle: true,
            padding: 15,
            font: { size: 12, weight: '500' }
          }
        }
      }
    }
  });
}

// Create risk distribution chart
function createRiskDistributionChart(containerId, data) {
  const ctx = document.getElementById(containerId);
  if (!ctx) return null;

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['0.5-0.6\n(Low)', '0.6-0.7\n(Low-Med)', '0.7-0.8\n(Medium)', '0.8-0.9\n(High)', '0.9-1.0\n(Very High)'],
      datasets: [{
        label: 'Number of Sites',
        data: [
          data['0.5-0.6'] || 0,
          data['0.6-0.7'] || 0,
          data['0.7-0.8'] || 0,
          data['0.8-0.9'] || 0,
          data['0.9-1.0'] || 0
        ],
        backgroundColor: [
          'rgba(34, 197, 94, 0.7)',
          'rgba(234, 179, 8, 0.7)',
          'rgba(249, 115, 22, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(220, 38, 38, 0.9)'
        ],
        borderColor: [
          '#22c55e',
          '#eab308',
          '#f97316',
          '#ef4444',
          '#dc2626'
        ],
        borderWidth: 2,
        borderRadius: 4
      }]
    },
    options: {
      ...chartDefaults,
      indexAxis: 'x',
      scales: {
        y: {
          ...chartDefaults.scales.y,
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  });
}

// Create timeline chart (cumulative detections)
function createTimelineChart(containerId, timelineData) {
  const ctx = document.getElementById(containerId);
  if (!ctx) return null;

  const labels = timelineData.map(d => d.date);
  const data = timelineData.map(d => d.count);

  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Cumulative Detections',
        data: data,
        borderColor: '#14b8a6',
        backgroundColor: 'rgba(13, 148, 136, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#14b8a6',
        pointBorderColor: '#0d9488',
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBorderWidth: 2
      }]
    },
    options: {
      ...chartDefaults,
      plugins: {
        ...chartDefaults.plugins,
        legend: {
          position: 'top',
          labels: {
            color: '#cbd5e1',
            usePointStyle: true,
            padding: 15,
            font: { size: 12, weight: '500' }
          }
        }
      },
      scales: {
        y: {
          ...chartDefaults.scales.y,
          beginAtZero: true,
          ticks: {
            stepSize: 5
          }
        }
      }
    }
  });
}

// Create model performance comparison chart
// Note: Performance metrics are illustrative placeholders.
// Formal metrics pending field verification campaigns.
function createPerformanceChart(containerId) {
  const ctx = document.getElementById(containerId);
  if (!ctx) return null;

  // This chart is intentionally not rendered until real metrics are available.
  // Return null to skip rendering.
  return null;
}

// Create feature importance chart
function createFeatureImportanceChart(containerId, features) {
  const ctx = document.getElementById(containerId);
  if (!ctx) return null;

  const sortedFeatures = [...features].sort((a, b) => b.importance - a.importance);

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sortedFeatures.map(f => f.name),
      datasets: [{
        label: 'Importance Score',
        data: sortedFeatures.map(f => f.importance),
        backgroundColor: 'rgba(13, 148, 136, 0.8)',
        borderColor: '#0d9488',
        borderWidth: 1,
        borderRadius: 4
      }]
    },
    options: {
      indexAxis: 'y',
      ...chartDefaults,
      scales: {
        x: {
          ...chartDefaults.scales.x,
          beginAtZero: true,
          max: 1,
          ticks: {
            stepSize: 0.2,
            callback: function (value) {
              return (value * 100).toFixed(0) + '%';
            }
          }
        }
      }
    }
  });
}

// Create status distribution chart
function createStatusChart(containerId, ulabSites, smelterSites) {
  const ctx = document.getElementById(containerId);
  if (!ctx) return null;

  const allSites = [...ulabSites, ...smelterSites];
  const statusCounts = {
    'Pending Verification': 0,
    'Scheduled for Visit': 0,
    'Under Review': 0
  };

  allSites.forEach(site => {
    if (statusCounts.hasOwnProperty(site.status)) {
      statusCounts[site.status]++;
    }
  });

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(statusCounts),
      datasets: [{
        label: 'Number of Sites',
        data: Object.values(statusCounts),
        backgroundColor: [
          '#eab308',
          '#3b82f6',
          '#ef4444'
        ],
        borderColor: [
          '#ca8a04',
          '#1d4ed8',
          '#dc2626'
        ],
        borderWidth: 2,
        borderRadius: 4
      }]
    },
    options: {
      ...chartDefaults,
      scales: {
        y: {
          ...chartDefaults.scales.y,
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  });
}

// Create risk level pie chart
function createRiskLevelChart(containerId, ulabSites, smelterSites) {
  const ctx = document.getElementById(containerId);
  if (!ctx) return null;

  const allSites = [...ulabSites, ...smelterSites];
  const riskLevels = {
    'Very High (>0.85)': 0,
    'High (0.7-0.85)': 0,
    'Medium (0.5-0.7)': 0
  };

  allSites.forEach(site => {
    if (site.riskScore > 0.85) {
      riskLevels['Very High (>0.85)']++;
    } else if (site.riskScore > 0.7) {
      riskLevels['High (0.7-0.85)']++;
    } else {
      riskLevels['Medium (0.5-0.7)']++;
    }
  });

  return new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(riskLevels),
      datasets: [{
        data: Object.values(riskLevels),
        backgroundColor: [
          '#dc2626',
          '#f97316',
          '#eab308'
        ],
        borderColor: '#1e293b',
        borderWidth: 2,
        hoverOffset: 8
      }]
    },
    options: {
      ...chartDefaults,
      plugins: {
        ...chartDefaults.plugins,
        legend: {
          position: 'bottom',
          labels: {
            color: '#cbd5e1',
            usePointStyle: true,
            padding: 15,
            font: { size: 12, weight: '500' }
          }
        }
      }
    }
  });
}

// Create contamination severity heatmap (table-style)
function createContaminationTable(containerId, ulabSites, smelterSites) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const allSites = [...ulabSites, ...smelterSites];
  const sorted = allSites.sort((a, b) => b.riskScore - a.riskScore).slice(0, 10);

  let html = `
    <table class="performance-table" style="width: 100%; margin-top: 12px;">
      <thead>
        <tr>
          <th>Site ID</th>
          <th>Type</th>
          <th>Risk Score</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
  `;

  sorted.forEach(site => {
    const type = site.id.includes('SMELTER') ? 'Smelter' : 'ULAB';
    const statusColor = site.status === 'Pending Verification' ? '#eab308' :
      site.status === 'Scheduled for Visit' ? '#3b82f6' : '#ef4444';

    html += `
      <tr>
        <td style="font-weight: 500; color: #cbd5e1;">${site.id}</td>
        <td><span class="badge badge-${type.toLowerCase()}">${type}</span></td>
        <td>
          <span style="color: ${Utils.getRiskColor(site.riskScore)}; font-weight: 600;">
            ${site.riskScore.toFixed(2)}
          </span>
        </td>
        <td style="color: ${statusColor}; font-size: 12px; font-weight: 500;">${site.status}</td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;
}

// Helper to safely destroy chart
function destroyChart(chartId) {
  const ctx = document.getElementById(chartId);
  if (ctx && window.Chart) {
    const existing = Chart.getChart(ctx);
    if (existing) existing.destroy();
  }
}

// Initialize all charts for a given container set
function initializeCharts(prefix, ulabSites, smelterSites) {
  const stats = generateAnalyticsData(ulabSites, smelterSites);
  const timelineData = generateTimelineData();

  const charts = {
    siteType: createSiteTypeChart(`${prefix}-site-type`, stats.siteTypes),
    riskDist: createRiskDistributionChart(`${prefix}-risk-dist`, stats.riskDistribution),
    timeline: createTimelineChart(`${prefix}-timeline`, timelineData),
    status: createStatusChart(`${prefix}-status`, ulabSites, smelterSites),
    riskLevel: createRiskLevelChart(`${prefix}-risk-level`, ulabSites, smelterSites)
  };

  return charts;
}
