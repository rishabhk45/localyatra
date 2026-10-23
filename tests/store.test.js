/**
 * LocalYatra — Store & Utilities Unit Tests
 * Can be run in Node environment to verify default states, subscriber patterns, and fallback logic.
 */

import { store } from '../js/store.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✕ FAIL: ${message}`);
    failed++;
  }
}

console.log('Running LocalYatra Unit Tests...');

// Test 1: Default preferences exist
const prefs = store.get('preferences');
assert(prefs !== null && typeof prefs === 'object', 'Default preferences object exists');
assert(prefs.budget > 0, `Default budget is positive (${prefs.budget})`);
assert(prefs.days > 0, `Default trip days is positive (${prefs.days})`);

// Test 2: Set and Get
store.set('saralMode', true);
assert(store.get('saralMode') === true, 'saralMode updates to true');

// Test 3: Subscriber notification
let notifiedValue = null;
const unsubscribe = store.subscribe('saralMode', (val) => {
  notifiedValue = val;
});
assert(notifiedValue === true, 'Subscriber receives current value on subscribe');

store.set('saralMode', false);
assert(notifiedValue === false, 'Subscriber is notified of state change');
assert(store.get('saralMode') === false, 'State reflected correctly in get()');

unsubscribe();
store.set('saralMode', true);
assert(notifiedValue === false, 'Unsubscribed callback is not triggered');

// Test 4: Reset restores default state
store.reset();
assert(store.get('saralMode') === false, 'Reset restores saralMode to false');
assert(store.get('bookings').length === 0, 'Reset clears simulated bookings');

console.log(`\nTest Results: ${passed} passed, ${failed} failed.\n`);
if (failed > 0) {
  process.exit(1);
}
