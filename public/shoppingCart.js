const shoppingCartDialog = document.getElementById("shoppingCartDialog");
const openDialogBtn = document.getElementById("open_dialog");
const closeDialogBtn = shoppingCartDialog.querySelector(".dialogClose");

const elements = shoppingCartDialog.querySelectorAll(
  'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
);
const firstElement = elements[0];
const lastElement = elements[elements.length - 1];

const trapFocus = (e) => {
  if (e.key === "Tab") {
    const tabForwards = !e.shiftKey && document.activeElement === lastElement;
    const tabBackwards = e.shiftKey && document.activeElement === firstElement;
    if (tabForwards) {
      e.preventDefault();
      firstElement.focus();
    } else if (tabBackwards) {
      e.preventDefault();
      lastElement.focus();
    }
  }
};

const openShoppingCartDialog = () => {
  shoppingCartDialog.showModal();
  shoppingCartDialog.addEventListener("keydown", trapFocus);
};

const closeShoppingCartDialog = (e) => {
  e.preventDefault();
  shoppingCartDialog.close();
  shoppingCartDialog.removeEventListener("keydown", trapFocus);
  openDialogBtn.focus();
};

openDialogBtn.addEventListener("click", openShoppingCartDialog);
closeDialogBtn.addEventListener("click", closeShoppingCartDialog);

/* if (typeof dialog.showModal !== "function") {

   * How to add polyfill outside CodePen conditionally
   * let polyfill = document.createElement("script");
   * polyfill.type = "text/javascript";
   * polyfill.src = "/dist/dialog-polyfill.js";
   * document.body.append(polyfill);
  
   * const polyfillStyles = document.createElement("link");
   * polyfillStyles.rel = "stylesheet";
   * polyfillStyles.href = "dialog-polyfill.css";
   * document.head.append(polyfillStyles);
 

  // Register polyfill on dialog element once the script has loaded
  dialogPolyfill.registerDialog(dialog);
}
 */
