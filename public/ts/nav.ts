document.addEventListener("DOMContentLoaded", () => {
  function scrollToFooter(): void {
    const footer = document.querySelector<HTMLElement>(".footer");
    if (footer) {
      footer.scrollIntoView();
    }
  }

  function scrollToProducts(): void {
    console.log("test");
    const products = document.querySelector<HTMLElement>(".products");
    if (products) {
      products.scrollIntoView();
    }
  }

  // Event listeners for each button
  const aboutUsButton = document.getElementById("aboutus");
  if (aboutUsButton) {
    aboutUsButton.addEventListener("click", () => {
      scrollToFooter();
    });
  }

  const productsButton = document.getElementById("productsbtn");
  if (productsButton) {
    productsButton.addEventListener("click", () => {
      scrollToProducts();
    });
  }

  const scrollDownButton = document.querySelector(".scrolldown");
  if (scrollDownButton) {
    scrollDownButton.addEventListener("click", () => {
      scrollToProducts();
    });
  }
});
