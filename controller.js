// controller.js

import { getZodiacSign, getDailyHoroscope } from "/model.js";
import {
  disableButton,
  enableButton,
  clearView,
  renderHoroscope,
  showLoading,
  renderError,
  fadeOut,
} from "/view.js";

// Elementos del DOM
const input = document.getElementById("birthdate");
const button = document.getElementById("get-quote");

let timeoutId;
let fadeTimeoutId;

/**
 * Validación en tiempo real del input con regex DD-MM-AAAA.
 * Habilita/deshabilita el botón según la validez.
 */
input.addEventListener("input", () => {
  const isValid = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/.test(
    input.value
  );
  enableButton(isValid);
});

/**
 * Manejador del clic en \"Consultar\".
 * Orquesta la obtención y renderizado del horóscopo.
 */
button.addEventListener("click", async () => {
  if (!validateDateFormat(input.value)) return;

  // Limpia timeouts anteriores si existen
  if (timeoutId) clearTimeout(timeoutId);
  if (fadeTimeoutId) clearTimeout(fadeTimeoutId);

  disableButton();
  clearView();
  showLoading();

  try {
    // Extrae día y mes
    const [day, month] = input.value.split("-").map(Number);
    // Obtiene signo y emoji
    const { sign, emoji } = getZodiacSign(day, month);
    // Llama al modelo para la predicción diaria
    const prediction = await getDailyHoroscope(sign);

    // Muestra el resultado en la vista
    renderHoroscope({
      sign: formatSignName(sign),
      emoji,
      prediction,
    });

    // Después de 15s, inicia fade-out y limpia tras otros 2s
    timeoutId = setTimeout(() => {
      fadeOut();
      fadeTimeoutId = setTimeout(() => {
        clearView();
        enableButton(validateDateFormat(input.value));
      }, 2000); // Debe coincidir con transition: 2s
    }, 15000);
  } catch (error) {
    console.error("Error:", error);
    renderError("Error al consultar el horóscopo");
    enableButton(validateDateFormat(input.value));
  }
});

/**
 * Valida el formato de fecha DD-MM-AAAA.
 * @param {string} dateString
 * @returns {boolean}
 */
function validateDateFormat(dateString) {
  const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
  return regex.test(dateString);
}

/**
 * Convierte la clave del signo en un nombre legible.
 * @param {string} sign - Clave interna (e.g. "aries").
 * @returns {string}
 */
function formatSignName(sign) {
  const signNames = {
    aries: "Aries",
    taurus: "Tauro",
    gemini: "Géminis",
    cancer: "Cáncer",
    leo: "Leo",
    virgo: "Virgo",
    libra: "Libra",
    scorpio: "Escorpio",
    sagittarius: "Sagitario",
    capricorn: "Capricornio",
    aquarius: "Acuario",
    pisces: "Piscis",
  };
  return signNames[sign] || sign;
}
