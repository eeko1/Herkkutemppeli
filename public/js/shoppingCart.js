// view.js
export function updateTotalCost(totalCost) {
    const totalCostElement = document.getElementById("total-cost");
    const transportCost = 5;  // Assuming a constant transport cost
    const grandTotal = totalCost + transportCost;
    totalCostElement.textContent = `Total Cost: ${grandTotal.toFixed(2)}€ (fee included)`;
}

export function clearShoppingCart() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    updateTotalCost(0);
}

export function addToCart(productName, productPrice, productImage) {
    const productList = document.getElementById("product-list");
    const existingItems = productList.getElementsByClassName("cartDetailsDiv");

    for (const item of existingItems) {
        const existingItemName = item.textContent.split(" - ")[0];
        if (existingItemName === productName) {
            const quantitySpan = item.closest(".items").querySelector(".quantity");
            let quantity = parseInt(quantitySpan.textContent);
            quantity++;
            quantitySpan.textContent = quantity;

            totalCost += parseFloat(productPrice);
            updateTotalCost(totalCost);
            return;
        }
    }


    totalCost += parseFloat(productPrice);
    updateTotalCost(totalCost);
}


