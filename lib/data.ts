export const agents = [
  { id: 'joao-silva', initials: 'JS', name: 'João Silva', kpiScore: 'FCR: 73.0%', status: 'Critical', kpi: 'AHT: 863.9s', weeks: '3w', actions: '0 actions', csat: '81.0%', csatStatus: 'At Risk', tenure: '1 year' },
  { id: 'maria-santos', initials: 'MS', name: 'Maria Santos', kpiScore: 'All on target', status: 'On target', kpi: 'CSAT: 88%', weeks: '2w', actions: '—', csat: '88.0%', csatStatus: 'On Target', tenure: '2 years' },
  { id: 'carlos-mendes', initials: 'CM', name: 'Carlos Mendes', kpiScore: 'Sales: 10.5% · Adh: 88.0%', status: 'Critical', kpi: 'AHT: 821.1s', weeks: '2w', actions: '2 actions', csat: '82.0%', csatStatus: 'At Risk', tenure: '8 months' },
  { id: 'ana-ferreira', initials: 'AF', name: 'Ana Ferreira', kpiScore: 'All on target', status: 'On target', kpi: 'AHT: 670.5s', weeks: '2w', actions: '—', csat: '85.0%', csatStatus: 'On Target', tenure: '3 years' },
  { id: 'pedro-costa', initials: 'PC', name: 'Pedro Costa', kpiScore: 'CSAT: 79.0%', status: 'Needs attention', kpi: 'CSAT: 79.0%', weeks: '2w', actions: '0 actions', csat: '79.0%', csatStatus: 'Off Target', tenure: '1 year' },
  { id: 'sofia-rodrigues', initials: 'SR', name: 'Sofia Rodrigues', kpiScore: 'All on target', status: 'On target', kpi: 'FCR: 85%', weeks: '2w', actions: '—', csat: '87.0%', csatStatus: 'On Target', tenure: '2 years' },
  { id: 'ricardo-nunes', initials: 'RN', name: 'Ricardo Nunes', kpiScore: 'Adh: 85.0%', status: 'Needs attention', kpi: 'Adh: 85.0%', weeks: '1w', actions: '0 actions', csat: '84.0%', csatStatus: 'At Risk', tenure: '6 months' },
  { id: 'beatriz-lopes', initials: 'BL', name: 'Beatriz Lopes', kpiScore: 'All on target', status: 'On target', kpi: 'AHT: 744.9s', weeks: '1w', actions: '1 activity', csat: '89.0%', csatStatus: 'On Target', tenure: '4 years' },
]

export const kpiData = [
  { name: 'CSAT', actual: '83.1%', target: '85.0%', delta: '0%', deltaDir: 'neutral', unit: '%', status: 'AT RISK' },
  { name: 'FCR', actual: '75.5%', target: '78.0%', delta: '-1%', deltaDir: 'down', unit: '%', status: 'AT RISK' },
  { name: 'AHT', actual: '378s', target: '420', delta: '+4%', deltaDir: 'up', unit: 's', status: '' },
  { name: 'NPS', actual: '87', target: '45', delta: '0%', deltaDir: 'neutral', unit: '', status: '' },
  { name: 'Sales', actual: '10.9%', target: '12.0%', delta: '+4%', deltaDir: 'up', unit: '%', status: 'AT RISK' },
  { name: 'ADH', actual: '87.5%', target: '95.0%', delta: '-3%', deltaDir: 'down', unit: '%', status: 'AT RISK' },
]

export const keyTopics = [
  { rank: 1, agent: 'Pedro Costa', tag: 'AHT', text: 'System Navigation Silence Time elevated — 42% of AHT is hold/silence' },
  { rank: 2, agent: 'João Silva', tag: 'Sales', text: 'Low closing technique — sales pitch attempted on only 35% of eligible calls' },
  { rank: 3, agent: 'Carlos Mendes', tag: 'Attendance', text: '3 unplanned absences in last 2 weeks. Absenteeism rate: 12%' },
  { rank: 4, agent: 'Ricardo Nunes', tag: 'Adh', text: '' },
]

export const dsmActions = [
  {
    id: 1,
    agent: 'Denzel Melo',
    agentInitials: 'DM',
    category: 'Absence',
    severity: 'CRITICAL',
    kpi: 'Absence',
    action: 'WFM extract — identify scheduling conflict pattern',
    context: 'Absence at 33.5% vs 6% target · volatile pattern · ↑ 4 weeks',
    status: 'Overdue',
    dueLabel: 'Overdue 1d',
    created: 'Jun 20, 2026',
    due: 'Jun 23, 2026',
  },
  {
    id: 2,
    agent: 'Pedro Godinho',
    agentInitials: 'PG',
    category: 'AHT',
    severity: 'CRITICAL',
    kpi: 'AHT',
    action: 'Root cause analysis — identify inefficient call handling pattern',
    context: 'AHT at 863s vs 630s target · ↑ 3 consecutive weeks',
    status: 'Overdue',
    dueLabel: 'Overdue 2d',
    created: 'Jun 18, 2026',
    due: 'Jun 22, 2026',
  },
  {
    id: 3,
    agent: 'Pedro Godinho',
    agentInitials: 'PG',
    category: 'FCR',
    severity: 'CRITICAL',
    kpi: 'FCR',
    action: 'Coach Call — call time management and closure techniques',
    context: 'FCR at 70% vs 75% target · ↓ 2 weeks · linked to AHT pattern',
    status: 'Overdue',
    dueLabel: 'Overdue 1d',
    created: 'Jun 19, 2026',
    due: 'Jun 23, 2026',
  },
  {
    id: 4,
    agent: 'Raymond Akpelu',
    agentInitials: 'RA',
    category: 'QA',
    severity: 'WARNING',
    kpi: 'QA',
    action: 'Assessment — case categorization and documentation review',
    context: 'QA dropped from 84.5 to 34.0 · ↓ 2 weeks · miscategorized cases',
    status: 'Due today',
    dueLabel: 'Due today',
    created: 'Jun 21, 2026',
    due: 'Jun 24, 2026',
  },
  {
    id: 5,
    agent: 'Martinho Wambembe',
    agentInitials: 'MW',
    category: 'Absence',
    severity: 'WARNING',
    kpi: 'Absence',
    action: 'Pull WFM extract and identify the root cause',
    context: 'Absence 32.5% vs 11.55% team avg · worsening 4 weeks',
    status: 'Due soon',
    dueLabel: 'Due Jun 25',
    created: 'Jun 20, 2026',
    due: 'Jun 25, 2026',
  },
  {
    id: 6,
    agent: 'Alexandre M. Pereira',
    agentInitials: 'AM',
    category: 'AHT',
    severity: 'ON TARGET',
    kpi: 'AHT',
    action: 'Owner to circulate v2 of the upsell script after Monday\'s call',
    context: 'AHT -12% vs target · on track for 2 weeks',
    status: 'Pending',
    dueLabel: 'Due Jun 29',
    created: 'Jun 21, 2026',
    due: 'Jun 29, 2026',
  },
]

export const gamePlanWeek = {
  range: 'Jun 22 – 28',
  days: [
    { label: 'Mon', num: 22, events: 1 },
    { label: 'Tue', num: 23, events: 0 },
    { label: 'Wed', num: 24, events: 10, today: true },
    { label: 'Thu', num: 25, events: 4 },
    { label: 'Fri', num: 26, events: 1 },
    { label: 'Sat', num: 27, events: 0 },
    { label: 'Sun', num: 28, events: 2 },
  ],
}

export const timelineEvents = [
  { id: 1, time: '', name: 'Read emails & review D-1 results', tag: '', color: '' },
  { id: 2, time: '', name: 'Daily Supervisor Meeting (DSM)', tag: '', color: '' },
  { id: 3, time: '', name: 'Pedro Costa', tag: 'AHT: 18% above target on Tue afternoon shift', color: 'red' },
  { id: 4, time: '', name: 'João Silva', tag: 'AHT: 18% above target on Tue afternoon shift', color: 'red' },
  { id: 5, time: '', name: 'Carlos Mendes', tag: 'AHT: 18% above target on Tue afternoon shift', color: 'red' },
  { id: 6, time: '', name: 'Floor Support — Available', tag: '', color: '' },
  { id: 7, time: '', name: 'Beatriz Lopes', tag: 'CSAT: dropped 6pp after the recent protocol change', color: 'amber' },
  { id: 8, time: '', name: 'Carlos Mendes', tag: '', color: '' },
  { id: 9, time: '', name: 'Beatriz Lopes', tag: '', color: '' },
  { id: 10, time: '', name: '1:1 con joao', tag: '', color: '' },
]

export const teamFacts = {
  critical: [
    { agent: 'Pedro Costa', tag: 'AHT', text: 'AHT 18% above target on Tuesday afternoon shift.', action: 'System navigation silence time — 42% of AHT', status: 'In Plan' },
    { agent: 'João Silva', tag: 'AHT', text: 'AHT 18% above target on Tuesday afternoon shift.', action: 'Improve closing technique — only 35% pitch rate', status: 'In Plan' },
    { agent: 'Carlos Mendes', tag: 'AHT', text: 'AHT 18% above target on Tuesday afternoon shift.', action: '3 unplanned absences in last 2 weeks', status: 'In Plan' },
  ],
  warning: [],
  positive: [],
}

export const oneToOneKpis = [
  { name: 'AHT', actual: '390s', target: 'Target 420', delta: '+2%', deltaDir: 'up', status: 'OUTLIER', statusClass: 'badge-outlier', color: '#ef4444' },
  { name: 'SALES', actual: '10.0%', target: 'Target 12.0%', delta: '-11%', deltaDir: 'down', status: 'OFF TARGET', statusClass: 'badge-off', color: '#f59e0b' },
  { name: 'CSAT', actual: '81.0%', target: 'Target 85.0%', delta: '-1%', deltaDir: 'down', status: 'AT RISK', statusClass: 'badge-risk', color: '#f59e0b' },
  { name: 'FCR', actual: '73.0%', target: 'Target 78.0%', delta: '-1%', deltaDir: 'down', status: 'AT RISK', statusClass: 'badge-risk', color: '#f59e0b' },
  { name: 'ADH', actual: '92.0%', target: 'Target 95.0%', delta: '0%', deltaDir: 'neutral', status: 'AT RISK', statusClass: 'badge-risk', color: '#f59e0b' },
  { name: 'NPS', actual: '85', target: 'Target 45', delta: '-1%', deltaDir: 'down', status: '', statusClass: '', color: '#54b282' },
]
