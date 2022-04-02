/** @jsx h */
/// <reference no-default-lib="true"/>

import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { h, renderSSR } from "https://deno.land/x/nano_jsx@v0.0.20/mod.ts";
import { encode } from "https://deno.land/std@0.126.0/encoding/base64.https";
function app(nonce) {
  return `<head>
      <link href="static/master.css" rel="stylesheet" type="text/css">
      <script src="static/import.js" nonce="${nonce}" type="module" defer></script>
      <script src="static/traditional.js" nonce="${nonce}" type="module" defer></script>
      <script src="static/dynamic.js" nonce="${nonce}" type="module" defer></script>
    </head>
    <body>
      <div class="main">
        <div class="traditional-start">Script containing traditional script element appending waiting</div>
        <div class="import-start">Script containing static import waiting</div>
        <div class="dynamic-start">Script containing dynamic import waiting</div>
        <div class="traditional-load">Script appended traditionally waiting</div>
        <div class="import-load">Script loaded statically waiting</div>
        <div class="dynamic-load">Script loaded dynamically waiting</div>
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
  
    const array = crypto.getRandomValues(new Uint8Array(16));
    const nonce = encode(array);
    const html = app(nonce);
    return new Response(html, {
      headers: {
        "content-security-policy": `script-src nonce='${nonce}' 'strict-dynamic';`,
        "content-type": "text/html",
      },
    });
}

serve(handler);
