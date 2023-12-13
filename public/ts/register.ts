document.getElementById("signupForm")?.addEventListener("submit", async (e: Event) => {
  e.preventDefault();

  const formData = {
    username: (document.querySelector("input[name='username']") as HTMLInputElement)?.value || '',
    email: (document.querySelector("input[name='email']") as HTMLInputElement)?.value || '',
    phoneNumber: (document.querySelector("input[name='phoneNumber']") as HTMLInputElement)?.value || '',
    password: (document.querySelector("input[name='password']") as HTMLInputElement)?.value || '',
  };

  try {
    const response = await fetch("/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("User registered successfully");
      // Additional actions upon successful registration (e.g., redirect)
    } else {
      alert("Error registering user");
    }
  } catch (error) {
    console.error("Error during fetch operation:", error);
    alert("An error occurred while registering");
  }
});
