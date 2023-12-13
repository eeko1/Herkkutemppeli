const shoppingCartDialog: HTMLElement = document.getElementById("shoppingCartDialog") as HTMLElement;
const openDialogBtn: HTMLElement = document.getElementById("open_dialog") as HTMLElement;
const closeDialogBtn: HTMLElement = shoppingCartDialog.querySelector(".dialogClose") as HTMLElement;
const checkoutBtn: HTMLElement = shoppingCartDialog.querySelector("#checkout-btn") as HTMLElement;
let totalCost: number = 0;
let cartIds: Array<{ product_id: number | string }> = [];

const elements: NodeListOf<HTMLElement> = shoppingCartDialog.querySelectorAll(
  'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
) as NodeListOf<HTMLElement>;
const firstElement: HTMLElement = elements[0];
const lastElement: HTMLElement = elements[elements.length - 1];

document.addEventListener("DOMContentLoaded", fetchAllProducts);

const trapFocus = (e: KeyboardEvent): void => {
  if (e.key === "Tab") {
    const tabForwards: boolean = !e.shiftKey && document.activeElement === lastElement;
    const tabBackwards: boolean = e.shiftKey && document.activeElement === firstElement;
    if (tabForwards) {
      e.preventDefault();
      firstElement.focus();
    } else if (tabBackwards) {
      e.preventDefault();
      lastElement.focus();
    }
  }
};

const openShoppingCartDialog = (): void => {
  shoppingCartDialog.showModal();
  shoppingCartDialog.addEventListener("keydown", trapFocus);
};

const closeShoppingCartDialog = (e: Event): void => {
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
  const latestOrderData = await latestOrderResponse.json() as { latestOrderId: number };
  const orderUserId: string | null = getOrderUserId();
  const latestOrderId: number = latestOrderData.latestOrderId + 1;
  const orderData = {
    order_id: latestOrderId,
    products: cartIds,
    user_id: orderUserId,
  };

  try {
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

    if (!orderResponse.ok) {
      throw new Error('Order creation failed');
    }

    console.log("Order created successfully!");

    // Now that the order is created, proceed with checkout
    const checkoutResponse = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!checkoutResponse.ok) {
      throw new Error('Checkout failed');
    }

    console.log("Checkout and ticket creation successful!");
    closeShoppingCartDialog(e);
    clearShoppingCart();
    cartIds = [];
    alert("We have successfully received your order!");
  } catch (error) {
    console.error("Error during checkout:", error);
  }
});


function getOrderUserId(): string | null {
  return localStorage.getItem("userId");
}

function searchItemId(): void {
  let productList: HTMLElement = document.getElementById("product-list") as HTMLElement;
  let items: NodeListOf<HTMLElement> = productList.querySelectorAll(".items");

  items.forEach((item: HTMLElement) => {
    let cartDetailsDiv: HTMLElement = item.querySelector(".cartDetailsDiv") as HTMLElement;
    let itemName: string = cartDetailsDiv.textContent!.trim().split(" - ")[0];

    let matchingItems: Array<any> = allProducts.filter(
      (product: any) => product.product_name === itemName
    );

    matchingItems.forEach((matchingItem: any) => {
      for (let i = 0; i < parseInt(item.querySelector(".quantity")!.textContent!); i++) {
        cartIds.push({ product_id: matchingItem.product_id });
      }
    });
  });
}

function fetchAllProducts(): void {
  fetch("http://localhost:3000/api/products")
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((products: Array<any>) => {
      allProducts = products;
    })
    .catch((error: Error) => {
      console.error("Error fetching products:", error);
    });
}

function clearShoppingCart(): void {
  const productList: HTMLElement = document.getElementById("product-list") as HTMLElement;
  productList.innerHTML = ""; // Remove all child elements
  totalCost = 0;
  updateTotalCost(totalCost);
}

function updateTotalCost(totalCost: number): void {
  // Update the HTML element displaying the total cost
  const totalCostElement: HTMLElement = document.getElementById("total-cost") as HTMLElement;
  const transportCost: number = 5;
  const grandTotal: number = totalCost + transportCost;
  totalCostElement.textContent = `Total Cost: ${grandTotal.toFixed(2)}€ (fee included)`;
}

function addToCart(productName: string, productPrice: string, productImage: string): void {
  console.log("Added to cart:", productName, productPrice, productImage);
  const productList: HTMLElement = document.getElementById("product-list") as HTMLElement;
  const existingItems: NodeListOf<HTMLElement> = productList.querySelectorAll(".cartDetailsDiv");

  for (const item of existingItems) {
    const existingItemName: string = item.textContent!.split(" - ")[0];
    if (existingItemName === productName) {
      const quantitySpan: HTMLElement = item.closest(".items")!.querySelector(".quantity") as HTMLElement;
      let quantity: number = parseInt(quantitySpan.textContent!);
      quantity++;
      quantitySpan.textContent = quantity.toString();

      totalCost += parseFloat(productPrice);
      updateTotalCost(totalCost);
      return;
    }
  }

  const listItem: HTMLElement = document.createElement("li");
  listItem.classList.add("items");

  const productImageDiv: HTMLElement = document.createElement("div");
  productImageDiv.classList.add("cartImageDiv");
  const productImageElement: HTMLImageElement = document.createElement("img");
  productImageElement.src = productImage;
  productImageElement.alt = "Product Image";
  productImageElement.classList.add("cartImage");
  productImageDiv.appendChild(productImageElement);
  listItem.appendChild(productImageDiv);

  const productDetailsDiv: HTMLElement = document.createElement("div");
  productDetailsDiv.classList.add("cartDetailsDiv");
  productDetailsDiv.textContent = `${productName} - ${productPrice}`;
  listItem.appendChild(productDetailsDiv);

  const quantityControlsDiv: HTMLElement = document.createElement("div");
  quantityControlsDiv.classList.add("quantity-controls");

  const decreaseButton: HTMLButtonElement = document.createElement("button");
  decreaseButton.classList.add("quantity-btn");
  decreaseButton.textContent = "-";
  decreaseButton.addEventListener("click", () => handleQuantityChange(listItem, productPrice, -1));
  quantityControlsDiv.appendChild(decreaseButton);

  const quantitySpan: HTMLElement = document.createElement("span");
  quantitySpan.classList.add("quantity");
  quantitySpan.textContent = "1"; // Initial quantity
  quantityControlsDiv.appendChild(quantitySpan);

  const increaseButton: HTMLButtonElement = document.createElement("button");
  increaseButton.classList.add("quantity-btn");
  increaseButton.textContent = "+";
  increaseButton.addEventListener("click", () => handleQuantityChange(listItem, productPrice, 1));
  quantityControlsDiv.appendChild(increaseButton);

  listItem.appendChild(quantityControlsDiv);

  productList.appendChild(listItem);

  totalCost += parseFloat(productPrice);
  updateTotalCost(totalCost);
}

function handleQuantityChange(item: HTMLElement, productPrice: string, change: number): void {
  const quantitySpan: HTMLElement = item.querySelector(".quantity") as HTMLElement;
  let quantity: number = parseInt(quantitySpan.textContent!);
  quantity += change;

  if (quantity < 0) {
    quantity = 0;
  }

  quantitySpan.textContent = quantity.toString();

  if (quantity === 0) {
    item.remove();
  }

  totalCost += parseFloat(productPrice) * change;
  updateTotalCost(totalCost);
}

