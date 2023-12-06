document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    // Select the email and password inputs directly from the form
    const emailInput = this.querySelector("input[type='email']");
    const passwordInput = this.querySelector("input[type='password']");

    // Check if the elements are correctly selected
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
        alert("Logged in successfully");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during fetch operation:", error);
      alert("An error occurred while logging in");
    }
  });

function updateNavbarWithUser() {
  const username = localStorage.getItem("username");
  if (username) {
    const userItem = document.createElement("li");
    userItem.className = "navli";
    userItem.textContent = username; // Display the username
    document.querySelector(".navul").appendChild(userItem);
  }
}

// Call this function on page load to check if the user is already logged in
document.addEventListener("DOMContentLoaded", updateNavbarWithUser);
