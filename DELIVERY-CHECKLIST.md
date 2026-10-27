# Delivery checklist

## Updated

- [x] Footer columns and footer link hover underline target the link text.
- [x] Doctors page “Discover NOVADENT” link has readable contrast in its light story section.
- [x] Treatments page keeps the existing responsive treatment grid and aligned search/filter controls.
- [x] Gallery final CTA uses less vertical space while keeping its message, hours badge, background, and contact link.
- [x] Contact hero and final CTA text/buttons have stronger contrast.
- [x] Contact page card text and final CTA use readable contrast while keeping the white card treatment and existing layout.
- [x] Contact enquiry can open prefilled WhatsApp or email drafts after a visitor action; the visitor reviews and sends in their chosen app.
- [x] WhatsApp draft uses the configured public WhatsApp number or falls back to the published clinic phone number.
- [x] Appointment submission offers direct prefilled WhatsApp/email drafts when no notification provider accepts the request.
- [x] Appointment form requires email, validates an international phone number, prevents duplicate submits, and reports clinic email, patient email, clinic WhatsApp, and patient WhatsApp outcomes separately.
- [x] Appointment email confirmations contain the request, clinic contact details, and a notice that the date/time is not confirmed until the clinic confirms it.
- [x] Twilio sends use configured Content SIDs and variables; WhatsApp consent is checked in the browser and again in the function.
- [x] `.env.example` lists configuration names without containing credentials; `.gitignore` excludes `.env`, `node_modules`, and build output.

## Verified locally

- [x] Production Vite build.
- [x] Local browser preview confirms the Contact page form, info cards, WhatsApp/email actions, appointment CTA, location section, and footer all render.
- [x] Appointment handler validation path without contacting Resend or Twilio.

## Requires owner configuration or live verification

- [ ] Add Resend key, verified sender address, and clinic appointment inbox in Netlify.
- [ ] Add Twilio credentials, connected WhatsApp sender, opted-in test recipient, and approved patient/clinic Content SIDs in Netlify.
- [ ] Set `VITE_CLINIC_WHATSAPP_NUMBER` to the clinic's dedicated public WhatsApp number if it differs from the published phone; rebuild after changing it.
- [ ] Submit a real test appointment after configuring the providers and review Resend/Twilio logs for delivery. Provider acceptance is not delivery confirmation.
- [ ] Confirm the clinic's displayed phone, email, address, and opening hours before deployment.

No live Resend email or Twilio WhatsApp request was sent during this work because project credentials and sender approval were not available in the workspace.
