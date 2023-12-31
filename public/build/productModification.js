"use strict";
// Function to open the modify product modal and populate it with product data
function openModifyProductModal(productId, productName) {
  console.log("current product:", productId, productName);
  const modal = document.getElementById("modifyProductModal");
  const productNameField = document.getElementById("productName");
  const newProductNameField = document.getElementById("newProductName");
  const newProductDescription = document.getElementById(
    "newProductDescription"
  );
  const newProductCategory =
    document.getElementById("newProductCategory").value;
  const newProductAllergens = document.getElementById("newProductAllergens");
  const newProductPrice = document.getElementById("newProductPrice");
  fetch(
    `https://herkkutemppelijami.northeurope.cloudapp.azure.com/api/products/${productId}`
  )
    .then((response) => response.json())
    .then((product) => {
      productNameField.value = product.product_name;
      newProductNameField.value = product.product_name;
      newProductDescription.value = product.product_description;
      modal.setAttribute("data-product-id", productId);
      modal.showModal();
    })
    .catch((error) => console.error("Error fetching product data:", error));
}
// Function to modify product information
function modifyProductInfo() {
  // Get the product ID and new data from the modal fields
  const modal = document.getElementById("modifyProductModal");
  const productId = modal.getAttribute("data-product-id");
  const newProductName = document.getElementById("newProductName").value;
  const newProductDescription = document.getElementById(
    "newProductDescription"
  ).value;
  const newProductImage = document.getElementById("productImageField");
  const newProductCategory =
    document.getElementById("newProductCategory").value;
  const newProductAllergens = document.getElementById(
    "newProductAllergens"
  ).value;
  const newProductPrice = document.getElementById("newProductPrice").value;
  console.log(
    "new product data:",
    newProductName,
    newProductDescription,
    newProductCategory,
    newProductAllergens,
    newProductPrice
  );
  const updatedData = {};
  if (newProductName.trim() !== "") {
    updatedData.productName = newProductName;
  }
  if (newProductDescription.trim() !== "") {
    updatedData.productDescription = newProductDescription;
  }
  if (newProductCategory !== null && newProductCategory.trim() !== "") {
    updatedData.productCategory = newProductCategory;
  }
  if (newProductAllergens.trim() !== "" && newProductAllergens !== null) {
    updatedData.productAllergens = newProductAllergens;
  }
  if (newProductPrice.trim() !== "" && newProductPrice !== null) {
    updatedData.productPrice = newProductPrice;
  }
  console.log("updated data:", updatedData);
  // Send the updated data to the server
  fetch(
    `https://herkkutemppelijami.northeurope.cloudapp.azure.com/api/products/${productId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return response.json();
      } else {
        return response.text();
      }
    })
    .then((updatedProduct) => {
      console.log("Product updated:", updatedProduct);
      // Optionally, refresh the products list or update the UI
      // ...
      modal.close();
      // refresh website
      location.reload();
    })
    .catch((error) => {
      console.error("Error updating product:", error);
      alert("Product name must be unique!");
    });
}
// Function to close the modify product modal
function closeModifyProductModal() {
  const modal = document.getElementById("modifyProductModal");
  modal.close();
}
