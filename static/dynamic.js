const element = document.querySelector(".dynamic-start");
element.classList.add("executed");
element.textContent = element.textContent.replace("waiting", "started");

import("./dynamic-load.js");
