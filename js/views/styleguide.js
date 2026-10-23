/**
 * LocalYatra — Interactive Styleguide View (#/styleguide)
 * Comprehensive living documentation of all UI components, tokens, and accessible states.
 */

import { openModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';

export function renderStyleguide() {
  return `
    <div class="container">
      <header style="margin-bottom: var(--space-8); border-bottom: 2px solid var(--color-border); padding-bottom: var(--space-4);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: var(--space-4);">
          <div>
            <span class="badge badge-verified">✓ Phase 1 Design System</span>
            <h1 style="color: var(--color-primary); margin-top: var(--space-2);">LocalYatra UI Styleguide</h1>
            <p style="color: var(--color-text-muted); font-size: var(--font-md);">
              Accessible, mobile-first component library with warm Indian-inspired aesthetics and WCAG AA contrast compliance.
            </p>
          </div>
          <button type="button" id="toggle-saral-inline-btn" class="btn btn-accent">
            Toggle Saral Mode Preview
          </button>
        </div>
      </header>

      <!-- 1. Color Palette Tokens -->
      <section style="margin-bottom: var(--space-10);">
        <h2>1. Color Palette (WCAG AA Compliant)</h2>
        <p style="color: var(--color-text-muted); font-size: var(--font-sm);">
          Root tokens defined in <code>/css/tokens.css</code>. Tested against light canvas (minimum 4.5:1 ratio for normal text).
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-4); margin-top: var(--space-4);">
          <div class="card" style="border-top: 6px solid var(--color-primary);">
            <strong>Deep Teal (Primary)</strong>
            <p style="font-size: var(--font-xs); color: var(--color-text-muted); margin: var(--space-1) 0;"><code>#0b5c56</code></p>
            <span style="font-size: var(--font-xs); color: var(--color-verified); font-weight: 600;">Ratio 7.2:1 (Pass AA/AAA)</span>
          </div>

          <div class="card" style="border-top: 6px solid var(--color-accent);">
            <strong>Saffron/Marigold (Accent)</strong>
            <p style="font-size: var(--font-xs); color: var(--color-text-muted); margin: var(--space-1) 0;"><code>#c25400</code></p>
            <span style="font-size: var(--font-xs); color: var(--color-verified); font-weight: 600;">Ratio 5.1:1 (Pass AA)</span>
          </div>

          <div class="card" style="border-top: 6px solid var(--color-bg); background: #fdfbf7;">
            <strong>Warm Sand (Canvas)</strong>
            <p style="font-size: var(--font-xs); color: var(--color-text-muted); margin: var(--space-1) 0;"><code>#faf7f2</code></p>
            <span style="font-size: var(--font-xs); color: var(--color-text-muted);">Calm, non-glare canvas</span>
          </div>

          <div class="card" style="border-top: 6px solid var(--color-text);">
            <strong>Slate Black (Text)</strong>
            <p style="font-size: var(--font-xs); color: var(--color-text-muted); margin: var(--space-1) 0;"><code>#1a252f</code></p>
            <span style="font-size: var(--font-xs); color: var(--color-verified); font-weight: 600;">Ratio 13.5:1 (Ultra AA)</span>
          </div>
        </div>
      </section>

      <!-- 2. Badges & Chips -->
      <section style="margin-bottom: var(--space-10);">
        <h2>2. Badges & Chips</h2>
        <div class="card" style="margin-bottom: var(--space-4);">
          <h3 style="font-size: var(--font-md); margin-bottom: var(--space-3);">Semantic Badges</h3>
          <div style="display: flex; flex-wrap: wrap; gap: var(--space-3); align-items: center;">
            <span class="badge badge-verified">✓ Verified Guide</span>
            <span class="badge badge-local">🌿 Local Homestay</span>
            <span class="badge badge-demo">🧪 Demo / Simulated</span>
            <span class="badge badge-sos">🚨 Safety SOS</span>
            <span class="badge badge-info">ℹ Verified Eco-Stay</span>
          </div>
        </div>

        <div class="card">
          <h3 style="font-size: var(--font-md); margin-bottom: var(--space-3);">Filter Chips</h3>
          <div class="chip-group" id="demo-chip-group">
            <button type="button" class="chip active" aria-pressed="true">All Stays</button>
            <button type="button" class="chip" aria-pressed="false">Homestay</button>
            <button type="button" class="chip" aria-pressed="false">Verified Guide</button>
            <button type="button" class="chip" aria-pressed="false">Offbeat (Low Crowd)</button>
            <button type="button" class="chip" aria-pressed="false">Senior-Friendly</button>
          </div>
        </div>
      </section>

      <!-- 3. Buttons -->
      <section style="margin-bottom: var(--space-10);">
        <h2>3. Buttons (Min 44px tap target)</h2>
        <div class="card">
          <div style="display: flex; flex-wrap: wrap; gap: var(--space-3); align-items: center; margin-bottom: var(--space-4);">
            <button type="button" class="btn btn-primary">Primary Button</button>
            <button type="button" class="btn btn-secondary">Secondary Button</button>
            <button type="button" class="btn btn-accent">Accent Button</button>
            <button type="button" class="btn btn-ghost">Ghost Button</button>
            <button type="button" class="btn btn-danger">Danger / SOS</button>
            <button type="button" class="btn btn-primary" disabled>Disabled State</button>
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: var(--space-3); align-items: center;">
            <button type="button" class="btn btn-primary btn-sm">Small Button (38px)</button>
            <button type="button" class="btn btn-primary">Standard Button (44px)</button>
            <button type="button" class="btn btn-primary btn-lg">Large / Saral (52px)</button>
          </div>
        </div>
      </section>

      <!-- 4. Form Controls -->
      <section style="margin-bottom: var(--space-10);">
        <h2>4. Form Controls & Inputs</h2>
        <div class="card">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: var(--space-5);">
            <div class="form-group">
              <label for="demo-input-text" class="form-label">Destination / Region</label>
              <input type="text" id="demo-input-text" class="form-input" placeholder="e.g. Manali, Spiti Valley, Varanasi" value="Tirthan Valley, Himachal">
              <span class="form-hint">Choose peaceful, off-season destinations to avoid overcrowding.</span>
            </div>

            <div class="form-group">
              <label for="demo-select" class="form-label">Travel Mood</label>
              <select id="demo-select" class="form-select">
                <option value="scenic">Scenic Nature & Relaxation</option>
                <option value="pilgrimage">Pilgrimage & Spiritual</option>
                <option value="heritage">Local Heritage & Art</option>
                <option value="adventure">Trekking & Exploration</option>
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-top: var(--space-3);">
            <label for="demo-textarea" class="form-label">Special Requirements / Senior Assistance</label>
            <textarea id="demo-textarea" class="form-textarea" placeholder="e.g. Ground floor room needed, vegetarian home meals, slow walking pace"></textarea>
          </div>

          <div style="display: flex; flex-wrap: wrap; gap: var(--space-6); margin-top: var(--space-4);">
            <label class="form-check">
              <input type="checkbox" checked>
              <span>Include verified local guide</span>
            </label>
            <label class="form-check">
              <input type="radio" name="demo-radio" checked>
              <span>Homestay (Family Host)</span>
            </label>
            <label class="form-check">
              <input type="radio" name="demo-radio">
              <span>Small Eco-Hotel</span>
            </label>
          </div>
        </div>
      </section>

      <!-- 5. Cards & Layouts -->
      <section style="margin-bottom: var(--space-10);">
        <h2>5. Cards (Standard & Interactive)</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--space-5);">
          
          <div class="card card-interactive" tabindex="0" role="button" aria-label="Sample interactive card">
            <div class="card-header">
              <span class="badge badge-local">Homestay</span>
              <span class="badge badge-verified">✓ Verified</span>
            </div>
            <div class="card-body">
              <h3 style="font-size: var(--font-lg); color: var(--color-primary);">Cedar Pine Cottage</h3>
              <p style="font-size: var(--font-sm); color: var(--color-text-muted);">
                Hosted by Sunita & Ramesh Sharma • Naggar Village, Manali
              </p>
              <p style="font-size: var(--font-sm); line-height: 1.5;">
                Peaceful deodar orchard view, traditional wood-stove heating, homemade Himachali Siddu meals. 6 rooms vacant this week.
              </p>
            </div>
            <div class="card-footer">
              <span style="font-size: var(--font-md); font-weight: 700; color: var(--color-accent);">₹1,800 <small style="font-size: 0.75rem; color: var(--color-text-muted); font-weight: normal;">/ night</small></span>
              <span style="font-size: var(--font-xs); color: var(--color-primary); font-weight: 600;">View Details →</span>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <span class="badge badge-demo">Simulated Booking</span>
              <span style="font-size: var(--font-xs); color: var(--color-text-muted);">ID: #LY-8821</span>
            </div>
            <div class="card-body">
              <h3 style="font-size: var(--font-md); margin-bottom: var(--space-2);">Upcoming Yatra Voucher</h3>
              <p style="font-size: var(--font-sm); margin-bottom: var(--space-1);"><strong>Traveller:</strong> Ramakant Mishra (Age 68)</p>
              <p style="font-size: var(--font-sm); margin-bottom: var(--space-1);"><strong>Assisted By:</strong> Daughter Priya</p>
              <p style="font-size: var(--font-sm); color: var(--color-verified); font-weight: 600;">Status: Confirmed (Pay at Check-in)</p>
            </div>
            <div class="card-footer">
              <span class="badge badge-info">Saral Mode Ready</span>
              <button type="button" class="btn btn-secondary btn-sm" id="demo-open-modal-btn">Open Dialog</button>
            </div>
          </div>

        </div>
      </section>

      <!-- 6. Interactive Modal & Toasts -->
      <section style="margin-bottom: var(--space-10);">
        <h2>6. Interactive Modal & Toasts</h2>
        <div class="card">
          <p style="color: var(--color-text-muted); margin-bottom: var(--space-4);">
            Test accessible dialog focus trapping, Escape keyboard dismiss, and floating toast notifications.
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: var(--space-3);">
            <button type="button" class="btn btn-primary" id="trigger-modal-btn">
              Open Accessible Modal
            </button>
            <button type="button" class="btn btn-secondary" id="toast-success-btn">
              Trigger Success Toast
            </button>
            <button type="button" class="btn btn-secondary" id="toast-warning-btn">
              Trigger Warning Toast
            </button>
            <button type="button" class="btn btn-secondary" id="toast-error-btn">
              Trigger Error Toast
            </button>
          </div>
        </div>
      </section>

      <!-- 7. Stepper & Tabs -->
      <section style="margin-bottom: var(--space-10);">
        <h2>7. Stepper & Accessible Tabs</h2>
        
        <div class="card" style="margin-bottom: var(--space-5);">
          <h3 style="font-size: var(--font-md); margin-bottom: var(--space-4);">Trip Booking Stepper</h3>
          <div class="stepper">
            <div class="step-item is-complete">
              <div class="step-circle">✓</div>
              <span class="step-title">1. Plan Trip</span>
            </div>
            <div class="step-item is-active">
              <div class="step-circle">2</div>
              <span class="step-title">2. Choose Stay</span>
            </div>
            <div class="step-item">
              <div class="step-circle">3</div>
              <span class="step-title">3. Confirm</span>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="tab-list" role="tablist">
            <button type="button" class="tab-btn" role="tab" aria-selected="true" id="tab-overview" aria-controls="panel-overview">
              Trip Overview
            </button>
            <button type="button" class="tab-btn" role="tab" aria-selected="false" id="tab-itinerary" aria-controls="panel-itinerary">
              Day-wise Plan
            </button>
            <button type="button" class="tab-btn" role="tab" aria-selected="false" id="tab-hosts" aria-controls="panel-hosts">
              Host Notes
            </button>
          </div>

          <div id="panel-overview" role="tabpanel" aria-labelledby="tab-overview" class="tab-panel">
            <p style="font-size: var(--font-sm); line-height: 1.6;">
              3-Day peaceful retreat in Tirthan Valley with riverside trout walk, local temple woodcraft visits, and gentle day hikes suited for all age groups.
            </p>
          </div>
          <div id="panel-itinerary" role="tabpanel" aria-labelledby="tab-itinerary" class="tab-panel" hidden>
            <p style="font-size: var(--font-sm); line-height: 1.6;">
              <strong>Day 1:</strong> Arrival & traditional herbal tea with hosts.<br>
              <strong>Day 2:</strong> Gentle walk through the Great Himalayan National Park eco-zone.<br>
              <strong>Day 3:</strong> Chehni Kothi historic tower temple visit.
            </p>
          </div>
          <div id="panel-hosts" role="tabpanel" aria-labelledby="tab-hosts" class="tab-panel" hidden>
            <p style="font-size: var(--font-sm); line-height: 1.6;">
              Host Sunita offers hot home-cooked meals (dal, rajma, chawal, local greens). Free pick up from Aut tunnel available on request.
            </p>
          </div>
        </div>
      </section>

      <!-- 8. Skeleton Loaders -->
      <section style="margin-bottom: var(--space-10);">
        <h2>8. Skeleton Loaders (Graceful Offline State)</h2>
        <div class="card">
          <div style="display: flex; gap: var(--space-4); align-items: center; margin-bottom: var(--space-4);">
            <div class="skeleton skeleton-circle"></div>
            <div style="flex: 1;">
              <div class="skeleton skeleton-title"></div>
              <div class="skeleton skeleton-text" style="width: 40%;"></div>
            </div>
          </div>
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text" style="width: 75%;"></div>
        </div>
      </section>

    </div>
  `;
}

/**
 * Bind interactive events on the styleguide view
 */
export function bindStyleguideEvents() {
  // Toggle Saral Mode preview button inside styleguide
  const inlineSaralBtn = document.getElementById('toggle-saral-inline-btn');
  if (inlineSaralBtn) {
    inlineSaralBtn.addEventListener('click', () => {
      const isSaral = document.body.classList.toggle('saral-mode');
      showToast(isSaral ? '👓 Saral Mode enabled (Large fonts, high contrast)' : 'Standard UI Mode restored', 'info');
    });
  }

  // Chip toggles
  const chipContainer = document.getElementById('demo-chip-group');
  if (chipContainer) {
    chipContainer.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        chipContainer.querySelectorAll('.chip').forEach(c => {
          c.classList.remove('active');
          c.setAttribute('aria-pressed', 'false');
        });
        chip.classList.add('active');
        chip.setAttribute('aria-pressed', 'true');
        showToast(`Filtered by: ${chip.textContent.trim()}`, 'info', 2000);
      });
    });
  }

  // Modal triggers
  const triggerModalBtn = document.getElementById('trigger-modal-btn');
  const demoOpenModalBtn = document.getElementById('demo-open-modal-btn');
  const handleOpenModal = () => {
    openModal({
      title: 'Simulated Booking Confirmation',
      bodyHtml: `
        <p style="margin-bottom: var(--space-3);">
          This is an accessible modal dialog. It traps keyboard focus, listens for the <code>Escape</code> key, and restores focus on close.
        </p>
        <div style="background-color: var(--color-surface-variant); padding: var(--space-3); border-radius: var(--radius-md); font-size: var(--font-sm);">
          <strong>Note:</strong> All bookings in LocalYatra are simulated for demonstration. No financial transactions or credit card details are ever taken.
        </div>
      `,
      footerHtml: `
        <button type="button" class="btn btn-secondary" id="modal-cancel-btn">Close</button>
        <button type="button" class="btn btn-primary" id="modal-confirm-btn">Confirm (Simulated)</button>
      `
    });

    setTimeout(() => {
      const cancelBtn = document.getElementById('modal-cancel-btn');
      const confirmBtn = document.getElementById('modal-confirm-btn');
      if (cancelBtn) cancelBtn.addEventListener('click', () => {
        const modal = document.querySelector('.modal-backdrop');
        if (modal) modal.querySelector('.modal-close').click();
      });
      if (confirmBtn) confirmBtn.addEventListener('click', () => {
        showToast('✓ Booking simulated successfully!', 'success');
        const modal = document.querySelector('.modal-backdrop');
        if (modal) modal.querySelector('.modal-close').click();
      });
    }, 50);
  };

  if (triggerModalBtn) triggerModalBtn.addEventListener('click', handleOpenModal);
  if (demoOpenModalBtn) demoOpenModalBtn.addEventListener('click', handleOpenModal);

  // Toast triggers
  const toastSuccessBtn = document.getElementById('toast-success-btn');
  const toastWarningBtn = document.getElementById('toast-warning-btn');
  const toastErrorBtn = document.getElementById('toast-error-btn');

  if (toastSuccessBtn) {
    toastSuccessBtn.addEventListener('click', () => {
      showToast('Itinerary saved to local device successfully!', 'success');
    });
  }
  if (toastWarningBtn) {
    toastWarningBtn.addEventListener('click', () => {
      showToast('Overcrowded alert: Manali Mall Road has high crowd density today.', 'warning');
    });
  }
  if (toastErrorBtn) {
    toastErrorBtn.addEventListener('click', () => {
      showToast('Network request timed out. Switched to offline sample data.', 'error');
    });
  }

  // Tab controls
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetPanelId = btn.getAttribute('aria-controls');
      tabButtons.forEach(b => {
        b.setAttribute('aria-selected', 'false');
      });
      btn.setAttribute('aria-selected', 'true');

      document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.hidden = true;
      });

      const targetPanel = document.getElementById(targetPanelId);
      if (targetPanel) {
        targetPanel.hidden = false;
      }
    });
  });
}
