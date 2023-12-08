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
        localStorage.setItem("username", data.username); // Store the username
        localStorage.setItem("userId", data.userId); // Store the user ID
        localStorage.setItem("userLvlId", data.userLvlId); // Store the user level ID
        console.log(data.userLvlId);

        alert("Logged in successfully");
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
