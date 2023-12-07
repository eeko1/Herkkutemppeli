const registerSignupDialog = document.querySelector("#registerSignup");
const openRegisterBtn = document.getElementById("open_register");
const closeRegisterBtn = document.getElementById("close_register");

if (!registerSignupDialog.showModal) {
  dialogPolyfill.registerDialog(registerSignupDialog);
}

const registerElements = registerSignupDialog.querySelectorAll(
  'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
);
const firstRegisterElement = registerElements[0];
const lastRegisterElement = registerElements[registerElements.length - 1];

const trapRegisterFocus = (e) => {
  // Your focus trapping logic for registration dialog
};

const openRegisterDialog = () => {
  registerSignupDialog.showModal();
  registerSignupDialog.addEventListener("keydown", trapRegisterFocus);
  document.getElementById("loginInput").style.display = "block";
};

const closeRegisterDialog = (e) => {
  e.preventDefault();
  registerSignupDialog.close();
  registerSignupDialog.removeEventListener("keydown", trapRegisterFocus);
  openRegisterBtn.focus();
};

openRegisterBtn.addEventListener("click", openRegisterDialog);
closeRegisterBtn.addEventListener("click", closeRegisterDialog);