// The deployable appointment handler lives in netlify/functions/appointment.js.
// Re-export it here so the legacy source mirror cannot drift from production.
export { default } from "../../../netlify/functions/appointment.js";
