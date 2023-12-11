async function getProductIDByName(productName) {
    // Implement logic to fetch product ID by name from your API or data source
    // For example:
    const response = await fetch(`http://localhost:3000/api/products?name=${productName}`);
    console.log(response);
    const data = await response.json();
    return data.productId; // Assuming the response contains the product ID
}

// Define functions in the global scope
async function openModifyProductModal(productId, productName) {
    try {
        const fetchedProductId = await getProductIDByName(productName);

        // Fetch the modal and input elements
        const modifyProductModal = document.getElementById("modifyProductModal");
        const productIdElement = document.getElementById("productId");
        const productNameElement = document.getElementById("productName");

        // Log to ensure values are correct
        console.log('Fetched Product ID:', fetchedProductId);
        console.log('Product Name:', productName);

        if (modifyProductModal && productIdElement && productNameElement) {
            productIdElement.value = fetchedProductId;
            productNameElement.value = productName;

            // Show modal
            modifyProductModal.showModal();
        } else {
            console.error("Required elements not found.");
        }
    } catch (error) {
        console.error("Error opening modify product modal:", error);
        // Handle the error here
    }
}

function closeModifyProductModal() {
    const modifyProductModal = document.getElementById("modifyProductModal");
    if (modifyProductModal) {
        modifyProductModal.close();
    }
}

async function modifyProductInfo() {
    const product_id = document.getElementById("productId").value;
    const newProductName = document.getElementById("newProductName").value;
    const newProductDescription = document.getElementById(
        "newProductDescription"
    ).value;
    const newProductImage = document.getElementById("newProductImage").value; // Handle file upload logic here
    const newProductCategory = document.getElementById("newProductCategory").value;
    const newProductAllergens = document.getElementById("newProductAllergens")
        .value;
    const newProductPrice = document.getElementById("newProductPrice").value;

    const modifiedProductData = {
        product_id,
        newProductName,
        newProductDescription,
        newProductImage,
        newProductCategory,
        newProductAllergens,
        newProductPrice,
    };

    try {
        const response = await fetch("/api/products/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(modifiedProductData),
        });

        if (response.ok) {
            alert("Product information updated successfully");
            closeModifyProductModal();
        } else {
            alert("Error updating product information");
        }
    } catch (error) {
        console.error("Error during fetch operation:", error);
        alert("An error occurred while updating product information");
    }
}
