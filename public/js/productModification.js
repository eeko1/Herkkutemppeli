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

    // Function to modify product information (example function)
    function modifyProductInfo() {
        const newProductName = document.getElementById('newProductName').value;
        const newProductDescription = document.getElementById('newProductDescription').value;
        const newProductAllergens = document.getElementById('newProductAllergens').value;
        const newProductPrice = document.getElementById('newProductPrice').value;

        // Update the product information with the obtained values
        // Example: Update product details in the system or perform relevant actions
        
        // Close the modal after modification
        closeModifyProductModal();
    }