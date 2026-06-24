'use client'
import { useState } from 'react'
import { gamePlanWeek, timelineEvents, teamFacts } from '@/lib/data'

export default function GamePlanPage() {
  const [selectedDay, setSelectedDay] = useState(24)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ period: 'Afternoon', activity: '', agent: '', context: '' })

  const currentDayEvents = timelineEvents.slice(0, selectedDay === 24 ? 10 : 1)

  return (
    <div style={{ position: 'relative' }}>
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2>Supervisor Game Plan</h2>
            <p>Wednesday 24 June</p>
          </div>
          <button className="btn-primary" onClick={() => setShowModal(true)}>+ Add Event</button>
        </div>
      </div>

      {/* Week Calendar */}
      <div className="card" style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <button className="btn-secondary" style={{ fontSize: 12 }}>‹ Previous</button>
          <span style={{ fontSize: 13.5, fontWeight: 500 }}>{gamePlanWeek.range}</span>
          <button className="btn-secondary" style={{ fontSize: 12 }}>Next ›</button>
        </div>
        <div className="week-cal">
          {gamePlanWeek.days.map(d => (
            <div
              key={d.num}
              className={`day-cell${d.today ? ' today' : ''}${selectedDay === d.num && !d.today ? ' selected' : ''}`}
              onClick={() => setSelectedDay(d.num)}
            >
              <div className="day-label">{d.label}</div>
              <div className="day-num">{d.num}</div>
              {d.events > 0 && <div className="day-dot">{d.events}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Daily Timeline */}
      <div className="card" style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div className="section-title" style={{ marginBottom: 0 }}>Daily Timeline</div>
          <span className="badge badge-pending">{currentDayEvents.length} events</span>
        </div>
        {currentDayEvents.map(evt => (
          <div key={evt.id} className="timeline-event">
            <div>
              <div className="timeline-event-name">{evt.name}</div>
              {evt.tag && (
                <div className={`timeline-event-tag tag-${evt.color}`}>{evt.tag}</div>
              )}
            </div>
            <span className="evt-count">1</span>
          </div>
        ))}
      </div>

      {/* Team Facts */}
      <div className="card">
        <div className="section-title">Your Team Facts</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
          {/* Critical */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: '#ef4444' }}>Critical</span>
              <span className="badge badge-critical">{teamFacts.critical.length}</span>
            </div>
            {teamFacts.critical.map((f, i) => (
              <div key={i} className="fact-item critical">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <div>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>{f.agent}</span>{' '}
                    <span className="badge badge-outlier" style={{ fontSize: 9 }}>{f.tag}</span>
                  </div>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: 12 }}>✏</button>
                </div>
                <p style={{ fontSize: 11, color: '#6b7280' }}>Root Cause: {f.text}.</p>
                <p style={{ fontSize: 11, color: '#6b7280' }}>Action: {f.action}</p>
                <div style={{ marginTop: 5 }}>
                  <span className="badge badge-target" style={{ fontSize: 9 }}>✓ {f.status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Warning */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: '#d97706' }}>Warning</span>
              <span className="badge badge-warning">0</span>
            </div>
            <p style={{ fontSize: 12, color: '#9ca3af', textAlign: 'center', paddingTop: 20 }}>No alerts</p>
          </div>

          {/* Positive */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: '#54b282' }}>Positive</span>
              <span className="badge badge-positive">0</span>
            </div>
            <p style={{ fontSize: 12, color: '#9ca3af', textAlign: 'center', paddingTop: 20 }}>No alerts</p>
          </div>
        </div>
      </div>

      {/* Add Event Modal — ITERATION C */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">
              Add New Event
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label className="form-label">Period</label>
              <select className="form-select" value={form.period} onChange={e => setForm(f => ({ ...f, period: e.target.value }))}>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label className="form-label">Activity</label>
              <input
                className="form-input"
                type="text"
                placeholder="e.g. 1:1 with João"
                value={form.activity}
                onChange={e => setForm(f => ({ ...f, activity: e.target.value }))}
              />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label className="form-label">Agent (optional)</label>
              <input
                className="form-input"
                type="text"
                placeholder="e.g. João Silva"
                value={form.agent}
                onChange={e => setForm(f => ({ ...f, agent: e.target.value }))}
              />
            </div>

            {/* ITERATION C: Additional Context textarea */}
            <div style={{ marginBottom: 18 }}>
              <label className="form-label">Additional Context</label>
              <textarea
                className="form-textarea"
                placeholder="Add objectives, preparation notes or relevant context for attendees."
                value={form.context}
                onChange={e => setForm(f => ({ ...f, context: e.target.value }))}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={() => setShowModal(false)}>Add Event</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
