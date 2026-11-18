import React, { useState } from 'react';

export const AdmissionsBarChart = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const maxVal = Math.max(...data.flatMap((d) => [d.admissions, d.discharges]), 200);
  const chartHeight = 180;
  const chartWidth = 460;
  const paddingLeft = 36;
  const paddingBottom = 28;
  const availableWidth = chartWidth - paddingLeft - 20;
  const availableHeight = chartHeight - paddingBottom - 10;
  const barGroupWidth = availableWidth / data.length;
  const singleBarWidth = 14;

  return (
    <div className="admissions-chart-container">
      <div className="chart-header-legend">
        <div className="legend-pills">
          <span className="legend-tag">
            <span className="dot adm-dot"></span> Admissions
          </span>
          <span className="legend-tag">
            <span className="dot dis-dot"></span> Discharges
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
            <linearGradient id="admGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00C2FF" />
              <stop offset="100%" stopColor="#0077B6" />
            </linearGradient>
            <linearGradient id="disGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0A1030" />
              <stop offset="100%" stopColor="#253575" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 50, 100, 150, 200].map((val) => {
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
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {data.map((item, index) => {
            const groupX = paddingLeft + index * barGroupWidth;
            const centerX = groupX + barGroupWidth / 2;

            const admHeight = (item.admissions / maxVal) * availableHeight;
            const admY = chartHeight - paddingBottom - admHeight;

            const disHeight = (item.discharges / maxVal) * availableHeight;
            const disY = chartHeight - paddingBottom - disHeight;

            const isHovered = hoveredIndex === index;

            return (
              <g
                key={item.month}
                className="bar-group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Background highlight pill on hover */}
                {isHovered && (
                  <rect
                    x={groupX + 4}
                    y={10}
                    width={barGroupWidth - 8}
                    height={availableHeight + 6}
                    fill="rgba(0, 194, 255, 0.08)"
                    rx="6"
                  />
                )}

                {/* Admissions Bar */}
                <rect
                  x={centerX - singleBarWidth - 2}
                  y={admY}
                  width={singleBarWidth}
                  height={admHeight}
                  fill="url(#admGradient)"
                  rx="4"
                  className="bar adm-bar"
                />

                {/* Discharges Bar */}
                <rect
                  x={centerX + 2}
                  y={disY}
                  width={singleBarWidth}
                  height={disHeight}
                  fill="url(#disGradient)"
                  rx="4"
                  className="bar dis-bar"
                />

                {/* Month label */}
                <text
                  x={centerX}
                  y={chartHeight - 8}
                  textAnchor="middle"
                  className={`chart-month-label ${isHovered ? 'active' : ''}`}
                >
                  {item.month}
                </text>
              </g>
            );
          })}
        </svg>

        {hoveredIndex !== null && (
          <div className="bar-hover-tooltip">
            <div className="tooltip-title">{data[hoveredIndex].month} Overview</div>
            <div className="tooltip-row">
              <span className="dot adm-dot"></span> Admissions: <strong>{data[hoveredIndex].admissions}</strong>
            </div>
            <div className="tooltip-row">
              <span className="dot dis-dot"></span> Discharges: <strong>{data[hoveredIndex].discharges}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
