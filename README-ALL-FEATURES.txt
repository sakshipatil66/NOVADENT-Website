NOVADENT — Storytelling & Interactive Website Upgrade

SETUP
1. Extract this ZIP. Open PowerShell in the folder containing package.json.
2. Run: npm install
3. Run: npm run dev
4. Open the local URL printed by Vite.
5. Production build check: npm run build

FEATURES ADDED IN THIS PASS
- Interactive homepage Smile Journey explorer with keyboard-accessible controls.
- Treatment search and category filters with live result count and empty state.
- Appointment deep links preselect matching treatment when available.
- Removed a duplicate selected-doctor banner on the appointment form.
- Route-aware page titles, meta descriptions and Open Graph descriptions.
- Global scroll reading-progress line.
- Reduced-motion and responsive styles for new interactive components.
- Existing routes, voice assistant, floating contact actions and Back to Top are retained.

IMPORTANT NOTES
- Appointment requests currently open WhatsApp; this is a request flow, not a database-backed booking system or confirmed availability.
- The homepage slider is an educational smile-journey explorer, not a clinical before/after result slider. Authentic patient before/after comparisons should only be added with documented consent and genuine matched images.
- Confirm clinic details, pricing, doctor credentials, reviews and WhatsApp number before production use.
- Build/browser verification depends on installing dependencies in your environment. Run `npm run build` and test each route before deployment.
