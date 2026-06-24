import Link from 'next/link'

const projects = [
  {
    href: '/projects/20260620-team-overview',
    title: 'Team Overview',
    subtitle: 'team performance dashboard',
    desc: 'Prioritized critical alerts, KPIs grouped by category, period filters and key team topics.',
  },
  {
    href: '/projects/20260620-agent-view',
    title: 'Agent View',
    subtitle: 'individual performance view',
    desc: 'Agent selector, grouped KPIs and contextual coaching plan with QTD trend support.',
  },
  {
    href: '/projects/20260620-one-to-one',
    title: 'One to One',
    subtitle: 'coaching & development dashboard',
    desc: 'KPI cards with actionable action badges, deep dive with trend chart, facts and storyline.',
  },
  {
    href: '/projects/20260620-game-plan',
    title: 'Game Plan',
    subtitle: 'supervisor weekly planner',
    desc: 'Compact weekly calendar with a master-detail daily timeline and team facts grouped by severity.',
  },
  {
    href: '/projects/20260620-dsm',
    title: 'DSM',
    subtitle: 'daily supervisor meeting',
    desc: 'Pending actions expanded by default with explicit status badges and clear action hierarchy.',
  },
  {
    href: '/projects/20260620-cedp',
    title: 'CEDP',
    subtitle: 'continuous employee development',
    desc: 'Employee development plan overview and tracking.',
  },
]

export default function Home() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', paddingTop: 20 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>OPS.Supervisor</h1>
        <p style={{ fontSize: 13, color: '#6b7280' }}>UX prototypes — v2 iterations</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {projects.map((p) => (
          <Link key={p.href} href={p.href} style={{ textDecoration: 'none' }}>
            <div className="card" style={{ cursor: 'pointer', transition: 'border-color 0.15s', borderColor: '#e5e7eb' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#54B282')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#e5e7eb')}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 2 }}>
                {p.title} <span style={{ fontWeight: 400, color: '#9ca3af', fontSize: 11 }}>— {p.subtitle}</span>
              </div>
              <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.5 }}>{p.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
