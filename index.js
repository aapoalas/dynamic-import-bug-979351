const express = require('express');
const csp = require("helmet-csp");
const crypto = require("crypto");
const app = express();

app.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(12).toString("base64");
  next();
});

app.use(csp({
  directives: {
    scriptSrc: [
      (req, res) => `'nonce-${res.locals.nonce}'`,
      "'strict-dynamic'",
    ]
  }
}));

app.get('/', (req, res) => {
  res.send(
    `<head>
      <link href="static/master.css" rel="stylesheet" type="text/css">
    </head>
    <body>
      <div class="main">
        <div class="dynamic-start">Script containing dynamic import executed</div>
        <div class="dynamic-load">Script loaded dynamically executed</div>
        <div class="traditional-start">Script containing traditional script element appending executed</div>
        <div class="traditional-load">Script appended traditionally executed</div>
      </div>
      <script src="static/dynamic.js" nonce="${res.locals.nonce}" type="module"></script>
      <script src="static/traditional.js" nonce="${res.locals.nonce}" type="module"></script>
    </body>`
  );
});

app.use("/static", express.static("static"));

const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});
