"use strict";
// Function to create HTML for each product
const createProductHTML = (product) => `
    <section class="product" style="position: relative;">
    <i class="fa-solid fa-gear productIcon" id="modifyProduct" onclick="openModifyProductModal(${product.product_id}, '${product.product_name}')" style="position: absolute; top: 5px; left: 5px; z-index: 1; color: white; padding: 8px; border-radius: 5px; font-size: 1.2em; cursor: pointer;"></i>
        <img src="./image/${product.product_image}" class="productImage" alt="${product.imageAlt}" style="position: relative; z-index: 0;">
        <h3 class="productName">${product.product_name}</h3>
        <p class="productsDescription">${product.product_description}</p>
        <div class="moreInfo">
            <p class="productAllergens">${product.product_allergens}</p>
            <p class="productPrice">${product.product_price}€</p>
            <button class="productAdd">&#43;</button>
        </div>
    </section>
`;
// Function to render all products to the DOM
const renderProducts = (products) => {
  const productsContainer = document.getElementById("productsContainer");
  const loadingMessage = document.getElementById("loadingMessage");
  // Check if productsContainer is not null or undefined before accessing innerHTML
  if (productsContainer) {
    productsContainer.innerHTML = ""; // Clear existing content
  }
  // Check if products array is not empty and loadingMessage is not null
  if (products.length > 0 && loadingMessage) {
    loadingMessage.style.display = "none";
  }
  // Use nullish coalescing operator to provide a default value for productsContainer
  (productsContainer ?? document.createElement("div")).innerHTML += products
    .map(createProductHTML)
    .join("");
};
let allProducts = [];
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/api/products");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const products = await response.json();
    allProducts = products;
    renderProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    displayErrorMessage();
  }
});
function checkButtons() {
  const addButtons = document.querySelectorAll(".productAdd");
  console.log("Number of buttons:", addButtons.length);
  const modifyProductBtns = document.querySelectorAll(".productIcon");
  if (localStorage.getItem("userLvlId") === "2") {
    console.log("Displaying the buttons");
    modifyProductBtns.forEach((button) => {
      button.style.display = "flex";
    });
  } else {
    console.log("Hiding the buttons");
    modifyProductBtns.forEach((button) => {
      button.style.display = "none";
    });
  }
  addButtons.forEach((button) => {
    // Use optional chaining to safely access properties
    const productElement = button.closest(".product");
    const productPrice =
      productElement?.querySelector(".productPrice")?.innerText;
    const productName =
      productElement?.querySelector(".productName")?.innerText;
    const productImage = productElement?.querySelector(".productImage")?.src;
    if (productPrice && productName && productImage) {
      // Add a click event listener to each button
      button.addEventListener("click", () => {
        console.log("Button clicked!");
        addToCart(productName, productPrice, productImage);
      });
    }
  });
  // Retry after a short delay if buttons are not found
  if (addButtons.length === 0) {
    console.log("Did not find buttons yet, retrying...");
    setTimeout(checkButtons, 100);
  }
}
// Function to fetch products from the server and render them
const fetchAndRenderProducts = async () => {
  try {
    const response = await fetch("/api/products");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const products = await response.json();
    allProducts = products;
    renderProducts(products);
    checkButtons();
  } catch (error) {
    console.error("Error fetching products:", error);
    displayErrorMessage();
  }
};
const filterProducts = (categoryId) => {
  const filteredProducts =
    categoryId === "all"
      ? allProducts
      : allProducts.filter(
          (product) => product.product_category_id === categoryId
        );
  renderProducts(filteredProducts);
  checkButtons();
};
const displayErrorMessage = () => {
  const productsContainer = document.getElementById("productsContainer");
  if (!productsContainer) {
    return;
  }
  productsContainer.innerHTML = "<p>Sorry, products were unable to load.</p>";
};
document.addEventListener("DOMContentLoaded", fetchAndRenderProducts);
