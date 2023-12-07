// Function to create HTML for each product
function createProductHTML(product) {
  return `
        <section class="product">
            <img src="./style/image/${product.product_image}" class="productImage" alt="${product.imageAlt}">
            <h3 class="productName">${product.product_name}</h3>
            <p class="productsDescription">${product.product_description}</p>
            <div class="moreInfo">
                <p class="productAllergens">${product.product_allergens}</p>
                <p class="productPrice">${product.product_price}€</p>
                <button class="productAdd">&#43;</button>
            </div>
        </section>
    `;
}

// Function to render all products to the DOM
function renderProducts(products) {
  const productsContainer = document.getElementById("productsContainer");
  const loadingMessage = document.getElementById("loadingMessage");
  productsContainer.innerHTML = ""; // Clear existing content

  // Check if products are loaded and hide the loading message
  if (products.length > 0 && loadingMessage) {
    loadingMessage.style.display = "none";
  }

  productsContainer.innerHTML += products.map(createProductHTML).join("");
}

let allProducts = []; // Array to store all products

// Function to fetch products from the server and render them
function fetchAndRenderProducts() {
  fetch("http://localhost:3000/api/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((products) => {
      allProducts = products;
      renderProducts(products);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      displayErrorMessage();
    });
}

function checkButtons() {
  const addButtons = document.querySelectorAll(".productAdd");
  console.log("Number of buttons:", addButtons.length);

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
        addToCart(productName, productPrice, productImage);
      });
    });
  } else {
    // Retry after a short delay if buttons are not found
    console.log("did not find buttons yet, retrying...");
    setTimeout(checkButtons, 100);
  }
}

function filterProducts(categoryId) {
  let filteredProducts;
  if (categoryId === "all") {
    filteredProducts = allProducts;
  } else {
    filteredProducts = allProducts.filter(
      (product) => product.product_category_id === categoryId
    );
  }
  renderProducts(filteredProducts);
  checkButtons();
}

function displayErrorMessage() {
  const productsContainer = document.getElementById("productsContainer");
  productsContainer.innerHTML = "<p>Sorry, products were unable to load.</p>";
}

// Call the fetchAndRenderProducts function when the page loads
document.addEventListener("DOMContentLoaded", fetchAndRenderProducts);

// Call the checkButtons function when the page loads
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded event triggered");

  checkButtons();
});
