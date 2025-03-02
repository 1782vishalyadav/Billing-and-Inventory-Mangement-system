
# **Inventory and Billing Management System**

This project is a **web-based application** for managing inventory and billing. It allows users to:
- Add, update, delete, and view products in the inventory.
- Create, view, and delete bills.
- Dynamically update the database without reloading the page.

---

## **Table of Contents**
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup Instructions](#setup-instructions)
4. [API Documentation](#api-documentation)
5. [Folder Structure](#folder-structure)
6. [Contributing](#contributing)
7. [License](#license)

---

## **Features**
- **Inventory Management**:
  - Add new products.
  - Update existing products.
  - Delete products.
  - View all products.
- **Billing Management**:
  - Create new bills.
  - View bill details.
  - Delete bills.
- **Real-Time Updates**:
  - Changes are reflected in the database without reloading the page.

---

## **Technologies Used**
- **Frontend**:
  - HTML, CSS, JavaScript
- **Backend**:
  - Node.js, Express.js
- **Database**:
  - MySQL
- **Tools**:
  - Postman (for API testing)
  - Git (for version control)

---

## **Setup Instructions**
Follow these steps to set up the project on your local machine.

### **1. Prerequisites**
- Install [Node.js](https://nodejs.org/) (v18 or later).
- Install [MySQL](https://dev.mysql.com/downloads/installer/).
- Install a code editor (e.g., [VS Code](https://code.visualstudio.com/)).

### **2. Clone the Repository**
```bash
git clone https://github.com/your-username/inventory-billing-system.git
cd inventory-billing-system
```

### **3. Set Up the Database**
1. Open MySQL and create a database:
   ```sql
   CREATE DATABASE inventory_db;
   USE inventory_db;
   ```
2. Run the following SQL script to create the tables:
   ```sql
   CREATE TABLE products (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       price DECIMAL(10, 2) NOT NULL,
       quantity INT NOT NULL
   );

   CREATE TABLE bills (
       id INT AUTO_INCREMENT PRIMARY KEY,
       customer_name VARCHAR(100) NOT NULL,
       total_amount DECIMAL(10, 2) NOT NULL,
       date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE bill_items (
       id INT AUTO_INCREMENT PRIMARY KEY,
       bill_id INT NOT NULL,
       product_id INT NOT NULL,
       quantity INT NOT NULL,
       price DECIMAL(10, 2) NOT NULL,
       FOREIGN KEY (bill_id) REFERENCES bills(id),
       FOREIGN KEY (product_id) REFERENCES products(id)
   );
   ```

### **4. Install Dependencies**
1. Navigate to the project directory:
   ```bash
   cd inventory-billing-system
   ```
2. Install the required packages:
   ```bash
   npm install
   ```

### **5. Configure Environment Variables**
1. Create a `.env` file in the root directory:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your-mysql-password
   DB_NAME=inventory_db
   ```
2. Replace `your-mysql-password` with your MySQL password.

### **6. Start the Server**
1. Run the server:
   ```bash
   node src/server.js
   ```
2. The server will start at:
   ```
   http://localhost:5000
   ```

### **7. Access the Application**
1. Open your browser and go to:
   ```
   http://localhost:5000
   ```
2. Use the navigation links to access the **Inventory** and **Billing** sections.

---

## **API Documentation**
The backend exposes the following APIs:

### **Inventory APIs**
1. **Get All Products**
   - **Method**: `GET`
   - **Endpoint**: `/api/products`
   - **Response**: List of all products.

2. **Add a Product**
   - **Method**: `POST`
   - **Endpoint**: `/api/products`
   - **Request Body**: `{ name: string, price: number, quantity: number }`
   - **Response**: The newly added product.

3. **Update a Product**
   - **Method**: `PUT`
   - **Endpoint**: `/api/products/:id`
   - **Request Body**: `{ name: string, price: number, quantity: number }`
   - **Response**: The updated product.

4. **Delete a Product**
   - **Method**: `DELETE`
   - **Endpoint**: `/api/products/:id`
   - **Response**: Success message.

### **Billing APIs**
1. **Get All Bills**
   - **Method**: `GET`
   - **Endpoint**: `/api/bills`
   - **Response**: List of all bills.

2. **Create a Bill**
   - **Method**: `POST`
   - **Endpoint**: `/api/bills`
   - **Request Body**: `{ customerName: string, items: [{ productId: number, quantity: number }] }`
   - **Response**: The newly created bill.

3. **Get Bill Details**
   - **Method**: `GET`
   - **Endpoint**: `/api/bills/:id`
   - **Response**: Details of the bill, including items.

4. **Delete a Bill**
   - **Method**: `DELETE`
   - **Endpoint**: `/api/bills/:id`
   - **Response**: Success message.

---

## **Folder Structure**
```
inventory-billing-system/
├── public/                # Frontend files (HTML, CSS, JS)
│   ├── css/               # CSS files
│   ├── js/                # JavaScript files
│   ├── pages/             # HTML files for inventory and billing
│   └── index.html         # Main landing page
├── src/                   # Backend code
│   ├── controllers/       # Logic for handling requests
│   ├── models/            # Database interaction logic
│   ├── routes/            # API routes
│   ├── config/            # Configuration files (e.g., database connection)
│   ├── app.js             # Main application file
│   └── server.js          # Server entry point
├── .env                   # Environment variables
├── package.json           # Project dependencies
└── README.md              # Project documentation
```

---

## **Contributing**
Contributions are welcome! Follow these steps to contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

By following this README, users can easily set up and use your **Inventory and Billing Management System**. Let me know if you need further assistance! 🚀