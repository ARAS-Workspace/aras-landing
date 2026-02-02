"use strict";

/** @type {string} */
const ASCII_ART = `
 █████╗ ██████╗  █████╗ ███████╗
██╔══██╗██╔══██╗██╔══██╗██╔════╝
███████║██████╔╝███████║███████╗
██╔══██║██╔══██╗██╔══██║╚════██║
██║  ██║██║  ██║██║  ██║███████║
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
`;

/** @type {string} */
const COPYRIGHT = "Copyright (C) 2025 Rıza Emre ARAS <r.emrearas@proton.me>";

/** Prints ASCII logo and copyright notice to the browser console. */
function printConsoleBranding() {
    console.log(`%c${ASCII_ART}`, "color: #0f62fe; font-family: monospace; font-weight: bold;");
    console.log(`%c${COPYRIGHT}`, "color: #525252; font-family: monospace; font-size: 11px;");
}

printConsoleBranding();