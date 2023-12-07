document.addEventListener("DOMContentLoaded", function () {
  function scrollToFooter() {
    const footer = document.querySelector(".footer");
    if (footer) {
      footer.scrollIntoView();
    }
  }

  function scrollToProducts() {
    console.log("test");
    const products = document.querySelector(".products");
    if (products) {
      products.scrollIntoView();
    }
  }

  // Event listeners for each button
  document.getElementById("aboutus").addEventListener("click", function () {
    scrollToFooter();
  });

  document.getElementById("productsbtn").addEventListener("click", function () {
    scrollToProducts();
  });
});
