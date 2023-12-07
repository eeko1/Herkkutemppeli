const modifyUserBtn = document.getElementById("modifyUserButton");
const modifyUserModal = document.getElementById("modifyUserModal");
const closeModifyUserBtn = document.getElementById("closeModifyUser");

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
}

function modifyEmail() {
  const newEmailInput = document.getElementById("newEmail");
}

function modifyPhoneNumber() {
  const newPhoneNumberInput = document.getElementById("newPhoneNumber");
}

function modifyPassword() {
  const newPasswordInput = document.getElementById("newPassword");
}

function modifyAllFields() {
  const newUsername = document.getElementById('newUsername').value;
  const newEmail = document.getElementById('newEmail').value;
  const newPhoneNumber = document.getElementById('newPhoneNumber').value;
  const newPassword = document.getElementById('newPassword').value;

  const userData = {
    newUsername,
    newEmail,
    newPhoneNumber,
    newPassword
  };

  fetch('/updateUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(response => {
    if (response.ok) {
      console.log('User information updated successfully');
      // Optionally, perform any UI updates or actions upon successful update
    } else {
      console.error('Failed to update user information');
    }
  })
  .catch(error => {
    console.error('Error updating user:', error);
  });
}

function saveChanges() {
  modifyAllFields(); // You can call modifyAllFields function here if needed
}
