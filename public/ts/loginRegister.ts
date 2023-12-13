


const registerSignupDialog = document.querySelector<HTMLDialogElement>("#registerSignup");
const openRegisterBtn = document.getElementById("open_register") as HTMLButtonElement;
const closeRegisterBtn = document.getElementById("close_register") as HTMLButtonElement;
const tabContents = document.querySelectorAll(".tab-content");



const registerElements = registerSignupDialog?.querySelectorAll(
  'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
);
const firstRegisterElement = registerElements ? registerElements[0] : null;
const lastRegisterElement = registerElements ? registerElements[registerElements.length - 1] : null;

const trapRegisterFocus = (e: KeyboardEvent) => {
  // Your focus trapping logic for the registration dialog
};

const openRegisterDialog = () => {
  if (registerSignupDialog) {
    registerSignupDialog.showModal();
    tabContents.forEach(content => {
      (content as HTMLElement).style.display = "none"; // Hide all tab contents
    });
    const signupContent = document.getElementById("signupContent");
    if (signupContent) {
      signupContent.style.display = "block"; // Show only signup content
    }
    const signupTab = document.getElementById("signupTab");
    if (signupTab) {
      signupTab.classList.add("active"); // Set signup tab as active
    }
    if (registerSignupDialog) {
      registerSignupDialog.addEventListener("keydown", trapRegisterFocus);
    }
    const loginInput = document.getElementById("loginInput");
    if (loginInput) {
      loginInput.style.display = "block";
    }
  }
};

const closeRegisterDialog = (e: Event) => {
  e.preventDefault();
  if (registerSignupDialog) {
    registerSignupDialog.close();
    registerSignupDialog.removeEventListener("keydown", trapRegisterFocus);
    if (openRegisterBtn) {
      openRegisterBtn.focus();
    }
  }
};

function switchTab(event: Event, tabName: string) {
  const tabContent = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContent.length; i++) {
    (tabContent[i] as HTMLElement).style.display = "none";
  }
  const selectedTab = document.getElementById(tabName);
  if (selectedTab) {
    selectedTab.style.display = "block";
  }
}

(window as any).switchTab = switchTab;

openRegisterBtn.addEventListener("click", openRegisterDialog);
closeRegisterBtn.addEventListener("click", closeRegisterDialog);
