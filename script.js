const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwyTWFKRvZ3-Ruc1unS_m6fffSPysWBGXOC9_aZHAOotmoNi028-b0UIE1-o5V1RoC2TQ/exec';
document.getElementById('addProductForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const productName = document.getElementById('productName').value;
    const price = document.getElementById('price').value;
    const sellingPrice = document.getElementById('sellingPrice').value;
    fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'addProduct', productName, price, sellingPrice })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Product added successfully!');
            this.reset();
        } else {
            alert('Error adding product.');
        }
    })
    .catch(error => console.error('Error:', error));
});
function searchProduct() {
    const searchTerm = document.getElementById('searchProduct').value;
    fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'searchProduct', searchTerm })
    })
    .then(response => response.json())
    .then(data => {
                if (data.success) {
                    displaySearchResult(data.results);
                } else {
                    alert('No products found.');
                    document.getElementById('resultTable').style.display = 'none';
                }
            })
            .catch(error => console.error('Error:', error));
        }

        function displaySearchResult(results) {
            const resultTable = document.getElementById('resultTable');
            const resultBody = document.getElementById('resultBody');
            resultBody.innerHTML = '';

            results.forEach(result => {
                const row = resultBody.insertRow();
                row.insertCell(0).textContent = result.productName;
                row.insertCell(1).textContent = result.price;
                row.insertCell(2).textContent = result.sellingPrice;

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.onclick = () => openEditForm(result);
                row.insertCell(3).appendChild(editButton);
            });

            resultTable.style.display = 'table';
        }

        function openEditForm(product) {
            document.getElementById('editForm').style.display = 'block';
            document.getElementById('editRowIndex').value = product.rowIndex;
            document.getElementById('editProductName').value = product.productName;
            document.getElementById('editPrice').value = product.price;
            document.getElementById('editSellingPrice').value = product.sellingPrice;
        }

        function cancelEdit() {
            document.getElementById('editForm').style.display = 'none';
        }

        document.getElementById('updateProductForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const rowIndex = document.getElementById('editRowIndex').value;
            const productName = document.getElementById('editProductName').value;
            const price = document.getElementById('editPrice').value;
            const sellingPrice = document.getElementById('editSellingPrice').value;

            fetch(SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify({ action: 'updateProduct', rowIndex, productName, price, sellingPrice })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Product updated successfully!');
                    cancelEdit();
                    searchProduct(); // Refresh the search result
                } else {
                    alert('Error updating product.');
                }
            })
            .catch(error => console.error('Error:', error));
        });