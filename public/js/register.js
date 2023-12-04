document
  .getElementById("signupForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = {
      username: this.username.value,
      email: this.email.value,
      phoneNumber: this.phoneNumber.value,
      password: this.password.value,
    };

    const response = await fetch("/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("User registered successfully");
    } else {
      alert("Error registering user");
    }
  });
