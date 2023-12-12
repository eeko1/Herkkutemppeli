// Imports
import { ShoppingCartModel } from "./shoppingCart-model.js";
import { ShoppingCartView } from "./shoppingCart-view.js";

class ShoppingCartController {
  constructor() {
    this.model = new ShoppingCartModel();
    this.view = new ShoppingCartView(this, this.model);

    // Bind methods
    this.openShoppingCartDialog = this.openShoppingCartDialog.bind(this);
    this.closeShoppingCartDialog = this.closeShoppingCartDialog.bind(this);
    this.checkout = this.checkout.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.fetchAllProducts = this.fetchAllProducts.bind(this);
    this.trapFocus = this.trapFocus.bind(this);

    // Event Listeners
    document.addEventListener("DOMContentLoaded", this.fetchAllProducts);
    this.view.bindOpenDialogButton(this.openShoppingCartDialog);
    this.view.bindCloseDialogButton(this.closeShoppingCartDialog);
    this.view.bindCheckoutButton(this.checkout);
  }

  async fetchAllProducts() {
    try {
      const response = await fetch("http://localhost:3000/api/products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const products = await response.json();
      this.model.setAllProducts(products);
      this.view.renderProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      this.view.displayErrorMessage(error);
    }
  }

  addToCart(productName, productPrice, productImage) {
    this.model.addToCart(productName, productPrice, productImage);
    this.view.updateCart(this.model.getCartDetails());
  }

  async checkout() {
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
  }

  openShoppingCartDialog() {
    this.view.showModal();
    this.view.bindTrapFocus(this.trapFocus);
  }

  closeShoppingCartDialog(e) {
    e.preventDefault();
    this.view.closeModal();
    this.view.unbindTrapFocus(this.trapFocus);
    this.view.refocusOpenDialogButton();
  }

  trapFocus(e) {
    const elements = this.view.shoppingCartDialog.querySelectorAll(
      'a, button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])'
    );
    const firstElement = elements[0];
    const lastElement = elements[elements.length - 1];
    if (e.key === "Tab") {
      const tabForwards = !e.shiftKey && document.activeElement === lastElement;
      const tabBackwards =
        e.shiftKey && document.activeElement === firstElement;
      if (tabForwards) {
        e.preventDefault();
        firstElement.focus();
      } else if (tabBackwards) {
        e.preventDefault();
        lastElement.focus();
      }
    }
  }
}

// Export the controller class
export { ShoppingCartController };

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  const controller = new ShoppingCartController();
});
