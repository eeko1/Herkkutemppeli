document.addEventListener("DOMContentLoaded", function () {
  function scrollToFooter() {
    const footer = document.querySelector(".footer") as HTMLElement | null;
    footer?.scrollIntoView();
  }

  function scrollToProducts() {
    console.log("test");
    const products = document.querySelector(".products") as HTMLElement | null;
    products?.scrollIntoView();
  }

  // Event listeners for each button
  const aboutUsButton = document.getElementById("aboutus") as HTMLButtonElement | null;
  aboutUsButton?.addEventListener("click", function () {
    scrollToFooter();
  });

  const productsButton = document.getElementById("productsbtn") as HTMLButtonElement | null;
  productsButton?.addEventListener("click", function () {
    scrollToProducts();
  });

  const scrollDownButton = document.querySelector(".scrolldown") as HTMLButtonElement | null;
  scrollDownButton?.addEventListener("click", function () {
    scrollToProducts();
  });
});
