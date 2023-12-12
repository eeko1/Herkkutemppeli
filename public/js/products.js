import { ShoppingCartModel } from "../../src/models/shoppingCart-model.js";

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
  productsContainer.innerHTML = ""; // Clear existing content

  if (products.length > 0 && loadingMessage) {
    loadingMessage.style.display = "none";
  }

  productsContainer.innerHTML += products.map(createProductHTML).join("");
};

let allProducts = [];

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

  if (addButtons.length > 0) {
    // Add a click event listener to each button
    addButtons.forEach((button) => {
      const productPrice = button
        .closest(".product")
        .querySelector(".productPrice").innerText;
      const productName = button
        .closest(".product")
        .querySelector(".productName").innerText;
      const productImage = button
        .closest(".product")
        .querySelector(".productImage").src;

      button.addEventListener("click", () => {
        console.log("Button clicked!");
        ShoppingCartModel, addToCart(productName, productPrice, productImage);
      });
    });
  } else {
    // Retry after a short delay if buttons are not found
    console.log("did not find buttons yet, retrying...");
    setTimeout(checkButtons, 100);
  }
}

// Function to fetch products from the server and render them
const fetchAndRenderProducts = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/products");
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
  productsContainer.innerHTML = "<p>Sorry, products were unable to load.</p>";
};

document.addEventListener(
  "DOMContentLoaded",
  fetchAndRenderProducts,
  checkButtons()
);
