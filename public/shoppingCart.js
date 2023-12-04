const shoppingCartDialog = document.getElementById("shoppingCartDialog");
const openDialogBtn = document.getElementById("open_dialog");
const closeDialogBtn = shoppingCartDialog.querySelector(".dialogClose");
const checkoutBtn = shoppingCartDialog.querySelector("#checkout-btn");
let totalCost = 0;

const elements = shoppingCartDialog.querySelectorAll(
  'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
);
const firstElement = elements[0];
const lastElement = elements[elements.length - 1];

const trapFocus = (e) => {
  if (e.key === "Tab") {
    const tabForwards = !e.shiftKey && document.activeElement === lastElement;
    const tabBackwards = e.shiftKey && document.activeElement === firstElement;
    if (tabForwards) {
      e.preventDefault();
      firstElement.focus();
    } else if (tabBackwards) {
      e.preventDefault();
      lastElement.focus();
    }
  }
};

const openShoppingCartDialog = () => {
  shoppingCartDialog.showModal();
  shoppingCartDialog.addEventListener("keydown", trapFocus);
};

const closeShoppingCartDialog = (e) => {
  e.preventDefault();
  shoppingCartDialog.close();
  shoppingCartDialog.removeEventListener("keydown", trapFocus);
  openDialogBtn.focus();
};

openDialogBtn.addEventListener("click", openShoppingCartDialog);
closeDialogBtn.addEventListener("click", closeShoppingCartDialog);
checkoutBtn.addEventListener("click", async (e) => {
  if (totalCost === 0) {
    alert("You need to add products to the shopping cart first!");
    return;
  }

  const mockOrderData = {
    order_id: 1, // Replace with the actual orderId
    product_id: 1, // Replace with the actual productId
  };

  try {
    // Send a POST request to your server with mock order data
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mockOrderData),
    });

    if (response.ok) {
      console.log("Checkout successful!");
      closeShoppingCartDialog(e);
      clearShoppingCart();
    } else {
      console.error("Checkout failed");
      // Handle the error
    }
  } catch (error) {
    console.error("Error during checkout:", error);
    // Handle the error
  }
});

function createProductHTML(product) {
  return `
    <section class="product">
      <img src="./style/image/${
        product.product_image
      }" class="productImage" alt="${product.imageAlt}">
      <h3 class="productName">${product.product_name}</h3>
      <p class="productsDescription">${product.product_description}</p>
      <div class="moreInfo">
        <p class="productAllergens">${product.product_allergens}</p>
        <p class="productPrice">${product.product_price}€</p>
        <button class="productAdd" data-product="${JSON.stringify(
          product
        )}">&#43;</button>
      </div>
    </section>
  `;
}

function clearShoppingCart() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; // Remove all child elements
  totalCost = 0;
  updateTotalCost(totalCost);
}

function updateTotalCost(totalCost) {
  // Update the HTML element displaying the total cost
  const totalCostElement = document.getElementById("total-cost");
  const transportCost = 5;
  const grandTotal = totalCost + transportCost;
  totalCostElement.textContent = `Total Cost: ${grandTotal.toFixed(
    2
  )}€ (fee included)`;
}
function addToCart(productName, productPrice, productImage) {
  // Perform actions to add the product to the shopping cart
  console.log("Added to cart:", productName, productPrice, productImage);
  const productList = document.getElementById("product-list");
  const existingItems = productList.getElementsByClassName("cartDetailsDiv");

  for (const item of existingItems) {
    const existingItemName = item.textContent.split(" - ")[0];
    if (existingItemName == productName) {
      const quantitySpan = item.closest(".items").querySelector(".quantity");
      let quantity = parseInt(quantitySpan.textContent);
      quantity++;
      quantitySpan.textContent = quantity;

      totalCost += parseFloat(productPrice);
      updateTotalCost(totalCost);
      return;
    }
  }

  const listItem = document.createElement("li");
  listItem.classList.add("items");

  const productImageDiv = document.createElement("div");
  productImageDiv.classList.add("cartImageDiv");
  productImageElement = document.createElement("img");
  productImageElement.src = productImage;
  productImageElement.alt = "Product Image";
  productImageElement.classList.add("cartImage");
  productImageDiv.appendChild(productImageElement);
  listItem.appendChild(productImageDiv);

  const productDetailsDiv = document.createElement("div");
  productDetailsDiv.classList.add("cartDetailsDiv");
  productDetailsDiv.textContent = `${productName} - ${productPrice}`;
  listItem.appendChild(productDetailsDiv);

  // Add quantity controls
  const quantityControlsDiv = document.createElement("div");
  quantityControlsDiv.classList.add("quantity-controls");
  const decreaseButton = document.createElement("button");
  decreaseButton.addEventListener("click", () => {
    console.log("decrease clicked");
    const quantitySpan = decreaseButton
      .closest(".quantity-controls")
      .querySelector(".quantity");
    let quantity = parseInt(quantitySpan.textContent);

    if (quantity > 0) {
      quantity--;
      quantitySpan.textContent = quantity;
      totalCost -= parseFloat(productPrice);
      updateTotalCost(totalCost);

      if (quantity == 0) {
        listItem.remove();
      }
    }
  });
  decreaseButton.classList.add("quantity-btn");
  decreaseButton.textContent = "-";
  quantityControlsDiv.appendChild(decreaseButton);

  const quantitySpan = document.createElement("span");
  quantitySpan.classList.add("quantity");
  quantitySpan.textContent = "1"; // Initial quantity
  quantityControlsDiv.appendChild(quantitySpan);

  const increaseButton = document.createElement("button");
  increaseButton.classList.add("quantity-btn");
  increaseButton.addEventListener("click", () => {
    console.log("increase clicked");
    const quantitySpan = increaseButton
      .closest(".quantity-controls")
      .querySelector(".quantity");
    let quantity = parseInt(quantitySpan.textContent);
    quantity++;
    totalCost += parseFloat(productPrice);
    updateTotalCost(totalCost);

    quantitySpan.textContent = quantity;
  });

  increaseButton.textContent = "+";
  quantityControlsDiv.appendChild(increaseButton);

  listItem.appendChild(quantityControlsDiv);

  totalCost += parseFloat(productPrice);
  updateTotalCost(totalCost);

  // Append the new list item to the product list
  productList.appendChild(listItem);
}
