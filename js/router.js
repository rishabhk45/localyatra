/**
 * LocalYatra — Hash-Based Client Router
 * Manages client routing without page reloads, updates screen-reader announcements,
 * sets active navigation states, and renders into the main application container.
 */

import { renderHome, bindHomeEvents } from './views/home.js';
import { renderPlan, bindPlanEvents } from './views/plan.js';
import { renderStyleguide, bindStyleguideEvents } from './views/styleguide.js';
import { renderComingSoon } from './views/coming-soon.js';

const routes = {
  '#/': {
    title: 'LocalYatra — Tourism for Everyone, Powered by Locals',
    render: () => renderHome(),
    afterRender: () => bindHomeEvents()
  },
  '#/styleguide': {
    title: 'Design System & Component Styleguide — LocalYatra',
    render: () => renderStyleguide(),
    afterRender: () => bindStyleguideEvents()
  },
  '#/plan': {
    title: 'Plan Your Yatra — LocalYatra',
    render: () => renderPlan(),
    afterRender: () => bindPlanEvents()
  },
  '#/itinerary': {
    title: 'Your Itinerary — LocalYatra',
    render: () => renderComingSoon(
      'Itinerary Engine',
      'Phase 3: Itinerary Engine',
      'Smart rule-based day-wise planner matching budget and pacing while steering travellers to authentic, de-crowded alternatives.'
    )
  },
  '#/stays': {
    title: 'Local Stays & Guides — LocalYatra',
    render: () => renderComingSoon(
      'Local Stays & Guides',
      'Phase 4: Stays & Guides',
      'Directly discover vacant homestay rooms, family-run cottages, and verified regional guides across India.'
    )
  },
  '#/saral': {
    title: 'Saral Mode (सरल यात्रा) — LocalYatra',
    render: () => renderComingSoon(
      'Saral Mode (सरल यात्रा)',
      'Phase 5: Saral Mode',
      'Dedicated senior and pilgrim interface with oversized buttons, audio guidance, large fonts, and simple booking.'
    )
  },
  '#/booking': {
    title: 'Booking & Vouchers — LocalYatra',
    render: () => renderComingSoon(
      'Simulated Booking & Family Flow',
      'Phase 6: Booking + Family-Assisted Flow',
      'Simulate homestay and guide reservations with zero real money, generate offline vouchers, and book on behalf of parents.'
    )
  },
  '#/owner': {
    title: 'Host & Hotel Owner Dashboard — LocalYatra',
    render: () => renderComingSoon(
      'Owner Dashboard',
      'Phase 7: Owner Dashboard',
      'Local homestay and small hotel owners view demand insights, fill vacant rooms, and publish off-season discounts.'
    )
  }
};

let mainContainer = null;
let announcer = null;

function announceRoute(title) {
  if (!announcer) {
    announcer = document.getElementById('route-announcer');
  }
  if (announcer) {
    announcer.textContent = `Navigated to ${title}`;
  }
}

function updateActiveNav(hash) {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === hash || (hash === '' && href === '#/') || (hash === '#' && href === '#/')) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  // Close mobile navigation drawer if open
  const siteNav = document.getElementById('site-nav');
  if (siteNav) {
    siteNav.classList.remove('is-open');
  }
}

export function handleRoute() {
  if (!mainContainer) {
    mainContainer = document.getElementById('app-view');
  }
  if (!mainContainer) return;

  const hash = window.location.hash || '#/';
  const route = routes[hash] || {
    title: 'Page Not Found — LocalYatra',
    render: () => `
      <div class="container-sm" style="text-align: center; padding: var(--space-12) var(--space-4);">
        <h1>404 — Destination Not Found</h1>
        <p style="color: var(--color-text-muted); margin-bottom: var(--space-6);">
          The path <code>${hash}</code> could not be found. Let's get you back on track.
        </p>
        <a href="#/" class="btn btn-primary">Return to Home</a>
      </div>
    `
  };

  document.title = route.title;
  mainContainer.innerHTML = route.render();

  if (typeof route.afterRender === 'function') {
    route.afterRender();
  }

  updateActiveNav(hash);
  announceRoute(route.title);
  window.scrollTo(0, 0);
}

export function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

export function navigate(hash) {
  window.location.hash = hash;
}
