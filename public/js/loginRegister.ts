const registerSignupDialog = document.querySelector("#registerSignup") as HTMLDialogElement | null;
const openRegisterBtn = document.getElementById("open_register") as HTMLButtonElement | null;
const closeRegisterBtn = document.getElementById("close_register") as HTMLButtonElement | null;
const tabContents = document.querySelectorAll(".tab-content") as NodeListOf<HTMLElement>;

if (registerSignupDialog && !registerSignupDialog.showModal) {
  dialogPolyfill.registerDialog(registerSignupDialog);
}

const registerElements = registerSignupDialog?.querySelectorAll(
  'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
) as NodeListOf<HTMLElement>;
const firstRegisterElement = registerElements[0];
const lastRegisterElement = registerElements[registerElements.length - 1];

const trapRegisterFocus = (e: KeyboardEvent) => {
  // Your focus trapping logic for registration dialog
};

const openRegisterDialog = () => {
  registerSignupDialog?.showModal();
  tabContents.forEach(content => {
    content.style.display = "none"; // Hide all tab contents
  });
  document.getElementById("signupContent")?.style.display = "block"; // Show only signup content
  document.getElementById("signupTab")?.classList.add("active"); // Set signup tab as active
  registerSignupDialog?.addEventListener("keydown", trapRegisterFocus);
  document.getElementById("loginInput")?.style.display = "block";
};

const closeRegisterDialog = (e: Event) => {
  e.preventDefault();
  registerSignupDialog?.close();
  registerSignupDialog?.removeEventListener("keydown", trapRegisterFocus);
  openRegisterBtn?.focus();
};

function switchTab(event: Event, tabName: string) {
  const tabContent = document.getElementsByClassName("tab-content") as HTMLCollectionOf<HTMLElement>;
  for (let i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }
  document.getElementById(tabName)?.style.display = "block";
}

openRegisterBtn?.addEventListener("click", openRegisterDialog);
closeRegisterBtn?.addEventListener("click", closeRegisterDialog);
