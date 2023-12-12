// productModification-controller.js

// Function to open the modify product modal and populate it with product data
function openModifyProductModal(productId) {
    console.log("current product:", productId);
    const modal = document.getElementById("modifyProductModal");
    const productNameField = document.getElementById("productName");
  
    fetchProductData(productId)
      .then((product) => {
        productNameField.value = product.product_name;
        document.getElementById("newProductName").value = product.product_name;
        document.getElementById("newProductDescription").value = product.product_description;
  
        modal.setAttribute("data-product-id", productId);
        modal.showModal();
      });
  }
  
  // Function to modify product information
  function modifyProductInfo() {
    const modal = document.getElementById("modifyProductModal");
    const productId = modal.getAttribute("data-product-id");
  
    const productData = {
      productName: document.getElementById("newProductName").value,
      productDescription: document.getElementById("newProductDescription").value,
      // Note: Additional fields like productImage, productCategory, etc., should be added here
    };
  
    updateProductData(productId, productData)
      .then((updatedProduct) => {
        console.log("Product updated:", updatedProduct);
        // Optionally, refresh the products list or update the UI
        modal.close();
        location.reload();
      });
  }
  
  // Function to close the modify product modal
  function closeModifyProductModal() {
    const modal = document.getElementById("modifyProductModal");
    modal.close();
  }
  