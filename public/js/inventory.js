// DOM Elements
const productTableBody = document.querySelector('#productTable tbody');
const addProductForm = document.getElementById('addProductForm');

// Fetch all products from the server
async function fetchProducts() {
    try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch data');
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        productTableBody.innerHTML = '<tr><td colspan="5">Error loading data. Please try again.</td></tr>';
    }
}

// Render products in the table
function renderProducts(products) {
    productTableBody.innerHTML = ''; // Clear the table body
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>${product.quantity}</td>
            <td>
                <button onclick="editProduct(${product.id})">Edit</button>
                <button class="danger" onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        `;
        productTableBody.appendChild(row);
    });

    // Display total available stock
    displayTotalStock(products);
}

// Display total available stock
function displayTotalStock(products) {
    const totalStock = products.reduce((total, product) => total + product.quantity, 0);
    const totalStockElement = document.getElementById('totalStock');
    if (totalStockElement) {
        totalStockElement.textContent = `Total Available Stock: ${totalStock}`;
    }
}

// Add a new product
async function addProduct(event) {
    event.preventDefault();
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const quantity = parseInt(document.getElementById('productQuantity').value);

    try {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, price, quantity }),
        });
        if (!response.ok) throw new Error('Failed to add product');
        const newProduct = await response.json();
        fetchProducts(); // Refresh the product list
        addProductForm.reset();
    } catch (error) {
        console.error('Error adding product:', error);
    }
}

// Edit a product
async function editProduct(id) {
    const name = prompt('Enter new name:');
    const price = parseFloat(prompt('Enter new price:'));
    const quantity = parseInt(prompt('Enter new quantity:'));

    if (name && price && quantity) {
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, price, quantity }),
            });
            if (!response.ok) throw new Error('Failed to update product');
            const updatedProduct = await response.json();
            fetchProducts(); // Refresh the product list
        } catch (error) {
            console.error('Error updating product:', error);
        }
    }
}

// Delete a product
async function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete product');
            const result = await response.json();
            fetchProducts(); // Refresh the product list
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }
}

// Event Listeners
addProductForm.addEventListener('submit', addProduct);

// Initial Fetch
fetchProducts();