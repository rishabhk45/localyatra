# LocalYatra — Tourism for Everyone, Powered by Locals

> **24-Hour Hackathon Prototype**  
> An AI-style, local-first, inclusive travel web application for India.

---

## 📌 About LocalYatra
LocalYatra connects travellers with small hotels, homestays, and verified local guides while steering visitors away from overcrowded hotspots. Designed for inclusivity, it offers a dedicated **Saral Mode** with simplified navigation, large fonts, and high readability for seniors, pilgrims, and less tech-savvy users, alongside family-assisted booking and safety SOS tools.

### Key Problems Solved
1. **Discovery for Small Stays & Local Guides**: Empowering homestays and regional guides, especially during off-peak seasons.
2. **De-crowding & Personalised Alternatives**: Recommending authentic, lesser-known cultural and scenic spots.
3. **Inclusive & Accessible UX**: Overcoming complex UI barriers for elderly travellers and pilgrims.

---

## ⚠️ Prototype & Storage Notice
- **Frontend-Only**: Pure HTML5, CSS3, and modern vanilla JavaScript (ES modules).
- **Zero Backend / Serverless**: No remote databases, authentication servers, or external private API keys.
- **Local Storage Disclaimer**: All trip preferences, saved itineraries, simulated bookings, and dashboard entries are saved solely in your browser's `localStorage` on this specific device. Clearing browser cache resets the prototype state.
- **Simulations**: All bookings, payments, and guide verifications are simulated for demonstration purposes.

---

## 🚀 Getting Started

### Prerequisites
No build step or node package installations are required. You only need a modern web browser.

### Running Locally
To test with ES module support, serve via any local HTTP static server:

```bash
# Using npx serve (recommended)
npx serve .

# Or using Python's built-in HTTP server
python -m http.server 8000
```
Open `http://localhost:3000` (or `http://localhost:8000`) in your browser.

---

## 📂 Project Structure
```text
LocalYatra/
├── index.html         # Application shell & entry point
├── css/               # Modular CSS (design system, components, responsive styles)
├── js/                # Vanilla ES modules (state, itinerary, bookings, saral mode)
├── data/              # Static JSON datasets (destinations, homestays, verified guides)
├── assets/            # Icons, illustrations, static assets
├── pages/             # Subpages or specialized views if needed
├── tests/             # Lightweight unit/regression tests
├── docs/              # Architecture notes and demo walkthroughs
├── PROGRESS.md        # Roadmap & phase checklist
└── README.md          # Project overview and documentation
```

---

## 🗺️ Roadmap
See [PROGRESS.md](PROGRESS.md) for full phase-by-phase implementation details and status tracking.
