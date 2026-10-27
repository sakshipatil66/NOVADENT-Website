# NOVADENT Dental Care

Existing multi-page React and Vite website with Netlify Functions for appointment notifications.

## Run locally

1. Extract the ZIP and open the extracted project folder itself in VS Code. `package.json` is at the ZIP root, so this is the folder where you should run the commands below.
2. Install Node.js, then run `npm install` in the VS Code terminal.
3. For local Netlify Functions, create a local `.env` using the variable names listed below and fill only the values you have configured. Never commit or share `.env`.
4. Run `npm run dev` to preview the website UI. Appointment notifications need the Netlify Functions runtime, so use `npm run dev:netlify` to test the complete form locally.
5. Run `npm run build` to create the production site in `dist/`.

## Netlify deploy

Connect this project to Netlify. The included `netlify.toml` sets the build command to `npm run build`, publish folder to `dist`, and Functions folder to `netlify/functions`. Add the environment variables below in **Site configuration → Environment variables**, then deploy. Do not add secret values to frontend code or to a `VITE_*` variable.

## Environment variables

### Public website contact values

- `VITE_CLINIC_WHATSAPP_NUMBER`: NOVADENT's public WhatsApp number in international format, digits only (for example, a country code followed by the subscriber number). This value is public in the built website.
- `VITE_CLINIC_PUBLIC_EMAIL`: public clinic email shown by the floating contact control. Defaults to `info@novadentcare.com`.

### Resend appointment email

- `RESEND_API_KEY`: create an API key in the Resend dashboard.
- `APPOINTMENT_FROM_EMAIL`: sender address using a domain verified in Resend.
- `APPOINTMENT_TO_EMAIL`: clinic inbox that receives new appointment requests.
- `CLINIC_PUBLIC_EMAIL` and `CLINIC_PHONE`: contact details included in the patient's email; defaults match the existing website contact details.

Resend accepts messages through its API; that acceptance is not proof of final inbox delivery. Use Resend logs/webhooks to investigate delivery. See [Resend email API](https://resend.com/features/email-api).

### Twilio WhatsApp appointment messages

- `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN`: server-only credentials from the Twilio Console.
- `TWILIO_WHATSAPP_FROM`: the connected Twilio WhatsApp sender in `whatsapp:+E164` format. A Sandbox sender is for testing; production needs a WhatsApp-enabled sender.
- `TWILIO_WHATSAPP_CONTENT_SID`: approved patient appointment template Content SID. Configure placeholders `{{1}}` name, `{{2}}` treatment, `{{3}}` requested date, `{{4}}` requested time, and `{{5}}` preferred doctor.
- `CLINIC_WHATSAPP_TO`: optional clinic WhatsApp recipient in `+E164` format.
- `CLINIC_WHATSAPP_CONTENT_SID`: optional approved clinic notification template Content SID. Configure placeholders `{{1}}` patient name, `{{2}}` phone, `{{3}}` email, `{{4}}` treatment, `{{5}}` date, `{{6}}` time, `{{7}}` preferred doctor, and `{{8}}` patient note.

Create/approve the templates in Twilio's Content Template Builder. Twilio accepts template sends for processing; a queued status is not proof of delivery. WhatsApp requires opt-in and approved templates for business-initiated messages outside its customer-service window. Review the [Twilio WhatsApp guide](https://www.twilio.com/docs/whatsapp) and [template sending requirements](https://www.twilio.com/docs/content/send-templates-created-with-the-content-template-builder). A Sandbox can help with testing, but it is not a free production messaging setup; provider fees and account eligibility apply.

## Appointment behavior

The appointment form validates patient information and requires WhatsApp consent. The active function is `netlify/functions/appointment.js`; `appointment-backup.js` forwards to that same handler. The function reports clinic and patient email/WhatsApp provider acceptance separately. A fully accepted notification set returns HTTP 200; a request received by the clinic through at least one channel with another notification unavailable or rejected returns HTTP 207 with per-channel results. If no clinic channel accepts the request, the function returns an error. Provider acceptance is not confirmed delivery, and the appointment time is not confirmed until the clinic confirms it. This project does not include a database for persistent appointment storage.

The Contact form can prepare an enquiry for WhatsApp or the visitor's email app. Both actions open a draft for the visitor to review and send. The WhatsApp draft uses `VITE_CLINIC_WHATSAPP_NUMBER` when configured and otherwise uses NOVADENT's published clinic number (`+91 90000 12345`). Appointment requests are sent to the Netlify Function first; if no provider accepts the request, the page offers prepared WhatsApp and email drafts as direct fallbacks. These user-mediated drafts do not silently submit messages. Configure Resend and Twilio server variables above for automatic appointment notifications. No credentials or secret values are included in this project package.
