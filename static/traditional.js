const element = document.querySelector(".traditional-start");
element.classList.add("executed");

const script = document.createElement("script");
script.type = "module";
script.src = "static/traditional-load.js";
document.body.appendChild(script);
