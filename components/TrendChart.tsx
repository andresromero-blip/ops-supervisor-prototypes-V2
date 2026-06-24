'use client'

interface TrendChartProps {
  height?: number
  showLabels?: boolean
  periodLabel?: string
}

// Simple sparkline chart with agent + team + target lines
export function TrendChart({ height = 90, showLabels = false, periodLabel = 'D-6' }: TrendChartProps) {
  const w = 560
  const h = height

  const agentPoints = [65, 60, 58, 54, 50, 46, 42, 40]
  const teamPoints  = [55, 54, 55, 53, 52, 51, 50, 49]
  const targetY = h * 0.42

  const toPath = (pts: number[]) =>
    pts.map((y, i) => `${(i / (pts.length - 1)) * w},${(y / 100) * h}`).join(' ')

  return (
    <div className="trend-chart" style={{ height }}>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none" style={{ display: 'block' }}>
        {/* Target line */}
        <line x1="0" y1={targetY} x2={w} y2={targetY} stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="5,4" />
        <text x={w - 4} y={targetY - 4} fontSize="9" fill="#9ca3af" textAnchor="end">TARGET</text>

        {/* Team line */}
        <polyline
          points={toPath(teamPoints)}
          fill="none"
          stroke="#d1d5db"
          strokeWidth="1.5"
          strokeDasharray="4,3"
        />

        {/* Agent / main line */}
        <polyline
          points={toPath(agentPoints)}
          fill="none"
          stroke="#54B282"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {showLabels && (
          <>
            <text x="0" y={h} fontSize="9" fill="#9ca3af">{periodLabel}</text>
            <text x={w * 0.33} y={h} fontSize="9" fill="#9ca3af">D-4</text>
            <text x={w * 0.66} y={h} fontSize="9" fill="#9ca3af">D-2</text>
            <text x={w - 20} y={h} fontSize="9" fill="#9ca3af">Today</text>
          </>
        )}
      </svg>
    </div>
  )
}

export function TrendLegend() {
  return (
    <div style={{ display: 'flex', gap: 14, marginTop: 6, fontSize: 11, color: '#9ca3af' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ width: 20, height: 2, background: '#54b282', display: 'inline-block' }} />
        Agent
      </span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ width: 20, height: 2, background: '#d1d5db', display: 'inline-block', borderTop: '2px dashed #d1d5db' }} />
        Team
      </span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ width: 20, height: 2, background: '#d1d5db', display: 'inline-block', borderTop: '2px dashed #9ca3af' }} />
        Target
      </span>
    </div>
  )
}
