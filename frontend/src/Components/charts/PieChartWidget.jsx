import React, { useState } from 'react';

export const PieChartWidget = ({
  data,
  centerTitle,
  centerSubtitle,
  prefix = '',
  size = 190
}) => {
  const [activeSegment, setActiveSegment] = useState(null);

  const total = data.reduce((sum, item) => sum + item.count, 0);
  const center = size / 2;
  const radius = size * 0.38;
  const innerRadius = size * 0.24;

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

  const formattedTotal =
    prefix === '₦'
      ? `₦${(total / 1000000).toFixed(1)}M`
      : total.toLocaleString();

  return (
    <div className="demographics-chart-container">
      <div className="chart-svg-wrapper">
        <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
          <g>
            {arcs.map((arc) => {
              const isHovered = activeSegment === arc.index;
              return (
                <path
                  key={arc.label}
                  d={arc.pathData}
                  fill={arc.color}
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  style={{
                    transformOrigin: `${center}px ${center}px`,
                    transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    filter: isHovered ? 'drop-shadow(0 4px 10px rgba(0, 194, 255, 0.4))' : 'none',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={() => setActiveSegment(arc.index)}
                  onMouseLeave={() => setActiveSegment(null)}
                />
              );
            })}
          </g>
          <text x={center} y={center - 4} textAnchor="middle" className="donut-center-total" style={{ fontSize: size > 180 ? '16px' : '14px' }}>
            {centerTitle || formattedTotal}
          </text>
          <text x={center} y={center + 14} textAnchor="middle" className="donut-center-label" style={{ fontSize: '10px' }}>
            {centerSubtitle || 'Total'}
          </text>
        </svg>

        {activeSegment !== null && (
          <div className="chart-tooltip">
            <strong>{arcs[activeSegment].label}</strong>
            <div>
              {prefix}{arcs[activeSegment].count.toLocaleString()} ({arcs[activeSegment].percent}%)
            </div>
          </div>
        )}
      </div>

      <div className="demographics-legend">
        {data.map((item, i) => (
          <div
            key={item.label}
            className={`legend-item ${activeSegment === i ? 'active' : ''}`}
            onMouseEnter={() => setActiveSegment(i)}
            onMouseLeave={() => setActiveSegment(null)}
          >
            <div className="legend-indicator" style={{ backgroundColor: item.color }} />
            <div className="legend-info">
              <span className="legend-title">{item.label}</span>
              <span className="legend-numbers">
                <strong>{prefix}{item.count.toLocaleString()}</strong> ({item.percent}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
