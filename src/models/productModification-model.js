// productsModification-model.js

// Fetch product data from the server
function fetchProductData(productId) {
    return fetch(`http://localhost:3000/api/products/${productId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }
  
  // Update product data on the server
  function updateProductData(productId, productData) {
    return fetch(`http://localhost:3000/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch((error) => console.error("Error updating product:", error));
  }
  