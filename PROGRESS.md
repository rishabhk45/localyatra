# LocalYatra — Implementation Progress Checklist

Project: **LocalYatra — Tourism for Everyone, Powered by Locals**  
Tech Stack: HTML5 + CSS3 + Vanilla JavaScript (ES Modules), Local-first (localStorage), Zero backend.

---

## 📋 Phase Roadmap

- [x] **Phase 1: Design system & app shell**  
  Establish CSS variables, typography, accessible color palette (WCAG AA), responsive layout container, header/navigation shell, footer, and basic routing/view switching. Completed with living styleguide at `#/styleguide`.

- [x] **Phase 2: Landing + trip form**  
  Hero section, problem-solution narrative, illustrative scenario callout, inclusion strip, metrics impact strip with verified statistic placeholders, and interactive trip planner input form (destination with crowd levels, budget slider, days/travellers steppers, mood chips, accessibility checkboxes).

- [ ] **Phase 3: Itinerary engine**  
  Rule-based, customizable day-wise itinerary generator matching budget, tempo, and mood with de-crowded alternatives and time blocks.

- [ ] **Phase 4: Stays & guides**  
  Curated homestays, small eco-hotels, and verified local guides listings with filterable tags, badges, and offline fallback data in `/data`.

- [ ] **Phase 5: Saral Mode**  
  High-contrast, large-button, senior-friendly interface toggle with voice-readout simulation (Web Speech API) and simplified steps.

- [ ] **Phase 6: Booking + family-assisted flow**  
  Simulated booking modal, booking voucher generator, family-assisted booking flow (booking on behalf of elderly parents/relatives), stored in `localStorage`.

- [ ] **Phase 7: Owner dashboard**  
  Portal for local homestay owners and guides to view off-season demand insights, manage room availability, and publish off-season discounts.

- [ ] **Phase 8: Safety SOS**  
  Emergency SOS module with one-tap emergency contacts trigger, browser geolocation retrieval, simulated SMS/WhatsApp message generator, and local emergency helplines.

- [ ] **Phase 9: Accessibility, polish & QA**  
  Keyboard navigation (tab order, focus rings), screen reader ARIA labels, contrast verification, mobile touch target sizes (min 48x48px).

- [ ] **Phase 10: GitHub Pages deploy, README & demo script**  
  Relative link audit for GitHub Pages subfolder compatibility, demo script walkthrough, final project documentation update.

- [ ] **Phase 11: Real map**  
  Keyless Leaflet.js + OpenStreetMap integration to visualize itinerary points, stays, and safe zones with offline fallback coordinates.

- [ ] **Phase 12: Smarter on-device planner**  
  Advanced on-device heuristic planning (weather awareness via Open-Meteo, pacing calculations, pilgrimage-friendly pacing).

- [ ] **Phase 13: Zero-backend SOS sharing**  
  URL hash / query-parameter encoded SOS location & status payload for instant peer-to-peer sharing via WhatsApp/SMS without a backend server.

- [ ] **Phase 14: Final verification**  
  End-to-end user flow testing across mobile and desktop viewport profiles, offline network mode validation, and storage clearing tests.

- [ ] **Phase 15: Feedback & reviews**  
  Simulated traveller reviews, community tips for offbeat spots, and local guide ratings saved to `localStorage`.

- [ ] **Phase 16: Seasonal demand insights**  
  Simulated heatmaps/trend indicators showing quiet vs. peak seasons for destination clusters to encourage off-peak sustainable travel.

- [ ] **Phase 17: India-wide place search**  
  Free, keyless place search integration (Photon / Nominatim) with debounce, caching, and robust offline sample destination fallbacks.

- [ ] **Phase 18: SOS hardening & location snapshot page**  
  Standalone emergency snapshot view decodable offline with GPS coordinates, battery indicator query, nearby police/hospital helpline directory.
