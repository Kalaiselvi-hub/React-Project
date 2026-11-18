import React, { useState } from 'react';

export const StaffPieChart = ({ data }) => {
  const [activeSegment, setActiveSegment] = useState(null);
  const total = data.reduce((sum, item) => sum + item.count, 0);

  const size = 200;
  const center = size / 2;
  const radius = 72;
  const innerRadius = 46;

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
    <div className="staff-pie-container">
      <div className="chart-svg-wrapper">
        <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
          <g>
            {arcs.map((arc) => (
              <path
                key={arc.name}
                d={arc.pathData}
                fill={arc.color}
                stroke="#ffffff"
                strokeWidth="2"
                style={{
                  transformOrigin: `${center}px ${center}px`,
                  transform: activeSegment === arc.index ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.25s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={() => setActiveSegment(arc.index)}
                onMouseLeave={() => setActiveSegment(null)}
              />
            ))}
          </g>
          <text x={center} y={center - 4} textAnchor="middle" className="donut-center-total">
            {total}
          </text>
          <text x={center} y={center + 14} textAnchor="middle" className="donut-center-label">
            Staff Members
          </text>
        </svg>
      </div>

      <div className="staff-pie-legend">
        {data.map((item, i) => (
          <div
            key={item.name}
            className={`staff-legend-item ${activeSegment === i ? 'active' : ''}`}
            onMouseEnter={() => setActiveSegment(i)}
            onMouseLeave={() => setActiveSegment(null)}
          >
            <span className="dot" style={{ backgroundColor: item.color }} />
            <span className="staff-cat-name">{item.name}</span>
            <span className="staff-cat-count"><strong>{item.count}</strong> ({item.percent}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};
