document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
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
      const response = await fetch("/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

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

document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username");
  if (username) {
    document.getElementById("navbarUsername").textContent = username;
  }
});
