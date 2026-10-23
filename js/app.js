/**
 * LocalYatra — Main Application Entry Point
 * Initializes state store, router, accessible Saral Mode toggle, header controls,
 * and the floating SOS trigger.
 */

import { store } from './store.js';
import { initRouter } from './router.js';
import { openModal } from './components/modal.js';
import { showToast } from './components/toast.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Saral Mode from stored state
  const saralBtn = document.getElementById('saral-toggle-btn');
  
  store.subscribe('saralMode', (isSaral) => {
    if (isSaral) {
      document.body.classList.add('saral-mode');
      document.documentElement.setAttribute('data-theme', 'saral');
      if (saralBtn) {
        saralBtn.setAttribute('aria-pressed', 'true');
        saralBtn.innerHTML = '<span aria-hidden="true">✓</span> <span class="saral-btn-label">Saral ON</span>';
      }
    } else {
      document.body.classList.remove('saral-mode');
      document.documentElement.removeAttribute('data-theme');
      if (saralBtn) {
        saralBtn.setAttribute('aria-pressed', 'false');
        saralBtn.innerHTML = '<span aria-hidden="true">👓</span> <span class="saral-btn-label">Saral Mode</span>';
      }
    }
  });

  if (saralBtn) {
    saralBtn.addEventListener('click', () => {
      const current = store.get('saralMode');
      const next = !current;
      store.set('saralMode', next);
      showToast(
        next 
          ? '👓 Saral Mode Active: Larger fonts, high contrast, and simplified navigation.' 
          : 'Standard view restored.', 
        'info'
      );
    });
  }

  // 2. Language Switcher (Demo Placeholder)
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      langButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      const lang = btn.getAttribute('data-lang');
      const label = lang === 'hi' ? 'हिंदी (Hindi)' : 'English';
      showToast(`Language switched to ${label} (Simulated placeholder for prototype)`, 'info', 3000);
    });
  });

  // 3. Mobile Navigation Drawer Toggle
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const siteNav = document.getElementById('site-nav');
  if (mobileToggle && siteNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('is-open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // 4. Persistent Floating SOS Button (Phase 1 Stub)
  const floatingSos = document.getElementById('floating-sos-btn');
  if (floatingSos) {
    floatingSos.addEventListener('click', () => {
      openModal({
        title: '🚨 Emergency Helplines & Safety SOS',
        bodyHtml: `
          <div style="margin-bottom: var(--space-4);">
            <span class="badge badge-sos">Phase 1 Preview</span>
            <p style="margin-top: var(--space-2); color: var(--color-text); font-size: var(--font-sm);">
              The automated one-tap live GPS location sharing and SMS dispatch will be fully activated in <strong>Phase 8: Safety SOS</strong>.
            </p>
          </div>
          <div class="card" style="background-color: var(--color-surface-variant); margin-bottom: var(--space-4);">
            <h4 style="color: var(--color-sos); margin-bottom: var(--space-3);">Immediate Indian Emergency Helplines:</h4>
            <ul style="list-style: none; padding-left: 0; margin-bottom: 0;">
              <li style="display: flex; justify-content: space-between; padding: var(--space-2) 0; border-bottom: 1px solid var(--color-border);">
                <span>National Emergency:</span>
                <strong><a href="tel:112" style="color: var(--color-sos); font-weight: 700;">112</a></strong>
              </li>
              <li style="display: flex; justify-content: space-between; padding: var(--space-2) 0; border-bottom: 1px solid var(--color-border);">
                <span>Tourist Helpline (24x7 Multi-lingual):</span>
                <strong><a href="tel:1363" style="color: var(--color-primary); font-weight: 700;">1363</a></strong>
              </li>
              <li style="display: flex; justify-content: space-between; padding: var(--space-2) 0; border-bottom: 1px solid var(--color-border);">
                <span>Women Safety Helpline:</span>
                <strong><a href="tel:1091" style="color: var(--color-accent); font-weight: 700;">1091</a></strong>
              </li>
              <li style="display: flex; justify-content: space-between; padding: var(--space-2) 0;">
                <span>Medical Ambulance:</span>
                <strong><a href="tel:108" style="color: var(--color-primary); font-weight: 700;">108</a></strong>
              </li>
            </ul>
          </div>
          <p style="font-size: var(--font-xs); color: var(--color-text-muted);">
            LocalYatra works offline. Keep local numbers noted when traveling in remote valleys with low mobile network coverage.
          </p>
        `,
        footerHtml: `
          <button type="button" class="btn btn-secondary" onclick="document.querySelector('.modal-backdrop .modal-close').click()">
            Understood
          </button>
        `
      });
    });
  }

  // 5. Initialize Client-Side Hash Router
  initRouter();
  console.log('LocalYatra Phase 1 loaded successfully.');
});
