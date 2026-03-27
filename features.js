// ============================================================
// GEMINI API KEY (hardcoded)
// ============================================================
const GEMINI_API_KEY = 'AIzaSyBws2Qj3PWUleFHq1evKn7TEnJ7uvDXxH0';

// ============================================================
// FEATURE: VOICE FILING (Web Speech API — 100% offline)
// ============================================================
let _recognition = null;
let _isListening = false;

function toggleVoice() {
  const btn = document.getElementById('mic-btn');
  const textarea = document.getElementById('c-desc');
  if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
    showToast('Voice input not supported. Use Chrome or Edge.', 'error');
    return;
  }
  if (_isListening) { _recognition && _recognition.stop(); return; }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  _recognition = new SR();
  _recognition.continuous = true;
  _recognition.interimResults = true;
  _recognition.lang = 'en-IN';
  let finalText = textarea.value;

  _recognition.onstart = () => {
    _isListening = true;
    btn.classList.add('listening');
    btn.textContent = '⏹️';
    btn.title = 'Listening — tap to stop';
    showToast('🎤 Listening… speak your complaint in English or Hindi', 'info');
  };
  _recognition.onresult = (e) => {
    let interim = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      if (e.results[i].isFinal) finalText += e.results[i][0].transcript + ' ';
      else interim = e.results[i][0].transcript;
    }
    textarea.value = finalText + interim;
    detectPriorityFromDesc();
  };
  _recognition.onerror = (e) => {
    showToast('Voice error: ' + e.error, 'error');
    _stopMic(btn);
  };
  _recognition.onend = () => {
    textarea.value = finalText.trim();
    detectPriorityFromDesc();
    if (textarea.value.length > 20) geminiTriagePreview(textarea.value);
    _stopMic(btn);
  };
  _recognition.start();
}

function _stopMic(btn) {
  _isListening = false;
  if (btn) {
    btn.classList.remove('listening');
    btn.textContent = '🎤';
    btn.title = 'Voice input';
  }
}

// ============================================================
// FEATURE: GEMINI AI TRIAGE
// ============================================================

// Preview mode — called when voice stops or on change
async function geminiTriagePreview(description) {
  const key = _getGeminiKey();
  if (!key || description.length < 30) return;
  const box = document.getElementById('ai-triage-result');
  if (!box) return;
  box.innerHTML = '<div class="ai-triage-box"><span class="ai-label">🤖 AI Analyzing…</span> <span style="color:var(--mid)">Classifying your complaint…</span></div>';
  try {
    const r = await _callGemini(key, description);
    if (r) _renderTriage(box, r);
  } catch (e) { box.innerHTML = ''; }
}

// Called post-submission to enrich the stored complaint record
async function geminiTriage(description, category, complaintId) {
  const key = _getGeminiKey();
  if (!key) return;
  try {
    const r = await _callGemini(key, description);
    if (!r) return;
    const data = getData();
    const c = data.find(x => x.id === complaintId);
    if (c) {
      c.aiUrgency = r.urgency;
      c.aiSentiment = r.sentiment;
      c.aiDept = r.dept;
      c.aiSummary = r.summary;
      saveData(data);
    }
    showToast('🤖 AI: ' + r.urgency + ' urgency, routes to ' + r.dept, 'info');
  } catch (e) { /* silent — AI is a bonus feature */ }
}

function _getGeminiKey() {
  return GEMINI_API_KEY;
}

async function _callGemini(apiKey, description) {
  const prompt = `You are an AI for an Indian government grievance platform. Analyze the complaint below.
Reply ONLY with valid JSON (no markdown fences, no extra text):
{"urgency":"Critical|High|Medium|Low","sentiment":"Angry|Frustrated|Neutral|Satisfied","dept":"short dept name","summary":"one sentence","tags":["tag1","tag2"]}
Complaint: "${description.substring(0, 450)}"`;

  const res = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + apiKey,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    }
  );
  if (!res.ok) throw new Error('API ' + res.status);
  const json = await res.json();
  const raw = json?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const m = raw.match(/\{[\s\S]*?\}/);
  return m ? JSON.parse(m[0]) : null;
}

function _renderTriage(container, r) {
  const uc = { Critical: '#ef4444', High: '#f59e0b', Medium: '#6366f1', Low: '#10b981' };
  const se = { Angry: '😡', Frustrated: '😤', Neutral: '😐', Satisfied: '😊' };
  const urgColor = uc[r.urgency] || '#6366f1';
  container.innerHTML =
    '<div class="ai-triage-box">' +
      '<div class="ai-label">🤖 Gemini AI Triage</div>' +
      '<div style="font-size:0.83rem;color:var(--mid);margin-bottom:8px">' + (r.summary || '') + '</div>' +
      '<div class="ai-chips">' +
        '<span class="ai-chip urgent" style="border-color:' + urgColor + ';color:' + urgColor + '">⚡ ' + r.urgency + ' Urgency</span>' +
        '<span class="ai-chip dept">🏢 ' + (r.dept || 'Unassigned') + '</span>' +
        '<span class="ai-chip cat">' + (se[r.sentiment] || '😐') + ' ' + (r.sentiment || 'Neutral') + '</span>' +
        (r.tags || []).map(t => '<span class="ai-chip">#' + t + '</span>').join('') +
      '</div>' +
    '</div>';
}

// ============================================================
// FEATURE: QR CODE GENERATION
// ============================================================

function generateQRCode(containerId, complaintId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  if (typeof QRCode === 'undefined') {
    container.innerHTML = '<span style="color:var(--mid);font-size:0.8rem">QR unavailable (offline)</span>';
    return;
  }
  const url = window.location.origin + window.location.pathname + '?track=' + complaintId;
  new QRCode(container, {
    text: url,
    width: 128,
    height: 128,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.M
  });
}

// Show QR in the admin complaint detail modal
function showQRInModal(complaintId) {
  let sec = document.getElementById('modal-qr-section');
  if (!sec) {
    sec = document.createElement('div');
    sec.id = 'modal-qr-section';
    sec.className = 'modal-section';
    sec.innerHTML =
      '<h4>📱 QR Code — Citizen Self-Tracking</h4>' +
      '<div class="qr-box">' +
        '<div id="modal-qr"></div>' +
        '<span class="qr-hint">Share with citizen to track on any device</span>' +
      '</div>';
    const mb = document.querySelector('.modal-box');
    if (mb) mb.appendChild(sec);
  }
  sec.style.display = '';
  generateQRCode('modal-qr', complaintId);
}

// Patch the existing openComplaintModal to automatically show QR
document.addEventListener('DOMContentLoaded', function () {
  // Restore saved Gemini API key
  const saved = localStorage.getItem('gemini_key');
  if (saved) {
    const el = document.getElementById('gemini-api-key');
    if (el) el.value = saved;
  }

  // Patch openComplaintModal if it exists (defined in app.js)
  const _orig = window.openComplaintModal;
  if (_orig) {
    window.openComplaintModal = function (id) {
      _orig(id);
      setTimeout(function () { showQRInModal(id); }, 150);
    };
  }

  // Handle QR scan URL: ?track=PSC-0001
  const params = new URLSearchParams(window.location.search);
  const trackId = params.get('track');
  if (trackId) {
    setTimeout(function () {
      showView('citizen');
      switchCitizenTab('track');
      const inp = document.getElementById('track-input');
      if (inp) inp.value = trackId;
      const btn = document.querySelector('button[onclick="trackComplaint()"]');
      if (btn) btn.click();
    }, 700);
  }
});
