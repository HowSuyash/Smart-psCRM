// ===== CONSTANTS =====
const DEPTS = [
  { id: 'pwd', name: 'Public Works Dept.', short: 'PWD', cats: ['Road & Infrastructure'], officer: 'Suresh Babu', phone: '080-22223333', color: '#6366f1' },
  { id: 'water', name: 'Bangalore Water Supply (BWSSB)', short: 'BWSSB', cats: ['Water Supply'], officer: 'Kavitha Rao', phone: '080-22944030', color: '#0ea5e9' },
  { id: 'bescom', name: 'BESCOM (Electricity)', short: 'BESCOM', cats: ['Electricity'], officer: 'Manjunath K.', phone: '1912', color: '#f59e0b' },
  { id: 'muni', name: 'BBMP Municipal Corp.', short: 'BBMP', cats: ['Sanitation & Garbage', 'Public Safety', 'Other'], officer: 'Ramesh Naidu', phone: '080-22660000', color: '#10b981' },
  { id: 'health', name: 'Health Department', short: 'HEALTH', cats: ['Health & Hospitals'], officer: 'Dr. Anitha Sharma', phone: '104', color: '#ec4899' },
  { id: 'transport', name: 'BMTC Transport', short: 'BMTC', cats: ['Transport & Traffic'], officer: 'Krishna Gowda', phone: '080-22253311', color: '#8b5cf6' },
];

const PRIORITY_KEYWORDS = {
  Critical: ['accident', 'danger', 'fire', 'flood', 'death', 'emergency', 'collapse', 'toxic', 'sewage overflow', 'dengue'],
  High: ['no water', 'power cut', 'pothole', 'broken', 'leakage', 'blocked', 'stray', 'illegal', 'unsafe'],
  Medium: ['delay', 'slow', 'pending', 'dirty', 'noise', 'garbage', 'damaged'],
};

// ===== SEED DATA (20 sample complaints) =====
function buildSeed() {
  const rows = [
    ['Ravi Kumar', '9876543210', 'ravi@gmail.com', 'Koramangala 5th Block', 'Road & Infrastructure', 'Large pothole on 80ft road causing accidents to two-wheelers daily', 'High', 'Resolved', 'pwd', 'Suresh Babu', 7, 'Pothole filled and road re-patched'],
    ['Priya Sharma', '8765432109', 'priya@email.com', 'Indiranagar 100ft Road', 'Water Supply', 'No water supply for 3 consecutive days in our entire apartment block', 'Critical', 'In Progress', 'water', 'Kavitha Rao', 3, 'Pipeline repair team dispatched'],
    ['Mohan Das', '7654321098', '', 'HSR Layout Sector 3', 'Electricity', 'Frequent power cuts of 4-6 hours every day for the past week', 'High', 'Assigned', 'bescom', 'Manjunath K.', 2, ''],
    ['Sunita Reddy', '6543210987', 'sunita@mail.com', 'BTM Layout 2nd Stage', 'Sanitation & Garbage', 'Garbage not collected for 5 days, causing stench and stray animals', 'Medium', 'New', null, null, 0, ''],
    ['Arun Patel', '9988776655', '', 'Whitefield Main Road', 'Road & Infrastructure', 'Road divider broken, vehicles crossing onto wrong lane dangerously', 'Critical', 'In Progress', 'pwd', 'Suresh Babu', 4, 'Survey done, repair materials ordered'],
    ['Lakshmi Devi', '8877665544', 'lakshmi@mail.com', 'Marathahalli Bridge', 'Water Supply', 'Waterlogging after rain, knee-deep water blocks entry to houses', 'High', 'Triaged', 'water', 'Kavitha Rao', 3, ''],
    ['Rajesh Kumar', '9765432109', '', 'Jayanagar 4th Block', 'Electricity', 'Street lights not working on 3 roads for over 2 weeks now', 'Low', 'Resolved', 'bescom', 'Manjunath K.', 6, 'Bulbs replaced, lights restored'],
    ['Meena Iyer', '8654321098', 'meena@email.com', 'Rajajinagar 3rd Block', 'Sanitation & Garbage', 'Sewage overflow onto public road, extremely unhygienic conditions', 'High', 'Resolved', 'muni', 'Ramesh Naidu', 8, 'Sewage cleared and road sanitized'],
    ['Venkat Rao', '7543210987', '', 'Yeshwanthpur Market', 'Health & Hospitals', 'Govt hospital staff very rude, refused to treat emergency patient', 'Medium', 'Closed', 'health', 'Dr. Anitha Sharma', 9, 'Staff counselled, action taken'],
    ['Deepa Nair', '9832167540', 'deepa@mail.com', 'Electronic City Phase 1', 'Transport & Traffic', 'Route 365 bus cancelled without notice for 4 days', 'Medium', 'New', null, null, 0, ''],
    ['Santosh B.', '8721065430', '', 'MG Road Pedestrian Walk', 'Road & Infrastructure', 'Broken footpath tiles causing falls especially for elderly walkers', 'Medium', 'Assigned', 'pwd', 'Suresh Babu', 2, ''],
    ['Kiran Shah', '7610954320', 'kiran@mail.com', 'Basavanagudi Main Road', 'Water Supply', 'Water meter showing wrong reading, bill tripled without reason', 'Low', 'Resolved', 'water', 'Kavitha Rao', 5, 'Meter replaced, bill corrected'],
    ['Ananya Gopal', '9500843210', '', 'Hebbal Lake Area', 'Health & Hospitals', 'Stagnant water breeding mosquitoes, dengue cases rising in area', 'Critical', 'In Progress', 'health', 'Dr. Anitha Sharma', 2, 'Fumigation team deployed'],
    ['Bhaskar Reddy', '8390732100', 'bhaskar@mail.com', 'Outer Ring Road KR Puram', 'Road & Infrastructure', 'Road under construction blocking entire lane for 3 months with no update', 'High', 'Triaged', 'pwd', 'Suresh Babu', 1, ''],
    ['Geetha M.', '7280621000', '', 'Sadashivanagar', 'Public Safety', 'Large tree fallen on road after storm, blocking traffic completely', 'Critical', 'Resolved', 'muni', 'Ramesh Naidu', 3, 'Tree removed, road cleared'],
    ['Harish N.', '9170510900', 'harish@mail.com', 'Devanahalli Town', 'Electricity', 'No street lights for entire ward for over 3 weeks', 'Medium', 'New', null, null, 1, ''],
    ['Indira K.', '8060400800', '', 'Yelahanka New Town', 'Water Supply', 'Main drinking water pipeline leaking at junction, wastage & contamination', 'High', 'In Progress', 'water', 'Kavitha Rao', 2, 'Leak identified, repair in progress'],
    ['Jagadish T.', '7950290700', 'jagadish@mail.com', 'Shivajinagar Bus Stand', 'Sanitation & Garbage', 'Public toilets extremely dirty, no cleaning staff for weeks', 'High', 'Assigned', 'muni', 'Ramesh Naidu', 1, ''],
    ['Kavya P.', '9840180600', '', 'Silk Board Junction', 'Transport & Traffic', 'Traffic signal at main junction not working, causing major accidents', 'Critical', 'Resolved', 'transport', 'Krishna Gowda', 4, 'Signal repaired and restored'],
    ['Lokesh V.', '8730070500', 'lokesh@mail.com', 'Banashankari 2nd Stage', 'Other', 'Illegal construction blocking public road and drainage', 'Medium', 'Triaged', 'muni', 'Ramesh Naidu', 2, ''],
  ];
  const now = new Date('2026-03-06');
  return rows.map((r, i) => {
    const [name, phone, email, location, category, description, priority, status, deptId, officer, daysAgo, remarks] = r;
    const created = new Date(now); created.setDate(now.getDate() - daysAgo);
    const resolved = (status === 'Resolved' || status === 'Closed') ? new Date(created.getTime() + (Math.random() * 48 + 12) * 3600000).toISOString() : null;
    return {
      id: 'PSC-' + String(i + 1).padStart(4, '0'),
      name, phone, email, location, category, description, priority, status,
      deptId: deptId || null, officer: officer || null, remarks: remarks || '',
      createdAt: created.toISOString(), resolvedAt: resolved,
      updatedAt: created.toISOString(), slaHours: 48,
    };
  });
}

// ===== STORAGE =====
function getData() {
  try { return JSON.parse(localStorage.getItem('pscrm_data')) || []; } catch { return []; }
}
function saveData(data) { localStorage.setItem('pscrm_data', JSON.stringify(data)); }
function initData() {
  if (!getData().length) saveData(buildSeed());
}

// ===== UTILS =====
function genId() {
  const data = getData();
  const nums = data.map(c => parseInt(c.id.split('-')[1]) || 0);
  const next = (nums.length ? Math.max(...nums) : 0) + 1;
  return 'PSC-' + String(next).padStart(4, '0');
}
function fmtDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
function fmtDateTime(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}
function hoursAgo(iso) {
  return (Date.now() - new Date(iso).getTime()) / 3600000;
}
function detectPriority(text) {
  const t = text.toLowerCase();
  for (const [p, kws] of Object.entries(PRIORITY_KEYWORDS)) {
    if (kws.some(k => t.includes(k))) return p;
  }
  return 'Medium';
}
function getDeptForCategory(cat) {
  return DEPTS.find(d => d.cats.includes(cat)) || null;
}
function statusClass(s) { return 'badge badge-' + s.replace(' ', '-'); }
function priorityClass(p) { return 'badge badge-' + p; }
function showToast(msg, type = 'success') {
  const t = document.createElement('div');
  t.className = 'toast ' + type; t.textContent = msg;
  document.getElementById('toast-container').appendChild(t);
  setTimeout(() => t.remove(), 3500);
}
function $(id) { return document.getElementById(id); }

// ===== NAVIGATION =====
function showView(name) {
  ['landing', 'citizen', 'admin-login', 'admin'].forEach(v => {
    const el = $('view-' + v);
    if (el) el.style.display = 'none';
  });
  const el = $('view-' + name);
  if (el) el.style.display = '';
  $('nav-public').style.display = name === 'admin' ? 'none' : 'flex';
  $('nav-admin').style.display = name === 'admin' ? 'flex' : 'none';
  if (name === 'landing') animateCounters();
  if (name === 'admin') { switchAdminTab('dashboard'); }
}

function switchCitizenTab(tab) {
  ['submit', 'track'].forEach(t => {
    const el = $('citizen-' + t); if (el) el.style.display = 'none';
    const btn = $('tab-' + t); if (btn) btn.classList.remove('active');
  });
  const el = $('citizen-' + tab); if (el) el.style.display = '';
  const btn = $('tab-' + tab); if (btn) btn.classList.add('active');
  if (tab === 'submit') { showFormStep(1); }
}

let chartInstances = {};
function destroyChart(id) {
  if (chartInstances[id]) { chartInstances[id].destroy(); delete chartInstances[id]; }
}

function switchAdminTab(tab) {
  ['dashboard', 'complaints', 'analytics', 'workflow', 'departments'].forEach(t => {
    const el = $('admin-tab-' + t); if (el) el.style.display = 'none';
    const btn = $('sb-' + t); if (btn) btn.classList.remove('active');
  });
  const el = $('admin-tab-' + tab); if (el) el.style.display = '';
  const btn = $('sb-' + tab); if (btn) btn.classList.add('active');
  if (tab === 'dashboard') renderDashboard();
  if (tab === 'complaints') renderComplaintsTable();
  if (tab === 'analytics') setTimeout(renderAnalytics, 50);
  if (tab === 'workflow') renderWorkflow();
  if (tab === 'departments') renderDepartments();
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    let current = 0; const step = Math.ceil(target / 60);
    const iv = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current.toLocaleString();
      if (current >= target) clearInterval(iv);
    }, 20);
  });
}

// ===== CITIZEN: FORM =====
function showFormStep(n) {
  [1, 2, 3].forEach(i => {
    const el = $('form-step' + i); if (el) el.style.display = i === n ? '' : 'none';
    const sp = $('sp' + i); if (!sp) return;
    sp.classList.remove('active', 'done');
    if (i < n) sp.classList.add('done');
    if (i === n) sp.classList.add('active');
  });
}

function step1Next() {
  const name = $('c-name').value.trim();
  const phone = $('c-phone').value.trim();
  const loc = $('c-location').value.trim();
  if (!name || !phone || !loc) { showToast('Please fill all required fields', 'error'); return; }
  if (!/^\d{10}$/.test(phone)) { showToast('Enter a valid 10-digit phone number', 'error'); return; }
  showFormStep(2);
}

function detectPriorityFromDesc() {
  const desc = $('c-desc').value;
  if (desc.length < 10) return;
  const p = detectPriority(desc);
  const colors = { Critical: '#ef4444', High: '#f59e0b', Medium: '#6366f1', Low: '#10b981' };
  $('priority-display').innerHTML = `<span style="color:${colors[p]};font-weight:700">⚡ Auto-detected Priority: ${p}</span>`;
}

function detectPriorityFromCat() {
  const cat = $('c-category').value;
  const d = getDeptForCategory(cat);
  if (d) $('priority-display').innerHTML = `<span style="color:var(--mid)">📂 Will be routed to: <strong style="color:var(--text)">${d.name}</strong></span>`;
}

function previewPhoto(input) {
  $('photo-preview').innerHTML = '';
  if (input.files && input.files[0]) {
    const img = document.createElement('img');
    img.style.cssText = 'max-width:200px;max-height:150px;border-radius:8px;margin-top:8px;border:1px solid var(--border)';
    img.src = URL.createObjectURL(input.files[0]);
    $('photo-preview').appendChild(img);
  }
}

function step2Next() {
  const cat = $('c-category').value;
  const desc = $('c-desc').value.trim();
  if (!cat || !desc) { showToast('Please fill all required fields', 'error'); return; }
  if (desc.length < 20) { showToast('Please describe the issue in more detail', 'error'); return; }
  const priority = detectPriority(desc);
  const dept = getDeptForCategory(cat);
  const complaint = {
    id: genId(),
    name: $('c-name').value.trim(),
    phone: $('c-phone').value.trim(),
    email: $('c-email').value.trim(),
    location: $('c-location').value.trim(),
    category: cat, description: desc, priority,
    status: 'New',
    deptId: dept ? dept.id : null,
    officer: dept ? dept.officer : null,
    remarks: '',
    createdAt: new Date().toISOString(),
    resolvedAt: null,
    updatedAt: new Date().toISOString(),
    slaHours: 48,
  };
  const data = getData();
  data.unshift(complaint);
  saveData(data);
  $('ticket-display').textContent = complaint.id;
  showFormStep(3);
  showToast('Complaint submitted successfully!');
}

function newComplaint() {
  ['c-name', 'c-phone', 'c-email', 'c-location', 'c-desc'].forEach(id => { const el = $(id); if (el) el.value = ''; });
  const cat = $('c-category'); if (cat) cat.value = '';
  $('priority-display').innerHTML = '📊 Priority will be auto-detected from your description';
  $('photo-preview').innerHTML = '';
  showFormStep(1);
}

let lastTicketId = '';
function goTrackTicket() {
  lastTicketId = $('ticket-display').textContent;
  switchCitizenTab('track');
  $('track-input').value = lastTicketId;
  doTrack();
}

// ===== CITIZEN: TRACK =====
function doTrack() {
  const id = $('track-input').value.trim().toUpperCase();
  if (!id) { showToast('Please enter a Ticket ID', 'error'); return; }
  const complaint = getData().find(c => c.id === id);
  $('track-result').innerHTML = complaint ? buildTrackResultHTML(complaint) : `
    <div style="text-align:center;padding:32px;color:var(--danger)">
      <div style="font-size:2rem;margin-bottom:12px">❌</div>
      <div style="font-weight:700;">Ticket ID Not Found</div>
      <div style="color:var(--mid);font-size:0.875rem;margin-top:8px">Please check the ID and try again</div>
    </div>`;
}

function buildTrackResultHTML(c) {
  const dept = DEPTS.find(d => d.id === c.deptId);
  const allStatuses = ['New', 'Triaged', 'Assigned', 'In Progress', 'Resolved'];
  const curIdx = allStatuses.indexOf(c.status === 'Closed' ? 'Resolved' : c.status);
  const tlHTML = allStatuses.map((s, i) => {
    const done = i < curIdx, active = i === curIdx;
    return `<div class="tl-item">
      <div class="tl-dot ${done ? 'done' : active ? 'active' : 'pending'}"></div>
      <div><div class="tl-label" style="color:${done ? 'var(--success)' : active ? 'var(--primary)' : 'var(--muted)'}">${s}</div>
      <div class="tl-date">${done || active ? fmtDate(c.updatedAt) : 'Pending'}</div></div>
    </div>`;
  }).join('');
  return `<div style="padding:24px;background:var(--card);border:1px solid var(--border);border-radius:var(--r)">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:20px">
      <div>
        <div style="font-size:0.78rem;color:var(--mid);font-weight:600;text-transform:uppercase;letter-spacing:0.5px">Ticket ID</div>
        <div style="font-size:1.4rem;font-weight:900;color:var(--primary)">${c.id}</div>
      </div>
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
        <span class="${priorityClass(c.priority)}">${c.priority}</span>
        <span class="${statusClass(c.status)}">${c.status}</span>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px;font-size:0.875rem">
      <div><span style="color:var(--mid)">Category: </span><strong>${c.category}</strong></div>
      <div><span style="color:var(--mid)">Filed: </span><strong>${fmtDate(c.createdAt)}</strong></div>
      <div><span style="color:var(--mid)">Location: </span><strong>${c.location}</strong></div>
      <div><span style="color:var(--mid)">Department: </span><strong>${dept ? dept.name : 'Pending Assignment'}</strong></div>
      ${c.officer ? `<div><span style="color:var(--mid)">Officer: </span><strong>${c.officer}</strong></div>` : ''}
      ${c.resolvedAt ? `<div><span style="color:var(--mid)">Resolved: </span><strong style="color:var(--success)">${fmtDate(c.resolvedAt)}</strong></div>` : ''}
    </div>
    <div style="font-size:0.875rem;color:var(--mid);margin-bottom:20px;padding:12px;background:rgba(255,255,255,0.03);border-radius:8px">${c.description}</div>
    ${c.remarks ? `<div style="font-size:0.85rem;color:var(--mid);padding:10px 14px;background:rgba(16,185,129,0.07);border:1px solid rgba(16,185,129,0.2);border-radius:8px;margin-bottom:20px">💬 Official Remarks: <strong style="color:var(--text)">${c.remarks}</strong></div>` : ''}
    <div><div style="font-size:0.82rem;font-weight:600;color:var(--mid);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.5px">Progress Timeline</div>${tlHTML}</div>
  </div>`;
}

// ===== ADMIN AUTH =====
function doLogin() {
  const u = $('l-user').value.trim(), p = $('l-pass').value.trim();
  if (u === 'admin' && p === 'admin123') {
    localStorage.setItem('pscrm_admin', '1');
    showView('admin');
    showToast('Welcome back, Admin!');
  } else {
    showToast('Invalid credentials. Use admin / admin123', 'error');
  }
}

function adminLogout() {
  localStorage.removeItem('pscrm_admin');
  showView('landing');
  showToast('Logged out successfully', 'info');
}

// ===== ADMIN DASHBOARD =====
function renderDashboard() {
  const data = getData();
  const today = new Date().toDateString();
  const total = data.length;
  const pending = data.filter(c => ['New', 'Triaged'].includes(c.status)).length;
  const inProg = data.filter(c => c.status === 'In Progress' || c.status === 'Assigned').length;
  const resolvedToday = data.filter(c => (c.status === 'Resolved' || c.status === 'Closed') && c.resolvedAt && new Date(c.resolvedAt).toDateString() === today).length;

  $('admin-stats').innerHTML = [
    { label: 'Total Complaints', val: total, sub: 'All time', cls: '', color: 'var(--primary)' },
    { label: 'Pending Review', val: pending, sub: 'Needs attention', cls: 'orange', color: 'var(--warning)' },
    { label: 'In Progress', val: inProg, sub: 'Being worked on', cls: 'red', color: '#60a5fa' },
    { label: 'Resolved Today', val: resolvedToday, sub: 'Great work!', cls: 'green', color: 'var(--success)' },
  ].map(s => `<div class="stat-card ${s.cls}">
    <div class="sc-label">${s.label}</div>
    <div class="sc-value" style="color:${s.color}">${s.val}</div>
    <div class="sc-sub">${s.sub}</div>
  </div>`).join('');

  const recent = data.slice(0, 8);
  $('recent-list').innerHTML = recent.map(c => `
    <div class="recent-item" onclick="openModal('${c.id}')">
      <div><div style="display:flex;gap:8px;align-items:center"><span class="ri-id">${c.id}</span><span class="${priorityClass(c.priority)}">${c.priority}</span></div>
      <div class="ri-name">${c.name}</div><div class="ri-loc">${c.location} · ${c.category}</div></div>
      <span class="${statusClass(c.status)}">${c.status}</span>
    </div>`).join('');

  // Workload chart
  destroyChart('workload');
  const ctx = $('chart-workload');
  if (ctx) {
    const deptCounts = DEPTS.map(d => data.filter(c => c.deptId === d.id).length);
    chartInstances['workload'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: DEPTS.map(d => d.short),
        datasets: [{ data: deptCounts, backgroundColor: DEPTS.map(d => d.color + '99'), borderColor: DEPTS.map(d => d.color), borderWidth: 2, borderRadius: 6 }]
      },
      options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8892a4' } }, x: { grid: { display: false }, ticks: { color: '#8892a4' } } } }
    });
  }
}

// ===== ADMIN COMPLAINTS TABLE =====
function renderComplaintsTable() {
  const data = getData();
  const search = ($('f-search') || {}).value?.toLowerCase() || '';
  const fStatus = ($('f-status') || {}).value || '';
  const fDept = ($('f-dept') || {}).value || '';
  const fPriority = ($('f-priority') || {}).value || '';

  const filtered = data.filter(c => {
    if (search && ![c.id, c.name, c.location, c.category].join(' ').toLowerCase().includes(search)) return false;
    if (fStatus && c.status !== fStatus) return false;
    if (fDept && c.deptId !== fDept) return false;
    if (fPriority && c.priority !== fPriority) return false;
    return true;
  });

  const tbody = $('complaints-tbody');
  if (!tbody) return;
  if (!filtered.length) { tbody.innerHTML = `<tr><td colspan="9" class="no-results">No complaints match your filters</td></tr>`; return; }
  tbody.innerHTML = filtered.map(c => {
    const dept = DEPTS.find(d => d.id === c.deptId);
    return `<tr>
      <td style="color:var(--primary);font-weight:700;font-family:monospace">${c.id}</td>
      <td><div style="font-weight:500">${c.name}</div><div style="font-size:0.75rem;color:var(--mid)">${c.phone}</div></td>
      <td style="color:var(--mid);font-size:0.82rem">${c.location}</td>
      <td style="font-size:0.82rem">${c.category}</td>
      <td><span class="${priorityClass(c.priority)}">${c.priority}</span></td>
      <td><span class="${statusClass(c.status)}">${c.status}</span></td>
      <td style="font-size:0.8rem">${dept ? `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${dept.color};margin-right:5px"></span>${dept.short}` : '<span style="color:var(--muted)">Unassigned</span>'}</td>
      <td style="color:var(--mid);font-size:0.8rem">${fmtDate(c.createdAt)}</td>
      <td><button class="icon-btn" onclick="openModal('${c.id}')">👁 View</button></td>
    </tr>`;
  }).join('');
}

// ===== COMPLAINT MODAL =====
function openModal(id) {
  const data = getData();
  const c = data.find(x => x.id === id);
  if (!c) return;
  const dept = DEPTS.find(d => d.id === c.deptId);
  $('modal-content').innerHTML = `
    <div style="margin-bottom:20px">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
        <div>
          <div style="font-size:0.78rem;color:var(--mid);font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">Complaint Detail</div>
          <div style="font-size:1.6rem;font-weight:900;color:var(--primary)">${c.id}</div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <span class="${priorityClass(c.priority)}">${c.priority}</span>
          <span class="${statusClass(c.status)}">${c.status}</span>
        </div>
      </div>
    </div>
    <div class="modal-section">
      <h4>Citizen Information</h4>
      <div class="info-grid">
        <div class="info-item"><label>Name</label><span>${c.name}</span></div>
        <div class="info-item"><label>Phone</label><span>${c.phone}</span></div>
        <div class="info-item"><label>Email</label><span>${c.email || '—'}</span></div>
        <div class="info-item"><label>Location</label><span>${c.location}</span></div>
      </div>
    </div>
    <div class="modal-section">
      <h4>Complaint Details</h4>
      <div class="info-grid">
        <div class="info-item"><label>Category</label><span>${c.category}</span></div>
        <div class="info-item"><label>Filed On</label><span>${fmtDateTime(c.createdAt)}</span></div>
        ${c.resolvedAt ? `<div class="info-item"><label>Resolved On</label><span style="color:var(--success)">${fmtDateTime(c.resolvedAt)}</span></div>` : ''}
        <div class="info-item"><label>SLA Hours</label><span>${c.slaHours}h</span></div>
      </div>
      <div style="margin-top:12px;padding:14px;background:rgba(255,255,255,0.04);border-radius:8px;font-size:0.875rem;line-height:1.6;color:var(--mid)">${c.description}</div>
    </div>
    <div class="modal-section">
      <h4>Assignment & Status Update</h4>
      <div class="modal-actions">
        <div style="flex:1">
          <label style="font-size:0.78rem;color:var(--mid);font-weight:600;display:block;margin-bottom:6px">ASSIGN TO DEPARTMENT</label>
          <select id="m-dept" onchange="assignDept('${c.id}',this.value)">
            <option value="">— Select Department —</option>
            ${DEPTS.map(d => `<option value="${d.id}" ${c.deptId === d.id ? 'selected' : ''}>${d.name}</option>`).join('')}
          </select>
        </div>
        <div style="flex:1">
          <label style="font-size:0.78rem;color:var(--mid);font-weight:600;display:block;margin-bottom:6px">UPDATE STATUS</label>
          <select id="m-status">
            ${['New', 'Triaged', 'Assigned', 'In Progress', 'Resolved', 'Closed'].map(s => `<option ${c.status === s ? 'selected' : ''}>${s}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="form-group" style="margin-top:12px">
        <label>Official Remarks</label>
        <textarea id="m-remarks" rows="2" placeholder="Add official remarks...">${c.remarks || ''}</textarea>
      </div>
      <div style="display:flex;gap:10px;margin-top:12px;flex-wrap:wrap">
        <button class="btn-primary" onclick="updateComplaint('${c.id}')">💾 Save Changes</button>
        ${c.status !== 'Resolved' && c.status !== 'Closed' ? `<button class="btn-success" onclick="quickResolve('${c.id}')">✅ Mark Resolved</button>` : ''}
      </div>
    </div>`;
  $('complaint-modal').style.display = 'flex';
}

function closeModal(e) {
  if (!e || e.target === $('complaint-modal')) $('complaint-modal').style.display = 'none';
}

function updateComplaint(id) {
  const data = getData();
  const idx = data.findIndex(c => c.id === id);
  if (idx < 0) return;
  const newStatus = $('m-status').value;
  const wasResolved = newStatus === 'Resolved' || newStatus === 'Closed';
  data[idx].status = newStatus;
  data[idx].remarks = $('m-remarks').value;
  data[idx].updatedAt = new Date().toISOString();
  if (wasResolved && !data[idx].resolvedAt) data[idx].resolvedAt = new Date().toISOString();
  saveData(data);
  $('complaint-modal').style.display = 'none';
  renderComplaintsTable();
  showToast(`Complaint ${id} updated to ${newStatus}`);
}

function assignDept(id, deptId) {
  if (!deptId) return;
  const data = getData();
  const idx = data.findIndex(c => c.id === id);
  if (idx < 0) return;
  const dept = DEPTS.find(d => d.id === deptId);
  data[idx].deptId = deptId;
  data[idx].officer = dept ? dept.officer : null;
  if (data[idx].status === 'New') data[idx].status = 'Assigned';
  data[idx].updatedAt = new Date().toISOString();
  saveData(data);
  showToast(`Assigned to ${dept ? dept.name : deptId}`, 'info');
}

function quickResolve(id) {
  const data = getData();
  const idx = data.findIndex(c => c.id === id);
  if (idx < 0) return;
  const remarks = $('m-remarks').value || data[idx].remarks;
  data[idx].status = 'Resolved';
  data[idx].resolvedAt = new Date().toISOString();
  data[idx].updatedAt = new Date().toISOString();
  data[idx].remarks = remarks;
  saveData(data);
  $('complaint-modal').style.display = 'none';
  renderComplaintsTable();
  showToast(`✅ Complaint ${id} marked as Resolved!`);
}

function adminAutoAssign() {
  const data = getData();
  let count = 0;
  data.forEach(c => {
    if (c.status === 'New' && !c.deptId) {
      const dept = getDeptForCategory(c.category);
      if (dept) { c.deptId = dept.id; c.officer = dept.officer; c.status = 'Assigned'; c.updatedAt = new Date().toISOString(); count++; }
    }
  });
  saveData(data);
  renderDashboard();
  showToast(`⚡ Auto-assigned ${count} complaint${count !== 1 ? 's' : ''} to departments!`, 'info');
}

// ===== ANALYTICS =====
function renderAnalytics() {
  const data = getData();
  const resolved = data.filter(c => c.status === 'Resolved' || c.status === 'Closed');
  const rate = data.length ? Math.round(resolved.length / data.length * 100) : 0;
  const avgHrs = resolved.filter(c => c.resolvedAt).reduce((a, c) => {
    return a + hoursAgo(c.createdAt) - hoursAgo(c.resolvedAt);
  }, 0) / Math.max(resolved.filter(c => c.resolvedAt).length, 1);

  $('analytics-kpis').innerHTML = [
    { label: 'Total', val: data.length, color: 'var(--primary)' },
    { label: 'Resolution Rate', val: rate + '%', color: 'var(--success)' },
    { label: 'Avg Resolution', val: Math.abs(Math.round(avgHrs)) + 'h', color: 'var(--warning)' },
    { label: 'SLA Breaches', val: data.filter(c => !['Resolved', 'Closed'].includes(c.status) && hoursAgo(c.createdAt) > 48).length, color: 'var(--danger)' },
  ].map(k => `<div class="stat-card"><div class="sc-label">${k.label}</div><div class="sc-value" style="color:${k.color}">${k.val}</div></div>`).join('');

  // Trend chart - last 7 days
  destroyChart('trend');
  const days = [...Array(7)].map((_, i) => { const d = new Date('2026-03-06'); d.setDate(d.getDate() - 6 + i); return d; });
  const trendData = days.map(d => data.filter(c => new Date(c.createdAt).toDateString() === d.toDateString()).length);
  const ctx1 = $('chart-trend');
  if (ctx1) { chartInstances['trend'] = new Chart(ctx1, { type: 'line', data: { labels: days.map(d => d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })), datasets: [{ data: trendData, borderColor: '#00cfff', backgroundColor: 'rgba(0,207,255,0.08)', fill: true, tension: 0.4, pointBackgroundColor: '#00cfff', pointRadius: 5 }] }, options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8892a4' } }, x: { grid: { display: false }, ticks: { color: '#8892a4' } } } } }); }

  // Category pie
  destroyChart('category');
  const cats = [...new Set(data.map(c => c.category))];
  const catData = cats.map(cat => data.filter(c => c.category === cat).length);
  const catColors = ['#00cfff', '#6366f1', '#f59e0b', '#10b981', '#ec4899', '#8b5cf6', '#ef4444', '#94a3b8'];
  const ctx2 = $('chart-category');
  if (ctx2) { chartInstances['category'] = new Chart(ctx2, { type: 'doughnut', data: { labels: cats, datasets: [{ data: catData, backgroundColor: catColors.slice(0, cats.length), borderWidth: 0 }] }, options: { responsive: true, plugins: { legend: { position: 'right', labels: { color: '#8892a4', boxWidth: 12, padding: 8, font: { size: 11 } } } } } }); }

  // Department performance
  destroyChart('perf');
  const ctx3 = $('chart-perf');
  if (ctx3) { chartInstances['perf'] = new Chart(ctx3, { type: 'bar', data: { labels: DEPTS.map(d => d.short), datasets: [{ label: 'Resolved', data: DEPTS.map(d => data.filter(c => c.deptId === d.id && (c.status === 'Resolved' || c.status === 'Closed')).length), backgroundColor: 'rgba(16,185,129,0.7)', borderRadius: 5 }, { label: 'Pending', data: DEPTS.map(d => data.filter(c => c.deptId === d.id && !['Resolved', 'Closed'].includes(c.status)).length), backgroundColor: 'rgba(239,68,68,0.5)', borderRadius: 5 }] }, options: { responsive: true, plugins: { legend: { labels: { color: '#8892a4' } } }, scales: { y: { beginAtZero: true, stacked: false, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8892a4' } }, x: { grid: { display: false }, ticks: { color: '#8892a4' } } } } }); }
}

// ===== WORKFLOW / KANBAN =====
function renderWorkflow() {
  const data = getData();
  const statuses = ['New', 'Triaged', 'Assigned', 'In Progress', 'Resolved', 'Closed'];
  const colColors = { 'New': '#64748b', 'Triaged': '#6366f1', 'Assigned': '#f59e0b', 'In Progress': '#3b82f6', 'Resolved': '#10b981', 'Closed': '#374151' };
  $('kanban-board').innerHTML = statuses.map(s => {
    const cards = data.filter(c => c.status === s);
    const cardsHTML = cards.slice(0, 5).map(c => {
      const hrs = hoursAgo(c.createdAt);
      const slaClass = s === 'Resolved' || s === 'Closed' ? 'ok' : hrs > 48 ? 'over' : hrs > 36 ? 'warn' : 'ok';
      const slaLabel = s === 'Resolved' || s === 'Closed' ? 'Resolved' : hrs > 48 ? `${Math.round(hrs)}h OVERDUE` : `${Math.round(hrs)}h`;
      return `<div class="k-card" onclick="openModal('${c.id}')">
        <div class="k-card-id">${c.id}</div>
        <div style="font-size:0.8rem;font-weight:500;margin-bottom:2px">${c.name}</div>
        <div class="k-card-loc">${c.location}</div>
        <span class="k-sla ${slaClass}">${slaLabel}</span>
      </div>`;
    }).join('');
    return `<div class="kanban-col">
      <div class="kanban-header" style="border-top:3px solid ${colColors[s]}">
        <span>${s}</span><span class="kanban-count">${cards.length}</span>
      </div>
      <div class="kanban-cards">${cardsHTML || '<div style="color:var(--muted);font-size:0.78rem;text-align:center;padding:20px 0">Empty</div>'}</div>
    </div>`;
  }).join('');

  // SLA alerts
  const overdue = data.filter(c => !['Resolved', 'Closed'].includes(c.status) && hoursAgo(c.createdAt) > 48);
  $('sla-alerts').innerHTML = overdue.length ? overdue.map(c => `
    <div class="sla-alert">
      <div class="sla-alert-info">
        <div><span class="sla-alert-id">${c.id}</span> — ${c.name} | ${c.location}</div>
        <div class="sla-alert-hours">${c.category} · ${Math.round(hoursAgo(c.createdAt))} hours overdue · Status: ${c.status}</div>
      </div>
      <button class="icon-btn" onclick="openModal('${c.id}')">📋 Act Now</button>
    </div>`).join('')
    : `<div class="empty-state">✅ No SLA breaches — all complaints within the 48h window</div>`;
}

// ===== DEPARTMENTS =====
function renderDepartments() {
  const data = getData();
  $('dept-cards').innerHTML = DEPTS.map(d => {
    const total = data.filter(c => c.deptId === d.id).length;
    const res = data.filter(c => c.deptId === d.id && (c.status === 'Resolved' || c.status === 'Closed')).length;
    const pct = total ? Math.round(res / total * 100) : 0;
    return `<div class="dept-card" style="border-top-color:${d.color}">
      <div class="dept-name">${d.name}</div>
      <div class="dept-officer">👤 ${d.officer} · 📞 ${d.phone}</div>
      <div class="dept-stats">
        <div class="dept-stat"><div class="dept-stat-val" style="color:${d.color}">${total}</div><div class="dept-stat-lbl">Total</div></div>
        <div class="dept-stat"><div class="dept-stat-val" style="color:var(--success)">${res}</div><div class="dept-stat-lbl">Resolved</div></div>
        <div class="dept-stat"><div class="dept-stat-val" style="color:var(--warning)">${total - res}</div><div class="dept-stat-lbl">Pending</div></div>
        <div class="dept-stat"><div class="dept-stat-val" style="color:var(--primary)">${pct}%</div><div class="dept-stat-lbl">Rate</div></div>
      </div>
      <div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:${d.color}"></div></div>
    </div>`;
  }).join('');
}

// ===== INIT =====
function init() {
  initData();
  if (localStorage.getItem('pscrm_admin')) {
    showView('admin');
  } else {
    showView('landing');
  }
}

document.addEventListener('DOMContentLoaded', init);

// ===== LANGUAGE SYSTEM =====
const TRANSLATIONS = {
  en: {
    // Nav
    nav_file: 'File Complaint', nav_track: 'Track Ticket', nav_admin: 'Admin Portal',
    // Hero / Landing
    hero_badge: '🏆 Hackathon 2026 — Smart Governance',
    hero_h1: 'One Platform.<br><span class="gradient-text">Every Grievance. Resolved.</span>',
    hero_sub: 'A centralized digital command center that brings citizens and government together — automating complaint workflows, assigning tasks to departments, and resolving every grievance transparently.',
    hero_btn1: '📝 File a Complaint', hero_btn2: '🏛️ Admin Command Center',
    stat_total: 'Total Complaints', stat_rate: '% Resolution Rate', stat_depts: 'Departments', stat_hrs: 'Hrs Avg Resolution',
    feat_heading: 'Why Smart PS-CRM?', feat_sub: 'Solving civic grievances with intelligence, transparency, and speed',
    feat1_h: 'Smart Complaint Submission', feat1_p: 'AI-powered priority detection, auto-categorization, and unique Ticket ID on every submission.',
    feat2_h: 'Real-Time Tracking', feat2_p: 'Citizens track their grievance status live with a full timeline view — just using their Ticket ID.',
    feat3_h: 'Automated Workflow', feat3_p: 'Smart auto-assignment routes complaints to the correct department instantly, with zero manual effort.',
    feat4_h: 'Analytics Command Center', feat4_p: 'Real-time charts, SLA breach monitoring, and department performance metrics for officials.',
    feat5_h: 'Department Management', feat5_p: 'Per-department workload, officer assignment, and resolution tracking all in one place.',
    feat6_h: 'SLA Escalation Alerts', feat6_p: 'Automatic alerts when complaints exceed the 48-hour resolution window — no grievance left behind.',
    how_heading: 'How It Works', how_sub: 'Three simple steps from complaint to resolution',
    step1_h: 'Citizen Files Complaint', step1_p: 'Fills a quick form, gets a unique Ticket ID instantly with priority auto-detected.',
    step2_h: 'Auto-Assigned to Dept.', step2_p: 'System routes to the right department based on category — no manual sorting needed.',
    step3_h: 'Tracked & Resolved', step3_p: 'Officer resolves, citizen tracks every step in real time using their Ticket ID.',
    cta_btn: '📝 File Your Complaint Now', cta_demo: 'Admin Demo Login:',
    // Citizen Portal
    citizen_back: '← Back to Home', citizen_title: 'Citizen Portal', citizen_sub: 'File and track your civic complaints with ease',
    tab_file: '📝 File Complaint', tab_track: '🔍 Track Complaint',
    sp1: '1 Personal Details', sp2: '2 Complaint Info', sp3: '3 Confirmation',
    form1_h: 'Personal Information',
    lbl_name: 'Full Name *', lbl_phone: 'Phone Number *', lbl_email: 'Email (optional)', lbl_loc: 'Area / Locality *',
    ph_name: 'Enter your full name', ph_phone: '10-digit mobile number', ph_loc: 'e.g. Koramangala 5th Block',
    btn_next: 'Next Step →',
    form2_h: 'Complaint Details',
    lbl_cat: 'Category *', cat_select: 'Select complaint category...',
    lbl_desc: 'Description *', ph_desc: 'Describe your issue clearly...', priority_auto: '📊 Priority will be auto-detected from your description',
    lbl_photo: 'Attach Photo (optional)',
    btn_back: '← Back', btn_submit: 'Submit Complaint →',
    success_h: 'Complaint Successfully Submitted!', success_p: 'Your unique Ticket ID is:', success_save: '📌 Save this ID to track your complaint anytime',
    btn_track_ticket: '🔍 Track This Ticket', btn_file_another: '+ File Another', btn_home: 'Home',
    track_h: 'Track Your Complaint', track_p: 'Enter the Ticket ID you received on submission', ph_track: 'e.g. PSC-0042', btn_track: 'Track →',
    // Admin Login
    login_h: 'Admin Command Center', login_p: 'Smart PS-CRM — Bengaluru City Corporation',
    login_user: 'Username', login_pass: 'Password', login_btn: 'Login to Dashboard',
    login_demo: 'Demo credentials: admin / admin123', login_back: '← Back to Home',
    // Admin Sidebar
    sb_dashboard: '📊 Dashboard', sb_complaints: '📋 Complaints', sb_analytics: '📈 Analytics',
    sb_workflow: '⚡ Workflow', sb_departments: '🏢 Departments',
    sb_loggedas: 'Logged in as', sb_logout: '🚪 Logout',
    // Chatbot
    cb_title: 'Smart PS-CRM Assistant', cb_online: '● Online — Always here to help',
  },
  hi: {
    nav_file: 'शिकायत दर्ज करें', nav_track: 'टिकट ट्रैक करें', nav_admin: 'एडमिन पोर्टल',
    hero_badge: '🏆 हैकाथॉन 2026 — स्मार्ट गवर्नेंस',
    hero_h1: 'एक प्लेटफ़ॉर्म।<br><span class="gradient-text">हर शिकायत। हल।</span>',
    hero_sub: 'एक केंद्रीकृत डिजिटल कमांड सेंटर जो नागरिकों और सरकार को एक साथ लाता है — शिकायत वर्कफ़्लो को स्वचालित करता है और हर समस्या को पारदर्शिता से हल करता है।',
    hero_btn1: '📝 शिकायत दर्ज करें', hero_btn2: '🏛️ एडमिन कमांड सेंटर',
    stat_total: 'कुल शिकायतें', stat_rate: '% समाधान दर', stat_depts: 'विभाग', stat_hrs: 'औसत समाधान (घंटे)',
    feat_heading: 'Smart PS-CRM क्यों?', feat_sub: 'बुद्धिमत्ता, पारदर्शिता और गति के साथ नागरिक शिकायतों का समाधान',
    feat1_h: 'स्मार्ट शिकायत सबमिशन', feat1_p: 'AI-संचालित प्राथमिकता पहचान, ऑटो-वर्गीकरण और हर सबमिशन पर यूनिक टिकट ID।',
    feat2_h: 'रियल-टाइम ट्रैकिंग', feat2_p: 'नागरिक अपनी शिकायत की स्थिति लाइव ट्रैक करते हैं — केवल टिकट ID से।',
    feat3_h: 'स्वचालित वर्कफ़्लो', feat3_p: 'स्मार्ट ऑटो-असाइनमेंट सही विभाग को तुरंत रूट करता है।',
    feat4_h: 'एनालिटिक्स कमांड सेंटर', feat4_p: 'रियल-टाइम चार्ट, SLA उल्लंघन निगरानी और विभाग प्रदर्शन मेट्रिक्स।',
    feat5_h: 'विभाग प्रबंधन', feat5_p: 'प्रत्येक विभाग का कार्यभार, अधिकारी असाइनमेंट और समाधान ट्रैकिंग।',
    feat6_h: 'SLA एस्केलेशन अलर्ट', feat6_p: 'जब शिकायतें 48 घंटे की सीमा पार करें तो स्वचालित अलर्ट।',
    how_heading: 'यह कैसे काम करता है', how_sub: 'शिकायत से समाधान तक तीन सरल चरण',
    step1_h: 'नागरिक शिकायत दर्ज करता है', step1_p: 'एक त्वरित फॉर्म भरें, तुरंत यूनिक टिकट ID पाएं।',
    step2_h: 'विभाग को ऑटो-असाइन', step2_p: 'सिस्टम श्रेणी के आधार पर सही विभाग को रूट करता है।',
    step3_h: 'ट्रैक किया और हल किया', step3_p: 'अधिकारी हल करता है, नागरिक हर कदम ट्रैक करता है।',
    cta_btn: '📝 अभी शिकायत दर्ज करें', cta_demo: 'एडमिन डेमो लॉगिन:',
    citizen_back: '← होम पर वापस', citizen_title: 'नागरिक पोर्टल', citizen_sub: 'अपनी नागरिक शिकायतें आसानी से दर्ज और ट्रैक करें',
    tab_file: '📝 शिकायत दर्ज करें', tab_track: '🔍 शिकायत ट्रैक करें',
    sp1: '1 व्यक्तिगत विवरण', sp2: '2 शिकायत जानकारी', sp3: '3 पुष्टि',
    form1_h: 'व्यक्तिगत जानकारी',
    lbl_name: 'पूरा नाम *', lbl_phone: 'फ़ोन नंबर *', lbl_email: 'ईमेल (वैकल्पिक)', lbl_loc: 'क्षेत्र / इलाका *',
    ph_name: 'अपना पूरा नाम दर्ज करें', ph_phone: '10 अंकों का मोबाइल नंबर', ph_loc: 'जैसे कोरमंगला 5वाँ ब्लॉक',
    btn_next: 'अगला चरण →',
    form2_h: 'शिकायत विवरण',
    lbl_cat: 'श्रेणी *', cat_select: 'शिकायत श्रेणी चुनें...',
    lbl_desc: 'विवरण *', ph_desc: 'अपनी समस्या स्पष्ट रूप से बताएं...', priority_auto: '📊 प्राथमिकता आपके विवरण से स्वतः पहचानी जाएगी',
    lbl_photo: 'फ़ोटो संलग्न करें (वैकल्पिक)',
    btn_back: '← वापस', btn_submit: 'शिकायत जमा करें →',
    success_h: 'शिकायत सफलतापूर्वक दर्ज!', success_p: 'आपका यूनिक टिकट ID है:', success_save: '📌 अपनी शिकायत ट्रैक करने के लिए यह ID सहेजें',
    btn_track_ticket: '🔍 टिकट ट्रैक करें', btn_file_another: '+ और दर्ज करें', btn_home: 'होम',
    track_h: 'अपनी शिकायत ट्रैक करें', track_p: 'सबमिशन पर प्राप्त टिकट ID दर्ज करें', ph_track: 'जैसे PSC-0042', btn_track: 'ट्रैक करें →',
    login_h: 'एडमिन कमांड सेंटर', login_p: 'Smart PS-CRM — बेंगलुरु सिटी कॉर्पोरेशन',
    login_user: 'यूज़रनेम', login_pass: 'पासवर्ड', login_btn: 'डैशबोर्ड में लॉगिन करें',
    login_demo: 'डेमो क्रेडेंशियल: admin / admin123', login_back: '← होम पर वापस',
    sb_dashboard: '📊 डैशबोर्ड', sb_complaints: '📋 शिकायतें', sb_analytics: '📈 एनालिटिक्स',
    sb_workflow: '⚡ वर्कफ़्लो', sb_departments: '🏢 विभाग',
    sb_loggedas: 'लॉग इन हैं', sb_logout: '🚪 लॉगआउट',
    cb_title: 'स्मार्ट PS-CRM सहायक', cb_online: '● ऑनलाइन — हमेशा आपकी मदद के लिए',
  },
  kn: {
    nav_file: 'ದೂರು ಸಲ್ಲಿಸಿ', nav_track: 'ಟಿಕೆಟ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ', nav_admin: 'ಅಡ್ಮಿನ್ ಪೋರ್ಟಲ್',
    hero_badge: '🏆 ಹ್ಯಾಕಥಾನ್ 2026 — ಸ್ಮಾರ್ಟ್ ಗವರ್ನೆನ್ಸ್',
    hero_h1: 'ಒಂದು ವೇದಿಕೆ।<br><span class="gradient-text">ಪ್ರತಿ ದೂರು. ಪರಿಹಾರ.</span>',
    hero_sub: 'ನಾಗರಿಕರು ಮತ್ತು ಸರ್ಕಾರವನ್ನು ಒಟ್ಟುಗೂಡಿಸುವ ಕೇಂದ್ರೀಕೃತ ಡಿಜಿಟಲ್ ಕಮಾಂಡ್ ಸೆಂಟರ್ — ದೂರು ವರ್ಕ್‌ಫ್ಲೋಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತಗೊಳಿಸಿ ಪ್ರತಿ ಸಮಸ್ಯೆಯನ್ನು ಪಾರದರ್ಶಕವಾಗಿ ಪರಿಹರಿಸುತ್ತದೆ.',
    hero_btn1: '📝 ದೂರು ಸಲ್ಲಿಸಿ', hero_btn2: '🏛️ ಅಡ್ಮಿನ್ ಕಮಾಂಡ್ ಸೆಂಟರ್',
    stat_total: 'ಒಟ್ಟು ದೂರುಗಳು', stat_rate: '% ಪರಿಹಾರ ದರ', stat_depts: 'ಇಲಾಖೆಗಳು', stat_hrs: 'ಸರಾಸರಿ ಪರಿಹಾರ (ಗಂ.)',
    feat_heading: 'Smart PS-CRM ಏಕೆ?', feat_sub: 'ಬುದ್ಧಿವಂತಿಕೆ, ಪಾರದರ್ಶಕತೆ ಮತ್ತು ವೇಗದೊಂದಿಗೆ ಸಮಸ್ಯೆ ಪರಿಹಾರ',
    feat1_h: 'ಸ್ಮಾರ್ಟ್ ದೂರು ಸಲ್ಲಿಕೆ', feat1_p: 'AI ಚಾಲಿತ ಆದ್ಯತೆ ಪತ್ತೆ ಮತ್ತು ಅನನ್ಯ ಟಿಕೆಟ್ ID.',
    feat2_h: 'ರಿಯಲ್-ಟೈಮ್ ಟ್ರ್ಯಾಕಿಂಗ್', feat2_p: 'ಟಿಕೆಟ್ ID ಬಳಸಿ ನಾಗರಿಕರು ಸ್ಥಿತಿ ಲೈವ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಬಹುದು.',
    feat3_h: 'ಸ್ವಯಂಚಾಲಿತ ವರ್ಕ್‌ಫ್ಲೋ', feat3_p: 'ಸ್ಮಾರ್ಟ್ ಆಟೋ-ಅಸೈನ್‌ಮೆಂಟ್ ತಕ್ಷಣ ಸರಿಯಾದ ಇಲಾಖೆಗೆ ರೂಟ್ ಮಾಡುತ್ತದೆ.',
    feat4_h: 'ಅನಾಲಿಟಿಕ್ಸ್ ಕಮಾಂಡ್ ಸೆಂಟರ್', feat4_p: 'ರಿಯಲ್-ಟೈಮ್ ಚಾರ್ಟ್, SLA ಉಲ್ಲಂಘನೆ ಮೇಲ್ವಿಚಾರಣೆ.',
    feat5_h: 'ಇಲಾಖೆ ನಿರ್ವಹಣೆ', feat5_p: 'ಪ್ರತಿ ಇಲಾಖೆ ಹೊರೆ, ಅಧಿಕಾರಿ ನಿಯೋಜನೆ.',
    feat6_h: 'SLA ಎಸ್ಕಲೇಶನ್ ಅಲರ್ಟ್‌ಗಳು', feat6_p: '48 ಗಂಟೆ ಮೀರಿದಾಗ ಸ್ವಯಂಚಾಲಿತ ಅಲರ್ಟ್.',
    how_heading: 'ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ', how_sub: 'ದೂರಿನಿಂದ ಪರಿಹಾರಕ್ಕೆ ಮೂರು ಸರಳ ಹಂತಗಳು',
    step1_h: 'ನಾಗರಿಕ ದೂರು ಸಲ್ಲಿಸುತ್ತಾರೆ', step1_p: 'ಸ್ವಿಫ್ಟ್ ಫಾರ್ಮ್ ತುಂಬಿ ತಕ್ಷಣ ಟಿಕೆಟ್ ID ಪಡೆಯಿರಿ.',
    step2_h: 'ಇಲಾಖೆಗೆ ಆಟೋ-ಅಸೈನ್', step2_p: 'ಸಿಸ್ಟಮ್ ವರ್ಗದ ಆಧಾರದ ಮೇಲೆ ಸರಿಯಾದ ಇಲಾಖೆಗೆ ರೂಟ್ ಮಾಡುತ್ತದೆ.',
    step3_h: 'ಟ್ರ್ಯಾಕ್ ಮತ್ತು ಪರಿಹರಿಸಲಾಗಿದೆ', step3_p: 'ಅಧಿಕಾರಿ ಪರಿಹರಿಸುತ್ತಾರೆ, ನಾಗರಿಕ ಟಿಕೆಟ್ ID ಬಳಸಿ ಟ್ರ್ಯಾಕ್ ಮಾಡುತ್ತಾರೆ।',
    cta_btn: '📝 ಈಗ ದೂರು ಸಲ್ಲಿಸಿ', cta_demo: 'ಅಡ್ಮಿನ್ ಡೆಮೋ ಲಾಗಿನ್:',
    citizen_back: '← ಹೋಮ್‌ಗೆ ಹಿಂದಿರುಗಿ', citizen_title: 'ನಾಗರಿಕ ಪೋರ್ಟಲ್', citizen_sub: 'ನಿಮ್ಮ ನಾಗರಿಕ ದೂರುಗಳನ್ನು ಸುಲಭವಾಗಿ ಸಲ್ಲಿಸಿ ಮತ್ತು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
    tab_file: '📝 ದೂರು ಸಲ್ಲಿಸಿ', tab_track: '🔍 ದೂರು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
    sp1: '1 ವೈಯಕ್ತಿಕ ವಿವರ', sp2: '2 ದೂರು ಮಾಹಿತಿ', sp3: '3 ದೃಢೀಕರಣ',
    form1_h: 'ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ',
    lbl_name: 'ಪೂರ್ಣ ಹೆಸರು *', lbl_phone: 'ಫೋನ್ ನಂಬರ್ *', lbl_email: 'ಇಮೇಲ್ (ಐಚ್ಛಿಕ)', lbl_loc: 'ಪ್ರದೇಶ / ಸ್ಥಳ *',
    ph_name: 'ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು ನಮೂದಿಸಿ', ph_phone: '10 ಅಂಕಿ ಮೊಬೈಲ್ ನಂಬರ್', ph_loc: 'ಉದಾ: ಕೋರಮಂಗಲ 5ನೇ ಬ್ಲಾಕ್',
    btn_next: 'ಮುಂದಿನ ಹಂತ →',
    form2_h: 'ದೂರು ವಿವರ',
    lbl_cat: 'ವರ್ಗ *', cat_select: 'ದೂರಿನ ವರ್ಗ ಆಯ್ಕೆ ಮಾಡಿ...',
    lbl_desc: 'ವಿವರಣೆ *', ph_desc: 'ನಿಮ್ಮ ಸಮಸ್ಯೆಯನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ವಿವರಿಸಿ...', priority_auto: '📊 ನಿಮ್ಮ ವಿವರಣೆಯಿಂದ ಆದ್ಯತೆ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಪತ್ತೆಯಾಗುತ್ತದೆ',
    lbl_photo: 'ಫೋಟೋ ಲಗತ್ತಿಸಿ (ಐಚ್ಛಿಕ)',
    btn_back: '← ಹಿಂದೆ', btn_submit: 'ದೂರು ಸಲ್ಲಿಸಿ →',
    success_h: 'ದೂರು ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ!', success_p: 'ನಿಮ್ಮ ಅನನ್ಯ ಟಿಕೆಟ್ ID:', success_save: '📌 ದೂರು ಟ್ರ್ಯಾಕ್ ಮಾಡಲು ಈ ID ಉಳಿಸಿ',
    btn_track_ticket: '🔍 ಟಿಕೆಟ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ', btn_file_another: '+ ಮತ್ತೊಂದು ಸಲ್ಲಿಸಿ', btn_home: 'ಹೋಮ್',
    track_h: 'ನಿಮ್ಮ ದೂರು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ', track_p: 'ಸಲ್ಲಿಕೆ ಸಮಯ ಪಡೆದ ಟಿಕೆಟ್ ID ನಮೂದಿಸಿ', ph_track: 'ಉದಾ: PSC-0042', btn_track: 'ಟ್ರ್ಯಾಕ್ →',
    login_h: 'ಅಡ್ಮಿನ್ ಕಮಾಂಡ್ ಸೆಂಟರ್', login_p: 'Smart PS-CRM — ಬೆಂಗಳೂರು ಸಿಟಿ ಕಾರ್ಪೊರೇಷನ್',
    login_user: 'ಯೂಸರ್‌ನೇಮ್', login_pass: 'ಪಾಸ್‌ವರ್ಡ್', login_btn: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಲಾಗಿನ್',
    login_demo: 'ಡೆಮೋ ಕ್ರೆಡೆನ್ಶಿಯಲ್ಸ್: admin / admin123', login_back: '← ಹೋಮ್‌ಗೆ ಹಿಂದಿರುಗಿ',
    sb_dashboard: '📊 ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', sb_complaints: '📋 ದೂರುಗಳು', sb_analytics: '📈 ಅನಾಲಿಟಿಕ್ಸ್',
    sb_workflow: '⚡ ವರ್ಕ್‌ಫ್ಲೋ', sb_departments: '🏢 ಇಲಾಖೆಗಳು',
    sb_loggedas: 'ಲಾಗ್ ಇನ್ ಆಗಿದ್ದಾರೆ', sb_logout: '🚪 ಲಾಗ್‌ಔಟ್',
    cb_title: 'ಸ್ಮಾರ್ಟ್ PS-CRM ಸಹಾಯಕ', cb_online: '● ಆನ್‌ಲೈನ್ — ಸದಾ ಸಹಾಯಕ್ಕೆ ಸಿದ್ಧ',
  },
};

window.LANG = 'en';

function setLanguage(lang) {
  window.LANG = lang;
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Update text/html for all data-i18n tagged elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) {
      // Use innerHTML for keys that may contain HTML tags (e.g. hero_h1)
      if (key === 'hero_h1') {
        el.innerHTML = t[key];
      } else {
        el.textContent = t[key];
      }
    }
  });

  // Update placeholders for inputs/textareas with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  // Update chatbot input placeholder
  const cbInput = $('cb-input');
  if (cbInput) {
    const ph = { en: 'Ask me anything...', hi: 'कुछ भी पूछें...', kn: 'ಯಾವುದಾದರೂ ಕೇಳಿ...' };
    cbInput.placeholder = ph[lang] || ph.en;
  }

  // Sync pill button active states
  ['en', 'hi', 'kn'].forEach(l => {
    const pill = $('lp-' + l);
    if (pill) pill.classList.toggle('active', l === lang);
  });
}


// ===== CHATBOT ENGINE =====
const CHATBOT_KB = [
  {
    patterns: [/file|complaint|submit|register|how.*complain|shikayat|दर्ज|ದೂರು/i],
    en: `📝 <b>How to File a Complaint:</b><br>
1. Click <b>"File Complaint"</b> in the nav (or the hero button).<br>
2. Fill in your <b>name, phone & locality</b>.<br>
3. Select the <b>category</b> and describe your issue.<br>
4. Submit — you'll get a unique <b>Ticket ID</b> instantly!<br><br>
AI auto-detects priority & routes to the right department 🚀`,
    hi: `📝 <b>शिकायत कैसे दर्ज करें:</b><br>
1. नेव में <b>"शिकायत दर्ज करें"</b> पर क्लिक करें।<br>
2. अपना <b>नाम, फ़ोन और स्थान</b> भरें।<br>
3. <b>श्रेणी</b> चुनें और समस्या विवरण लिखें।<br>
4. सबमिट करें — आपको एक अद्वितीय <b>टिकट नंबर</b> मिलेगा!`,
    kn: `📝 <b>ದೂರು ಸಲ್ಲಿಸುವ ವಿಧಾನ:</b><br>
1. ನ್ಯಾವ್‌ನಲ್ಲಿ <b>"ದೂರು ಸಲ್ಲಿಸಿ"</b> ಕ್ಲಿಕ್ ಮಾಡಿ.<br>
2. ನಿಮ್ಮ <b>ಹೆಸರು, ಫೋನ್ ಮತ್ತು ಸ್ಥಳ</b> ತುಂಬಿ.<br>
3. <b>ವರ್ಗ</b> ಆಯ್ಕೆ ಮಾಡಿ ಮತ್ತು ಸಮಸ್ಯೆ ವಿವರಿಸಿ.<br>
4. ಸಲ್ಲಿಸಿ — ನಿಮಗೆ ಅನನ್ಯ <b>ಟಿಕೆಟ್ ID</b> ಸಿಗುತ್ತದೆ!`,
  },
  {
    patterns: [/track|status|ticket|check.*complaint|where.*complaint|ಟ್ರ್ಯಾಕ್|टिकट/i],
    en: `🔍 <b>How to Track Your Complaint:</b><br>
1. Click <b>"Track Ticket"</b> in the navigation bar.<br>
2. Enter your <b>Ticket ID</b> (e.g., PSC-0042).<br>
3. See the full <b>progress timeline</b> — from New → Resolved!<br><br>
💡 Your Ticket ID was shown after submission. Save it!`,
    hi: `🔍 <b>शिकायत ट्रैक कैसे करें:</b><br>
1. नेव में <b>"टिकट ट्रैक करें"</b> पर क्लिक करें।<br>
2. अपना <b>टिकट नंबर</b> दर्ज करें (जैसे PSC-0042)।<br>
3. पूरी <b>स्थिति टाइमलाइन</b> देखें!`,
    kn: `🔍 <b>ದೂರು ಟ್ರ್ಯಾಕ್ ಮಾಡುವ ವಿಧಾನ:</b><br>
1. ನ್ಯಾವ್‌ನಲ್ಲಿ <b>"ಟಿಕೆಟ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ"</b> ಕ್ಲಿಕ್ ಮಾಡಿ.<br>
2. ನಿಮ್ಮ <b>ಟಿಕೆಟ್ ID</b> ನಮೂದಿಸಿ (ಉದಾ: PSC-0042).<br>
3. ಪೂರ್ಣ <b>ಪ್ರಗತಿ ಟೈಮ್‌ಲೈನ್</b> ನೋಡಿ!`,
  },
  {
    patterns: [/department|dept|pwd|bwssb|bescom|bbmp|health|bmtc|विभाग|ಇಲಾಖೆ/i],
    en: `🏢 <b>6 Departments handling complaints:</b><br>
• <b>PWD</b> — Roads & Infrastructure<br>
• <b>BWSSB</b> — Water Supply<br>
• <b>BESCOM</b> — Electricity<br>
• <b>BBMP</b> — Sanitation, Garbage & Public Safety<br>
• <b>Health Dept.</b> — Health & Hospitals<br>
• <b>BMTC</b> — Transport & Traffic<br><br>
Complaints are <b>auto-routed</b> to the right department!`,
    hi: `🏢 <b>6 विभाग शिकायतें संभालते हैं:</b><br>
• PWD — सड़क और बुनियादी ढांचा<br>
• BWSSB — जल आपूर्ति<br>
• BESCOM — बिजली<br>
• BBMP — सफाई और कचरा<br>
• स्वास्थ्य विभाग — स्वास्थ्य सेवाएं<br>
• BMTC — परिवहन और यातायात`,
    kn: `🏢 <b>6 ಇಲಾಖೆಗಳು ದೂರುಗಳನ್ನು ನಿರ್ವಹಿಸುತ್ತವೆ:</b><br>
• PWD — ರಸ್ತೆ ಮತ್ತು ಮೂಲಸೌಕರ್ಯ<br>
• BWSSB — ನೀರು ಸರಬರಾಜು<br>
• BESCOM — ವಿದ್ಯುತ್<br>
• BBMP — ಸ್ವಚ್ಛತೆ ಮತ್ತು ತ್ಯಾಜ್ಯ<br>
• ಆರೋಗ್ಯ ಇಲಾಖೆ — ಆರೋಗ್ಯ ಸೇವೆಗಳು<br>
• BMTC — ಸಾರಿಗೆ ಮತ್ತು ಸಂಚಾರ`,
  },
  {
    patterns: [/sla|48|overdue|breach|deadline|time limit/i],
    en: `⏱️ <b>SLA Policy — 48 Hour Resolution Window:</b><br>
Every complaint must be resolved within <b>48 hours</b>.<br><br>
• 🟢 Under 36h — On track<br>
• 🟡 36–48h — Warning<br>
• 🔴 Over 48h — SLA Breach (Admin alerted)<br><br>
Admins monitor SLA breaches in real-time from the Workflow tab.`,
    hi: `⏱️ <b>SLA नीति — 48 घंटे की समय सीमा:</b><br>
हर शिकायत <b>48 घंटे</b> के अंदर हल होनी चाहिए।<br>
• 🟢 36 घंटे से कम — सही रास्ते पर<br>
• 🟡 36-48 घंटे — चेतावनी<br>
• 🔴 48 घंटे से अधिक — SLA उल्लंघन`,
    kn: `⏱️ <b>SLA ನೀತಿ — 48 ಗಂಟೆಗಳ ಅವಧಿ:</b><br>
ಪ್ರತಿ ದೂರನ್ನು <b>48 ಗಂಟೆಗಳಲ್ಲಿ</b> ಪರಿಹರಿಸಬೇಕು.<br>
• 🟢 36 ಗಂಟೆಗಿಂತ ಕಡಿಮೆ — ಸರಿ<br>
• 🟡 36–48 ಗಂಟೆ — ಎಚ್ಚರಿಕೆ<br>
• 🔴 48 ಗಂಟೆ ಮೀರಿದರೆ — SLA ಉಲ್ಲಂಘನೆ`,
  },
  {
    patterns: [/admin|login|password|credentials|dashboard|command/i],
    en: `🔑 <b>Admin Login Instructions:</b><br>
Click <b>"Admin Portal"</b> in the top-right navigation.<br><br>
Demo credentials:<br>
• Username: <b>admin</b><br>
• Password: <b>admin123</b><br><br>
Once logged in, you can manage complaints, view analytics, assign departments, and monitor the Workflow Kanban board.`,
    hi: `🔑 <b>एडमिन लॉगिन:</b><br>
नेव में <b>"एडमिन पोर्टल"</b> पर क्लिक करें।<br>
डेमो क्रेडेंशियल:<br>
• यूज़रनेम: admin<br>
• पासवर्ड: admin123`,
    kn: `🔑 <b>ಅಡ್ಮಿನ್ ಲಾಗಿನ್:</b><br>
ನ್ಯಾವ್‌ನಲ್ಲಿ <b>"ಅಡ್ಮಿನ್ ಪೋರ್ಟಲ್"</b> ಕ್ಲಿಕ್ ಮಾಡಿ.<br>
ಡೆಮೋ ಕ್ರೆಡೆನ್ಶಿಯಲ್ಸ್:<br>
• ಯೂಸರ್‌ನೇಮ್: admin<br>
• ಪಾಸ್‌ವರ್ಡ್: admin123`,
  },
  {
    patterns: [/what.*crm|about|purpose|what is|smart ps|platform|help/i],
    en: `🏛️ <b>About Smart PS-CRM:</b><br>
Smart PS-CRM is a <b>Citizen Grievance Command Center</b> for Bengaluru City Corporation.<br><br>
It bridges citizens & government by:<br>
✅ Automating complaint routing<br>
✅ Providing real-time tracking<br>
✅ Monitoring SLA compliance<br>
✅ Offering analytics for officials<br><br>
Built for <b>Hackathon 2026 — Smart Governance</b> 🏆`,
    hi: `🏛️ <b>Smart PS-CRM के बारे में:</b><br>
यह बेंगलुरु सिटी कॉर्पोरेशन का <b>नागरिक शिकायत केंद्र</b> है।<br>
यह नागरिकों और सरकार को जोड़ता है — स्वचालित रूटिंग, रियल-टाइम ट्रैकिंग और SLA निगरानी के साथ।`,
    kn: `🏛️ <b>Smart PS-CRM ಬಗ್ಗೆ:</b><br>
ಇದು ಬೆಂಗಳೂರು ಸಿಟಿ ಕಾರ್ಪೊರೇಷನ್‌ನ <b>ನಾಗರಿಕ ದೂರು ಕೇಂದ್ರ</b>.<br>
ಸ್ವಯಂಚಾಲಿತ ರೂಟಿಂಗ್, ರಿಯಲ್-ಟೈಮ್ ಟ್ರ್ಯಾಕಿಂಗ್ ಮತ್ತು SLA ಮೇಲ್ವಿಚಾರಣೆ.`,
  },
  {
    patterns: [/priority|critical|high|medium|low|urgent/i],
    en: `⚡ <b>Priority Levels:</b><br>
• 🔴 <b>Critical</b> — Accidents, fires, floods, health emergencies<br>
• 🟠 <b>High</b> — No water/power, major potholes, leakages<br>
• 🟡 <b>Medium</b> — Delays, dirty areas, minor damage<br>
• 🟢 <b>Low</b> — General feedback, minor requests<br><br>
Priority is <b>auto-detected</b> from your complaint description using AI keyword analysis.`,
    hi: `⚡ <b>प्राथमिकता स्तर:</b><br>
• 🔴 Critical — दुर्घटना, आग, बाढ़<br>
• 🟠 High — पानी/बिजली नहीं, बड़े गड्ढे<br>
• 🟡 Medium — देरी, गंदगी<br>
• 🟢 Low — सामान्य अनुरोध`,
    kn: `⚡ <b>ಆದ್ಯತೆ ಮಟ್ಟಗಳು:</b><br>
• 🔴 Critical — ಅಪಘಾತ, ಬೆಂಕಿ, ಪ್ರವಾಹ<br>
• 🟠 High — ನೀರು/ವಿದ್ಯುತ್ ಇಲ್ಲ, ದೊಡ್ಡ ಗುಂಡಿ<br>
• 🟡 Medium — ವಿಳಂಬ, ಕೊಳಕು ಪ್ರದೇಶ<br>
• 🟢 Low — ಸಾಮಾನ್ಯ ವಿನಂತಿ`,
  },
];

const FALLBACK = {
  en: `🤖 I'm not sure about that, but I can help with:<br>
• 📝 Filing a complaint<br>
• 🔍 Tracking your ticket<br>
• 🏢 Department information<br>
• ⏱️ SLA policy<br>
• 🔑 Admin login<br><br>
Try clicking one of the quick-reply buttons below!`,
  hi: `🤖 मुझे इसके बारे में निश्चित जानकारी नहीं है। मैं इनमें मदद कर सकता हूं:<br>
शिकायत दर्ज करना, टिकट ट्रैक करना, विभाग जानकारी, एडमिन लॉगिन`,
  kn: `🤖 ನನಗೆ ಈ ಬಗ್ಗೆ ಖಚಿತ ಮಾಹಿತಿ ಇಲ್ಲ. ನಾನು ಈ ವಿಷಯಗಳಲ್ಲಿ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ:<br>
ದೂರು ಸಲ್ಲಿಸಲು, ಟಿಕೆಟ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಲು, ಇಲಾಖೆ ಮಾಹಿತಿ, ಅಡ್ಮಿನ್ ಲಾಗಿನ್`,
};

const GREETINGS = {
  en: `👋 Hello! I'm the <b>Smart PS-CRM Assistant</b>.<br>I can help you file complaints, track tickets, understand departments, and more!<br><br>What can I help you with today?`,
  hi: `👋 नमस्ते! मैं <b>Smart PS-CRM सहायक</b> हूं।<br>मैं शिकायत दर्ज करने, टिकट ट्रैक करने और अधिक में मदद कर सकता हूं!`,
  kn: `👋 ನಮಸ್ಕಾರ! ನಾನು <b>Smart PS-CRM ಸಹಾಯಕ</b>.<br>ದೂರು ಸಲ್ಲಿಸಲು, ಟಿಕೆಟ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಲು ಮತ್ತು ಹೆಚ್ಚಿನ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ!`,
};

let chatbotOpen = false;
let chatbotInited = false;

function toggleChatbot() {
  chatbotOpen = !chatbotOpen;
  const panel = $('chatbot-panel');
  if (chatbotOpen) {
    panel.classList.add('open');
    if (!chatbotInited) {
      chatbotInited = true;
      appendBotMessage(GREETINGS[window.LANG] || GREETINGS.en);
    }
    setTimeout(() => { const inp = $('cb-input'); if (inp) inp.focus(); }, 300);
  } else {
    panel.classList.remove('open');
  }
}

function appendBotMessage(html) {
  const msgs = $('cb-messages');
  const bubble = document.createElement('div');
  bubble.className = 'cb-bubble bot';
  bubble.innerHTML = html;
  msgs.appendChild(bubble);
  msgs.scrollTop = msgs.scrollHeight;
}

function appendUserMessage(text) {
  const msgs = $('cb-messages');
  const bubble = document.createElement('div');
  bubble.className = 'cb-bubble user';
  bubble.textContent = text;
  msgs.appendChild(bubble);
  msgs.scrollTop = msgs.scrollHeight;
}

function showTyping() {
  const msgs = $('cb-messages');
  const typing = document.createElement('div');
  typing.className = 'cb-typing';
  typing.id = 'cb-typing';
  typing.innerHTML = '<span></span><span></span><span></span>';
  msgs.appendChild(typing);
  msgs.scrollTop = msgs.scrollHeight;
  return typing;
}

function findAnswer(query) {
  const lang = window.LANG in TRANSLATIONS ? window.LANG : 'en';
  for (const entry of CHATBOT_KB) {
    if (entry.patterns.some(p => p.test(query))) {
      return entry[lang] || entry.en;
    }
  }
  return FALLBACK[lang] || FALLBACK.en;
}

function sendChat() {
  const input = $('cb-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  appendUserMessage(text);

  // Hide chips after first interaction
  const chips = $('cb-chips');
  if (chips) chips.style.display = 'none';

  const typing = showTyping();
  setTimeout(() => {
    typing.remove();
    appendBotMessage(findAnswer(text));
  }, 650);
}

function chipAsk(btn) {
  const text = btn.textContent.replace(/^[\u{1F300}-\u{1F9FF}\s]+/u, '').trim();
  const input = $('cb-input');
  if (input) { input.value = text; }
  sendChat();
}

