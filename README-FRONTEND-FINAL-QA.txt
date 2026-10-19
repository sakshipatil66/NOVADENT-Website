NOVADENT Frontend Final QA Pass

Scope: frontend-only refinements. No new backend, database, or login was added.

Changes in this pass:
- Added global responsive-safe defaults for media, form controls and narrow screens.
- Improved keyboard focus visibility and touch interaction defaults.
- Added reduced-motion support for users who prefer less animation.
- Added social preview card and referrer metadata.
- Prevented localhost canonical URLs from being emitted as production canonical URLs.
- Existing site routes and visual theme are preserved.

Important testing note:
- This workspace did not have node_modules/.bin/vite available at the time of packaging.
- A production build and browser/device testing have NOT been completed here.
- After extracting the ZIP, run `npm install`, then `npm run build`, then `npm run dev`.
- Review all buttons, links, form submission behavior and layouts on actual mobile/tablet/desktop viewports before deployment.
- Configure the real production domain before publishing canonical URLs and social previews.

Admin route note:
- The existing admin route is not a secure production authentication system. Do not store real patient information in a local-only demo dashboard.
