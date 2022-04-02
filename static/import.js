import { runScript } from "./import-load.js";

const element = document.querySelector(".import-start");
element.classList.add("executed");
element.textContent = element.textContent.replace("waiting", "executed");

runScript();
