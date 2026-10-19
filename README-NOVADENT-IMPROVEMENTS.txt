NOVADENT - Improvements update

This package preserves the existing React/Vite site and adds a focused quality pass:
- Appointment form now clearly tells users that WhatsApp must be sent manually and that clinic confirmation is still required.
- The post-request screen displays the selected service, preferred date/time and contact number for review.
- Appointment validation checks required service/date/time and prevents selecting a past date.
- Removed the 9:00 AM option from the appointment time list to better align with the displayed 10:00 AM clinic opening time.
- NOVA Assistant recognizes additional Marathi phrases for tooth pain, gum symptoms, booking, cavity and dental care.
- Responsive appointment summary and reduced-motion styling.

Run locally:
1. Install Node.js LTS.
2. Open PowerShell in the folder containing package.json.
3. Run: npm install
4. Run: npm run build
5. Run: npm run dev
6. Open the localhost URL printed in the terminal.

Important:
- Appointment requests are currently handed off through a prefilled WhatsApp message. The website cannot confirm a real appointment; the visitor must press Send and the clinic must confirm availability.
- A real admin dashboard, persistent booking database, authentication, email/SMS delivery and AI API require a configured backend/service and credentials. They are not represented as active features in this frontend-only package.
- External image URLs and clinic contact details are retained from the existing project and should be verified by the site owner before production.

Additional improvements (2026-10-17)
- Appointment form now stores a limited convenience copy in this browser's localStorage and still hands the request to WhatsApp. This local copy is not a secure database and does not sync across browsers/devices.
- Added /admin/appointments local dashboard with search, status updates, CSV export and deletion for requests saved in the same browser. IMPORTANT: this demo route has no authentication and must not be exposed publicly or used for real patient data. Add server-side authentication, authorization, secure database and privacy controls before production use.
- Added page-level canonical URLs and robots metadata; admin route is marked noindex/nofollow. Added public/robots.txt. A domain-specific sitemap is not included because the production domain was not supplied.
- Added responsive appointment layout refinements for smaller screens while retaining the existing design language.
- Build/browser testing status: not verified in this environment because dependency installation timed out and Vite may not be installed. Run `npm install` then `npm run build` locally.
