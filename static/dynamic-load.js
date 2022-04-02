const element = document.querySelector(".dynamic-load");
element.classList.add("executed");
element.textContent = element.textContent.replace("waiting", "executed");
