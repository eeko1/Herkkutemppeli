const dialog = document.querySelector("dialog");
const openRegisterBtn = document.getElementById("open_register");
const closeRegisterBtn = document.getElementById("close_register");
const modifyUserBtn = document.getElementById("modifyUserButton");
const modifyUserModal = document.getElementById("modifyUserModal");

const elements = dialog.querySelectorAll(
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

const openDialog = () => {
  dialog.showModal();
  dialog.addEventListener("keydown", trapFocus);
};

const closeDialog = (e) => {
  e.preventDefault();
  dialog.close();
  dialog.removeEventListener("keydown", trapFocus);
  openRegisterBtn.focus();
};

openRegisterBtn.addEventListener("click", openDialog);
closeRegisterBtn.addEventListener("click", closeDialog);

const openSignupModal = () => {
  dialog.showModal();
  dialog.addEventListener("keydown", trapFocus);
};

const closeModifyUserModal = () => {
  modifyUserModal.close();
  openSignupModal();
};

const openModifyUserModal = () => {
  dialog.close();
  modifyUserModal.showModal();
};

modifyUserBtn.addEventListener("click", openModifyUserModal);

document.getElementById("closeModifyUser").addEventListener("click", closeModifyUserModal);

function modifyUsername() {
  const newUsernameInput = document.getElementById("newUsername");
  newUsernameInput.placeholder = newUsernameInput.value;
}

function modifyEmail() {
  const newEmailInput = document.getElementById("newEmail");
  newEmailInput.placeholder = newEmailInput.value;
}

function modifyPhoneNumber() {
  const newPhoneNumberInput = document.getElementById("newPhoneNumber");
  newPhoneNumberInput.placeholder = newPhoneNumberInput.value;
}

function modifyPassword() {
  const newPasswordInput = document.getElementById("newPassword");
  newPasswordInput.placeholder = newPasswordInput.value;
}

function saveChanges() {
  // Logic to save the modified user data
}

function switchTab(event, tabName) {
  var i, tabContent;
  tabContent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";
}

document.getElementById("loginInput").style.display = "block";
