'use client'
import { useState } from 'react'
import { usePeriod } from '@/components/AppShell'
import { TrendChart, TrendLegend } from '@/components/TrendChart'

const kpiRows = [
  { kpi: 'Overall', weight: '', target: '100%', actual: '100.1%', avg: '104.4%', rank: '#7/8', trend: '—', color: '#54b282' },
  { kpi: 'CSAT', weight: '25% weight', target: '85%', actual: '81%', avg: '84.4%', rank: '#7/8', trend: '—', color: '#f59e0b' },
  { kpi: 'FCR', weight: '20% weight', target: '78%', actual: '73%', avg: '76.8%', rank: '#7/8', trend: '—', color: '#f59e0b' },
  { kpi: 'AHT', weight: '20% weight', target: '420', actual: '390', avg: '372.1', rank: '#6/8', trend: '—', color: '#54b282' },
  { kpi: 'NPS', weight: '15% weight', target: '45', actual: '85', avg: '88.4', rank: '#7/8', trend: '—', color: '#54b282' },
  { kpi: 'Sales', weight: '10% weight', target: '12%', actual: '10%', avg: '11.4%', rank: '#7/8', trend: '—', color: '#f59e0b' },
  { kpi: 'Adh', weight: '10% weight', target: '95%', actual: '92%', avg: '93.6%', rank: '#5/8', trend: '↘', color: '#f59e0b' },
]

type KpiPeriod = 'Weekly Trend' | 'Monthly Trend' | 'QTD'
const kpiOptions = ['CSAT', 'FCR', 'AHT', 'NPS', 'Sales', 'Adh']

export default function AgentViewPage() {
  const period = usePeriod()
  const [kpiPeriod, setKpiPeriod] = useState<KpiPeriod>('Weekly Trend')
  const [selectedKpi, setSelectedKpi] = useState('CSAT')

  const periodSubLabel: Record<KpiPeriod, string> = {
    'Weekly Trend': 'Last 7 days',
    'Monthly Trend': 'Last 30 days',
    'QTD': 'Quarter to date · Apr 1–Jun 23',
  }

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2>Agent Portal</h2>
            <p>Transparency, recognition, and development · Showing <strong>{period}</strong> data · 23 Jun</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-secondary" style={{ fontSize: 11.5 }}>Comms 2</button>
            <button className="btn-secondary" style={{ fontSize: 11.5 }}>CEDP</button>
            <button className="btn-primary" style={{ fontSize: 11.5 }}>How are you feeling?</button>
          </div>
        </div>
      </div>

      {/* Employee selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: 12.5, color: '#6b7280' }}>Employee:</span>
        <select className="form-select" style={{ width: 200 }}>
          <option>João Silva</option>
        </select>
      </div>

      {/* My Performance */}
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="section-title">My Performance</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>KPI</th>
              <th>Target</th>
              <th>Actual ({period})</th>
              <th>Team Avg</th>
              <th>Rank</th>
              <th>30d Trend</th>
            </tr>
          </thead>
          <tbody>
            {kpiRows.map(row => (
              <tr key={row.kpi}>
                <td>
                  <div style={{ fontWeight: 500 }}>{row.kpi}</div>
                  {row.weight && <div style={{ fontSize: 10.5, color: '#9ca3af' }}>{row.weight}</div>}
                </td>
                <td>{row.target}</td>
                <td style={{ color: row.color, fontWeight: 500 }}>{row.actual}</td>
                <td>{row.avg}</td>
                <td>{row.rank}</td>
                <td style={{ color: row.trend === '↘' ? '#ef4444' : '#9ca3af' }}>{row.trend}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* KPI Evolution */}
      <div className="card" style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div className="section-title" style={{ marginBottom: 0 }}>KPI Evolution — João Silva</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Period toggle — ITERATION B: added QTD */}
            <div className="period-pills">
              {(['Weekly Trend', 'Monthly Trend', 'QTD'] as KpiPeriod[]).map(p => (
                <button
                  key={p}
                  className={`period-pill${kpiPeriod === p ? ' active' : ''}`}
                  onClick={() => setKpiPeriod(p)}
                >
                  {p}
                </button>
              ))}
            </div>
            {/* KPI selector */}
            <select
              className="form-select"
              style={{ width: 90 }}
              value={selectedKpi}
              onChange={e => setSelectedKpi(e.target.value)}
            >
              {kpiOptions.map(k => <option key={k}>{k}</option>)}
            </select>
          </div>
        </div>
        <p style={{ fontSize: 11, color: '#9ca3af', marginBottom: 8 }}>{periodSubLabel[kpiPeriod]}</p>
        <TrendChart height={110} showLabels periodLabel={kpiPeriod === 'Weekly Trend' ? 'D-6' : kpiPeriod === 'Monthly Trend' ? 'D-30' : 'Apr 1'} />
        <TrendLegend />
      </div>

      {/* Personal Insights */}
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="section-title">Personal Insights</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#9ca3af', marginBottom: 8 }}>Golden Nuggets 0</div>
            <p style={{ fontSize: 12, color: '#9ca3af' }}>No golden nuggets yet</p>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#ef4444', marginBottom: 8 }}>Critical 1</div>
            <div style={{ border: '1px solid #fecaca', borderRadius: 8, padding: 10, background: '#fff5f5' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#ef4444', display: 'flex', justifyContent: 'space-between' }}>
                Sales Conversion
                <span className="badge badge-outlier" style={{ fontSize: 9 }}>Outlier Alert</span>
              </div>
              <p style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>
                Low closing technique — sales pitch attempted on only 35% of eligible calls.
                Schedule sales coaching with GROW model.
              </p>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#f59e0b', marginBottom: 8 }}>Warnings 1</div>
            <div style={{ border: '1px solid #fde68a', borderRadius: 8, padding: 10, background: '#fffbeb' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#92400e', display: 'flex', justifyContent: 'space-between' }}>
                Quality Score
                <span className="badge badge-risk" style={{ fontSize: 9 }}>Quality Repeat Fail</span>
              </div>
              <p style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>
                Failed on Proper Greeting Protocol in 3 consecutive evaluations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Points */}
      <div className="card">
        <div className="section-title">Action Points 1</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
          <div>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 6 }}>Training 0</div>
            <p style={{ fontSize: 12, color: '#9ca3af' }}>No training actions</p>
          </div>
          <div>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 6 }}>AI Coach 0</div>
            <p style={{ fontSize: 12, color: '#9ca3af' }}>No AI coaching actions</p>
          </div>
          <div>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 6 }}>Human Development 1</div>
            <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 10 }}>
              <p style={{ fontSize: 12, color: '#374151' }}>Re-listen to last week&apos;s escalation call and self-evaluate.</p>
              <div style={{ display: 'flex', gap: 6, marginTop: 6, alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: '#9ca3af' }}>2026-06-27</span>
                <span className="badge" style={{ background: '#dcfce7', color: '#166534', fontSize: 10 }}>GROW</span>
                <span className="badge badge-pending" style={{ fontSize: 10 }}>Pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
