// controller.js
import { fetchQuote } from "./model.js";
import {
  disableButton,
  enableButton,
  clearView,
  renderQuote,
  renderError,
  fadeOut,
} from "./view.js";

let hideTimeout;

async function showAdvice() {
  disableButton();
  clearTimeout(hideTimeout);
  clearView();

  const data = await fetchQuote();
  if (!data) {
    renderError();
    hideTimeout = setTimeout(() => {
      clearView();
      enableButton();
    }, 5000);
    return;
  }

  renderQuote(data);
  // fade-out a los 5s
  hideTimeout = setTimeout(fadeOut, 5000);
  // limpiar y reactivar botón al cumplir 6s
  setTimeout(() => {
    clearView();
    enableButton();
  }, 6000);
}

document.getElementById("get-quote").addEventListener("click", showAdvice);
