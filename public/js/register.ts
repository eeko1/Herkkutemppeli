document.getElementById("signupForm")?.addEventListener("submit", async function (e: Event) {
  e.preventDefault();

  // 'this' inside an event listener refers to the element that the event listener was attached to
  // TypeScript doesn't automatically infer this, so we use type assertion
  const formElement = this as HTMLFormElement;

  const formData = {
    username: formElement.querySelector("input[name='username']")?.value,
    email: formElement.querySelector("input[name='email']")?.value,
    phoneNumber: formElement.querySelector("input[name='phoneNumber']")?.value,
    password: formElement.querySelector("input[name='password']")?.value,
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
