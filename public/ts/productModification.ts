// Function to open the modify product modal and populate it with product data
function openModifyProductModal(productId: string, productName: string): void {
  console.log("current product:", productId, productName);
  const modal = document.getElementById("modifyProductModal") as HTMLDialogElement;
  const productNameField = document.getElementById("productName") as HTMLInputElement;
  const newProductNameField = document.getElementById("newProductName") as HTMLInputElement;
  const newProductDescription = document.getElementById("newProductDescription") as HTMLInputElement;
  const newProductCategory = (document.getElementById("newProductCategory") as HTMLInputElement).value;
  const newProductAllergens = document.getElementById("newProductAllergens") as HTMLInputElement;
  const newProductPrice = document.getElementById("newProductPrice") as HTMLInputElement;

  fetch(`http://localhost:3000/api/products/${productId}`)
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
function modifyProductInfo(): void {
  // Get the product ID and new data from the modal fields

  const modal = document.getElementById("modifyProductModal") as HTMLDialogElement;
  const productId = modal.getAttribute("data-product-id");

  const newProductName = (document.getElementById("newProductName") as HTMLInputElement).value;
  const newProductDescription = (document.getElementById("newProductDescription") as HTMLInputElement).value;
  const newProductImage = document.getElementById("productImageField") as HTMLInputElement;
  const newProductCategory = (document.getElementById("newProductCategory") as HTMLInputElement).value;
  const newProductAllergens = (document.getElementById("newProductAllergens") as HTMLInputElement).value;
  const newProductPrice = (document.getElementById("newProductPrice") as HTMLInputElement).value;

  console.log(
    "new product data:",
    newProductName,
    newProductDescription,
    newProductCategory,
    newProductAllergens,
    newProductPrice
  );

  const updatedData: any = {};

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
  fetch(`http://localhost:3000/api/products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
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
function closeModifyProductModal(): void {
  const modal = document.getElementById("modifyProductModal") as HTMLDialogElement;
  modal.close();
}
