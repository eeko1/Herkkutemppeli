const modifyUserModal = document.getElementById("modifyUserModal");
const navbarUsername = document.getElementById("navbarUsername");
const closeModifyUserBtn = document.getElementById("closeModifyUser");

const closeSignupModal = () => {
  registerSignupDialog.close();
};

const openModifyUserModal = () => {
  closeSignupModal();
  modifyUserModal.showModal();
};

navbarUsername.addEventListener("click", openModifyUserModal);

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

async function modifyAllFields() {
  const newUsername = document.getElementById('newUsername').value;
  const newEmail = document.getElementById('newEmail').value;
  const newPhoneNumber = document.getElementById('newPhoneNumber').value;
  const newPassword = document.getElementById('newPassword').value;

  const formData = {
    newUsername,
    newEmail,
    newPhoneNumber,
    newPassword
  };

  try {
    const response = await fetch('/user/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      alert('User information updated successfully');
      // Additional actions upon successful update
    } else {
      alert('Error updating user information');
    }
  } catch (error) {
    console.error('Error during fetch operation:', error);
    alert('An error occurred while updating user information');
  }
}

function saveChanges() {
  modifyAllFields();
}