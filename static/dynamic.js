const element = document.querySelector(".dynamic-start");
element.classList.add("executed");
element.textContent = element.textContent.replace("waiting", "executed");

import("./dynamic-load.js");
