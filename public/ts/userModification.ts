document.addEventListener("DOMContentLoaded", function () {
  const modifyUserModal = document.getElementById("modifyUserModal") as HTMLDialogElement;
  const closeModifyUserBtn = document.getElementById("closeModifyUser") as HTMLElement;

  closeModifyUserBtn.addEventListener("click", () => {
    modifyUserModal.close();
  });

  // Your existing code
  const navbarUsername = document.getElementById("navbarUsername") as HTMLElement;

  const openModifyUserModal = () => {
    modifyUserModal.showModal();
  };

  navbarUsername.addEventListener("click", openModifyUserModal);

  function modifyUsername() {
    const newUsernameInput = document.getElementById("newUsername") as HTMLInputElement;
  }

  function modifyEmail() {
    const newEmailInput = document.getElementById("newEmail") as HTMLInputElement;
  }

  function modifyPhoneNumber() {
    const newPhoneNumberInput = document.getElementById("newPhoneNumber") as HTMLInputElement;
  }

  function modifyPassword() {
    const newPasswordInput = document.getElementById("newPassword") as HTMLInputElement;
  }

  async function modifyAllFields() {
    const currentUsername = (document.getElementById('navbarUsername') as HTMLElement).innerText;
    const newUsername = (document.getElementById('newUsername') as HTMLInputElement).value;
    const newEmail = (document.getElementById('newEmail') as HTMLInputElement).value;
    const newPhoneNumber = (document.getElementById('newPhoneNumber') as HTMLInputElement).value;
    const newPassword = (document.getElementById('newPassword') as HTMLInputElement).value;

    const formData = {
      currentUsername,
      newUsername,
      newEmail,
      newPhoneNumber,
      newPassword
    };

    try {
      console.log('formData:', formData)
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

  // Move this line outside the modifyAllFields function
  (window as any).modifyAllFields = modifyAllFields;

  function saveChanges() {
    modifyAllFields();
  }
});
