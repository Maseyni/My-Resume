(() => { //немедленный вызов функции
    const WAIT_TIME_MS = 800;

    const textInput = document.createElement("input");
    const display = document.createElement("div");

    let timeout;

    textInput.addEventListener("input", () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            display.textContent = textInput.value;
        }, WAIT_TIME_MS);
    });

    document.addEventListener("DOMContentLoaded", () => { //DOM-обработчик события
        document.body.append(textInput);
        document.body.append(display);
    });
})();