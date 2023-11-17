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

  function filterProducts(categoryId) {
    let filteredProducts;
    if (categoryId === 'all') {
      filteredProducts = allProducts;
    } else {
      filteredProducts = allProducts.filter(product => product.product_category_id === categoryId);
    }
    renderProducts(filteredProducts);
  }
  
  function displayErrorMessage() {
    const productsContainer = document.getElementById("productsContainer");
    productsContainer.innerHTML = "<p>Sorry, products were unable to load.</p>";
  }
  
  // Call the fetchAndRenderProducts function when the page loads
  document.addEventListener("DOMContentLoaded", fetchAndRenderProducts);
  