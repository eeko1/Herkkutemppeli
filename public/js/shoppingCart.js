class ShoppingCartView {
  constructor(controller, model) {
    this.controller = controller;
    this.model = model;

    // DOM elements
    this.shoppingCartDialog = document.getElementById("shoppingCartDialog");
    this.openDialogBtn = document.getElementById("open_dialog");
    this.closeDialogBtn = this.shoppingCartDialog.querySelector(".dialogClose");
    this.checkoutBtn = this.shoppingCartDialog.querySelector("#checkout-btn");
    this.productList = document.getElementById("product-list");
    this.totalCostElement = document.getElementById("total-cost");

    // Bind event listeners
    this.closeDialogBtn.addEventListener("click", () =>
      controller.closeShoppingCartDialog(event)
    );
    this.checkoutBtn.addEventListener("click", () => controller.checkout());
  }

  bindOpenDialogButton(callback) {
    this.openDialogBtn.addEventListener("click", callback);
  }

  bindCloseDialogButton(callback) {
    this.closeDialogBtn.addEventListener("click", callback);
  }

  bindCheckoutButton(callback) {
    this.checkoutBtn.addEventListener("click", callback);
  }

  bindTrapFocus(callback) {
    this.shoppingCartDialog.addEventListener("keydown", callback);
  }

  unbindTrapFocus(callback) {
    this.shoppingCartDialog.removeEventListener("keydown", callback);
  }

  showModal() {
    this.shoppingCartDialog.showModal();
  }

  closeModal() {
    this.shoppingCartDialog.close();
  }

  refocusOpenDialogButton() {
    this.openDialogBtn.focus();
  }

  renderProducts(products) {
    // Render products to the DOM
    this.productList.innerHTML = products
      .map((product) => this.createProductHTML(product))
      .join("");
  }

  updateCart(cartDetails) {
    // Update the cart UI
    // This includes updating the list of items and the total cost
  }

  displayErrorMessage(error) {
    // Display error messages to the user
  }

  createProductHTML(product) {
    // Return HTML string for a single product
    return `
            <section class="product">
                <img src="./style/image/${
                  product.product_image
                }" class="productImage" alt="${product.imageAlt}">
                <h3 class="productName">${product.product_name}</h3>
                <p class="productsDescription">${
                  product.product_description
                }</p>
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
}

// Export the view class
export { ShoppingCartView };
