// model.js
export async function fetchAllProducts() {
    return fetch("http://localhost:3000/api/products")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }
  
  export function getOrderUserId() {
    return localStorage.getItem("userId");
  }
  
  export function searchItemId(allProducts, cartDetailsDiv) {
    const itemName = cartDetailsDiv.textContent.trim().split(" - ")[0];
    return allProducts.filter(product => product.product_name === itemName);
  }
  