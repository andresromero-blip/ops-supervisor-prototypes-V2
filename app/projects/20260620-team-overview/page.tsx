'use client'
import { useState } from 'react'
import { usePeriod } from '@/components/AppShell'
import { TrendChart } from '@/components/TrendChart'
import { kpiData, agents, keyTopics } from '@/lib/data'

export default function TeamOverviewPage() {
  const period = usePeriod()
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [topicsTab, setTopicsTab] = useState<'top5' | 'overdue' | 'upcoming'>('top5')

  const selectedAgentObj = agents.find(a => a.name === selectedAgent)

  const csatStatusBadge = (s: string) => {
    if (s === 'At Risk') return 'badge badge-risk'
    if (s === 'Off Target') return 'badge badge-off'
    return 'badge badge-target'
  }

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2>Performance Dashboard</h2>
            <p>Team performance overview · Wednesday 24 June ·{' '}
              <span style={{ color: '#54b282' }}>Daily ({period}): 23 Jun</span>
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        {kpiData.map(k => (
          <div className="kpi-card" key={k.name}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div className="kpi-card-label">{k.name}</div>
              {k.status && <span className="badge badge-risk" style={{ fontSize: 9 }}>{k.status}</span>}
            </div>
            <div className="kpi-card-value">{k.actual}</div>
            <div className="kpi-card-target">Target {k.target}</div>
            <div className="kpi-card-delta" style={{ color: k.deltaDir === 'down' ? '#ef4444' : k.deltaDir === 'up' ? '#54b282' : '#9ca3af' }}>
              {k.delta}
            </div>
          </div>
        ))}
      </div>

      {/* KPI Trends + Team Status */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 12, marginBottom: 12 }}>
        {/* KPI Trends */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div className="section-title" style={{ marginBottom: 0 }}>KPI Trends — Customer Satisfaction</div>
            {selectedAgent && (
              <span className="agent-chip">
                {selectedAgent}
                <button
                  onClick={() => setSelectedAgent(null)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3d8f64', fontSize: 12, padding: 0, lineHeight: 1, marginLeft: 2 }}
                >
                  ×
                </button>
              </span>
            )}
          </div>
          <p style={{ fontSize: 11, color: '#9ca3af', marginBottom: 8 }}>Daily trend</p>
          <TrendChart height={100} showLabels />
          <div className="callout" style={{ marginTop: 10 }}>
            <div className="callout-dot" />
            <span>Select an agent from Team Status to compare individual performance against team results.</span>
          </div>
        </div>

        {/* Team Status */}
        <div className="card">
          <div className="section-title">Team Status — CSAT</div>
          <div style={{ marginBottom: 6 }}>
            {agents.map(a => (
              <div
                key={a.id}
                className={`agent-row${selectedAgent === a.name ? ' selected' : ''}`}
                onClick={() => setSelectedAgent(selectedAgent === a.name ? null : a.name)}
                style={{ marginBottom: 2 }}
              >
                <span style={{ fontSize: 12.5, fontWeight: 500 }}>{a.name}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: a.csatStatus === 'On Target' ? '#54b282' : a.csatStatus === 'Off Target' ? '#ef4444' : '#f59e0b' }}>
                    {a.csat}
                  </span>
                  <span className={csatStatusBadge(a.csatStatus)}>{a.csatStatus}</span>
                </span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 8 }}>
            Selecting an agent updates KPI cards and trend analysis.
          </p>
        </div>
      </div>

      {/* Key Topics */}
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="section-title">Your Key Topics</div>
        <div className="tabs" style={{ marginBottom: 12 }}>
          {([['top5', 'Top 5 Facts', 4], ['overdue', 'Overdue', 127], ['upcoming', 'Upcoming', 4]] as const).map(([k, label, count]) => (
            <button key={k} className={`tab-btn${topicsTab === k ? ' active' : ''}`} onClick={() => setTopicsTab(k)}>
              {label} <span style={{ background: topicsTab === k ? '#e8f7ef' : '#f3f4f6', color: topicsTab === k ? '#1a5e3f' : '#6b7280', borderRadius: 20, padding: '0 6px', fontSize: 10, marginLeft: 4 }}>{count}</span>
            </button>
          ))}
        </div>
        {topicsTab === 'top5' && (
          <div>
            {keyTopics.map(t => (
              <div key={t.rank} style={{ padding: '8px 0', borderBottom: '1px solid #f7f7f7', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500, minWidth: 22 }}>#{t.rank}</span>
                <div>
                  <span style={{ fontSize: 12.5, fontWeight: 600 }}>{t.agent}</span>{' '}
                  <span className="badge badge-risk" style={{ fontSize: 10 }}>{t.tag}</span>
                  {t.text && <p style={{ fontSize: 11.5, color: '#6b7280', marginTop: 2 }}>{t.text}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
        {topicsTab === 'overdue' && (
          <div style={{ padding: '16px 0', textAlign: 'center', fontSize: 12.5, color: '#9ca3af' }}>
            127 overdue items — prioritize by agent severity.
          </div>
        )}
        {topicsTab === 'upcoming' && (
          <div style={{ padding: '16px 0', textAlign: 'center', fontSize: 12.5, color: '#9ca3af' }}>
            4 upcoming items scheduled this week.
          </div>
        )}
      </div>

      {/* Team Members */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div className="section-title" style={{ marginBottom: 0 }}>Team Members — Last 30 Days</div>
          <span style={{ fontSize: 11.5, color: '#9ca3af' }}>8 agents</span>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Agent</th>
              <th>KPI Score</th>
              <th>Status</th>
              <th>Trend</th>
              <th>Pending Activities</th>
            </tr>
          </thead>
          <tbody>
            {agents.map(a => (
              <tr key={a.id} style={{ cursor: 'pointer' }}>
                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="avatar avatar-blue">{a.initials}</span>
                    {a.name}
                  </span>
                </td>
                <td style={{ color: a.kpiScore === 'All on target' ? '#54b282' : '#ef4444', fontSize: 11.5 }}>
                  {a.kpiScore}
                </td>
                <td>
                  <span className={`badge ${a.status === 'Critical' ? 'badge-outlier' : a.status === 'On target' ? 'badge-target' : 'badge-needs'}`}>
                    {a.status}
                  </span>
                </td>
                <td style={{ color: '#9ca3af', fontSize: 12 }}>— Stable</td>
                <td style={{ color: a.actions === '—' ? '#9ca3af' : '#f59e0b', fontSize: 12 }}>{a.actions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
