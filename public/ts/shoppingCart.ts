const shoppingCartDialog = document.getElementById("shoppingCartDialog") as HTMLDialogElement;
const openDialogBtn = document.getElementById("open_dialog") as HTMLElement;
const closeDialogBtn = shoppingCartDialog.querySelector(".dialogClose") as HTMLElement;
const checkoutBtn = shoppingCartDialog.querySelector("#checkout-btn") as HTMLElement;
let totalCost = 0;
let cartIds: { product_id: string }[] = [];

const elements = shoppingCartDialog.querySelectorAll(
  'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
);
const firstElement = elements[0] as HTMLElement;
const lastElement = elements[elements.length - 1] as HTMLElement;

document.addEventListener("DOMContentLoaded", fetchAllProducts);

const trapFocus = (e: KeyboardEvent) => {
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

const closeShoppingCartDialog = (e: Event) => {
  e.preventDefault();
  shoppingCartDialog.close();
  shoppingCartDialog.removeEventListener("keydown", trapFocus);
  openDialogBtn.focus();
};

openDialogBtn.addEventListener("click", openShoppingCartDialog);
closeDialogBtn.addEventListener("click", closeShoppingCartDialog);
checkoutBtn.addEventListener("click", async (e: Event) => {
  searchItemId();
  if (totalCost === 0) {
    alert("You need to add products to the shopping cart first!");
    return;
  }

  const latestOrderResponse = await fetch("/api/latest-order-id");
  const latestOrderData = await latestOrderResponse.json();
  console.log(latestOrderData, "latestOrderData");
  const orderUserId = getOrderUserId();
  const latestOrderId = latestOrderData.latestOrderId + 1;
  const orderData = {
    order_id: latestOrderId,
    products: cartIds,
    user_id: orderUserId,
  };

  try {
    // Send a POST request to create an order in the database

    const orderResponse = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: orderData.order_id,
        user_id: orderData.user_id,
      }),
    });

    if (orderResponse.ok) {
      console.log("Order created successfully!");

      // Now that the order is created, proceed with checkout
      const checkoutResponse = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (checkoutResponse.ok) {
        console.log("Checkout and ticket creation successful!");
        closeShoppingCartDialog(e);
        clearShoppingCart();
        cartIds = [];
        alert("We have succesfully received your order!");
      } else {
        console.error("Checkout failed");
        // Handle the checkout error
      }
    } else {
      console.error("Order creation failed");
      // Handle the order creation error
    }
  } catch (error) {
    console.error("Error during checkout:", error);
    // Handle the error
  }
});

function getOrderUserId() {
  let userId = localStorage.getItem("userId");
  console.log(userId);
  return userId;
}

function searchItemId() {
  console.log(allProducts);
  let productList = document.getElementById("product-list");
  let items = productList?.querySelectorAll(".items");

  items?.forEach((item) => {
    let cartDetailsDiv = item.querySelector(".cartDetailsDiv");
    let itemName = cartDetailsDiv ? cartDetailsDiv.textContent?.trim().split(" - ")[0] || '' : '';


    let matchingItems = allProducts.filter(
      (product) => product.product_name === itemName
    );

    matchingItems.forEach((matchingItem) => {
      const quantityText = item.querySelector(".quantity")?.textContent || "0";
      const quantity = parseInt(quantityText);
    
      for (let i = 0; i < quantity; i++) {
        cartIds.push({ product_id: matchingItem.product_id.toString() });
      }
    });
    
  });
  console.log(cartIds);
}

function fetchAllProducts() {
  fetch("http://localhost:3000/api/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((products) => {
      allProducts = products;
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      displayErrorMessage();
    });
}

function clearShoppingCart() {
  const productList = document.getElementById("product-list");
  if (productList !== null) {
    productList.innerHTML = ""; // Remove all child elements
  }
  
  totalCost = 0;
  updateTotalCost(totalCost);
}

function updateTotalCost(totalCost: number) {
  // Update the HTML element displaying the total cost
  const totalCostElement = document.getElementById("total-cost");
  const transportCost = 5;
  const grandTotal = totalCost + transportCost;
  if (totalCostElement !== null) {
    totalCostElement.textContent = `Total Cost: ${grandTotal.toFixed(2)}€ (fee included)`;
  }
}


function addToCart(productName: string, productPrice: string, productImage: string) {
  // Perform actions to add the product to the shopping cart
  console.log("Added to cart:", productName, productPrice, productImage);
  const productList = document.getElementById("product-list");
  const existingItems = productList?.getElementsByClassName("cartDetailsDiv");

  for (const item of existingItems || []) {
    const existingItemName = (item.textContent || "").split(" - ")[0];
    if (existingItemName == productName) {
      const quantitySpan = (item.closest(".quantity-controls") as HTMLElement)?.querySelector(".quantity");
      let quantity = parseInt(quantitySpan?.textContent ?? "0", 10);
      quantity++;
      (quantitySpan ?? document.createElement('span')).textContent = quantity.toString();

      totalCost += parseFloat(productPrice);
      updateTotalCost(totalCost);
      return;
    }
  }

  const listItem = document.createElement("li");
  listItem.classList.add("items");

  const productImageDiv = document.createElement("div");
  productImageDiv.classList.add("cartImageDiv");
  const productImageElement = document.createElement("img");
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
    const quantitySpan = (decreaseButton.closest(".quantity-controls") as HTMLElement)?.querySelector(".quantity");
    let quantity = parseInt(quantitySpan?.textContent ?? "0", 10);

    if (quantity > 0) {
      quantity--;
      (quantitySpan ?? document.createElement('span')).textContent = quantity.toString();
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
    const quantitySpan = (increaseButton.closest(".quantity-controls") as HTMLElement)?.querySelector(".quantity");
    let quantity = parseInt(quantitySpan?.textContent ?? "0", 10);
    quantity++;
    totalCost += parseFloat(productPrice);
    updateTotalCost(totalCost);

    (quantitySpan ?? document.createElement('span')).textContent = quantity.toString();

  });

  increaseButton.textContent = "+";
  quantityControlsDiv.appendChild(increaseButton);

  listItem.appendChild(quantityControlsDiv);

  totalCost += parseFloat(productPrice);
  updateTotalCost(totalCost);

  // Append the new list item to the product list
  productList?.appendChild(listItem);
}
