// Sample data (replace with API calls)
let products = [];
let bills = [];

// DOM Elements
const totalProducts = document.getElementById('totalProducts');
const totalBills = document.getElementById('totalBills');
const totalSales = document.getElementById('totalSales');
const productTableBody = document.querySelector('#productTable tbody');
const addProductForm = document.getElementById('addProductForm');
const billItemsTableBody = document.querySelector('#billItemsTable tbody');
const addBillItemButton = document.getElementById('addBillItem');
const createBillForm = document.getElementById('createBillForm');

// Functions
function updateDashboard() {
    totalProducts.textContent = products.length;
    totalBills.textContent = bills.length;
    totalSales.textContent = `$${bills.reduce((total, bill) => total + bill.totalAmount, 0)}`;
}

function renderProducts() {
    productTableBody.innerHTML = '';
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>${product.quantity}</td>
            <td>
                <button onclick="editProduct(${product.id})">Edit</button>
                <button onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        `;
        productTableBody.appendChild(row);
    });
}

function addProduct(event) {
    event.preventDefault();
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const quantity = parseInt(document.getElementById('productQuantity').value);

    const newProduct = {
        id: products.length + 1,
        name,
        price,
        quantity
    };

    products.push(newProduct);
    renderProducts();
    updateDashboard();
    addProductForm.reset();
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productQuantity').value = product.quantity;
    }
}

function deleteProduct(id) {
    products = products.filter(p => p.id !== id);
    renderProducts();
    updateDashboard();
}

function addBillItem() {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <select>
                ${products.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
            </select>
        </td>
        <td><input type="number" value="1" min="1"></td>
        <td><input type="number" readonly></td>
        <td><input type="number" readonly></td>
        <td><button onclick="this.parentElement.parentElement.remove()">Remove</button></td>
    `;
    billItemsTableBody.appendChild(row);
}

function createBill(event) {
    event.preventDefault();
    const customerName = document.getElementById('customerName').value;
    const items = Array.from(billItemsTableBody.children).map(row => {
        const productId = row.querySelector('select').value;
        const quantity = parseInt(row.querySelector('input[type="number"]').value);
        const product = products.find(p => p.id === parseInt(productId));
        return {
            productId,
            quantity,
            price: product.price,
            total: product.price * quantity
        };
    });

    const totalAmount = items.reduce((total, item) => total + item.total, 0);

    const newBill = {
        id: bills.length + 1,
        customerName,
        items,
        totalAmount
    };

    bills.push(newBill);
    updateDashboard();
    createBillForm.reset();
    billItemsTableBody.innerHTML = '';
}

// Event Listeners
addProductForm.addEventListener('submit', addProduct);
addBillItemButton.addEventListener('click', addBillItem);
createBillForm.addEventListener('submit', createBill);

// Initial Render
updateDashboard();
renderProducts();