// view.js

// Referencias a elementos del DOM
const container = document.getElementById("quote-container");
const button = document.getElementById("get-quote");

/**
 * Deshabilita el botón mientras se procesa la consulta.
 */
export function disableButton() {
  button.disabled = true;
}

/**
 * Activa o desactiva el botón según el booleano recibido.
 * @param {boolean} enabled - true para activar, false para desactivar.
 */
export function enableButton(enabled) {
  button.disabled = !enabled;
}

/**
 * Limpia el contenido y quita clases de visibilidad del contenedor.
 */
export function clearView() {
  container.innerHTML = "";
  container.classList.remove("visible", "fade-out");
}

/**
 * Muestra un spinner y mensaje de carga.
 */
export function showLoading() {
  container.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <p>Consultando las estrellas...</p>
    </div>`;
  container.classList.add("visible");
}

/**
 * Renderiza el resultado del horóscopo.
 * @param {{sign: string, emoji: string, prediction: string}} data
 */
export function renderHoroscope({ sign, emoji, prediction }) {
  container.innerHTML = `
    <div class="horoscope-result">
      <div class="sign">${emoji} ${sign}</div>
      <div class="prediction">${prediction}</div>
    </div>`;
  container.classList.add("visible");
}

/**
 * Muestra un mensaje de error.
 * @param {string} message - Texto del error.
 */
export function renderError(message) {
  container.innerHTML = `
    <div class="error">
      <div class="error-icon">⚠️</div>
      <p>${message}</p>
    </div>`;
  container.classList.add("visible");
}

/**
 * Inicia la transición de fade-out agregando la clase correspondiente.
 */
export function fadeOut() {
  container.classList.add("fade-out");
}
