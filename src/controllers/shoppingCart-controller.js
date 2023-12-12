
import { fetchAllProducts, getOrderUserId, searchItemId } from './shoppingCart-model.js';
import { updateTotalCost, clearShoppingCart, addToCart } from './shoppingCart.js';

let totalCost = 0;
let cartIds = [];
let allProducts = [];

export function init() {
    const shoppingCartDialog = document.getElementById("shoppingCartDialog");
    const openDialogBtn = document.getElementById("open_dialog");
    const closeDialogBtn = shoppingCartDialog.querySelector(".dialogClose");
    const checkoutBtn = shoppingCartDialog.querySelector("#checkout-btn");

    openDialogBtn.addEventListener("click", openShoppingCartDialog);
    closeDialogBtn.addEventListener("click", closeShoppingCartDialog);
    checkoutBtn.addEventListener("click", handleCheckout);

    fetchAllProducts().then(products => {
        allProducts = products;
    });
}

function openShoppingCartDialog() {
    const shoppingCartDialog = document.getElementById("shoppingCartDialog");
    shoppingCartDialog.showModal();
    shoppingCartDialog.addEventListener("keydown", trapFocus);
}

function closeShoppingCartDialog(e) {
    e.preventDefault();
    const shoppingCartDialog = document.getElementById("shoppingCartDialog");
    shoppingCartDialog.close();
    shoppingCartDialog.removeEventListener("keydown", trapFocus);
    const openDialogBtn = document.getElementById("open_dialog");
    openDialogBtn.focus();
}

function trapFocus(e) {
    const shoppingCartDialog = document.getElementById("shoppingCartDialog");
    const elements = shoppingCartDialog.querySelectorAll(
        'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = elements[0];
    const lastElement = elements[elements.length - 1];

    if (e.key === "Tab") {
        const tabForwards = !e.shiftKey && document.activeElement === lastElement;
        const tabBackwards = e.shiftKey && document.activeElement === firstElement;
        if (tabForwards) {
            e.preventDefault();
            firstElement.focus();
        } else if (tabBackwards) {
            e.preventDefault();
            lastElement.focus();
        }
    }
}

async function handleCheckout(e) {
    searchItemIds();
    if (totalCost === 0) {
        alert("You need to add products to the shopping cart first!");
        return;
    }

    try {
        const latestOrderResponse = await fetch("/api/latest-order-id");
        const latestOrderData = await latestOrderResponse.json();
        const orderUserId = getOrderUserId();
        const latestOrderId = latestOrderData.latestOrderId + 1;
        const orderData = {
            order_id: latestOrderId,
            products: cartIds,
            user_id: orderUserId,
        };

        const orderResponse = await fetch("/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        });

        if (orderResponse.ok) {
            const checkoutResponse = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });

            if (checkoutResponse.ok) {
                closeShoppingCartDialog(e);
                clearShoppingCart();
                cartIds = [];
                alert("We have successfully received your order!");
            } else {
                console.error("Checkout failed");
                // Handle the checkout error
            }
        } else {
            console.error("Order creation failed");
            // Handle the order creation error
        }
    } catch (error) {
        console.error("Error during checkout:", error);
        // Handle the error
    }
}

function searchItemIds() {
    let productList = document.getElementById("product-list");
    let items = productList.querySelectorAll(".items");

    items.forEach(item => {
        let cartDetailsDiv = item.querySelector(".cartDetailsDiv");
        let matchingItems = searchItemId(allProducts, cartDetailsDiv);

        matchingItems.forEach(matchingItem => {
            for (let i = 0; i < parseInt(item.querySelector(".quantity").textContent); i++) {
                cartIds.push({ product_id: matchingItem.product_id });
            }
        });
    });
}


