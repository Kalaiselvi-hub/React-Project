import React, { useState } from 'react';

export const BarChartWidget = ({
  data,
  valuePrefix = '',
  barColor = '#00C2FF',
  height = 170,
  unit = ''
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const maxVal = Math.max(...data.map((d) => d.value), 10);
  const chartHeight = height;
  const chartWidth = 440;
  const paddingLeft = valuePrefix === '₦' ? 48 : 34;
  const paddingBottom = 26;
  const availableWidth = chartWidth - paddingLeft - 16;
  const availableHeight = chartHeight - paddingBottom - 10;
  const groupWidth = availableWidth / data.length;
  const barWidth = Math.min(groupWidth * 0.45, 20);

  const formatAxis = (v) => {
    if (valuePrefix === '₦') {
      if (v >= 1000000) return `₦${(v / 1000000).toFixed(1)}M`;
      if (v >= 1000) return `₦${(v / 1000).toFixed(0)}k`;
      return `₦${v}`;
    }
    return v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v;
  };

  const steps = [0, maxVal * 0.33, maxVal * 0.66, maxVal];

  return (
    <div className="admissions-chart-container">
      <div className="chart-svg-wrapper">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="bar-chart-svg"
          width="100%"
          height="100%"
        >
          <defs>
            <linearGradient id="singleBarGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={barColor} />
              <stop offset="100%" stopColor="#0077B6" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {steps.map((val, idx) => {
            const y = chartHeight - paddingBottom - (val / maxVal) * availableHeight;
            return (
              <g key={idx}>
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
                  x={paddingLeft - 6}
                  y={y + 4}
                  textAnchor="end"
                  className="chart-axis-label"
                  style={{ fontSize: '9px' }}
                >
                  {formatAxis(Math.round(val))}
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {data.map((item, index) => {
            const groupX = paddingLeft + index * groupWidth;
            const centerX = groupX + groupWidth / 2;
            const barH = (item.value / maxVal) * availableHeight;
            const barY = chartHeight - paddingBottom - Math.max(barH, 4);
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
                    x={groupX + 2}
                    y={10}
                    width={groupWidth - 4}
                    height={availableHeight + 4}
                    fill="rgba(0, 194, 255, 0.08)"
                    rx="4"
                  />
                )}

                <rect
                  x={centerX - barWidth / 2}
                  y={barY}
                  width={barWidth}
                  height={Math.max(barH, 4)}
                  fill="url(#singleBarGradient)"
                  rx="4"
                  style={{
                    filter: isHovered ? 'drop-shadow(0 2px 8px rgba(0, 194, 255, 0.5))' : 'none',
                    transition: 'all 0.2s'
                  }}
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
        </svg>

        {hoveredIndex !== null && (
          <div className="bar-hover-tooltip">
            <div className="tooltip-title">{data[hoveredIndex].label}</div>
            <div className="tooltip-row">
              <span className="dot adm-dot"></span>
              <span>
                Value: <strong>{valuePrefix}{data[hoveredIndex].value.toLocaleString()} {unit}</strong>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
