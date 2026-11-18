import React, { useState } from 'react';

export const RevenueExpenseChartWidget = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const maxVal = Math.max(...data.flatMap((d) => [d.revenue, d.expenses]), 5000000);
  const chartHeight = 200;
  const chartWidth = 500;
  const paddingLeft = 52;
  const paddingBottom = 28;
  const availableWidth = chartWidth - paddingLeft - 20;
  const availableHeight = chartHeight - paddingBottom - 16;
  const groupWidth = availableWidth / data.length;
  const barWidth = 16;

  // Compute points for the line chart (Expenses)
  const linePoints = data
    .map((item, idx) => {
      const centerX = paddingLeft + idx * groupWidth + groupWidth / 2;
      const y = chartHeight - paddingBottom - (item.expenses / maxVal) * availableHeight;
      return `${centerX},${y}`;
    })
    .join(' ');

  return (
    <div className="admissions-chart-container">
      <div className="chart-header-legend mb-2">
        <div className="legend-pills">
          <span className="legend-tag">
            <span className="dot" style={{ backgroundColor: '#00C2FF' }}></span> Revenue (₦)
          </span>
          <span className="legend-tag">
            <span className="dot" style={{ backgroundColor: '#F59E0B' }}></span> Operating Expenses (₦)
          </span>
        </div>
      </div>

      <div className="chart-svg-wrapper">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="bar-chart-svg"
          width="100%"
          height="100%"
        >
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00C2FF" />
              <stop offset="100%" stopColor="#0E86D4" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 1500000, 3000000, 4500000].map((val) => {
            const y = chartHeight - paddingBottom - (val / maxVal) * availableHeight;
            return (
              <g key={val}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={chartWidth - 10}
                  y2={y}
                  stroke="#E2E8F0"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="chart-axis-label"
                  style={{ fontSize: '9px' }}
                >
                  ₦{(val / 1000000).toFixed(1)}M
                </text>
              </g>
            );
          })}

          {/* Revenue Bars */}
          {data.map((item, index) => {
            const groupX = paddingLeft + index * groupWidth;
            const centerX = groupX + groupWidth / 2;
            const barH = (item.revenue / maxVal) * availableHeight;
            const barY = chartHeight - paddingBottom - barH;
            const isHovered = hoveredIndex === index;

            return (
              <g
                key={item.label}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: 'pointer' }}
              >
                {isHovered && (
                  <rect
                    x={groupX + 4}
                    y={10}
                    width={groupWidth - 8}
                    height={availableHeight + 8}
                    fill="rgba(0, 194, 255, 0.08)"
                    rx="4"
                  />
                )}

                <rect
                  x={centerX - barWidth / 2}
                  y={barY}
                  width={barWidth}
                  height={barH}
                  fill="url(#revenueGradient)"
                  rx="4"
                />

                <text
                  x={centerX}
                  y={chartHeight - 8}
                  textAnchor="middle"
                  className={`chart-month-label ${isHovered ? 'active' : ''}`}
                >
                  {item.label}
                </text>
              </g>
            );
          })}

          {/* Expenses Line Overlay */}
          <polyline
            points={linePoints}
            fill="none"
            stroke="#F59E0B"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(245, 158, 11, 0.3))' }}
          />

          {/* Expense Data Points */}
          {data.map((item, idx) => {
            const centerX = paddingLeft + idx * groupWidth + groupWidth / 2;
            const y = chartHeight - paddingBottom - (item.expenses / maxVal) * availableHeight;
            const isHovered = hoveredIndex === idx;

            return (
              <circle
                key={idx}
                cx={centerX}
                cy={y}
                r={isHovered ? 6 : 4}
                fill="#F59E0B"
                stroke="#FFFFFF"
                strokeWidth="2"
                style={{ transition: 'all 0.15s', cursor: 'pointer' }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            );
          })}
        </svg>

        {hoveredIndex !== null && (
          <div className="bar-hover-tooltip" style={{ minWidth: '160px' }}>
            <div className="tooltip-title">{data[hoveredIndex].label} Financial Summary</div>
            <div className="tooltip-row">
              <span className="dot" style={{ backgroundColor: '#00C2FF' }}></span>
              <span>Revenue: <strong>₦{data[hoveredIndex].revenue.toLocaleString()}</strong></span>
            </div>
            <div className="tooltip-row">
              <span className="dot" style={{ backgroundColor: '#F59E0B' }}></span>
              <span>Expenses: <strong>₦{data[hoveredIndex].expenses.toLocaleString()}</strong></span>
            </div>
            <div className="tooltip-row border-t pt-1 mt-1">
              <span className="dot" style={{ backgroundColor: '#10B981' }}></span>
              <span>Net Profit: <strong className="text-emerald">₦{(data[hoveredIndex].revenue - data[hoveredIndex].expenses).toLocaleString()}</strong></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
