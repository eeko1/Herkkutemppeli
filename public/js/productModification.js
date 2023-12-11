// Function to open the Modify Product modal
function openModifyProductModal() {
    const modifyProductModal = document.getElementById('modifyProductModal');
    modifyProductModal.showModal();
}

// Function to close the Modify Product modal
function closeModifyProductModal() {
    const modifyProductModal = document.getElementById('modifyProductModal');
    modifyProductModal.close();
}

// Function to modify product information by product ID
async function modifyProductInfo(productId) {
    try {
        const newProductName = document.getElementById('newProductName').value;
        const newProductDescription = document.getElementById('newProductDescription').value;
        const newProductAllergens = document.getElementById('newProductAllergens').value;
        const newProductPrice = document.getElementById('newProductPrice').value;

        const requestBody = {
            product_id: productId,
            newProductName,
            newProductDescription,
            newProductAllergens,
            newProductPrice
        };

        const response = await fetch(`http://localhost:3000/api/products/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error('Failed to modify product');
        }

        // Close the modal after modification
        closeModifyProductModal();
    } catch (error) {
        console.error('Error modifying product:', error);
        // Handle error scenario
    }
}