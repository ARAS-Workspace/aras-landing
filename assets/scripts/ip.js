"use strict";

/**
 * @typedef {Object} IPResponse
 * @property {string}      ip
 * @property {string|null} location
 */

/**
 * Fetches the visitor's IP address and geolocation from the
 * Cloudflare Worker endpoint and updates the DOM.
 * @returns {Promise<void>}
 */
async function fetchIP() {
    /** @type {HTMLElement} */
    const ipEl = /** @type {HTMLElement} */ (document.getElementById("ip-value"));
    /** @type {HTMLElement} */
    const locEl = /** @type {HTMLElement} */ (document.getElementById("location-value"));

    /** @type {Response} */
    const res = await fetch("/ip");
    if (!res.ok) {
        ipEl.textContent = "unavailable";
        return;
    }

    /** @type {IPResponse} */
    const data = await res.json();
    ipEl.textContent = data.ip;
    ipEl.classList.remove("loading");
    locEl.textContent = data.location || "-";
}

void fetchIP();