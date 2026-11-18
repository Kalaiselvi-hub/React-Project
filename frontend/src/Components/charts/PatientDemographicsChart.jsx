import React, { useState } from 'react';

export const PatientDemographicsChart = ({ data }) => {
  const [activeSegment, setActiveSegment] = useState(null);

  const total = data.reduce((sum, item) => sum + item.count, 0);

  // Calculate SVG arc paths
  const size = 220;
  const center = size / 2;
  const radius = 80;
  const innerRadius = 52;

  let cumulativeAngle = 0;

  const arcs = data.map((item, index) => {
    const angle = (item.count / total) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle += angle;

    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;

    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);

    const x3 = center + innerRadius * Math.cos(endRad);
    const y3 = center + innerRadius * Math.sin(endRad);
    const x4 = center + innerRadius * Math.cos(startRad);
    const y4 = center + innerRadius * Math.sin(startRad);

    const largeArc = angle > 180 ? 1 : 0;

    const pathData = `
      M ${x1} ${y1}
      A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
      L ${x3} ${y3}
      A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}
      Z
    `;

    return {
      ...item,
      pathData,
      index
    };
  });

  return (
    <div className="demographics-chart-container">
      <div className="chart-svg-wrapper">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          height={size}
          className="donut-svg"
        >
          <g>
            {arcs.map((arc) => {
              const isHovered = activeSegment === arc.index;
              return (
                <path
                  key={arc.group}
                  d={arc.pathData}
                  fill={arc.color}
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  className="chart-arc"
                  style={{
                    transformOrigin: `${center}px ${center}px`,
                    transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    filter: isHovered ? 'drop-shadow(0 4px 12px rgba(0, 194, 255, 0.4))' : 'none',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={() => setActiveSegment(arc.index)}
                  onMouseLeave={() => setActiveSegment(null)}
                />
              );
            })}
          </g>
          {/* Center text */}
          <text
            x={center}
            y={center - 6}
            textAnchor="middle"
            className="donut-center-total"
          >
            {total.toLocaleString()}
          </text>
          <text
            x={center}
            y={center + 14}
            textAnchor="middle"
            className="donut-center-label"
          >
            Total Patients
          </text>
        </svg>

        {activeSegment !== null && (
          <div className="chart-tooltip">
            <strong>{arcs[activeSegment].group}</strong>
            <div>{arcs[activeSegment].count.toLocaleString()} patients ({arcs[activeSegment].percent}%)</div>
          </div>
        )}
      </div>

      <div className="demographics-legend">
        {data.map((item, i) => (
          <div
            key={item.group}
            className={`legend-item ${activeSegment === i ? 'active' : ''}`}
            onMouseEnter={() => setActiveSegment(i)}
            onMouseLeave={() => setActiveSegment(null)}
          >
            <div className="legend-indicator" style={{ backgroundColor: item.color }} />
            <div className="legend-info">
              <span className="legend-title">{item.group}</span>
              <span className="legend-numbers">
                <strong>{item.count}</strong> ({item.percent}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
