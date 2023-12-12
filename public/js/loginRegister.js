const registerSignupDialog = document.querySelector("#registerSignup");
const openRegisterBtn = document.getElementById("open_register");
const closeRegisterBtn = document.getElementById("close_register");
const tabContents = document.querySelectorAll(".tab-content");

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
  tabContents.forEach(content => {
    content.style.display = "none"; // Hide all tab contents
  });
  document.getElementById("signupContent").style.display = "block"; // Show only signup content
  document.getElementById("signupTab").classList.add("active"); // Set signup tab as active
  registerSignupDialog.addEventListener("keydown", trapRegisterFocus);
  document.getElementById("loginInput").style.display = "block";
};

const closeRegisterDialog = (e) => {
  e.preventDefault();
  registerSignupDialog.close();
  registerSignupDialog.removeEventListener("keydown", trapRegisterFocus);
  openRegisterBtn.focus();
};

function switchTab(event, tabName) {
  const tabContent = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";
}

openRegisterBtn.addEventListener("click", openRegisterDialog);
closeRegisterBtn.addEventListener("click", closeRegisterDialog);
