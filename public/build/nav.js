"use strict";
document.addEventListener("DOMContentLoaded", () => {
    function scrollToFooter() {
        const footer = document.querySelector(".footer");
        if (footer) {
            footer.scrollIntoView();
        }
    }
    function scrollToProducts() {
        console.log("test");
        const products = document.querySelector(".products");
        if (products) {
            products.scrollIntoView();
        }
    }
    // Event listeners for each button
    const aboutUsButton = document.getElementById("aboutus");
    if (aboutUsButton) {
        aboutUsButton.addEventListener("click", () => {
            scrollToFooter();
        });
    }
    const productsButton = document.getElementById("productsbtn");
    if (productsButton) {
        productsButton.addEventListener("click", () => {
            scrollToProducts();
        });
    }
    const scrollDownButton = document.querySelector(".scrolldown");
    if (scrollDownButton) {
        scrollDownButton.addEventListener("click", () => {
            scrollToProducts();
        });
    }
});
