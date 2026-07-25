<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>แจ้งปัญหาเพื่อชุมชน - ชุมชนสุขสันต์</title>
  <meta name="description" content="ระบบรับแจ้งปัญหาและร้องเรียนในชุมชน ใช้งานง่าย รองรับการอัดเสียง และติดตามสถานะได้ทันที">
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- Top Header & Accessibility Bar -->
  <header class="top-header">
    <div class="container top-header-inner">
      <a href="#" class="brand-logo" id="homeLogo">
        <div class="brand-icon">🌱</div>
        <div class="brand-text">
          <h1>แจ้งปัญหาเพื่อชุมชน</h1>
          <p>ร่วมกันสร้างชุมชนน่าอยู่</p>
        </div>
      </a>

      <div class="accessibility-controls">
        <button type="button" class="btn-acc" id="contrastToggle" title="สลับโหมดความคมชัดสูง">
          <span>◐</span> ความคมชัดสูง
        </button>
        <div style="display: flex; gap: 4px; align-items: center; padding: 0 4px;">
          <button type="button" class="btn-acc" id="fontSmall" title="ลดขนาดตัวอักษร">A-</button>
          <span style="font-size: 0.8rem; color: var(--text-muted); padding: 0 2px;">ขนาดตัวอักษร</span>
          <button type="button" class="btn-acc active" id="fontNormal" title="ขนาดปกติ">A</button>
          <button type="button" class="btn-acc" id="fontLarge" title="เพิ่มขนาดตัวอักษร">A+</button>
        </div>
        <button type="button" class="btn-acc" style="background: var(--primary-light); color: var(--primary);">
          👤 เข้าสู่ระบบ
        </button>
      </div>
    </div>
  </header>

  <!-- Main Navigation Bar -->
  <nav class="main-nav">
    <div class="container" style="display: flex; justify-content: space-between; align-items: center;">
      <ul class="nav-tabs">
        <li>
          <button type="button" class="nav-tab-btn active" data-tab="tab-report">
            ⚠️ แจ้งปัญหา
          </button>
        </li>
        <li>
          <button type="button" class="nav-tab-btn" data-tab="tab-tracking">
            🕒 ติดตามผล
          </button>
        </li>
        <li>
          <button type="button" class="nav-tab-btn" data-tab="tab-stats">
            📈 สถิติชุมชน
          </button>
        </li>
      </ul>

      <div class="district-badge">
        📍 เขตวัฒนา
      </div>
    </div>
  </nav>

  <!-- Main Body Content -->
  <main class="container">

    <!-- TAB 1: REPORT ISSUE (HERO & CATEGORIES) -->
    <section id="tab-report" class="tab-content active">

      <!-- Hero Banner (Matching Image 1) -->
      <div class="hero-banner">
        <div class="hero-grid">
          <div class="hero-text">
            <h2>พบปัญหาในชุมชน?<br>แจ้งง่าย เพื่อให้ชุมชนดีขึ้น</h2>
            <p>ร่วมกันทำให้ชุมชนของเรา น่าอยู่ ปลอดภัย และน่าอยู่ยิ่งขึ้น</p>
          </div>

          <!-- Voice Input CTA -->
          <div class="voice-cta-container">
            <button type="button" class="voice-mic-btn" id="heroVoiceBtn" title="กดเพื่อพูดแจ้งปัญหา">
              <span class="voice-mic-icon">🎙️</span>
            </button>
            <div class="voice-cta-label">กดเพื่อพูดแจ้งปัญหา</div>
            <div class="voice-cta-sub" id="heroVoiceStatus">หรือเลือกวิธีอื่นด้านล่าง</div>
          </div>

          <!-- Community Vector Illustration -->
          <div class="community-illustration">
            <svg width="240" height="180" viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="120" cy="90" r="85" fill="#E2EFE0"/>
              <!-- Happy People Vectors -->
              <circle cx="90" cy="70" r="22" fill="#5B8C6C"/>
              <path d="M60 135 C60 105 120 105 120 135 Z" fill="#4D7C5D"/>
              <circle cx="150" cy="75" r="18" fill="#F4A261"/>
              <path d="M125 135 C125 110 175 110 175 135 Z" fill="#E76F51"/>
              <circle cx="120" cy="100" r="14" fill="#E9C46A"/>
              <path d="M100 145 C100 125 140 125 140 145 Z" fill="#2A9D8F"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Hero Middle Grid: Action Button & 3-Step Process (Matching Image 1) -->
      <div class="hero-middle-grid">
        <div class="report-action-card" id="mainReportActionBtn">
          <div class="action-card-left">
            <div class="action-card-icon">📋</div>
            <div class="action-card-info">
              <h3>รายงานปัญหา</h3>
              <p>แจ้งปัญหาให้หน่วยงานที่เกี่ยวข้อง</p>
            </div>
          </div>
          <div class="action-card-arrow">❯</div>
        </div>

        <div class="steps-card">
          <h3 class="steps-title">3 ขั้นตอนง่ายๆ ในการรายงานปัญหา</h3>
          <div class="steps-list">
            <div class="step-item">
              <div class="step-number">1</div>
              <div class="step-label">รายงานปัญหา</div>
              <div class="step-sub">แจ้งรายละเอียดของปัญหา</div>
            </div>
            <div class="step-arrow">❯</div>
            <div class="step-item">
              <div class="step-number">2</div>
              <div class="step-label">เจ้าหน้าที่ตรวจสอบ</div>
              <div class="step-sub">ตรวจสอบและดำเนินการ</div>
            </div>
            <div class="step-arrow">❯</div>
            <div class="step-item">
              <div class="step-number">3</div>
              <div class="step-label">ติดตามผล</div>
              <div class="step-sub">แจ้งผลการดำเนินการให้คุณทราบ</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Category Grid Section (Matching Image 2) -->
      <div class="section-header">
        <h2>แจ้งปัญหาในชุมชน</h2>
        <p>เลือกประเภทปัญหาที่พบ เพื่อให้เจ้าหน้าที่ดำเนินการได้รวดเร็ว</p>
      </div>

      <div class="category-grid">
        <!-- 1. ถนน / ทางเท้า -->
        <div class="category-card" data-category="ถนน / ทางเท้า" data-tag="tag-road">
          <div class="category-icon">🛣️</div>
          <span class="category-tag tag-road">ถนน / ทางเท้า</span>
        </div>

        <!-- 2. ไฟถนน / ไฟฟ้า -->
        <div class="category-card" data-category="ไฟถนน / ไฟฟ้า" data-tag="tag-light">
          <div class="category-icon">💡</div>
          <span class="category-tag tag-light">ไฟถนน / ไฟฟ้า</span>
        </div>

        <!-- 3. ขยะ / ความสะอาด -->
        <div class="category-card" data-category="ขยะ / ความสะอาด" data-tag="tag-trash">
          <div class="category-icon">🗑️</div>
          <span class="category-tag tag-trash">ขยะ / ความสะอาด</span>
        </div>

        <!-- 4. น้ำท่วม / ท่อระบาย -->
        <div class="category-card" data-category="น้ำท่วม / ท่อระบาย" data-tag="tag-water">
          <div class="category-icon">💧</div>
          <span class="category-tag tag-water">น้ำท่วม / ท่อระบาย</span>
        </div>

        <!-- 5. ต้นไม้ / สวนสาธารณะ -->
        <div class="category-card" data-category="ต้นไม้ / สวนสาธารณะ" data-tag="tag-tree">
          <div class="category-icon">🌳</div>
          <span class="category-tag tag-tree">ต้นไม้ / สวนสาธารณะ</span>
        </div>

        <!-- 6. เสียงรบกวน -->
        <div class="category-card" data-category="เสียงรบกวน" data-tag="tag-sound">
          <div class="category-icon">📣</div>
          <span class="category-tag tag-sound">เสียงรบกวน</span>
        </div>

        <!-- 7. ความปลอดภัย -->
        <div class="category-card" data-category="ความปลอดภัย" data-tag="tag-safety">
          <div class="category-icon">🛡️</div>
          <span class="category-tag tag-safety">ความปลอดภัย</span>
        </div>

        <!-- 8. อื่น ๆ -->
        <div class="category-card" data-category="อื่น ๆ" data-tag="tag-other">
          <div class="category-icon">📌</div>
          <span class="category-tag tag-other">อื่น ๆ</span>
        </div>
      </div>

      <!-- Quick Audio Box (Bottom of Image 2) -->
      <div class="quick-audio-box">
        <div class="quick-audio-title">
          <span>🎙️</span> อัดเสียงรายงานด่วน
        </div>
        <div class="quick-audio-sub">
          กดปุ่มด้านล่างเพื่ออัดเสียงอธิบายปัญหา โดยไม่ต้องกรอกข้อความ
        </div>
        <button type="button" class="audio-record-btn" id="quickRecordBtn" title="กดเพื่อเริ่มอัดเสียง">
          🎙️
        </button>
        <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 8px;">กดเพื่อเริ่มอัดเสียง</div>
      </div>

    </section>

    <!-- TAB 2: TRACKING DASHBOARD -->
    <section id="tab-tracking" class="tab-content">
      <div class="tracking-header">
        <div class="section-header" style="margin-bottom: 0;">
          <h2>ติดตามผลการแจ้งปัญหา</h2>
          <p>ตรวจสอบสถานะและความคืบหน้าของปัญหาที่แจ้งเข้ามา</p>
        </div>

        <div class="filter-bar">
          <button type="button" class="filter-btn active" data-filter="all">ทั้งหมด</button>
          <button type="button" class="filter-btn" data-filter="reported">รับเรื่องแล้ว</button>
          <button type="button" class="filter-btn" data-filter="in-progress">กำลังดำเนินการ</button>
          <button type="button" class="filter-btn" data-filter="resolved">เสร็จสิ้น</button>
        </div>
      </div>

      <div id="issueListContainer" style="margin-top: 20px;">
        <!-- Dynamic list items will be injected by app.js -->
      </div>
    </section>

    <!-- TAB 3: STATISTICS DASHBOARD -->
    <section id="tab-stats" class="tab-content">
      <div class="section-header">
        <h2>สถิติการดำเนินงานชุมชน</h2>
        <p>สรุปภาพรวมจำนวนปัญหาและการแก้ไขของเจ้าหน้าที่</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-number" id="statTotal">0</div>
          <div class="stat-label">เรื่องที่รับแจ้งทั้งหมด</div>
        </div>
        <div class="stat-card">
          <div class="stat-number" id="statReported" style="color: #d97706;">0</div>
          <div class="stat-label">รอเจ้าหน้าที่ตรวจสอบ</div>
        </div>
        <div class="stat-card">
          <div class="stat-number" id="statInProgress" style="color: #2563eb;">0</div>
          <div class="stat-label">กำลังดำเนินการแก้ไข</div>
        </div>
        <div class="stat-card">
          <div class="stat-number" id="statResolved" style="color: #16a34a;">0</div>
          <div class="stat-label">ดำเนินการเสร็จสิ้นแล้ว</div>
        </div>
      </div>

      <div class="chart-card">
        <h3>สรุปเรื่องแจ้งตามประเภทปัญหา</h3>
        <div id="statsChartContainer" class="chart-container"></div>
      </div>
    </section>

  </main>

  <!-- Sticky Footer Assistance Bar (Matching Image 1 bottom) -->
  <footer class="footer-assistance-bar">
    <div class="container footer-inner">
      <div class="footer-left">
        <div class="footer-left-icon">🎧</div>
        <div class="footer-left-text">
          <h4>ต้องการความช่วยเหลือ?</h4>
          <p>ติดต่อเราได้เลย</p>
        </div>
      </div>

      <div class="footer-right">
        <a href="tel:021234567" class="footer-pill-btn">
          📞 โทร. 02-123-4567
        </a>
        <a href="https://line.me" target="_blank" class="footer-pill-btn">
          💬 @community
        </a>
        <button type="button" class="footer-pill-btn" id="btnLiveChat">
          💬 แชทกับเจ้าหน้าที่
        </button>
      </div>
    </div>
  </footer>

  <!-- Modal Popup for Issue Reporting -->
  <div class="modal-overlay" id="reportModal">
    <div class="modal-box">
      <div class="modal-header">
        <h3>📝 แบบฟอร์มรายงานปัญหา</h3>
        <button type="button" class="modal-close-btn" id="closeModalBtn">&times;</button>
      </div>

      <form id="issueForm">
        <div class="form-group">
          <label for="formCategory">ประเภทปัญหา *</label>
          <select id="formCategory" class="form-control" required>
            <option value="ถนน / ทางเท้า">🛣️ ถนน / ทางเท้า</option>
            <option value="ไฟถนน / ไฟฟ้า">💡 ไฟถนน / ไฟฟ้า</option>
            <option value="ขยะ / ความสะอาด">🗑️ ขยะ / ความสะอาด</option>
            <option value="น้ำท่วม / ท่อระบาย">💧 น้ำท่วม / ท่อระบาย</option>
            <option value="ต้นไม้ / สวนสาธารณะ">🌳 ต้นไม้ / สวนสาธารณะ</option>
            <option value="เสียงรบกวน">📣 เสียงรบกวน</option>
            <option value="ความปลอดภัย">🛡️ ความปลอดภัย</option>
            <option value="อื่น ๆ">📌 อื่น ๆ</option>
          </select>
        </div>

        <div class="form-group">
          <label for="formDistrict">เขตพื้นที่</label>
          <select id="formDistrict" class="form-control">
            <option value="เขตวัฒนา">เขตวัฒนา</option>
            <option value="เขตคลองเตย">เขตคลองเตย</option>
            <option value="เขตห้วยขวาง">เขตห้วยขวาง</option>
            <option value="เขตปทุมวัน">เขตปทุมวัน</option>
          </select>
        </div>

        <div class="form-group">
          <label for="formTitle">หัวข้อเรื่อง *</label>
          <input type="text" id="formTitle" class="form-control" placeholder="เช่น ไฟส่องทางดับ, ขยะล้นถัง" required>
        </div>

        <div class="form-group">
          <label for="formLocation">สถานที่ / พิกัดที่พบปัญหา *</label>
          <input type="text" id="formLocation" class="form-control" placeholder="เช่น ซอยสุขุมวิท 55 หน้าปากซอยทองหล่อ 10" required>
        </div>

        <div class="form-group">
          <label for="formDesc">รายละเอียดปัญหา (หรือข้อความจากการอัดเสียง) *</label>
          <textarea id="formDesc" class="form-control" placeholder="อธิบายรายละเอียดปัญหาเพิ่มเติม..." required></textarea>
        </div>

        <div class="form-group">
          <label>แนบรูปภาพประกอบ (ถ้ามี)</label>
          <div class="image-upload-zone" onclick="document.getElementById('issueImage').click()">
            <span style="font-size: 24px;">📷</span>
            <p style="font-size: 0.85rem; color: var(--text-muted);">คลิกที่นี่เพื่ออัปโหลดรูปถ่ายปัญหา</p>
            <input type="file" id="issueImage" accept="image/*" multiple style="display: none;">
          </div>
          <div id="imagePreviewContainer" class="preview-img-container"></div>
        </div>

        <div class="form-group">
          <label for="formPhone">เบอร์โทรศัพท์สำหรับติดต่อกลับ</label>
          <input type="tel" id="formPhone" class="form-control" placeholder="เช่น 081-234-5678">
        </div>

        <button type="submit" class="btn-submit">
          🚀 ส่งรายงานปัญหา
        </button>
      </form>
    </div>
  </div>

  <script src="app.js"></script>
</body>
</html>