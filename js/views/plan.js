/**
 * LocalYatra — Trip Preference Form View (#/plan)
 * Interactive, accessible form with synchronized budget slider/input, stepper controls,
 * crowd-level indicators, travel mood chips (max 3), accessibility needs checkboxes,
 * inline validation, and direct storage integration.
 */

import { store } from '../store.js';
import { showToast } from '../components/toast.js';

// Fallback destinations dataset ensuring 100% offline functionality
const SAMPLE_DESTINATIONS = [
  {
    id: "manali",
    name: "Manali & Kullu Valley",
    state: "Himachal Pradesh",
    crowdLevel: "High",
    crowdBadge: "Crowded in Town • Quiet in Valleys",
    crowdNote: "Mall Road & Solang face heavy congestion; Naggar, Tirthan & Old Manali remain peaceful and authentic.",
    offbeatAlternative: "Naggar & Tirthan Valley",
    defaultBudget: 15000,
    suggestedDays: 4
  },
  {
    id: "jaipur",
    name: "Jaipur & Amer",
    state: "Rajasthan",
    crowdLevel: "Moderate",
    crowdBadge: "Moderate • Heritage Clusters",
    crowdNote: "Hawa Mahal & City Palace are busy; Sanganer block-print hamlets and Amer artisan studios offer calm exploration.",
    offbeatAlternative: "Sanganer & Bagru Artisan Villages",
    defaultBudget: 18000,
    suggestedDays: 3
  },
  {
    id: "varanasi",
    name: "Varanasi (Kashi)",
    state: "Uttar Pradesh",
    crowdLevel: "High",
    crowdBadge: "High at Main Ghats • Sacred Calm",
    crowdNote: "Dashashwamedh Ghat has dense evening crowds; Assi to Chet Singh Ghats and weaver lanes have serene spiritual pacing.",
    offbeatAlternative: "Chet Singh Ghat & Sarnath Monasteries",
    defaultBudget: 12000,
    suggestedDays: 3
  },
  {
    id: "rishikesh",
    name: "Rishikesh & Devprayag",
    state: "Uttarakhand",
    crowdLevel: "Moderate",
    crowdBadge: "Moderate • Ashrams & Trails",
    crowdNote: "Laxman Jhula & Tapovan cafes are bustling; Tapovan upper ashrams and Devprayag sangam offer tranquil retreat.",
    offbeatAlternative: "Devprayag Sangam & Upper Ashrams",
    defaultBudget: 14000,
    suggestedDays: 3
  },
  {
    id: "hampi",
    name: "Hampi & Anegundi",
    state: "Karnataka",
    crowdLevel: "Low",
    crowdBadge: "Low / Serene • Expansive Ruins",
    crowdNote: "Expansive boulder landscapes with very low crowd density; ideal for slow heritage photography and seniors.",
    offbeatAlternative: "Anegundi Village & Sanapur Lake",
    defaultBudget: 13000,
    suggestedDays: 3
  },
  {
    id: "munnar",
    name: "Munnar & Marayoor",
    state: "Kerala",
    crowdLevel: "Low",
    crowdBadge: "Low / Peaceful • Tea Hamlets",
    crowdNote: "Munnar center has tour buses; Marayoor sandalwood forests and spice farm homestays are ultra-peaceful.",
    offbeatAlternative: "Marayoor Sandalwood Reserve & Vattavada",
    defaultBudget: 16000,
    suggestedDays: 4
  }
];

const MOOD_OPTIONS = [
  { id: 'relaxed', label: 'Relaxed', icon: '☕' },
  { id: 'adventure', label: 'Adventure', icon: '🧗' },
  { id: 'spiritual', label: 'Spiritual / Pilgrimage', icon: '🪔' },
  { id: 'cultural', label: 'Cultural & Heritage', icon: '🏛️' },
  { id: 'nature', label: 'Nature & Scenery', icon: '🌲' },
  { id: 'family', label: 'Family Friendly', icon: '👨‍👩‍👧‍👦' },
  { id: 'foodie', label: 'Foodie & Local Cuisine', icon: '🍲' }
];

export function renderPlan() {
  const currentPrefs = store.get('preferences') || {};
  const selectedDestId = currentPrefs.destinationId || 'manali';
  const initialDest = SAMPLE_DESTINATIONS.find(d => d.id === selectedDestId) || SAMPLE_DESTINATIONS[0];
  const initialBudget = currentPrefs.budget || initialDest.defaultBudget || 15000;
  const initialDays = currentPrefs.days || initialDest.suggestedDays || 3;
  const initialAdults = currentPrefs.travellers?.adults || 2;
  const initialSeniors = currentPrefs.travellers?.seniors || 0;
  const selectedMoods = currentPrefs.moods || ['relaxed', 'nature'];
  const accessNeeds = currentPrefs.accessibilityNeeds || { seniorFriendly: false, minimalWalking: false, wheelchairAccess: false };

  return `
    <div class="container-sm" style="padding-bottom: var(--space-12);">
      
      <!-- Stepper Indicator -->
      <div class="stepper" aria-label="Trip planning progress">
        <div class="step-item is-active" aria-current="step">
          <div class="step-circle">1</div>
          <span class="step-title">1. Plan Trip</span>
        </div>
        <div class="step-item">
          <div class="step-circle">2</div>
          <span class="step-title">2. Choose Stay</span>
        </div>
        <div class="step-item">
          <div class="step-circle">3</div>
          <span class="step-title">3. Confirm</span>
        </div>
      </div>

      <!-- Header -->
      <header style="margin-bottom: var(--space-6); text-align: center;">
        <span class="badge badge-local" style="margin-bottom: var(--space-2);">Local-First Planner</span>
        <h1 class="page-title">
          Tell Us About Your Dream Yatra
        </h1>
        <p style="color: var(--color-text-muted); font-size: var(--font-sm);">
          We customize day-wise itineraries, steer you away from crowds, and connect you with verified local homestays.
        </p>
      </header>

      <!-- Main Form -->
      <form id="trip-plan-form" novalidate class="card" style="box-shadow: var(--shadow-md);">
        
        <!-- 1. Destination Field & Live Crowd Level Note -->
        <div class="form-group">
          <label for="plan-destination" class="form-label" style="font-size: var(--font-base);">
            1. Where would you like to travel?
          </label>
          <select id="plan-destination" class="form-select" required aria-describedby="crowd-info-box">
            ${SAMPLE_DESTINATIONS.map(d => `
              <option value="${d.id}" ${d.id === initialDest.id ? 'selected' : ''}>
                ${d.name} (${d.state})
              </option>
            `).join('')}
          </select>

          <!-- Crowd Level Badge & Offbeat Callout -->
          <div id="crowd-info-box" style="margin-top: var(--space-3); padding: var(--space-3); background-color: var(--color-surface-variant); border-radius: var(--radius-md); border-left: 4px solid var(--color-primary);">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); margin-bottom: var(--space-1); flex-wrap: wrap;">
              <strong id="crowd-title" style="font-size: var(--font-sm); color: var(--color-primary);">${initialDest.name}</strong>
              <span id="crowd-badge" class="badge ${initialDest.crowdLevel === 'High' ? 'badge-sos' : (initialDest.crowdLevel === 'Moderate' ? 'badge-local' : 'badge-verified')}">
                ${initialDest.crowdBadge}
              </span>
            </div>
            <p id="crowd-desc" style="font-size: var(--font-xs); color: var(--color-text-muted); margin-bottom: var(--space-1); line-height: 1.5;">
              ${initialDest.crowdNote}
            </p>
            <div id="offbeat-tip" style="font-size: var(--font-xs); color: var(--color-accent); font-weight: 600;">
              ✨ Recommended peaceful alternative: ${initialDest.offbeatAlternative}
            </div>
          </div>
        </div>

        <hr style="border: 0; border-top: 1px solid var(--color-border-subtle); margin: var(--space-5) 0;">

        <!-- 2. Budget Control (Slider + Numeric Input) -->
        <div class="form-group">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-1); flex-wrap: wrap;">
            <label for="budget-slider" class="form-label" style="font-size: var(--font-base); margin-bottom: 0;">
              2. Total Trip Budget (INR ₹)
            </label>
            <div style="display: flex; align-items: center; gap: var(--space-1);">
              <span style="font-weight: 700; color: var(--color-accent); font-size: var(--font-md);">₹</span>
              <input type="number" id="budget-input" min="3000" max="100000" step="1000" value="${initialBudget}" 
                     class="form-input" style="width: 120px; font-weight: 700; font-size: var(--font-md); text-align: right; min-height: 38px; padding: var(--space-1) var(--space-2);"
                     aria-label="Trip Budget in Rupees">
            </div>
          </div>
          <input type="range" id="budget-slider" min="3000" max="100000" step="1000" value="${initialBudget}" 
                 style="width: 100%; accent-color: var(--color-accent); cursor: pointer; height: 8px; border-radius: var(--radius-full); margin: var(--space-2) 0;"
                 aria-label="Trip Budget Slider">
          <div style="display: flex; justify-content: space-between; font-size: var(--font-xs); color: var(--color-text-muted);">
            <span>₹3,000 (Backpacker / Budget)</span>
            <span>₹50,000</span>
            <span>₹1,00,000 (Premium Heritage)</span>
          </div>
        </div>

        <hr style="border: 0; border-top: 1px solid var(--color-border-subtle); margin: var(--space-5) 0;">

        <!-- 3. Trip Duration & Travellers Count (Dual Steppers) -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--space-5);">
          
          <!-- Days Stepper -->
          <div class="form-group">
            <label for="days-input" class="form-label" style="font-size: var(--font-base);">
              3. Trip Duration (Days)
            </label>
            <div style="display: flex; align-items: center; gap: var(--space-2);">
              <button type="button" id="days-dec-btn" class="btn btn-secondary" style="width: 44px; min-height: 44px; font-size: 1.25rem; padding: 0;" aria-label="Decrease days by 1">–</button>
              <input type="number" id="days-input" min="1" max="10" value="${initialDays}" readonly 
                     class="form-input" style="text-align: center; font-weight: 700; font-size: var(--font-lg); min-height: 44px;"
                     aria-label="Number of trip days (1 to 10)">
              <button type="button" id="days-inc-btn" class="btn btn-secondary" style="width: 44px; min-height: 44px; font-size: 1.25rem; padding: 0;" aria-label="Increase days by 1">+</button>
            </div>
            <span class="form-hint">Optimal pacing: 3–5 days per valley</span>
          </div>

          <!-- Travellers Stepper -->
          <div class="form-group">
            <label class="form-label" style="font-size: var(--font-base);">
              4. Total Travellers
            </label>
            <div style="display: flex; align-items: center; gap: var(--space-2);">
              <button type="button" id="travellers-dec-btn" class="btn btn-secondary" style="width: 44px; min-height: 44px; font-size: 1.25rem; padding: 0;" aria-label="Decrease travellers by 1">–</button>
              <input type="number" id="travellers-input" min="1" max="10" value="${initialAdults + initialSeniors}" readonly 
                     class="form-input" style="text-align: center; font-weight: 700; font-size: var(--font-lg); min-height: 44px;"
                     aria-label="Total number of travellers">
              <button type="button" id="travellers-inc-btn" class="btn btn-secondary" style="width: 44px; min-height: 44px; font-size: 1.25rem; padding: 0;" aria-label="Increase travellers by 1">+</button>
            </div>
            <span class="form-hint" id="traveller-breakdown-text">Adults & Companions</span>
          </div>

        </div>

        <hr style="border: 0; border-top: 1px solid var(--color-border-subtle); margin: var(--space-5) 0;">

        <!-- 4. Travel Mood Multi-Select Chips (Max 3) -->
        <div class="form-group">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2); flex-wrap: wrap;">
            <label class="form-label" style="font-size: var(--font-base); margin-bottom: 0;">
              5. Travel Mood & Interests
            </label>
            <span id="mood-counter" style="font-size: var(--font-xs); font-weight: 600; color: var(--color-primary);">
              ${selectedMoods.length} / 3 selected
            </span>
          </div>
          <span class="form-hint" style="margin-bottom: var(--space-3);">Choose up to 3 moods to balance your daily pacing:</span>

          <div class="chip-group" id="mood-chip-group" role="group" aria-label="Travel mood options">
            ${MOOD_OPTIONS.map(m => {
              const isSelected = selectedMoods.includes(m.id);
              return `
                <button type="button" class="chip ${isSelected ? 'active' : ''}" data-mood="${m.id}" 
                        aria-pressed="${isSelected}" style="min-height: 42px;">
                  <span aria-hidden="true">${m.icon}</span>
                  <span>${m.label}</span>
                </button>
              `;
            }).join('')}
          </div>
          <div id="mood-error" class="form-error" style="margin-top: var(--space-2);">Please select at least 1 travel mood.</div>
        </div>

        <hr style="border: 0; border-top: 1px solid var(--color-border-subtle); margin: var(--space-5) 0;">

        <!-- 5. Accessibility Needs (Senior & Mobility Accommodations) -->
        <div class="form-group">
          <label class="form-label" style="font-size: var(--font-base); margin-bottom: var(--space-1);">
            6. Accessibility & Pacing Accommodations
          </label>
          <span class="form-hint" style="margin-bottom: var(--space-3);">
            Ensures homestays have ground floor access and itineraries avoid steep climbs:
          </span>

          <div style="display: flex; flex-direction: column; gap: var(--space-2);">
            <label class="form-check">
              <input type="checkbox" id="need-senior" ${accessNeeds.seniorFriendly ? 'checked' : ''}>
              <span>
                <strong>Senior-Friendly Stay</strong>
                <small style="display: block; color: var(--color-text-muted); font-size: 0.8rem;">Ground-floor rooms, low stairs, western toilets, hot home-cooked meals.</small>
              </span>
            </label>

            <label class="form-check">
              <input type="checkbox" id="need-walking" ${accessNeeds.minimalWalking ? 'checked' : ''}>
              <span>
                <strong>Gentle Pacing (Minimal Walking)</strong>
                <small style="display: block; color: var(--color-text-muted); font-size: 0.8rem;">Scenic viewpoints reachable by vehicle; max 15-min gentle walks.</small>
              </span>
            </label>

            <label class="form-check">
              <input type="checkbox" id="need-wheelchair" ${accessNeeds.wheelchairAccess ? 'checked' : ''}>
              <span>
                <strong>Wheelchair / Ramp Access</strong>
                <small style="display: block; color: var(--color-text-muted); font-size: 0.8rem;">Step-free entrances and accessible bathrooms prioritized.</small>
              </span>
            </label>
          </div>
        </div>

        <hr style="border: 0; border-top: 1px solid var(--color-border-subtle); margin: var(--space-5) 0;">

        <!-- Form Submission Button & Disclaimer -->
        <div style="display: flex; flex-direction: column; gap: var(--space-3); align-items: center; margin-top: var(--space-2);">
          <button type="submit" id="generate-itinerary-btn" class="btn btn-primary btn-lg btn-block" style="box-shadow: var(--shadow-md);">
            Generate Personalized Itinerary →
          </button>
          <p style="font-size: var(--font-xs); color: var(--color-text-muted); text-align: center; margin-bottom: 0;">
            🔒 Local-First: All preferences stay in your browser's localStorage. Zero tracking.
          </p>
        </div>

      </form>
    </div>
  `;
}

/**
 * Bind Interactive Form Behaviors
 */
export function bindPlanEvents() {
  const form = document.getElementById('trip-plan-form');
  if (!form) return;

  const destSelect = document.getElementById('plan-destination');
  const crowdTitle = document.getElementById('crowd-title');
  const crowdBadge = document.getElementById('crowd-badge');
  const crowdDesc = document.getElementById('crowd-desc');
  const offbeatTip = document.getElementById('offbeat-tip');

  const budgetSlider = document.getElementById('budget-slider');
  const budgetInput = document.getElementById('budget-input');

  const daysInput = document.getElementById('days-input');
  const daysDecBtn = document.getElementById('days-dec-btn');
  const daysIncBtn = document.getElementById('days-inc-btn');

  const travellersInput = document.getElementById('travellers-input');
  const travellersDecBtn = document.getElementById('travellers-dec-btn');
  const travellersIncBtn = document.getElementById('travellers-inc-btn');

  const moodGroup = document.getElementById('mood-chip-group');
  const moodCounter = document.getElementById('mood-counter');
  const moodError = document.getElementById('mood-error');

  // 1. Destination Change Listener
  if (destSelect) {
    destSelect.addEventListener('change', () => {
      const selectedId = destSelect.value;
      const dest = SAMPLE_DESTINATIONS.find(d => d.id === selectedId);
      if (dest) {
        if (crowdTitle) crowdTitle.textContent = dest.name;
        if (crowdBadge) {
          crowdBadge.textContent = dest.crowdBadge;
          crowdBadge.className = `badge ${dest.crowdLevel === 'High' ? 'badge-sos' : (dest.crowdLevel === 'Moderate' ? 'badge-local' : 'badge-verified')}`;
        }
        if (crowdDesc) crowdDesc.textContent = dest.crowdNote;
        if (offbeatTip) offbeatTip.textContent = `✨ Recommended peaceful alternative: ${dest.offbeatAlternative}`;
        
        // Auto-suggest budget if currently on default
        if (budgetSlider && budgetInput) {
          budgetSlider.value = dest.defaultBudget;
          budgetInput.value = dest.defaultBudget;
        }
        if (daysInput) {
          daysInput.value = dest.suggestedDays;
        }
      }
    });
  }

  // 2. Budget Sync Slider & Input
  if (budgetSlider && budgetInput) {
    budgetSlider.addEventListener('input', () => {
      budgetInput.value = budgetSlider.value;
    });

    budgetInput.addEventListener('input', () => {
      let val = parseInt(budgetInput.value, 10);
      if (isNaN(val)) val = 3000;
      if (val > 100000) val = 100000;
      budgetSlider.value = val;
    });

    budgetInput.addEventListener('blur', () => {
      let val = parseInt(budgetInput.value, 10);
      if (isNaN(val) || val < 3000) val = 3000;
      if (val > 100000) val = 100000;
      budgetInput.value = val;
      budgetSlider.value = val;
    });
  }

  // 3. Days Stepper
  if (daysInput && daysDecBtn && daysIncBtn) {
    daysDecBtn.addEventListener('click', () => {
      let current = parseInt(daysInput.value, 10) || 1;
      if (current > 1) {
        daysInput.value = current - 1;
      }
    });

    daysIncBtn.addEventListener('click', () => {
      let current = parseInt(daysInput.value, 10) || 1;
      if (current < 10) {
        daysInput.value = current + 1;
      }
    });
  }

  // 4. Travellers Stepper
  if (travellersInput && travellersDecBtn && travellersIncBtn) {
    travellersDecBtn.addEventListener('click', () => {
      let current = parseInt(travellersInput.value, 10) || 1;
      if (current > 1) {
        travellersInput.value = current - 1;
      }
    });

    travellersIncBtn.addEventListener('click', () => {
      let current = parseInt(travellersInput.value, 10) || 1;
      if (current < 10) {
        travellersInput.value = current + 1;
      }
    });
  }

  // 5. Travel Mood Multi-select (Max 3)
  if (moodGroup) {
    moodGroup.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const isCurrentlyActive = chip.classList.contains('active');
        const activeChips = moodGroup.querySelectorAll('.chip.active');

        if (isCurrentlyActive) {
          // Deselect
          chip.classList.remove('active');
          chip.setAttribute('aria-pressed', 'false');
        } else {
          // Check limit of 3
          if (activeChips.length >= 3) {
            showToast('You can pick up to 3 travel moods to keep the pace balanced.', 'warning', 2500);
            return;
          }
          chip.classList.add('active');
          chip.setAttribute('aria-pressed', 'true');
        }

        const newCount = moodGroup.querySelectorAll('.chip.active').length;
        if (moodCounter) {
          moodCounter.textContent = `${newCount} / 3 selected`;
        }
        if (newCount > 0 && moodError) {
          moodError.style.display = 'none';
        }
      });
    });
  }

  // 6. Form Submission & Validation
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const selectedDestId = destSelect ? destSelect.value : 'manali';
    const destObj = SAMPLE_DESTINATIONS.find(d => d.id === selectedDestId) || SAMPLE_DESTINATIONS[0];
    const budgetVal = parseInt(budgetInput.value, 10) || 15000;
    const daysVal = parseInt(daysInput.value, 10) || 3;
    const travellersVal = parseInt(travellersInput.value, 10) || 2;

    const activeMoodChips = moodGroup.querySelectorAll('.chip.active');
    const selectedMoods = Array.from(activeMoodChips).map(c => c.getAttribute('data-mood'));

    if (selectedMoods.length === 0) {
      if (moodError) moodError.style.display = 'block';
      moodGroup.scrollIntoView({ behavior: 'smooth', block: 'center' });
      showToast('Please select at least 1 travel mood to help plan your days.', 'warning');
      return;
    }

    const accessibilityNeeds = {
      seniorFriendly: document.getElementById('need-senior')?.checked || false,
      minimalWalking: document.getElementById('need-walking')?.checked || false,
      wheelchairAccess: document.getElementById('need-wheelchair')?.checked || false
    };

    // Save to store
    const preferences = {
      destinationId: destObj.id,
      destinationName: destObj.name,
      state: destObj.state,
      crowdLevel: destObj.crowdLevel,
      offbeatAlternative: destObj.offbeatAlternative,
      budget: budgetVal,
      days: daysVal,
      travellers: {
        total: travellersVal,
        adults: travellersVal,
        seniors: accessibilityNeeds.seniorFriendly ? 1 : 0
      },
      moods: selectedMoods,
      accessibilityNeeds: accessibilityNeeds,
      updatedAt: new Date().toISOString()
    };

    store.set('preferences', preferences);
    showToast(`✓ Preferences saved for ${destObj.name}! Generating itinerary...`, 'success', 2500);

    // Route to itinerary view
    setTimeout(() => {
      window.location.hash = '#/itinerary';
    }, 400);
  });
}
