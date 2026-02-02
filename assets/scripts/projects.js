"use strict";

/**
 * @typedef {Object} GitHubRepo
 * @property {string}      name
 * @property {string}      full_name
 * @property {string}      html_url
 * @property {string|null} description
 * @property {string|null} language
 * @property {number}      stargazers_count
 * @property {number}      forks_count
 * @property {boolean}     fork
 * @property {boolean}     archived
 */

/* ---------- Constants ---------- */

/** @type {string} */
const GITHUB_ORG = "ARAS-Workspace";

/** @type {string} */
const API_URL = `https://api.github.com/orgs/${GITHUB_ORG}/repos?sort=updated&per_page=100`;

/** @type {number} Slide transition duration in ms. */
const SLIDE_DURATION = 200;

/** @type {string} SVG markup for the GitHub icon used inside buttons. */
const GH_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`;

/** @type {string} SVG markup for the repo book icon. */
const REPO_ICON = `<svg viewBox="0 0 16 16" fill="currentColor"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"/></svg>`;

/** @type {Record<string, string>} GitHub linguist language colours. */
const LANGUAGE_COLORS = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Rust: "#dea584",
    Go: "#00ADD8",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
    Dart: "#00B4AB",
    Java: "#b07219",
    "C++": "#f34b7d",
    C: "#555555",
    Ruby: "#701516",
    PHP: "#4F5D95",
    Swift: "#F05138",
    Kotlin: "#A97BFF",
    Vue: "#41b883",
    SCSS: "#c6538c",
};

/* ---------- State ---------- */

/** @type {GitHubRepo[]} */
let repos = [];

/** @type {number} */
let currentIndex = 0;

/** @type {boolean} */
let isAnimating = false;

/* ---------- DOM Elements ---------- */

/** @type {HTMLElement} */
const repoCard = /** @type {HTMLElement} */ (document.getElementById("repo-card"));

/** @type {HTMLButtonElement} */
const prevBtn = /** @type {HTMLButtonElement} */ (document.getElementById("prev-btn"));

/** @type {HTMLButtonElement} */
const nextBtn = /** @type {HTMLButtonElement} */ (document.getElementById("next-btn"));

/** @type {HTMLElement} */
const counter = /** @type {HTMLElement} */ (document.getElementById("slider-counter"));

/** @type {HTMLElement} */
const lsOutput = /** @type {HTMLElement} */ (document.getElementById("ls-output"));

/* ---------- Helpers ---------- */

/**
 * Returns the GitHub linguist colour for a given language.
 * @param {string} lang - Programming language name.
 * @returns {string} Hex colour string.
 */
function languageColor(lang) {
    return LANGUAGE_COLORS[lang] || "#737373";
}

/* ---------- Rendering ---------- */

/**
 * Renders a single repo card at the given index.
 * @param {number} index - Index in the `repos` array.
 * @returns {void}
 */
function renderRepo(index) {
    const repo = repos[index];

    /** @type {string} */
    const lang = repo.language
        ? `<span><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${languageColor(repo.language)}"></span> ${repo.language}</span>`
        : "";

    /** @type {string} */
    const stars = repo.stargazers_count > 0
        ? `<span>&#9733; ${repo.stargazers_count}</span>`
        : "";

    /** @type {string} */
    const forks = repo.forks_count > 0
        ? `<span>&#9741; ${repo.forks_count}</span>`
        : "";

    repoCard.innerHTML = `
        <div class="repo-icon">${REPO_ICON}</div>
        <div class="repo-name">${repo.name}</div>
        <div class="repo-desc">${repo.description || "No description."}</div>
        <div class="repo-meta">${lang}${stars}${forks}</div>
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-link">
            ${GH_ICON} View on GitHub
        </a>
    `;

    counter.textContent = `${index + 1}/${repos.length}`;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === repos.length - 1;
}

/* ---------- Navigation ---------- */

/**
 * Animates the slide transition to a new repo index.
 * @param {number} newIndex - Target index.
 * @returns {void}
 */
function slideTo(newIndex) {
    if (isAnimating || newIndex < 0 || newIndex >= repos.length) return;
    isAnimating = true;

    /** @type {"left" | "right"} */
    const direction = newIndex > currentIndex ? "left" : "right";
    repoCard.classList.add(`slide-out-${direction}`);

    setTimeout(() => {
        currentIndex = newIndex;
        renderRepo(currentIndex);
        repoCard.classList.remove(`slide-out-${direction}`);
        repoCard.classList.add(`slide-in-${direction}`);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                repoCard.classList.remove(`slide-in-${direction}`);
                isAnimating = false;
            });
        });
    }, SLIDE_DURATION);
}

prevBtn.addEventListener("click", () => slideTo(currentIndex - 1));
nextBtn.addEventListener("click", () => slideTo(currentIndex + 1));

document.addEventListener("keydown", (/** @type {KeyboardEvent} */ e) => {
    if (e.key === "ArrowLeft") slideTo(currentIndex - 1);
    if (e.key === "ArrowRight") slideTo(currentIndex + 1);
});

/* ---------- Data Fetching ---------- */

/**
 * Fetches public repos from the GitHub API, populates the terminal
 * `ls` output and renders the first slide.
 * @returns {Promise<void>}
 */
async function fetchRepos() {
    /** @type {Response} */
    const res = await fetch(API_URL);
    if (!res.ok) {
        repoCard.innerHTML = `<div class="repo-error">Failed to load repos.</div>`;
        lsOutput.innerHTML = `<div class="line"><span class="output" style="color:#ff5f56;">error: could not list projects</span></div>`;
        return;
    }

    /** @type {GitHubRepo[]} */
    const data = await res.json();
    repos = data.filter((/** @type {GitHubRepo} */ r) => !r.fork && !r.archived);

    if (repos.length === 0) {
        repoCard.innerHTML = `<div class="repo-loading">No public repos found.</div>`;
        return;
    }

    lsOutput.innerHTML = repos
        .map((/** @type {GitHubRepo} */ r) => `<div class="line"><span class="output">${r.name}/</span></div>`)
        .join("");

    renderRepo(0);
}

void fetchRepos();