import React, { useState } from 'react';

export const AttendanceBarChart = ({ data }) => {
  const [hoveredDay, setHoveredDay] = useState(null);

  const maxVal = 130;
  const chartHeight = 180;
  const chartWidth = 440;
  const paddingLeft = 32;
  const paddingBottom = 26;
  const availableWidth = chartWidth - paddingLeft - 20;
  const availableHeight = chartHeight - paddingBottom - 10;
  const groupWidth = availableWidth / data.length;
  const barWidth = 14;

  return (
    <div className="attendance-chart-container">
      <div className="chart-header-legend">
        <div className="legend-pills">
          <span className="legend-tag">
            <span className="dot present-dot"></span> Present
          </span>
          <span className="legend-tag">
            <span className="dot late-dot"></span> Late
          </span>
          <span className="legend-tag">
            <span className="dot absent-dot"></span> Absent
          </span>
        </div>
      </div>

      <div className="chart-svg-wrapper">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} width="100%" height="100%">
          {[0, 30, 60, 90, 120].map((val) => {
            const y = chartHeight - paddingBottom - (val / maxVal) * availableHeight;
            return (
              <g key={val}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={chartWidth - 10}
                  y2={y}
                  stroke="#E2E8F0"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
                <text x={paddingLeft - 6} y={y + 4} textAnchor="end" className="chart-axis-label">
                  {val}
                </text>
              </g>
            );
          })}

          {data.map((item, index) => {
            const groupX = paddingLeft + index * groupWidth;
            const centerX = groupX + groupWidth / 2;

            const presentHeight = (item.present / maxVal) * availableHeight;
            const presentY = chartHeight - paddingBottom - presentHeight;

            const lateHeight = ((item.late * 6) / maxVal) * availableHeight;
            const lateY = chartHeight - paddingBottom - Math.max(lateHeight, 4);

            const isHovered = hoveredDay === index;

            return (
              <g
                key={item.day}
                onMouseEnter={() => setHoveredDay(index)}
                onMouseLeave={() => setHoveredDay(null)}
                style={{ cursor: 'pointer' }}
              >
                {isHovered && (
                  <rect
                    x={groupX + 4}
                    y={10}
                    width={groupWidth - 8}
                    height={availableHeight + 6}
                    fill="rgba(0, 194, 255, 0.08)"
                    rx="6"
                  />
                )}

                {/* Present Bar */}
                <rect
                  x={centerX - barWidth - 1}
                  y={presentY}
                  width={barWidth}
                  height={presentHeight}
                  fill="#00C2FF"
                  rx="3"
                />

                {/* Late Bar */}
                <rect
                  x={centerX + 2}
                  y={lateY}
                  width={barWidth}
                  height={Math.max(lateHeight, 4)}
                  fill="#F59E0B"
                  rx="3"
                />

                <text
                  x={centerX}
                  y={chartHeight - 8}
                  textAnchor="middle"
                  className={`chart-month-label ${isHovered ? 'active' : ''}`}
                >
                  {item.day}
                </text>
              </g>
            );
          })}
        </svg>

        {hoveredDay !== null && (
          <div className="bar-hover-tooltip">
            <div className="tooltip-title">{data[hoveredDay].day} Attendance</div>
            <div className="tooltip-row">
              <span className="dot present-dot"></span> Present: <strong>{data[hoveredDay].present}</strong>
            </div>
            <div className="tooltip-row">
              <span className="dot late-dot"></span> Late: <strong>{data[hoveredDay].late}</strong>
            </div>
            <div className="tooltip-row">
              <span className="dot absent-dot"></span> Absent: <strong>{data[hoveredDay].absent}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
