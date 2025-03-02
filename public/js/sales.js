// DOM Elements
const productSelect = document.getElementById('productSelect');
const billItemsTableBody = document.querySelector('#billItemsTable tbody');
const addBillItemButton = document.getElementById('addBillItem');
const createBillForm = document.getElementById('createBillForm');

// Fetch all products from the server
async function fetchProducts() {
    try {
        const response = await fetch('/api/products');
        const products = await response.json();
        populateProductDropdown(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Populate the product dropdown
function populateProductDropdown(products) {
    productSelect.innerHTML = '<option value="">Select a product</option>';
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        productSelect.appendChild(option);
    });
}

// Add a bill item
function addBillItem() {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <select>
                ${Array.from(productSelect.options).map(option => `<option value="${option.value}">${option.text}</option>`).join('')}
            </select>
        </td>
        <td><input type="number" value="1" min="1"></td>
        <td><input type="number" readonly></td>
        <td><input type="number" readonly></td>
        <td><button onclick="this.parentElement.parentElement.remove()">Remove</button></td>
    `;
    billItemsTableBody.appendChild(row);

    // Add event listeners to the new row
    const select = row.querySelector('select');
    const quantityInput = row.querySelector('input[type="number"]');
    const priceInput = row.querySelector('input[type="number"]:nth-of-type(1)');
    const totalInput = row.querySelector('input[type="number"]:nth-of-type(2)');

    select.addEventListener('change', () => updateBillItem(row));
    quantityInput.addEventListener('input', () => updateBillItem(row));
}

// Update bill item
function updateBillItem(row) {
    const select = row.querySelector('select');
    const quantityInput = row.querySelector('input[type="number"]');
    const priceInput = row.querySelector('input[type="number"]:nth-of-type(1)');
    const totalInput = row.querySelector('input[type="number"]:nth-of-type(2)');

    const productId = select.value;
    const product = Array.from(productSelect.options).find(option => option.value === productId);
    const quantity = quantityInput.value;

    if (product) {
        const productPrice = parseFloat(product.dataset.price);
        priceInput.value = productPrice;
        totalInput.value = productPrice * quantity;
    }
}

// Create a bill
async function createBill(event) {
    event.preventDefault();
    const customerName = document.getElementById('customerName').value;
    const items = Array.from(billItemsTableBody.children).map(row => {
        const productId = row.querySelector('select').value;
        const quantity = parseInt(row.querySelector('input[type="number"]').value);
        const product = Array.from(productSelect.options).find(option => option.value === productId);
        return {
            productId,
            quantity,
            price: parseFloat(product.dataset.price),
            total: parseFloat(product.dataset.price) * quantity
        };
    });

    try {
        const response = await fetch('/api/bills', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ customerName, items }),
        });
        const result = await response.json();
        alert('Bill created successfully!');
        createBillForm.reset();
        billItemsTableBody.innerHTML = '';
    } catch (error) {
        console.error('Error creating bill:', error);
    }
}

// Event Listeners
addBillItemButton.addEventListener('click', addBillItem);
createBillForm.addEventListener('submit', createBill);

// Initial Fetch
fetchProducts();