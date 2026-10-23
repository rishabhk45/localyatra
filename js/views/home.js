/**
 * LocalYatra — Landing Page View (#/)
 * Full product narrative: Hero, Problem Section, Illustrative Scenario,
 * Solution Cards, Inclusion Strip, and Impact Metrics with verified statistic placeholders.
 */

import { store } from '../store.js';
import { showToast } from '../components/toast.js';

export function renderHome() {
  const isSaral = store.get('saralMode');

  return `
    <div class="container">
      
      <!-- 1. Hero Section -->
      <section class="hero-section" style="text-align: center; max-width: 860px; margin: 0 auto var(--space-12) auto; padding: var(--space-8) 0 var(--space-4) 0;">
        <div style="display: inline-flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-3); flex-wrap: wrap; justify-content: center;">
          <span class="badge badge-local">🌿 Local-First Tourism</span>
          <span class="badge badge-verified">✓ Verified Regional Guides</span>
          <span class="badge badge-demo">Simulated Hackathon Prototype</span>
        </div>
        
        <h1 class="hero-title">
          Tourism for Everyone, <br>
          <span style="color: var(--color-accent);">Powered by Locals</span>
        </h1>
        
        <p style="font-size: var(--font-lg); font-weight: 600; color: var(--color-text); margin-bottom: var(--space-3); letter-spacing: 0.02em;">
          AI-style • Local-first • Inclusive travel
        </p>
        
        <p style="font-size: var(--font-md); color: var(--color-text-muted); max-width: 700px; margin: 0 auto var(--space-6) auto; line-height: 1.6;">
          Connecting travellers directly with India's small homestays, verified regional guides, and serene de-crowded alternatives. Thoughtfully built for seniors, pilgrims, families, and mindful explorers.
        </p>
        
        <div style="display: flex; gap: var(--space-4); justify-content: center; flex-wrap: wrap;">
          <a href="#/plan" class="btn btn-primary btn-lg" style="box-shadow: var(--shadow-md);">
            Plan my trip →
          </a>
          <button type="button" id="hero-saral-btn" class="btn btn-accent btn-lg" style="display: inline-flex; align-items: center; gap: var(--space-2);">
            <span aria-hidden="true">👓</span>
            <span>${isSaral ? 'Saral Mode Active' : 'Try Saral Mode'}</span>
          </button>
        </div>
      </section>

      <!-- 2. Problem Section + Illustrative Scenario -->
      <section style="margin-bottom: var(--space-12);">
        <div style="text-align: center; max-width: 680px; margin: 0 auto var(--space-8) auto;">
          <span class="badge badge-demo" style="margin-bottom: var(--space-2);">The Disconnect</span>
          <h2 style="font-size: var(--font-2xl); color: var(--color-primary);">Why Tourism in India Needs a Fresh Lens</h2>
          <p style="color: var(--color-text-muted); font-size: var(--font-sm);">
            Mainstream tourism apps push everyone to the same crowded viewpoints while local hosts struggle to get discovered.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-5); margin-bottom: var(--space-6);">
          
          <div class="card" style="border-top: 4px solid var(--color-accent);">
            <div style="font-size: 2.2rem; margin-bottom: var(--space-2);">🏡</div>
            <h3 style="font-size: var(--font-md); color: var(--color-primary); margin-bottom: var(--space-2);">
              Local Businesses Hard to Discover
            </h3>
            <p style="color: var(--color-text-muted); font-size: var(--font-sm); line-height: 1.6;">
              Independent homestays, rural eco-cottages, and certified local guides lack hefty digital marketing budgets. During off-peak months, their rooms sit empty despite warm hospitality.
            </p>
          </div>

          <div class="card" style="border-top: 4px solid var(--color-sos);">
            <div style="font-size: 2.2rem; margin-bottom: var(--space-2);">🚶‍♂️🚶‍♀️</div>
            <h3 style="font-size: var(--font-md); color: var(--color-primary); margin-bottom: var(--space-2);">
              Overcrowded Destinations
            </h3>
            <p style="color: var(--color-text-muted); font-size: var(--font-sm); line-height: 1.6;">
              Travellers endure 3-hour traffic jams, packed parking lots, and surge pricing at mainstream hotspots because algorithms lack personalized, de-crowded regional alternatives.
            </p>
          </div>

          <div class="card" style="border-top: 4px solid var(--color-primary);">
            <div style="font-size: 2.2rem; margin-bottom: var(--space-2);">📱</div>
            <h3 style="font-size: var(--font-md); color: var(--color-primary); margin-bottom: var(--space-2);">
              Digital Barriers for Seniors & Pilgrims
            </h3>
            <p style="color: var(--color-text-muted); font-size: var(--font-sm); line-height: 1.6;">
              Complex booking funnels, tiny fonts, and confusing payment gateways intimidate elderly parents and non-tech-savvy pilgrims who simply want safe, transparent travel.
            </p>
          </div>

        </div>

        <!-- Illustrative Scenario Callout -->
        <div class="card" style="background-color: var(--color-surface-variant); border: 2px solid var(--color-border); border-left: 6px solid var(--color-accent); padding: var(--space-5);">
          <div style="display: flex; align-items: flex-start; gap: var(--space-3); flex-wrap: wrap;">
            <span class="badge badge-local" style="font-size: var(--font-xs);">Illustrative Scenario</span>
            <div style="flex: 1; min-width: 260px;">
              <p style="font-size: var(--font-md); font-weight: 600; color: var(--color-text); margin-bottom: var(--space-1);">
                A Manali homestay has 6 of 8 rooms empty while nearby visitors face crowds.
              </p>
              <p style="font-size: var(--font-sm); color: var(--color-text-muted); margin-bottom: 0; line-height: 1.5;">
                While tourists wait in gridlocked traffic along Mall Road paying surge hotel tariffs, Sharma ji’s 8-room apple orchard homestay in Naggar (just 18 km away) sits with 6 vacant rooms. LocalYatra balances this equation by guiding visitors to peaceful stays and distributing livelihood directly to locals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. Solution Section (4 Feature Cards) -->
      <section style="margin-bottom: var(--space-12);">
        <div style="text-align: center; max-width: 680px; margin: 0 auto var(--space-8) auto;">
          <span class="badge badge-verified" style="margin-bottom: var(--space-2);">The Solution</span>
          <h2 style="font-size: var(--font-2xl); color: var(--color-primary);">Designed for Harmony, Dignity & Community</h2>
          <p style="color: var(--color-text-muted); font-size: var(--font-sm);">
            Four interconnected pillars designed from the ground up for India's diverse travel needs.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: var(--space-5);">
          
          <div class="card card-interactive" onclick="location.hash='#/plan'" tabindex="0" role="link" aria-label="Go to Trip Planner">
            <div style="font-size: 2rem; margin-bottom: var(--space-2);">🧭</div>
            <h3 style="font-size: var(--font-md); color: var(--color-primary); margin-bottom: var(--space-1);">Trip Planner</h3>
            <p style="font-size: var(--font-sm); color: var(--color-text-muted); line-height: 1.5;">
              Custom day-wise itinerary generated instantly from your budget, trip duration, travel mood, and pacing preference.
            </p>
            <div style="margin-top: var(--space-3); font-size: var(--font-xs); font-weight: 700; color: var(--color-primary);">
              Plan Itinerary →
            </div>
          </div>

          <div class="card card-interactive" onclick="location.hash='#/stays'" tabindex="0" role="link" aria-label="Go to Local Stays & Guides">
            <div style="font-size: 2rem; margin-bottom: var(--space-2);">🤝</div>
            <h3 style="font-size: var(--font-md); color: var(--color-primary); margin-bottom: var(--space-1);">Local Stays & Guides</h3>
            <p style="font-size: var(--font-sm); color: var(--color-text-muted); line-height: 1.5;">
              Direct discovery of verified family-run homestays, farm retreats, and certified local guides with transparent pricing.
            </p>
            <div style="margin-top: var(--space-3); font-size: var(--font-xs); font-weight: 700; color: var(--color-primary);">
              Explore Stays →
            </div>
          </div>

          <div class="card card-interactive" onclick="location.hash='#/owner'" tabindex="0" role="link" aria-label="Go to Hotel Owner Dashboard">
            <div style="font-size: 2rem; margin-bottom: var(--space-2);">📊</div>
            <h3 style="font-size: var(--font-md); color: var(--color-primary); margin-bottom: var(--space-1);">Hotel Owner Dashboard</h3>
            <p style="font-size: var(--font-sm); color: var(--color-text-muted); line-height: 1.5;">
              Small stay owners manage vacancies, launch off-season specials, and view incoming tourist demand trends.
            </p>
            <div style="margin-top: var(--space-3); font-size: var(--font-xs); font-weight: 700; color: var(--color-primary);">
              Host Dashboard →
            </div>
          </div>

          <div class="card card-interactive" onclick="document.getElementById('floating-sos-btn').click()" tabindex="0" role="button" aria-label="Open Safety SOS Helplines">
            <div style="font-size: 2rem; margin-bottom: var(--space-2);">🚨</div>
            <h3 style="font-size: var(--font-md); color: var(--color-sos); margin-bottom: var(--space-1);">Safety SOS</h3>
            <p style="font-size: var(--font-sm); color: var(--color-text-muted); line-height: 1.5;">
              Zero-backend emergency live-location sharing and instant direct dial to national police, tourist, and women helplines.
            </p>
            <div style="margin-top: var(--space-3); font-size: var(--font-xs); font-weight: 700; color: var(--color-sos);">
              View SOS & Helplines →
            </div>
          </div>

        </div>
      </section>

      <!-- 4. Inclusion Strip -->
      <section style="background: linear-gradient(135deg, var(--color-primary-subtle), var(--color-accent-subtle)); border: 1.5px solid var(--color-border); border-radius: var(--radius-xl); padding: var(--space-6) var(--space-5); margin-bottom: var(--space-12);">
        <div style="max-width: 800px; margin: 0 auto; text-align: center;">
          <span class="badge badge-info" style="margin-bottom: var(--space-2);">Inclusive by Design</span>
          <h2 style="font-size: var(--font-xl); color: var(--color-primary); margin-bottom: var(--space-3);">
            Built for Seniors, Pilgrims & Less Tech-Savvy Travellers
          </h2>
          <p style="font-size: var(--font-sm); color: var(--color-text); line-height: 1.6; margin-bottom: var(--space-5);">
            Whether it's an elderly couple on the Char Dham Yatra, a family planning a calm Himalayan retreat, or a daughter booking on behalf of parents back home — LocalYatra guarantees large buttons, high contrast, clean Hindi/English cues, and simple offline vouchers.
          </p>
          <div style="display: flex; gap: var(--space-3); justify-content: center; flex-wrap: wrap;">
            <a href="#/saral" class="btn btn-primary">
              Learn About Saral Mode →
            </a>
            <a href="#/plan" class="btn btn-secondary">
              Family-Assisted Planning
            </a>
          </div>
        </div>
      </section>

      <!-- 5. Impact Strip & Verified Statistic Placeholders -->
      <section style="margin-bottom: var(--space-12);">
        <div style="text-align: center; max-width: 680px; margin: 0 auto var(--space-6) auto;">
          <span class="badge badge-local" style="margin-bottom: var(--space-2);">Community Impact</span>
          <h2 style="font-size: var(--font-2xl); color: var(--color-primary);">What We Track & Measure</h2>
          <p style="color: var(--color-text-muted); font-size: var(--font-sm);">
            Transparent metrics aimed at reviving sustainable livelihoods and inclusive travel access.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--space-4); margin-bottom: var(--space-6);">
          
          <div class="card" style="text-align: center;">
            <div style="font-size: 1.8rem; font-weight: 800; color: var(--color-primary); margin-bottom: var(--space-1);">100%</div>
            <strong style="font-size: var(--font-sm); color: var(--color-text);">Direct to Host</strong>
            <p style="font-size: var(--font-xs); color: var(--color-text-muted); margin-top: var(--space-1);">Zero commission middleman platform simulation</p>
          </div>

          <div class="card" style="text-align: center;">
            <div style="font-size: 1.8rem; font-weight: 800; color: var(--color-accent); margin-bottom: var(--space-1);">Off-Season</div>
            <strong style="font-size: var(--font-sm); color: var(--color-text);">Occupancy Revival</strong>
            <p style="font-size: var(--font-xs); color: var(--color-text-muted); margin-top: var(--space-1);">Demand-balancing discounts for rural cottages</p>
          </div>

          <div class="card" style="text-align: center;">
            <div style="font-size: 1.8rem; font-weight: 800; color: var(--color-verified); margin-bottom: var(--space-1);">Saral Mode</div>
            <strong style="font-size: var(--font-sm); color: var(--color-text);">Completion Rate</strong>
            <p style="font-size: var(--font-xs); color: var(--color-text-muted); margin-top: var(--space-1);">Simplified one-flow booking for elderly users</p>
          </div>

          <div class="card" style="text-align: center;">
            <div style="font-size: 1.8rem; font-weight: 800; color: var(--color-sos); margin-bottom: var(--space-1);">&lt; 3 Sec</div>
            <strong style="font-size: var(--font-sm); color: var(--color-text);">SOS Response Time</strong>
            <p style="font-size: var(--font-xs); color: var(--color-text-muted); margin-top: var(--space-1);">Instant offline helpline dialing and location lock</p>
          </div>

        </div>

        <!-- Verified Statistic Placeholders (Styled as Dashed Boxes) -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--space-4);">
          
          <div style="border: 2px dashed var(--color-border); background-color: var(--color-surface); padding: var(--space-4); border-radius: var(--radius-md);">
            <div style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-2);">
              <span class="badge badge-demo">Data Placeholder</span>
              <span style="font-size: var(--font-xs); font-weight: 600; color: var(--color-accent);">Homestay Off-Season Vacancy</span>
            </div>
            <div style="background-color: var(--color-surface-variant); padding: var(--space-2) var(--space-3); border-radius: var(--radius-sm); font-family: monospace; font-size: var(--font-xs); color: var(--color-text); margin-bottom: var(--space-2);">
              [Add verified statistic + source]
            </div>
            <p style="font-size: var(--font-xs); color: var(--color-text-muted); margin-bottom: 0;">
              Placeholder for verified Ministry of Tourism / State Tourism Board off-season homestay occupancy figures in Himalayan hill states.
            </p>
          </div>

          <div style="border: 2px dashed var(--color-border); background-color: var(--color-surface); padding: var(--space-4); border-radius: var(--radius-md);">
            <div style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-2);">
              <span class="badge badge-demo">Data Placeholder</span>
              <span style="font-size: var(--font-xs); font-weight: 600; color: var(--color-primary);">Elderly Digital App Abandonment</span>
            </div>
            <div style="background-color: var(--color-surface-variant); padding: var(--space-2) var(--space-3); border-radius: var(--radius-sm); font-family: monospace; font-size: var(--font-xs); color: var(--color-text); margin-bottom: var(--space-2);">
              [Add verified statistic + source]
            </div>
            <p style="font-size: var(--font-xs); color: var(--color-text-muted); margin-bottom: 0;">
              Placeholder for verified accessibility study on UI complexity causing senior travellers to abandon online bookings.
            </p>
          </div>

        </div>
      </section>

      <!-- 6. Developer / Hackathon Links Card -->
      <section style="background-color: var(--color-surface-variant); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-5); margin-bottom: var(--space-8);">
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: var(--space-4);">
          <div>
            <h3 style="font-size: var(--font-md); color: var(--color-primary); margin-bottom: var(--space-1);">
              Prototype Deployment & Repository Links
            </h3>
            <p style="font-size: var(--font-xs); color: var(--color-text-muted); margin-bottom: 0;">
              Open-source, zero-dependency, local-first web prototype.
            </p>
          </div>
          <div style="display: flex; gap: var(--space-3); flex-wrap: wrap;">
            <a href="https://github.com/rishabhk45/localyatra" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
              <span>GitHub: rishabhk45/localyatra</span>
            </a>
            <a href="https://rishabhk45.github.io/localyatra/" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
              <span>Live Demo: GitHub Pages</span>
            </a>
            <a href="mailto:contact@localyatra.demo" class="btn btn-ghost btn-sm">
              <span>contact@localyatra.demo</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  `;
}

/**
 * Bind Landing Page Interactive Elements
 */
export function bindHomeEvents() {
  const heroSaralBtn = document.getElementById('hero-saral-btn');
  if (heroSaralBtn) {
    heroSaralBtn.addEventListener('click', () => {
      const current = store.get('saralMode');
      const next = !current;
      store.set('saralMode', next);
      heroSaralBtn.innerHTML = next 
        ? '<span aria-hidden="true">✓</span> <span>Saral Mode Active</span>' 
        : '<span aria-hidden="true">👓</span> <span>Try Saral Mode</span>';
      showToast(
        next 
          ? '👓 Saral Mode enabled! Fonts are enlarged and buttons expanded.' 
          : 'Standard mode restored.', 
        'info'
      );
    });
  }
}
