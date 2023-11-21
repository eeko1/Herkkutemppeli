const dialog = document.querySelector("dialog");
const openRegisterBtn = document.getElementById("open_register");
const closeRegisterBtn = document.getElementById("close_register");

const elements = dialog.querySelectorAll(
  'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
);
const firstElement = elements[0];
const lastElement = elements[elements.length - 1];

const trapFocus = (e) => {
  if (e.key === "Tab") {
    const tabForwards = !e.shiftKey && document.activeElement === lastElement;
    const tabBackwards = e.shiftKey && document.activeElement === firstElement;
    if (tabForwards) {
      // only TAB is pressed, not SHIFT simultaneously
      // Prevent default behavior of keydown on TAB (i.e. focus next element)
      e.preventDefault();
      firstElement.focus();
    } else if (tabBackwards) {
      // TAB and SHIFT are pressed simultaneously
      e.preventDefault();
      lastElement.focus();
    }
  }
};

const openDialog = () => {
  dialog.showModal();
  dialog.addEventListener("keydown", trapFocus);
};

const closeDialog = (e) => {
  e.preventDefault();
  dialog.close();
  dialog.removeEventListener("keydown", trapFocus);
  openDialogBtn.focus();
};

openRegisterBtn.addEventListener("click", openDialog);
closeRegisterBtn.addEventListener("click", closeDialog);


function switchTab(event, tabName) {
  var i, tabContent;
  tabContent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";
}

document.getElementById("loginInput").style.display = "block";
