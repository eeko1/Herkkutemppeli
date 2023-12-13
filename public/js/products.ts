// Assuming an interface for the product
interface Product {
  product_id: string;
  product_name: string;
  product_description: string;
  product_image: string;
  imageAlt: string;
  product_allergens: string;
  product_price: number;
  product_category_id: string; // Assuming this property exists
}

// Function to create HTML for each product
const createProductHTML = (product: Product): string => `
    <section class="product" style="position: relative;">
    <i class="fa-solid fa-gear productIcon" id="modifyProduct" onclick="openModifyProductModal('${product.product_id}', '${product.product_name}')" style="position: absolute; top: 5px; left: 5px; z-index: 1; color: white; padding: 8px; border-radius: 5px; font-size: 1.2em; cursor: pointer;"></i>
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
const renderProducts = (products: Product[]): void => {
  const productsContainer = document.getElementById("productsContainer");
  const loadingMessage = document.getElementById("loadingMessage");
  if (!productsContainer || !loadingMessage) return;

  productsContainer.innerHTML = ""; // Clear existing content
  loadingMessage.style.display = products.length > 0 ? "none" : "block";
  productsContainer.innerHTML += products.map(createProductHTML).join("");
};

let allProducts: Product[] = [];

function checkButtons(): void {
  const addButtons = document.querySelectorAll(".productAdd");
  console.log("Number of buttons:", addButtons.length);
  const modifyProductBtns = document.querySelectorAll(".productIcon");

  modifyProductBtns.forEach((button) => {
    (button as HTMLElement).style.display = localStorage.getItem("userLvlId") === "2" ? "flex" : "none";
  });

  addButtons.forEach((button) => {
    const productElement = (button as HTMLElement).closest(".product");
    if (!productElement) return;

    const productPrice = productElement.querySelector(".productPrice")?.textContent;
    const productName = productElement.querySelector(".productName")?.textContent;
    const productImage = productElement.querySelector(".productImage")?.getAttribute('src');

    button.addEventListener("click", () => {
      console.log("Button clicked!");
      if (productName && productPrice && productImage) {
        addToCart(productName, productPrice, productImage);
      }
    });
  });
}

// Function to fetch products from the server and render them
const fetchAndRenderProducts = async (): Promise<void> => {
  try {
    const response = await fetch("http://localhost:3000/api/products");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const products: Product[] = await response.json();
    allProducts = products;
    renderProducts(products);
    checkButtons();
  } catch (error) {
    console.error("Error fetching products:", error);
    displayErrorMessage();
  }
};

const filterProducts = (categoryId: string): void => {
  const filteredProducts = categoryId === "all"
    ? allProducts
    : allProducts.filter((product) => product.product_category_id === categoryId);

  renderProducts(filteredProducts);
};

const displayErrorMessage = (): void => {
  const productsContainer = document.getElementById("productsContainer");
  if (productsContainer) {
    productsContainer.innerHTML = "<p>Sorry, products were unable to load.</p>";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  fetchAndRenderProducts();
  checkButtons();
});
