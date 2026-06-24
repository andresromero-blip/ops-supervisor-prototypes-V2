export default function CEDPPage() {
  return (
    <div>
      <div className="page-header">
        <h2>CEDP</h2>
        <p>Continuous Employee Development Plan · Development module</p>
      </div>

      <div className="card" style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#dcfce7', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600 }}>
            JS
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>João Silva</div>
            <div style={{ fontSize: 11.5, color: '#9ca3af' }}>1 year tenure · Customer Expert</div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span style={{ background: '#fef3c7', color: '#92400e', borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 500 }}>
              Monthly review pending
            </span>
          </div>
        </div>

        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, padding: 12, marginBottom: 14 }}>
          <p style={{ fontSize: 12.5, color: '#92400e' }}>
            This month&apos;s CEDP review has not been completed. Schedule a session with João Silva to discuss their development progress.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {[
            { label: 'Active goals', value: '2', sub: 'In progress' },
            { label: 'Completed goals', value: '5', sub: 'This quarter' },
            { label: 'Next review', value: 'Jul 1', sub: 'In 7 days' },
          ].map(s => (
            <div key={s.label} style={{ background: '#f9fafb', borderRadius: 8, padding: '12px 14px' }}>
              <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#111' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: 12 }}>
        <div className="section-title">Development Goals</div>
        {[
          { goal: 'Improve CSAT score to 88%+', status: 'In Progress', progress: 60 },
          { goal: 'Complete Advanced Coaching certification', status: 'In Progress', progress: 35 },
          { goal: 'Reduce AHT to under 400s consistently', status: 'Completed', progress: 100 },
        ].map((g, i) => (
          <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid #f7f7f7' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
              <span style={{ fontSize: 12.5, fontWeight: 500 }}>{g.goal}</span>
              <span className={`badge ${g.status === 'Completed' ? 'badge-target' : 'badge-duesoon'}`}>{g.status}</span>
            </div>
            <div style={{ height: 4, background: '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${g.progress}%`, background: g.progress === 100 ? '#54b282' : '#93c5fd', borderRadius: 4, transition: 'width 0.3s' }} />
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="section-title">Session History</div>
        {[
          { date: 'Jun 10, 2026', type: 'Coaching', summary: 'CSAT closure script — João acknowledged gap and committed to applying 3-step protocol.' },
          { date: 'May 15, 2026', type: 'Development Review', summary: 'Quarterly review. Progress on AHT goal confirmed. New CSAT target set.' },
        ].map((s, i) => (
          <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid #f7f7f7' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 11, color: '#9ca3af', minWidth: 80 }}>{s.date}</span>
              <div>
                <span className="badge badge-pending" style={{ marginBottom: 4 }}>{s.type}</span>
                <p style={{ fontSize: 12, color: '#374151' }}>{s.summary}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
