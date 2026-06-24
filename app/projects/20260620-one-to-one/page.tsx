'use client'
import { useState } from 'react'
import { TrendChart, TrendLegend } from '@/components/TrendChart'
import { oneToOneKpis } from '@/lib/data'

export default function OneToOnePage() {
  const [selectedKpi, setSelectedKpi] = useState('AHT')
  const [showSession, setShowSession] = useState(false)
  const [sessionActions, setSessionActions] = useState<string[]>([])

  const kpi = oneToOneKpis.find(k => k.name === selectedKpi) || oneToOneKpis[0]

  const addAction = (type: string) => {
    setSessionActions(prev => [...prev, type])
  }

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ marginRight: showSession ? 372 : 0, transition: 'margin-right 0.2s' }}>
        <div className="page-header">
          <h2>One to One</h2>
          <p>Coaching &amp; Development Dashboard · KPI → Root Causes → Actions</p>
        </div>

        {/* Agent module — ITERATION D1: no local period selector */}
        <div className="card" style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div className="avatar avatar-green" style={{ width: 36, height: 36, fontSize: 12 }}>JS</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>João Silva</div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>— 1y</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-secondary" style={{ fontSize: 11.5 }}>CEDP</button>
              <button className="btn-primary" onClick={() => setShowSession(true)}>+ New Session</button>
            </div>
          </div>
          {/* ITERATION: callout explaining period lives in header */}
          <div className="callout" style={{ marginTop: 10 }}>
            <div className="callout-dot" />
            <span>Period is set from the global header above (D-1, WTD, MTD, QTD).</span>
          </div>
        </div>

        {/* KPI filter bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          {[
            { k: 'all', label: '6 All' },
            { k: 'outlier', label: '1 Outlier' },
            { k: 'offtarget', label: '1 Off target' },
            { k: 'atrisk', label: '3 At risk' },
            { k: 'ontarget', label: '2 On target' },
          ].map(f => (
            <button
              key={f.k}
              className="period-pill"
              style={f.k === 'all' ? { background: '#1e2d24', color: '#54b282', borderColor: '#54b282' } : {}}
            >
              {f.label}
            </button>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: 11, color: '#9ca3af' }}>Click a KPI to focus its story below</span>
        </div>

        {/* KPI Cards */}
        <div className="kpi-cards-1to1">
          {oneToOneKpis.map(k => (
            <div
              key={k.name}
              className={`kpi-card-1to1${selectedKpi === k.name ? ' active' : ''}`}
              onClick={() => setSelectedKpi(k.name)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
                <span className="name">{k.name}</span>
                {k.status && <span className={`badge ${k.statusClass}`} style={{ fontSize: 9 }}>{k.status}</span>}
              </div>
              <div className="value" style={{ color: k.color }}>{k.actual}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <span style={{ fontSize: 11, color: '#9ca3af' }}>{k.target}</span>
                <span style={{ fontSize: 11, color: k.deltaDir === 'down' ? '#ef4444' : '#54b282' }}>{k.delta}</span>
              </div>
              {/* Contextual badges below each card — ITERATION D2 */}
              <div style={{ marginTop: 5, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {k.name === 'CSAT' && <span className="badge badge-pending" style={{ fontSize: 9 }}>2 pending actions</span>}
                {k.name === 'FCR' && <span className="badge badge-pending" style={{ fontSize: 9 }}>Pending action</span>}
                {k.name === 'AHT' && <span className="badge" style={{ background: '#f3f4f6', color: '#6b7280', fontSize: 9 }}>3 recent 1:1s</span>}
                {k.name === 'SALES' && <span className="badge" style={{ background: '#f3f4f6', color: '#6b7280', fontSize: 9 }}>3 recent 1:1s</span>}
              </div>
            </div>
          ))}
        </div>

        {/* KPI Deep Dive */}
        <div className="card" style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <div className="section-title" style={{ marginBottom: 0 }}>KPI deep dive · {selectedKpi}</div>
              {/* ITERATION D2: helper below title, not to the right */}
              <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 3 }}>Click any KPI card above to switch focus.</p>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 14 }}>
            <div style={{ background: '#f0faf5', border: '1px solid #b6dfc8', borderRadius: 8, padding: '7px 13px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 11, color: '#1a5e3f', fontWeight: 600 }}>{selectedKpi}</span>
              <span style={{ fontSize: 22, fontWeight: 700, color: '#111' }}>{kpi.actual}</span>
              <span style={{ fontSize: 11.5, color: '#6b7280' }}>vs target {kpi.target.replace('Target ', '')}</span>
            </div>
            {[{ n: 1, l: 'FACTS' }, { n: 1, l: 'SESSIONS' }, { n: 0, l: 'COMPLETED' }, { n: 0, l: 'PENDING' }].map(s => (
              <div key={s.l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 600 }}>{s.n}</div>
                <div style={{ fontSize: 10, color: '#9ca3af' }}>{s.l}</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', letterSpacing: '0.4px', textTransform: 'uppercase', marginBottom: 6 }}>Last 7 days trend</div>
          <TrendChart height={90} showLabels />
          <TrendLegend />
        </div>

        {/* Relevant Facts */}
        <div className="card" style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px', color: '#9ca3af', marginBottom: 8 }}>
            Relevant facts on {selectedKpi}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', border: '1px solid #f0f0ee', borderRadius: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 3, height: 32, background: '#ef4444', borderRadius: 2, display: 'inline-block' }} />
              <span style={{ fontSize: 11.5, color: '#9ca3af' }}>Jun 22</span>
              <span style={{ fontSize: 12.5, fontWeight: 500, color: '#ef4444' }}>critical</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button className="btn-secondary" style={{ fontSize: 11, padding: '3px 8px' }}>👍</button>
              <button className="btn-secondary" style={{ fontSize: 11, padding: '3px 8px' }}>👎</button>
              <span style={{ fontSize: 11.5, color: '#54b282' }}>✓ Actioned</span>
            </div>
          </div>
        </div>

        {/* Storyline */}
        <div className="card" style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px', color: '#9ca3af' }}>Storyline</div>
            <button className="btn-secondary" style={{ fontSize: 11, padding: '3px 10px' }}>Show 2 historical items</button>
          </div>
          <p style={{ fontSize: 12.5, color: '#9ca3af', textAlign: 'center', padding: '16px 0' }}>
            No pending items. Click &quot;Show history&quot; to see past activity.
          </p>
        </div>

        {/* Other Topics */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div className="section-title" style={{ marginBottom: 0 }}>Other topics</div>
            <span style={{ fontSize: 11.5, color: '#9ca3af' }}>Wellness, career, attendance and other non-KPI conversations.</span>
          </div>
          <div style={{ border: '1px solid #fde68a', borderRadius: 9, padding: 12, background: '#fffbeb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span className="badge badge-risk" style={{ fontSize: 10 }}>CEDP</span>
              <span style={{ fontSize: 11.5, color: '#9ca3af' }}>Monthly review</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#92400e', marginBottom: 4 }}>CEDP review pending</div>
            <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 10 }}>
              Run this month&apos;s Continuous Employee Development Plan review with <strong>João Silva</strong>.
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: '#9ca3af' }}>Monthly cadence</span>
              <button className="btn-primary" style={{ fontSize: 11.5 }}>Open CEDP</button>
            </div>
          </div>
        </div>
      </div>

      {/* New Session Side Panel — ITERATION D */}
      {showSession && (
        <div className="side-panel">
          <div className="side-panel-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: '#54b282', fontSize: 14 }}>🎙</span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>New Coaching Session</span>
            </div>
            <button className="modal-close" onClick={() => setShowSession(false)}>×</button>
          </div>
          <div className="side-panel-body">
            {/* ITERATION D3: Employee as fixed badge, not editable dropdown */}
            <div style={{ background: '#f0faf5', border: '1px solid #b6dfc8', borderRadius: 8, padding: '8px 12px', fontSize: 12.5, color: '#1a5e3f', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div className="avatar avatar-green" style={{ width: 24, height: 24, fontSize: 9 }}>JS</div>
              Session for <strong>João Silva</strong>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
              <div>
                <label className="form-label">Session Type</label>
                <select className="form-select">
                  <option>Select...</option>
                  <option>Coaching</option>
                  <option>Performance Review</option>
                  <option>Development</option>
                </select>
              </div>
              <div>
                <label className="form-label">KPI Focus</label>
                <select className="form-select">
                  <option>None</option>
                  <option selected>AHT</option>
                  <option>CSAT</option>
                  <option>Sales</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Topic / Subject</label>
                {/* ITERATION D3: + New Fact with clear green hierarchy */}
                <button className="btn-primary" style={{ fontSize: 10.5, padding: '3px 10px', borderRadius: 20 }}>+ New Fact</button>
              </div>
              <select className="form-select">
                <option>— Select a fact —</option>
                <option>AHT above target — navigation silence</option>
              </select>
            </div>

            <div style={{ marginBottom: 12 }}>
              <label className="form-label">Linked Improvement Point</label>
              <select className="form-select">
                <option>— Select —</option>
              </select>
            </div>

            <div style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Voice Recording</label>
                <div style={{ display: 'flex', gap: 6 }}>
                  <select className="form-select" style={{ width: 100, fontSize: 11.5 }}>
                    <option>Português</option>
                    <option>English</option>
                  </select>
                  <button className="btn-primary" style={{ fontSize: 11, padding: '3px 10px' }}>▶ Start</button>
                </div>
              </div>
              <textarea className="form-textarea" style={{ height: 58 }} placeholder="Transcript will appear here as you speak, or paste text manually..." />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
              <div><label className="form-label">Goal</label><textarea className="form-textarea" style={{ height: 52 }} placeholder="Goal..." /></div>
              <div><label className="form-label">Performance Review</label><textarea className="form-textarea" style={{ height: 52 }} placeholder="Performance Review..." /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
              <div><label className="form-label">Improvement Opportunities</label><textarea className="form-textarea" style={{ height: 52 }} placeholder="Discussion..." /></div>
              <div><label className="form-label">Development Plan</label><textarea className="form-textarea" style={{ height: 52 }} placeholder="Development Plan..." /></div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label className="form-label">Notes / Summary</label>
              <textarea className="form-textarea" placeholder="Session notes..." />
            </div>

            {/* ITERATION D3: Actions visible by default, not hidden behind dropdown */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Actions ({sessionActions.length})</label>
              </div>
              {sessionActions.length === 0 && (
                <p style={{ fontSize: 11.5, color: '#9ca3af', marginBottom: 8 }}>No actions yet. Add actions agreed during the session.</p>
              )}
              {sessionActions.map((a, i) => (
                <div key={i} style={{ fontSize: 12, color: '#374151', background: '#f9fafb', borderRadius: 7, padding: '6px 10px', marginBottom: 4 }}>
                  {a}
                </div>
              ))}
              {/* ITERATION D3: action type buttons visible without extra clicks */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, padding: 10, background: '#f0faf5', borderRadius: 8, border: '1px dashed #b6dfc8', marginTop: 6 }}>
                <p style={{ gridColumn: '1/-1', fontSize: 11, color: '#1a5e3f', fontWeight: 500, marginBottom: 2 }}>Quick add action:</p>
                {['GROW Action', 'Follow-up Task', 'Training', 'Observation'].map(type => (
                  <button
                    key={type}
                    onClick={() => addAction(type)}
                    style={{ padding: '6px 10px', border: '1px solid #e5e7eb', borderRadius: 7, background: '#fff', fontSize: 11.5, color: '#374151', cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.12s' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = '#54b282')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = '#e5e7eb')}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="side-panel-footer">
            <button style={{ color: '#ef4444', border: '1px solid #fecaca', background: '#fff', borderRadius: 8, padding: '6px 12px', fontSize: 12, cursor: 'pointer' }}>
              Discard
            </button>
            <button className="btn-secondary" onClick={() => setShowSession(false)}>Cancel</button>
            <button className="btn-primary">Save Session</button>
          </div>
        </div>
      )}
    </div>
  )
}
