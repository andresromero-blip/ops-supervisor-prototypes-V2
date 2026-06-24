'use client'
import { useState, createContext, useContext } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Period = 'D-1' | 'WTD' | 'MTD' | 'QTD'
const periodLabels: Record<Period, string> = {
  'D-1': 'Yesterday · Tue 23 Jun',
  'WTD': 'Week to date · Jun 17–23',
  'MTD': 'Month to date · Jun 1–23',
  'QTD': 'Quarter to date · Apr 1–Jun 23',
}

export const PeriodContext = createContext<Period>('D-1')
export function usePeriod() { return useContext(PeriodContext) }

const navGroups = [
  {
    label: 'Performance',
    items: [
      { label: 'Team Overview', href: '/projects/20260620-team-overview' },
      { label: 'Agent View', href: '/projects/20260620-agent-view' },
      { label: 'One to One', href: '/projects/20260620-one-to-one' },
    ],
  },
  {
    label: 'Execution',
    items: [
      { label: 'Game Plan', href: '/projects/20260620-game-plan' },
      { label: 'DSM', href: '/projects/20260620-dsm' },
      { label: 'Schedules', href: '#', disabled: true },
    ],
  },
  {
    label: 'Development',
    items: [
      { label: 'CEDP', href: '/projects/20260620-cedp' },
    ],
  },
  {
    label: '',
    items: [
      { label: 'Communications', href: '#', disabled: true },
      { label: 'Project Config', href: '#' },
    ],
  },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const [period, setPeriod] = useState<Period>('D-1')
  const pathname = usePathname()

  const isHome = pathname === '/'

  return (
    <PeriodContext.Provider value={period}>
      <div className="app-layout">
        <aside className="sidebar">
          <div className="sidebar-brand">
            <h1>OPS.Supervisor</h1>
            <p>Prescriptive Operations Tool</p>
          </div>
          <nav className="sidebar-nav">
            {navGroups.map((group, gi) => (
              <div className="nav-group" key={gi}>
                {group.label && <div className="nav-group-label">{group.label}</div>}
                {group.items.map((item) => {
                  const active = item.href !== '#' && pathname === item.href
                  if (item.href === '#' || item.disabled) {
                    return (
                      <span key={item.label} className={`nav-item${item.disabled ? ' disabled' : ''}`}>
                        {item.label}
                      </span>
                    )
                  }
                  return (
                    <Link key={item.label} href={item.href} className={`nav-item${active ? ' active' : ''}`}>
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            ))}
          </nav>
          <div className="sidebar-footer">
            <div className="sidebar-footer-item">Email Daily Summary</div>
            <div className="sidebar-footer-item">Dark Mode</div>
          </div>
        </aside>

        <div className="main-area">
          <header className="header">
            <div className="header-left">
              <span style={{ fontSize: 12, color: '#9ca3af' }}>Operations Dashboard</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {!isHome && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                  <div className="period-selector">
                    {(['D-1', 'WTD', 'MTD', 'QTD'] as Period[]).map((p) => (
                      <button
                        key={p}
                        className={`period-btn${period === p ? ' active' : ''}`}
                        onClick={() => setPeriod(p)}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  <span className="period-info">{periodLabels[period]}</span>
                </div>
              )}
              <div className="header-right">
                <button className="switch-team-btn">Switch Team</button>
              </div>
            </div>
          </header>

          <div className="content-area">
            {children}
          </div>
        </div>
      </div>
    </PeriodContext.Provider>
  )
}
