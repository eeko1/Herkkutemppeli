class ShoppingCartModel {
  constructor() {
    this.totalCost = 0;
    this.cartIds = [];
    this.allProducts = [];
  }

  setAllProducts(products) {
    this.allProducts = products;
  }

  addToCart(productName, productPrice, productImage) {
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

        this.totalCost += parseFloat(productPrice);
        this.updateTotalCost();
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

  removeFromCart(productId) {
    // Find the product in the cart
    const productIndex = this.cartIds.findIndex(
      (p) => p.product_id === productId
    );

    if (productIndex > -1) {
      // Decrease the quantity or remove the item if quantity is 1
      if (this.cartIds[productIndex].quantity > 1) {
        this.cartIds[productIndex].quantity--;
        this.totalCost -= this.allProducts.find(
          (p) => p.product_id === productId
        ).product_price;
      } else {
        this.totalCost -= this.allProducts.find(
          (p) => p.product_id === productId
        ).product_price;
        this.cartIds.splice(productIndex, 1);
      }
    }
  }

  clearShoppingCart() {
    this.cartIds = [];
    this.totalCost = 0;
  }

  getCartDetails() {
    return this.cartIds.map((item) => {
      const product = this.allProducts.find(
        (p) => p.product_id === item.product_id
      );
      return {
        ...item,
        productName: product.product_name,
        productPrice: product.product_price,
      };
    });
  }

  getTotalCost() {
    return this.totalCost;
  }
}

// Export the model class
export { ShoppingCartModel };
