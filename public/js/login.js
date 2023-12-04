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
        // Additional actions upon successful login (e.g., redirect)
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during fetch operation:", error);
      alert("An error occurred while logging in");
    }
  });
