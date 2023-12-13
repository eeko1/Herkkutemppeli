interface Product {
  product_id: string; // Unique identifier for the product
  product_name: string; // Name of the product
  product_description: string; // Description of the product
  product_category: string; // Category or type of the product
  product_price: number; // Price of the product
  product_stock: number; // Quantity of product in stock
  product_image_url: string; // URL to the product's image
  product_allergens?: string[]; // Optional: Allergens, if applicable
  // Add any other properties relevant to your specific use case
}


// Function to open the modify product modal and populate it with product data
function openModifyProductModal(productId: string, productName: string): void {
  console.log("current product:", productId, productName);
  const modal = document.getElementById("modifyProductModal") as HTMLDialogElement | null;
  const productNameField = document.getElementById("productName") as HTMLInputElement | null;
  const newProductNameField = document.getElementById("newProductName") as HTMLInputElement | null;
  const newProductDescription = document.getElementById("newProductDescription") as HTMLInputElement | null;

  fetch(`http://localhost:3000/api/products/${productId}`)
    .then((response) => response.json())
    .then((product: Product) => {
      if (productNameField) productNameField.value = product.product_name;
      if (newProductNameField) newProductNameField.value = product.product_name;
      if (newProductDescription) newProductDescription.value = product.product_description;

      if (modal) modal.setAttribute("data-product-id", productId);
      modal?.showModal();
    })
    .catch((error) => console.error("Error fetching product data:", error));
}

// Function to modify product information
function modifyProductInfo(): void {
  const modal = document.getElementById("modifyProductModal") as HTMLDialogElement | null;
  const productId = modal?.getAttribute("data-product-id");

  const newProductName = (document.getElementById("newProductName") as HTMLInputElement | null)?.value;
  const newProductDescription = (document.getElementById("newProductDescription") as HTMLInputElement | null)?.value;
  const newProductCategory = (document.getElementById("newProductCategory") as HTMLInputElement | null)?.value;
  const newProductAllergens = (document.getElementById("newProductAllergens") as HTMLInputElement | null)?.value;
  const newProductPrice = (document.getElementById("newProductPrice") as HTMLInputElement | null)?.value;

  console.log("new product data:", newProductName, newProductDescription, newProductCategory, newProductAllergens, newProductPrice);

  const updatedData: Partial<Product> = {
    product_name: newProductName,
    product_description: newProductDescription,
    product_category: newProductCategory,
    product_allergens: newProductAllergens ? newProductAllergens.split(',') : undefined,
    product_price: newProductPrice ? parseFloat(newProductPrice) : undefined,
  };

  console.log("updated data:", updatedData);

  if (productId) {
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
      return response.json();
    })
    .then((updatedProduct: Product) => {
      console.log("Product updated:", updatedProduct);
      modal?.close();
      location.reload();
    })
    .catch((error) => {
      console.error("Error updating product:", error);
      alert("Product update failed!");
    });
  }
}

// Function to close the modify product modal
function closeModifyProductModal(): void {
  const modal = document.getElementById("modifyProductModal") as HTMLDialogElement | null;
  modal?.close();
}

// Example usage (You need to replace these with actual event handlers or function calls as per your application's logic)
openModifyProductModal("123", "Sample Product");
modifyProductInfo();
closeModifyProductModal();
