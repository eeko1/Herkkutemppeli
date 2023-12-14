"use strict";
const registerSignupDialog = document.querySelector("#registerSignup");
const openRegisterBtn = document.getElementById("open_register");
const closeRegisterBtn = document.getElementById("close_register");
const tabContents = document.querySelectorAll(".tab-content");
const registerElements = registerSignupDialog?.querySelectorAll(
  'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
);
const firstRegisterElement = registerElements ? registerElements[0] : null;
const lastRegisterElement = registerElements
  ? registerElements[registerElements.length - 1]
  : null;
const trapRegisterFocus = (e) => {
  // Your focus trapping logic for the registration dialog
};
const openRegisterDialog = () => {
  if (registerSignupDialog) {
    registerSignupDialog.showModal();
    tabContents.forEach((content) => {
      content.style.display = "none"; // Hide all tab contents
    });
    const signupContent = document.getElementById("signupContent");
    if (signupContent) {
      signupContent.style.display = "block"; // Show only signup content
    }
    const signupTab = document.getElementById("signupTab");
    if (signupTab) {
      signupTab.classList.add("active"); // Set signup tab as active
    }
    if (registerSignupDialog) {
      registerSignupDialog.addEventListener("keydown", trapRegisterFocus);
    }
    const loginInput = document.getElementById("loginInput");
    if (loginInput) {
      loginInput.style.display = "block";
    }
  }
};
const closeRegisterDialog = (e) => {
  e.preventDefault();
  if (registerSignupDialog) {
    registerSignupDialog.close();
    registerSignupDialog.removeEventListener("keydown", trapRegisterFocus);
    if (openRegisterBtn) {
      openRegisterBtn.focus();
    }
  }
};
function switchTab(event, tabName) {
  const tabContent = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }
  const selectedTab = document.getElementById(tabName);
  if (selectedTab) {
    selectedTab.style.display = "block";
  }
}
window.switchTab = switchTab;
openRegisterBtn.addEventListener("click", openRegisterDialog);
closeRegisterBtn.addEventListener("click", closeRegisterDialog);
