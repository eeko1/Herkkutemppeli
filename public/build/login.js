"use strict";
document
  .getElementById("loginForm")
  ?.addEventListener("submit", async function (e) {
    e.preventDefault();
    const emailInput = this.querySelector("input[type='email']");
    const passwordInput = this.querySelector("input[type='password']");
    if (!emailInput || !passwordInput) {
      console.error("Form elements not found");
      return;
    }
    const formData = {
      email: emailInput.value,
      password: passwordInput.value,
    };
    try {
      const response = await fetch(
        "https://herkkutemppelijami.northeurope.cloudapp.azure.com/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userLvlId", data.userLvlId);
        alert("Logged in successfully");
        // Close the modal
        const loginModal = document.getElementById("registerSignup");
        if (loginModal) {
          loginModal.style.display = "none";
        }
        // Refresh the page
        window.location.reload();
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during fetch operation:", error);
      alert("An error occurred while logging in");
    }
  });
const logoutButton = document.getElementById("signout");
if (logoutButton) {
  logoutButton.addEventListener("click", function () {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("userLvlId");
    // Redirect to home page or reload
    window.location.href = "/";
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username");
  const navbarUsername = document.getElementById("navbarUsername");
  if (navbarUsername) {
    const usernameValue = navbarUsername.innerText;
    if (usernameValue === "") {
      navbarUsername.style.display = "none";
    }
  }
  if (username && navbarUsername) {
    // Display the username
    navbarUsername.textContent = username;
    // Show logout button
    if (logoutButton) {
      logoutButton.style.display = "block";
    }
  } else {
    // Hide logout button
    if (logoutButton) {
      logoutButton.style.display = "none";
    }
  }
});
