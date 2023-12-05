const registerSignupDialog = document.querySelector("#registerSignup");
const openRegisterBtn = document.getElementById("open_register");
const closeRegisterBtn = document.getElementById("close_register");
const modifyUserBtn = document.getElementById("modifyUserButton");
const modifyUserModal = document.getElementById("modifyUserModal");
const closeModifyUserBtn = document.getElementById("closeModifyUser");

if (!registerSignupDialog.showModal) {
  dialogPolyfill.registerDialog(registerSignupDialog);
}

const registerElements = registerSignupDialog.querySelectorAll(
  'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
);
const firstRegisterElement = registerElements[0];
const lastRegisterElement = registerElements[registerElements.length - 1];

const trapRegisterFocus = (e) => {
  if (e.key === "Tab") {
    const tabForwards = !e.shiftKey && document.activeElement === lastRegisterElement;
    const tabBackwards = e.shiftKey && document.activeElement === firstRegisterElement;
    if (tabForwards) {
      e.preventDefault();
      firstRegisterElement.focus();
    } else if (tabBackwards) {
      e.preventDefault();
      lastRegisterElement.focus();
    }
  }
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

const closeSignupModal = () => {
  registerSignupDialog.close();
};

const openModifyUserModal = () => {
  closeSignupModal();
  modifyUserModal.showModal();
};

modifyUserBtn.addEventListener("click", openModifyUserModal);
closeModifyUserBtn.addEventListener("click", () => {
  modifyUserModal.close();
  openRegisterDialog();
});

function modifyUsername() {
  const newUsernameInput = document.getElementById("newUsername");
  // Your logic to modify the username...
}

function modifyEmail() {
  const newEmailInput = document.getElementById("newEmail");
  // Your logic to modify the email...
}

function modifyPhoneNumber() {
  const newPhoneNumberInput = document.getElementById("newPhoneNumber");
  // Your logic to modify the phone number...
}

function modifyPassword() {
  const newPasswordInput = document.getElementById("newPassword");
  // Your logic to modify the password...
}

function saveChanges() {
  // Logic to save the modified user data
}

function switchTab(event, tabName) {
  const tabContent = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";
}

openRegisterBtn.addEventListener("click", openRegisterDialog);
closeRegisterBtn.addEventListener("click", closeRegisterDialog);