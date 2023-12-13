document.addEventListener("DOMContentLoaded", function() {
  const modifyUserModal = document.getElementById("modifyUserModal") as HTMLDialogElement | null;
  const closeModifyUserBtn = document.getElementById("closeModifyUser") as HTMLButtonElement | null;

  closeModifyUserBtn?.addEventListener("click", () => {
    modifyUserModal?.close();
  });

  // Your existing code
  const navbarUsername = document.getElementById("navbarUsername") as HTMLElement | null;

  const openModifyUserModal = () => {
    modifyUserModal?.showModal();
  };

  navbarUsername?.addEventListener("click", openModifyUserModal);

  function modifyUsername() {
    const newUsernameInput = document.getElementById("newUsername") as HTMLInputElement | null;
  }

  function modifyEmail() {
    const newEmailInput = document.getElementById("newEmail") as HTMLInputElement | null;
  }

  function modifyPhoneNumber() {
    const newPhoneNumberInput = document.getElementById("newPhoneNumber") as HTMLInputElement | null;
  }

  function modifyPassword() {
    const newPasswordInput = document.getElementById("newPassword") as HTMLInputElement | null;
  }

  async function modifyAllFields() {
    const newUsername = (document.getElementById('newUsername') as HTMLInputElement | null)?.value;
    const newEmail = (document.getElementById('newEmail') as HTMLInputElement | null)?.value;
    const newPhoneNumber = (document.getElementById('newPhoneNumber') as HTMLInputElement | null)?.value;
    const newPassword = (document.getElementById('newPassword') as HTMLInputElement | null)?.value;

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
});
