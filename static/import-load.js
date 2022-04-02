export const runScript = () => {
    const element = document.querySelector(".import-load");
    element.classList.add("executed");
    element.textContent = element.textContent.replace("waiting", "executed");
};