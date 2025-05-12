// view.js
const container = document.getElementById("quote-container");
const button = document.getElementById("get-quote");

export function disableButton() {
  button.disabled = true;
}

export function enableButton() {
  button.disabled = false;
}

export function clearView() {
  container.innerHTML = "";
  container.classList.remove("visible", "fade-out");
}

export function renderQuote({ quote, author }) {
  container.innerHTML = `
    <p>"${quote}"</p>
    <p><em>- ${author}</em></p>
  `;
  container.classList.remove("fade-out");
  container.classList.add("visible");
}

export function renderError() {
  container.textContent =
    "Error al obtener el consejo. Mira la consola para detalles.";
  container.classList.add("visible");
}

export function fadeOut() {
  container.classList.add("fade-out");
}
