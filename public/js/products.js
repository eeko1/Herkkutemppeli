// Function to create HTML for each product
const createProductHTML = (product) => `
    <section class="product">
        <img src="./image/${product.product_image}" class="productImage" alt="${product.imageAlt}">
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
};

const displayErrorMessage = () => {
  const productsContainer = document.getElementById("productsContainer");
  productsContainer.innerHTML = "<p>Sorry, products were unable to load.</p>";
};

document.addEventListener("DOMContentLoaded", fetchAndRenderProducts);
