/**
 * LocalYatra — State Store
 * Tiny, robust state management backed by browser localStorage with memory fallback.
 * Wrapped in try/catch to protect against private browsing restrictions or quota limits.
 */

const STORAGE_PREFIX = 'localyatra_';

const DEFAULT_STATE = {
  preferences: {
    destination: 'Manali, Himachal Pradesh',
    budget: 12000,
    days: 3,
    mood: 'scenic',        // 'scenic' | 'pilgrimage' | 'heritage' | 'adventure' | 'peaceful'
    companions: 'senior',  // 'solo' | 'couple' | 'family' | 'senior'
    crowdPreference: 'low' // 'low' (offbeat) | 'moderate' | 'any'
  },
  itinerary: null,
  selectedStay: null,
  selectedGuide: null,
  bookings: [],
  saralMode: false
};

// Memory fallback store in case localStorage is disabled or restricted
const memoryFallback = new Map();

// Subscribers map: key -> Set of callback functions
const subscribers = new Map();

/**
 * Safely read a value from localStorage
 */
function readStorage(key) {
  try {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return memoryFallback.has(key) ? memoryFallback.get(key) : DEFAULT_STATE[key];
    }
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (raw === null || raw === undefined) {
      return memoryFallback.has(key) ? memoryFallback.get(key) : DEFAULT_STATE[key];
    }
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`[Store] Could not read "${key}" from localStorage:`, err);
    return memoryFallback.has(key) ? memoryFallback.get(key) : DEFAULT_STATE[key];
  }
}

/**
 * Safely write a value to localStorage and memory fallback
 */
function writeStorage(key, value) {
  memoryFallback.set(key, value);
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    }
  } catch (err) {
    console.warn(`[Store] Could not write "${key}" to localStorage:`, err);
  }
}

export const store = {
  /**
   * Get value for given key
   */
  get(key) {
    return readStorage(key);
  },

  /**
   * Set value for given key and notify subscribers
   */
  set(key, value) {
    writeStorage(key, value);
    this.notify(key, value);
  },

  /**
   * Update value using an updater function
   */
  update(key, updaterFn) {
    const current = this.get(key);
    const updated = updaterFn(current);
    this.set(key, updated);
    return updated;
  },

  /**
   * Subscribe to changes for a given key
   * Returns an unsubscribe function
   */
  subscribe(key, callback) {
    if (!subscribers.has(key)) {
      subscribers.set(key, new Set());
    }
    subscribers.get(key).add(callback);

    // Call immediately with current value
    try {
      callback(this.get(key));
    } catch (e) {
      console.error('[Store] Error in initial subscriber callback:', e);
    }

    return () => {
      const set = subscribers.get(key);
      if (set) {
        set.delete(callback);
      }
    };
  },

  /**
   * Notify all subscribers of a key change
   */
  notify(key, value) {
    const set = subscribers.get(key);
    if (set) {
      set.forEach(callback => {
        try {
          callback(value);
        } catch (e) {
          console.error(`[Store] Error notifying subscriber for "${key}":`, e);
        }
      });
    }
  },

  /**
   * Clear all LocalYatra state from localStorage & memory
   */
  reset() {
    Object.keys(DEFAULT_STATE).forEach(key => {
      this.set(key, DEFAULT_STATE[key]);
    });
  }
};
