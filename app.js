/**
 * Community Issue Reporting App (แจ้งปัญหาเพื่อชุมชน / ชุมชนสุขสันต์)
 */

// Initial Sample Data for Issues
const initialIssues = [
  {
    id: 'ISSUE-2026-001',
    category: 'ถนน / ทางเท้า',
    categoryTag: 'tag-road',
    title: 'ฝาท่อระบายน้ำทรุดตัว ริมฟุตบาท',
    desc: 'ฝาท่อเหล็กมีลักษณะทรุดตัวเป็นแอ่ง หวั่นเกรงว่าผู้สัญจรยามค่ำคืนอาจสะดุดล้มหรือเกิดอุบัติเหตุ',
    district: 'เขตวัฒนา',
    location: 'ซอยสุขุมวิท 55 หน้าปากซอยทองหล่อ 10',
    date: '25 ก.ค. 2026, 10:30 น.',
    status: 'resolved',
    statusText: 'ดำเนินการเสร็จสิ้น',
    phone: '081-234-5678'
  },
  {
    id: 'ISSUE-2026-002',
    category: 'ไฟถนน / ไฟฟ้า',
    categoryTag: 'tag-light',
    title: 'ไฟส่องทางดับ 2 ดอก บริเวณสะพานลอย',
    desc: 'หลอดไฟส่องสว่างดับมา 3 วันแล้ว บรรยากาศมืดและดูไม่ปลอดภัยสำหรับผู้ใช้งานสะพานลอย',
    district: 'เขตวัฒนา',
    location: 'หน้าโรงเรียนปทุมคงคา',
    date: '25 ก.ค. 2026, 12:15 น.',
    status: 'in-progress',
    statusText: 'เจ้าหน้าที่กำลังตรวจสอบ',
    phone: '089-987-6543'
  },
  {
    id: 'ISSUE-2026-003',
    category: 'ขยะ / ความสะอาด',
    categoryTag: 'tag-trash',
    title: 'กองขยะล้นถังรอการจัดเก็บ',
    desc: 'ถังขยะกทม. เต็มและมีขยะวางล้นออกมาข้างถัง ส่งกลิ่นเหม็นรบกวนบ้านเรือนใกล้เคียง',
    district: 'เขตวัฒนา',
    location: 'ซอยปรีดี พนมยงค์ 14',
    date: '25 ก.ค. 2026, 14:00 น.',
    status: 'reported',
    statusText: 'รับเรื่องแล้ว',
    phone: '086-111-2233'
  }
];

// App State
let appIssues = [];
let isRecording = false;
let recognition = null;
let currentFontSizeLevel = 0; // -1: small, 0: normal, 1: large

document.addEventListener('DOMContentLoaded', () => {
  initStorage();
  initAccessibility();
  initTabs();
  initCategories();
  initVoiceRecognition();
  initFormModal();
  initTrackingView();
  initStatsView();
  initLiveChatModal();
});

// Storage initialization
function initStorage() {
  const stored = localStorage.getItem('community_issues');
  if (stored) {
    try {
      appIssues = JSON.parse(stored);
    } catch (e) {
      appIssues = initialIssues;
    }
  } else {
    appIssues = initialIssues;
    localStorage.setItem('community_issues', JSON.stringify(appIssues));
  }
}

// Save issues to localStorage
function saveIssues() {
  localStorage.setItem('community_issues', JSON.stringify(appIssues));
  renderTrackingIssues();
  renderStats();
}

// Accessibility Handlers (High Contrast & Font Scaling)
function initAccessibility() {
  const contrastToggle = document.getElementById('contrastToggle');
  const fontSmall = document.getElementById('fontSmall');
  const fontNormal = document.getElementById('fontNormal');
  const fontLarge = document.getElementById('fontLarge');

  // Toggle High Contrast
  if (contrastToggle) {
    contrastToggle.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast');
      const isHc = document.body.classList.contains('high-contrast');
      contrastToggle.classList.toggle('active', isHc);
    });
  }

  // Font Size Adjustments
  const setFontSize = (level) => {
    currentFontSizeLevel = level;
    let size = '16px';
    if (level === -1) size = '14px';
    if (level === 1) size = '19px';

    document.documentElement.style.setProperty('--base-font-size', size);
    
    fontSmall?.classList.toggle('active', level === -1);
    fontNormal?.classList.toggle('active', level === 0);
    fontLarge?.classList.toggle('active', level === 1);
  };

  fontSmall?.addEventListener('click', () => setFontSize(-1));
  fontNormal?.addEventListener('click', () => setFontSize(0));
  fontLarge?.addEventListener('click', () => setFontSize(1));
}

// Navigation Tabs Handler
function initTabs() {
  const tabBtns = document.querySelectorAll('.nav-tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(targetTab)?.classList.add('active');

      if (targetTab === 'tab-tracking') {
        renderTrackingIssues();
      } else if (targetTab === 'tab-stats') {
        renderStats();
      }
    });
  });
}

// Voice Recognition & Speech-to-Text
function initVoiceRecognition() {
  const voiceMicBtn = document.getElementById('heroVoiceBtn');
  const quickRecordBtn = document.getElementById('quickRecordBtn');
  const voiceStatusText = document.getElementById('heroVoiceStatus');

  // Initialize Web Speech API if supported
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = 'th-TH';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      isRecording = true;
      updateRecordingUI(true);
      if (voiceStatusText) voiceStatusText.textContent = 'กำลังฟังเสียงของคุณ... พูดได้เลยค่ะ/ครับ';
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      openReportModalWithText(transcript);
    };

    recognition.onerror = (event) => {
      console.warn('Speech recognition error:', event.error);
      fallbackSimulatedSpeech();
    };

    recognition.onend = () => {
      isRecording = false;
      updateRecordingUI(false);
      if (voiceStatusText) voiceStatusText.textContent = 'กดเพื่อพูดแจ้งปัญหา (หรือเลือกวิธีอื่นด้านล่าง)';
    };
  }

  const toggleRecording = () => {
    if (isRecording) {
      if (recognition) recognition.stop();
      isRecording = false;
      updateRecordingUI(false);
    } else {
      if (recognition) {
        try {
          recognition.start();
        } catch (e) {
          fallbackSimulatedSpeech();
        }
      } else {
        fallbackSimulatedSpeech();
      }
    }
  };

  voiceMicBtn?.addEventListener('click', toggleRecording);
  quickRecordBtn?.addEventListener('click', toggleRecording);
}

function updateRecordingUI(recording) {
  const btns = [document.getElementById('heroVoiceBtn'), document.getElementById('quickRecordBtn')];
  btns.forEach(btn => {
    if (btn) {
      btn.classList.toggle('recording', recording);
    }
  });
}

// Fallback simulated speech for browsers without microphone access or speech API
function fallbackSimulatedSpeech() {
  updateRecordingUI(true);
  const statusText = document.getElementById('heroVoiceStatus');
  if (statusText) statusText.textContent = 'กำลังจำลองการบันทึกเสียง...';

  setTimeout(() => {
    updateRecordingUI(false);
    if (statusText) statusText.textContent = 'กดเพื่อพูดแจ้งปัญหา (หรือเลือกวิธีอื่นด้านล่าง)';
    
    const sampleTranscripts = [
      'ไฟส่องทางบริเวณหน้าปากซอยดับ มืดมากมองไม่เห็นทาง',
      'ขยะล้นถังส่งกลิ่นเหม็นรบกวนหน้าบ้าน',
      'กิ่งไม้ใหญ่พาดสายไฟฟ้าเสี่ยงกิ่งไม้หักทับ',
      'ท่อระบายน้ำอุดตัน ทำให้น้ำท่วมขังเวลาฝนตก'
    ];
    const randomSpeech = sampleTranscripts[Math.floor(Math.random() * sampleTranscripts.length)];
    openReportModalWithText(randomSpeech);
  }, 2000);
}

// Category Selection Handler
function initCategories() {
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const catName = card.getAttribute('data-category');
      const tagClass = card.getAttribute('data-tag');
      openReportModal({ category: catName, tagClass: tagClass });
    });
  });

  const mainReportBtn = document.getElementById('mainReportActionBtn');
  mainReportBtn?.addEventListener('click', () => {
    openReportModal({ category: 'ถนน / ทางเท้า', tagClass: 'tag-road' });
  });
}

// Modal Form Operations
function initFormModal() {
  const modal = document.getElementById('reportModal');
  const closeBtn = document.getElementById('closeModalBtn');
  const form = document.getElementById('issueForm');
  const imgInput = document.getElementById('issueImage');
  const previewZone = document.getElementById('imagePreviewContainer');

  closeBtn?.addEventListener('click', () => {
    modal?.classList.remove('open');
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
    }
  });

  // Image Upload Preview
  imgInput?.addEventListener('change', (e) => {
    previewZone.innerHTML = '';
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = document.createElement('img');
          img.src = event.target.result;
          img.className = 'preview-img';
          previewZone.appendChild(img);
        };
        reader.readAsDataURL(file);
      });
    }
  });

  // Handle Submit Form
  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const categorySelect = document.getElementById('formCategory');
    const titleInput = document.getElementById('formTitle');
    const descInput = document.getElementById('formDesc');
    const locationInput = document.getElementById('formLocation');
    const phoneInput = document.getElementById('formPhone');
    const districtSelect = document.getElementById('formDistrict');

    const selectedCat = categorySelect.value;
    const tagMap = {
      'ถนน / ทางเท้า': 'tag-road',
      'ไฟถนน / ไฟฟ้า': 'tag-light',
      'ขยะ / ความสะอาด': 'tag-trash',
      'น้ำท่วม / ท่อระบาย': 'tag-water',
      'ต้นไม้ / สวนสาธารณะ': 'tag-tree',
      'เสียงรบกวน': 'tag-sound',
      'ความปลอดภัย': 'tag-safety',
      'อื่น ๆ': 'tag-other'
    };

    const newIssue = {
      id: `ISSUE-2026-${String(appIssues.length + 1).padStart(3, '0')}`,
      category: selectedCat,
      categoryTag: tagMap[selectedCat] || 'tag-other',
      title: titleInput.value.trim(),
      desc: descInput.value.trim(),
      district: districtSelect ? districtSelect.value : 'เขตวัฒนา',
      location: locationInput.value.trim() || 'เขตวัฒนา',
      date: new Date().toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' }),
      status: 'reported',
      statusText: 'รับเรื่องแล้ว',
      phone: phoneInput.value.trim() || 'ไม่ระบุ'
    };

    appIssues.unshift(newIssue);
    saveIssues();

    form.reset();
    previewZone.innerHTML = '';
    modal?.classList.remove('open');

    // Switch to tracking tab automatically
    const trackingBtn = document.querySelector('[data-tab="tab-tracking"]');
    trackingBtn?.click();

    alert('🎉 บันทึกการรายงานปัญหาเรียบร้อยแล้ว! สามารถติดตามสถานะได้ในหน้านี้');
  });
}

function openReportModal(data = {}) {
  const modal = document.getElementById('reportModal');
  const categorySelect = document.getElementById('formCategory');
  const descInput = document.getElementById('formDesc');
  const titleInput = document.getElementById('formTitle');
  const locationInput = document.getElementById('formLocation');
  const phoneInput = document.getElementById('formPhone');
  const previewZone = document.getElementById('imagePreviewContainer');

  if (categorySelect && data.category) {
    categorySelect.value = data.category;
  }
  
  if (descInput) {
    descInput.value = data.desc || '';
  }

  if (titleInput && !data.title) titleInput.value = '';
  if (locationInput && !data.location) locationInput.value = '';
  if (phoneInput && !data.phone) phoneInput.value = '';
  if (previewZone && !data.keepPreview) previewZone.innerHTML = '';

  modal?.classList.add('open');
}

function openReportModalWithText(text) {
  openReportModal({
    category: 'อื่น ๆ',
    desc: `[รายงานด้วยเสียง] ${text}`
  });
}

// Render Issue Tracking List
function initTrackingView() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderTrackingIssues(filter);
    });
  });
}

function renderTrackingIssues(filter = 'all') {
  const container = document.getElementById('issueListContainer');
  if (!container) return;

  let filtered = appIssues;
  if (filter !== 'all') {
    filtered = appIssues.filter(item => item.status === filter);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px; color: var(--text-muted);">
        <p>ไม่พบรายการปัญหาตามเงื่อนไขที่เลือก</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <div class="issue-card">
      <div class="issue-header-row">
        <span class="category-tag ${item.categoryTag}">${item.category}</span>
        <span class="status-badge status-${item.status}">${item.statusText}</span>
      </div>
      <h3 class="issue-title">${item.title}</h3>
      <p class="issue-desc">${item.desc}</p>
      <div class="issue-footer-row">
        <span>📍 ${item.location} (${item.district})</span>
        <span>🕒 ${item.date}</span>
      </div>
    </div>
  `).join('');
}

// Render Statistics Tab
function initStatsView() {
  renderStats();
}

function renderStats() {
  const totalEl = document.getElementById('statTotal');
  const reportedEl = document.getElementById('statReported');
  const inProgressEl = document.getElementById('statInProgress');
  const resolvedEl = document.getElementById('statResolved');

  const total = appIssues.length;
  const reported = appIssues.filter(i => i.status === 'reported').length;
  const inProgress = appIssues.filter(i => i.status === 'in-progress').length;
  const resolved = appIssues.filter(i => i.status === 'resolved').length;

  if (totalEl) totalEl.textContent = total;
  if (reportedEl) reportedEl.textContent = reported;
  if (inProgressEl) inProgressEl.textContent = inProgress;
  if (resolvedEl) resolvedEl.textContent = resolved;

  renderChart();
}

function renderChart() {
  const chartBox = document.getElementById('statsChartContainer');
  if (!chartBox) return;

  const categories = ['ถนน/ทางเท้า', 'ไฟถนน/ไฟฟ้า', 'ขยะ/ความสะอาด', 'น้ำท่วม', 'ต้นไม้/สวน', 'ความปลอดภัย'];
  const counts = categories.map(cat => {
    return appIssues.filter(i => i.category.includes(cat.split('/')[0])).length + Math.floor(Math.random() * 5) + 3;
  });

  const maxVal = Math.max(...counts, 10);

  chartBox.innerHTML = `
    <div style="display: flex; align-items: flex-end; justify-content: space-around; height: 220px; padding-top: 20px; gap: 12px;">
      ${categories.map((cat, i) => {
        const heightPct = Math.round((counts[i] / maxVal) * 100);
        return `
          <div style="display: flex; flex-direction: column; align-items: center; flex: 1;">
            <span style="font-weight: 700; font-size: 0.85rem; color: var(--primary); margin-bottom: 6px;">${counts[i]}</span>
            <div style="width: 100%; max-width: 44px; height: ${heightPct}%; background: linear-gradient(180deg, var(--primary), var(--primary-dark)); border-radius: var(--radius-sm) var(--radius-sm) 0 0; transition: height 0.5s ease;"></div>
            <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 8px; text-align: center;">${cat}</span>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// Live Chat Modal Handler
function initLiveChatModal() {
  const chatBtn = document.getElementById('btnLiveChat');
  chatBtn?.addEventListener('click', () => {
    alert('💬 ระบบแชทสดกับเจ้าหน้าที่: ยินดีต้อนรับ! เจ้าหน้าที่เขตกำลังเตรียมพร้อมให้บริการคุณ สามารถกดแจ้งปัญหาหรือโทร 02-123-4567 ได้ตลอด 24 ชม.');
  });
}
