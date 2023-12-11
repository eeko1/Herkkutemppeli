// Function to open the modify product modal and populate it with product data
function openModifyProductModal(productId, productName) {
  const modal = document.getElementById("modifyProductModal");
  const productNameField = document.getElementById("productName");
  const newProductNameField = document.getElementById("newProductName");
  const newProductDescription = document.getElementById(
    "newProductDescription"
  );
  const newProductImage = document.getElementById("newProductImage");
  const newProductCategory = document.getElementById("newProductCategory");
  const newProductAllergens = document.getElementById("newProductAllergens");
  const newProductPrice = document.getElementById("newProductPrice");

  // Fetch the product data from the server (assuming the endpoint exists)
  fetch(`http://localhost:3000/api/products/${productId}`)
    .then((response) => response.json())
    .then((product) => {
      productNameField.value = product.product_name;
      newProductNameField.value = product.product_name;
      newProductDescription.value = product.product_description;
      // Handle product image, category, allergens, price similarly
      // ...

      modal.showModal(); // Open the modal
    })
    .catch((error) => console.error("Error fetching product data:", error));
}

// Function to modify product information
function modifyProductInfo() {
  // Get the product ID and new data from the modal fields
  // ...

  // Send the updated data to the server (PUT or PATCH request)
  fetch(`http://localhost:3000/api/products/${productId}`, {
    method: "PUT", // or 'PATCH'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productName: newProductName,
      productDescription: newProductDescription,
      // Include other fields as necessary
      // ...
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((updatedProduct) => {
      console.log("Product updated:", updatedProduct);
      // Optionally, refresh the products list or update the UI
      // ...
    })
    .catch((error) => console.error("Error updating product:", error));
}

// Function to close the modify product modal
function closeModifyProductModal() {
  const modal = document.getElementById("modifyProductModal");
  modal.close();
}
