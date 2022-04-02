/** @jsx h */
/// <reference no-default-lib="true"/>

import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { h, renderSSR } from "https://deno.land/x/nano_jsx@v0.0.20/mod.ts";

function app(nonce) {
  return `<head>
      <link href="static/master.css" rel="stylesheet" type="text/css">
      <script src="static/import.js" nonce="${nonce}" type="module" defer></script>
      <script src="static/traditional.js" nonce="${nonce}" type="module" defer></script>
      <script src="static/dynamic.js" nonce="${nonce}" type="module" defer></script>
    </head>
    <body>
      <div class="main">
        <div class="traditional-start">Script containing traditional script element appending executed</div>
        <div class="import-start">Script containing static import executed</div>
        <div class="dynamic-start">Script containing dynamic import executed</div>
        <div class="traditional-load">Script appended traditionally executed</div>
        <div class="import-load">Script loaded statically executed</div>
        <div class="dynamic-load">Script loaded dynamically executed</div>
      </div>
    </body>`;
}

async function handler(req) {
  console.log("Request for", req.url);
  const { pathname } = new URL(req.url);
  if (pathname.startsWith("/static")) {
    const file = await Deno.readFile("." + pathname);
    return new Reponse(file, {
      headers: {
        "content-type": req.url.endsWith(".css") ? "text/css" : "application/javascript"
      }
    });
  }
  
    const nonce = Math.random().toString().substring(2);
    const html = app(nonce);
    return new Response(html, {
      headers: {
        "content-security-policy": `script-src nonce='${nonce}'`,
        "content-type": "text/html",
      },
    });
}

serve(handler);
