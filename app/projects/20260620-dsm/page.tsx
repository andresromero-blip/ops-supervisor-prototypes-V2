'use client'
import { useState } from 'react'
import { dsmActions } from '@/lib/data'

type Tab = 'pending' | 'executed' | 'meetings'

type ActionStatus = typeof dsmActions[number]['status']

const statusBadgeClass: Record<ActionStatus, string> = {
  'Overdue': 'badge badge-overdue',
  'Due today': 'badge badge-duetoday',
  'Due soon': 'badge badge-duesoon',
  'Pending': 'badge badge-pending',
}

const statusBorderColor: Record<ActionStatus, string> = {
  'Overdue': '#fca5a5',
  'Due today': '#fde68a',
  'Due soon': '#93c5fd',
  'Pending': '#e5e7eb',
}

const dueLabelColor: Record<ActionStatus, string> = {
  'Overdue': '#ef4444',
  'Due today': '#d97706',
  'Due soon': '#2563eb',
  'Pending': '#9ca3af',
}

// Group actions by agent
function groupByAgent(actions: typeof dsmActions) {
  const groups: Record<string, typeof dsmActions> = {}
  actions.forEach(a => {
    const key = a.agent || 'Unassigned'
    if (!groups[key]) groups[key] = []
    groups[key].push(a)
  })
  return groups
}

export default function DSMPage() {
  const [tab, setTab] = useState<Tab>('pending')
  // ITERATION E: groups expanded by default
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'Denzel Melo': true,
    'Pedro Godinho': true,
    'Raymond Akpelu': true,
    'Martinho Wambembe': true,
    'Alexandre M. Pereira': true,
    'Unassigned': true,
  })
  const [completedIds, setCompletedIds] = useState<number[]>([])
  const [cancelledIds, setCancelledIds] = useState<number[]>([])

  const pendingActions = dsmActions.filter(a => !completedIds.includes(a.id) && !cancelledIds.includes(a.id))
  const executedActions = dsmActions.filter(a => completedIds.includes(a.id))

  const toggleGroup = (key: string) => {
    setExpandedGroups(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const groups = groupByAgent(pendingActions)

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2>Daily Supervisor Meeting</h2>
            <p>Performance tracking, daily focus, and delivery</p>
          </div>
          <button className="btn-primary">+ New DSM</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className={`tab-btn${tab === 'pending' ? ' active' : ''}`} onClick={() => setTab('pending')}>
          Pending Actions{' '}
          <span style={{ background: pendingActions.length > 0 ? '#fee2e2' : '#f3f4f6', color: pendingActions.length > 0 ? '#991b1b' : '#6b7280', borderRadius: 20, padding: '0 6px', fontSize: 10, marginLeft: 4 }}>
            {pendingActions.length}
          </span>
        </button>
        <button className={`tab-btn${tab === 'executed' ? ' active' : ''}`} onClick={() => setTab('executed')}>
          Executed Actions{' '}
          <span style={{ background: '#f3f4f6', color: '#6b7280', borderRadius: 20, padding: '0 6px', fontSize: 10, marginLeft: 4 }}>
            {executedActions.length + 2}
          </span>
        </button>
        <button className={`tab-btn${tab === 'meetings' ? ' active' : ''}`} onClick={() => setTab('meetings')}>
          Meetings{' '}
          <span style={{ background: '#f3f4f6', color: '#6b7280', borderRadius: 20, padding: '0 6px', fontSize: 10, marginLeft: 4 }}>1</span>
        </button>
      </div>

      {tab === 'pending' && (
        <div>
          {/* ITERATION E: callout explaining expanded default */}
          <div className="callout" style={{ marginBottom: 14 }}>
            <div className="callout-dot" />
            <span>Actions are expanded by default so you can immediately triage urgent items without extra clicks. Ordered by operational priority — severity × urgency × duration of issue.</span>
          </div>

          {Object.entries(groups).map(([agentName, actions]) => {
            const overdueCnt = actions.filter(a => a.status === 'Overdue').length
            const oldest = actions.reduce((max, a) => Math.max(max, parseInt(a.dueLabel.replace(/\D/g, '') || '0')), 0)

            return (
              <div key={agentName} style={{ marginBottom: 14 }}>
                {/* Group header */}
                <div
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8, marginBottom: 7, cursor: 'pointer', fontSize: 12.5, fontWeight: 500 }}
                  onClick={() => toggleGroup(agentName)}
                >
                  <span>
                    {agentName}{' '}
                    <span style={{ color: '#6b7280', fontWeight: 400 }}>· {actions.length} pending</span>
                    {overdueCnt > 0 && (
                      <span className="badge badge-overdue" style={{ marginLeft: 8, fontSize: 9 }}>
                        {overdueCnt} overdue
                      </span>
                    )}
                  </span>
                  <span style={{ fontSize: 11, color: '#9ca3af' }}>
                    {expandedGroups[agentName] ? '▾' : '▸'}
                  </span>
                </div>

                {/* Action cards — ITERATION E: expanded by default */}
                {expandedGroups[agentName] && actions.map(action => (
                  <div
                    key={action.id}
                    className="action-card"
                    style={{ borderLeft: `3px solid ${statusBorderColor[action.status as ActionStatus]}` }}
                  >
                    <div className="action-card-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {/* ITERATION E: explicit text badge instead of ambiguous symbol */}
                        <span className={statusBadgeClass[action.status as ActionStatus]}>{action.status}</span>
                        <span className="badge" style={{ background: '#f3f4f6', color: '#6b7280', fontSize: 10 }}>{action.kpi}</span>
                      </div>
                      {action.agent && (
                        <span style={{ fontSize: 11, color: '#9ca3af', background: '#f9fafb', padding: '2px 8px', borderRadius: 20 }}>
                          {action.agent}
                        </span>
                      )}
                    </div>

                    {/* ITERATION E: hierarchy: 1. Status (above) 2. Action 3. Context 4. Date/urgency */}
                    <div className="action-card-body">{action.action}</div>
                    <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 4, fontStyle: 'italic' }}>{action.context}</div>
                    <div className="action-card-meta">
                      Created: {action.created} ·{' '}
                      <span style={{ color: dueLabelColor[action.status as ActionStatus], fontWeight: 500 }}>
                        {action.dueLabel}
                      </span>
                    </div>

                    <div className="action-card-btns">
                      <button className="btn-outline-green" onClick={() => setCompletedIds(prev => [...prev, action.id])}>
                        ✓ Complete
                      </button>
                      <button className="btn-outline-red" onClick={() => setCancelledIds(prev => [...prev, action.id])}>
                        ✕ Cancel
                      </button>
                      <button className="btn-outline-amber">
                        ✏ Update
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          })}

          {pendingActions.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#9ca3af', fontSize: 13 }}>
              All actions resolved. Great work today.
            </div>
          )}
        </div>
      )}

      {tab === 'executed' && (
        <div>
          {executedActions.map(action => (
            <div key={action.id} className="action-card" style={{ opacity: 0.7 }}>
              <div className="action-card-header">
                <span className="badge badge-target">Completed</span>
              </div>
              <div className="action-card-body" style={{ textDecoration: 'line-through', color: '#9ca3af' }}>{action.action}</div>
            </div>
          ))}
          {executedActions.length === 0 && (
            <p style={{ color: '#9ca3af', fontSize: 13, padding: '24px 0' }}>No executed actions yet. Complete actions from Pending to see them here.</p>
          )}
        </div>
      )}

      {tab === 'meetings' && (
        <div style={{ padding: '24px 0', textAlign: 'center', color: '#9ca3af', fontSize: 13 }}>
          1 meeting scheduled · Daily Supervisor Meeting at 09:00
        </div>
      )}
    </div>
  )
}
