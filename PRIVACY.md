# Privacy Notice — ARAS Workspace (aras.tc)

**Last Updated:** February 2026

## Overview

ARAS Workspace ([aras.tc](https://www.aras.tc/)) is a static landing page hosted on Cloudflare Pages. This notice explains what data the website processes, how it is handled, and what technologies are involved.

## What Data Does This Website Process?

### IP Address

When you visit the website, your IP address is retrieved using the `CF-Connecting-IP` HTTP header provided by Cloudflare. This is a standard header that Cloudflare attaches to every request passing through its network.

- **How it works:** The website uses a Cloudflare Worker (`_worker.js`) that reads the `CF-Connecting-IP` header and returns your IP address via the `/ip` API endpoint.
- **Purpose:** Your IP address is displayed **only to you** on the page, inside a terminal-style interface.
- **Storage:** Your IP address is **not stored, logged, or transmitted** to any server, database, or third party. It exists only in the HTTP response returned to your browser.

### Geolocation Data

Approximate location information (city, region, country) is derived from Cloudflare's `request.cf` object. This geolocation data is determined by Cloudflare at the edge server level based on your IP address.

- **How it works:** The Cloudflare Worker reads `request.cf.city`, `request.cf.region`, and `request.cf.country` and returns them via the `/ip` API endpoint alongside your IP address.
- **Purpose:** Your approximate location is displayed **only to you** on the page.
- **Storage:** Location data is **not stored, logged, or transmitted** to any server, database, or third party.
- **Accuracy:** This is approximate geolocation based on Cloudflare's IP database. It reflects the location of the network you are connected to, not your precise physical location.

## Technical Implementation

### Cloudflare Worker (`_worker.js`)

The website uses a Cloudflare Pages Worker in advanced mode. The worker:

1. Intercepts requests to the `/ip` endpoint
2. Reads the `CF-Connecting-IP` header and `request.cf` object
3. Returns a JSON response containing your IP and location — e.g., `{"ip": "203.0.113.1", "location": "Istanbul, 34, TR"}`
4. Passes all other requests through to static assets (HTML, CSS, fonts, images)

The worker contains no logging, no analytics, and no external API calls. It processes data entirely at Cloudflare's edge and returns it directly to your browser.

### Client-Side Behavior

The `index.html` page makes a single `fetch('/ip')` request when loaded. The returned IP and location data is rendered into the DOM. No data is sent elsewhere.

## What This Website Does NOT Do

- **No analytics or telemetry.** No Google Analytics, Plausible, Fathom, or any other analytics service is used.
- **No tracking cookies or fingerprinting.** No cookies are set. No fingerprinting scripts are loaded.
- **No third-party scripts.** The page loads zero external JavaScript. All fonts are self-hosted.
- **No data collection.** Your IP and location are shown to you and discarded — they are never recorded.
- **No user accounts or registration.** The website does not manage user accounts.
- **No data sharing.** No data is transmitted to any third party beyond standard Cloudflare infrastructure.
- **No server-side logging of user data.** The Cloudflare Worker does not write to any log, database, or storage.

## External Network Connections

### Cloudflare (Infrastructure)

The website is hosted on Cloudflare Pages. All requests pass through Cloudflare's global network. Cloudflare's own privacy policy applies to their infrastructure-level processing:

- **Cloudflare Privacy Policy:** [cloudflare.com/privacypolicy](https://www.cloudflare.com/privacypolicy/)

No additional external services or APIs are contacted by this website.

## Data Storage

### No Persistent Storage

This website does **not** use any database, log file, cookie, localStorage (beyond theme preference), or persistent storage mechanism for user data.

The only use of browser storage is `localStorage` for your theme preference (dark/light mode), which contains no personal data.

## Open Source and Transparency

ARAS Workspace is an open-source project. The entire codebase — including the Cloudflare Worker, the HTML page, and all assets — is publicly available and auditable on GitHub:

**Repository:** [github.com/ARAS-Workspace/aras-landing](https://github.com/ARAS-Workspace/aras-landing)

The website's production deployment is managed directly from this repository through Cloudflare Pages' CI/CD integration. This means:

- **Every code change is traceable.** All updates to the website are committed to the public repository and trigger the deployment pipeline.
- **No hidden modifications.** The production instance is built and deployed from the same source code you can inspect on GitHub.
- **Auditable infrastructure.** The `_worker.js` file that handles your IP data is part of the public repository and can be reviewed by anyone.

## Your Rights and Control

- **Transparency:** All source code is open-source and auditable on GitHub
- **Verifiable deployment:** The production site is deployed via CI/CD directly from the public repository
- **No data to delete:** Since no personal data is stored, there is nothing to request deletion of
- **Theme preference:** You can clear your theme preference by clearing your browser's localStorage for this domain

## Changes to This Notice

This privacy notice may be updated as the website evolves. Changes will be reflected in this file with an updated date and will be visible in the public GitHub repository.

## Contact

For questions about this privacy notice or the ARAS Workspace website:

**Rıza Emre ARAS** — [r.emrearas@proton.me](mailto:r.emrearas@proton.me)