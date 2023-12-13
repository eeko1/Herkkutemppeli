document.getElementById("loginForm")?.addEventListener("submit", async function (e: Event) {
  e.preventDefault();

  const formElement = this as HTMLFormElement;

  const emailInput = formElement.querySelector("input[type='email']") as HTMLInputElement | null;
  const passwordInput = formElement.querySelector("input[type='password']") as HTMLInputElement | null;

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
      const data = await response.json() as { token: string; username: string; userId: string; userLvlId: string; };
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("userLvlId", data.userLvlId);

      alert("Logged in successfully");

      // Close the modal
      const loginModal = document.getElementById("registerSignup") as HTMLElement | null;
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

document.getElementById("signout")?.addEventListener("click", function () {
  // Clear localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("userId");
  localStorage.removeItem("userLvlId");

  // Redirect to home page or reload
  window.location.href = "/";
});

document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username");
  const logoutButton = document.getElementById("signout") as HTMLElement | null;

  if (username) {
    // Display the username
    const navbarUsername = document.getElementById("navbarUsername") as HTMLElement | null;
    if (navbarUsername) {
      navbarUsername.textContent = username;
    }

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
