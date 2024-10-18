// Function to show the respective section based on nav item clicked
function showSection(section) {
    const customerSection = document.getElementById('customerSection');
    const itemSection = document.getElementById('itemSection');
    const orderSection = document.getElementById('orderSection');


    if (section === 'customer') {
        customerSection.style.display = 'block';
        itemSection.style.display = 'none';
        orderSection.style.display = 'none';
    } else if (section === 'item') {
        customerSection.style.display = 'none';
        itemSection.style.display = 'block';
        orderSection.style.display = 'none';
    }else if (section === 'order'){
        customerSection.style.display = 'none';
        itemSection.style.display = 'none';
        orderSection.style.display = 'block';
    }
}

// Initially show the customer section
showSection('customer');

// JavaScript to handle form submissions and table actions
// document.getElementById('itemForm').addEventListener('submit', function (event) {
//     event.preventDefault(); // Prevent form submission
//
//     // Get form values
//     const code = document.getElementById('itemCode').value;
//     const name = document.getElementById('itemName').value;
//     const quantity = document.getElementById('itemQuantity').value;
//     const price = document.getElementById('itemPrice').value;
//
//     // Add row to the item table
//     const tableBody = document.getElementById('itemTableBody');
//     const newRow = document.createElement('tr');
//     newRow.innerHTML = `
//             <td>${code}</td>
//             <td>${name}</td>
//             <td>${quantity}</td>
//             <td>${price}</td>
//             <td>
//                 <button class="btn btn-warning btn-sm" onclick="updateRow(this)">Update</button>
//                 <button class="btn btn-danger btn-sm" onclick="deleteRow(this)">Delete</button>
//             </td>
//         `;
//     tableBody.appendChild(newRow);
//
//     // Clear form fields
//     document.getElementById('itemForm').reset();
// });

// JavaScript to handle customer form submission and table actions
// document.getElementById('customerForm').addEventListener('submit', function (event) {
//     event.preventDefault(); // Prevent form submission
//
//     // Clear form fields
//     document.getElementById('orderSection').reset();
//
//     // Get form values
//     const id = document.getElementById('customerId').value;
//     const name = document.getElementById('customerName').value;
//     const address = document.getElementById('customerAddress').value;
//     const salary = document.getElementById('customerSalary').value;
//
//     // Add row to the customer table
//     const tableBody = document.getElementById('customerTableBody');
//     const newRow = document.createElement('tr');
//     newRow.innerHTML = `
//             <td>${id}</td>
//             <td>${name}</td>
//             <td>${address}</td>
//             <td>${salary}</td>
//             <td>
//                 <button class="btn btn-warning btn-sm" onclick="updateRow(this)">Update</button>
//                 <button class="btn btn-danger btn-sm" onclick="deleteRow(this)">Delete</button>
//             </td>
//         `;
//     tableBody.appendChild(newRow);
//
//     // Clear form fields
//     document.getElementById('customerForm').reset();
// });

// Function to delete a row
// function deleteRow(button) {
//     const row = button.parentNode.parentNode;
//     row.parentNode.removeChild(row);
// }

// Function to update a row (basic implementation)
function updateRow(button) {
    const row = button.parentNode.parentNode;
    const cells = row.getElementsByTagName('td');

    // Populate form fields with current row data for editing
    document.getElementById('itemCode').value = cells[0].innerText;
    document.getElementById('itemName').value = cells[1].innerText;
    document.getElementById('itemQuantity').value = cells[2].innerText;
    document.getElementById('itemPrice').value = cells[3].innerText;

    // Remove the row after populating form for editing
    deleteRow(button);
}

//customer//
// function updateRow(button) {
//     // Get the row containing the customer data
//     const row = button.closest('tr');
//     const cells = row.getElementsByTagName('td');
//
//     // Extract data from the row
//     const id = row.cells[0].textContent;
//     const name = row.cells[1].textContent;
//     const address = row.cells[2].textContent;
//     const salary = row.cells[3].textContent;
//
//     // Set the data in the input fields
//     document.getElementById('customerId').value = id;
//     document.getElementById('customerName').value = name;
//     document.getElementById('customerAddress').value = address;
//     document.getElementById('customerSalary').value = salary;
//
//
//     // Show the update button (or you can toggle its visibility)
//     // document.getElementById('updateCustomerBtn').style.display = 'block';
// }



let orderItems = [];
let totalItemsCount = 0;
let totalCostAmount = 0;

function addItemToOrder() {
    const itemSelect = document.getElementById("itemSelect");
    const quantity = document.getElementById("itemQuantity").value;
    const selectedItem = itemSelect.options[itemSelect.selectedIndex].text;

    if (selectedItem && quantity > 0) {
        const itemPrice = 10; // Example static price for now, replace with real data
        const totalForItem = itemPrice * quantity;

        orderItems.push({ item: selectedItem, quantity, total: totalForItem });
        totalItemsCount += parseInt(quantity);
        totalCostAmount += totalForItem;

        document.getElementById("totalItems").innerText = totalItemsCount;
        document.getElementById("totalCost").innerText = totalCostAmount.toFixed(2);
    }
}

function placeOrder() {
    // Submit the order to the backend and reset the form
    orderItems = [];
    totalItemsCount = 0;
    totalCostAmount = 0;

    document.getElementById("totalItems").innerText = totalItemsCount;
    document.getElementById("totalCost").innerText = totalCostAmount.toFixed(2);
    alert("Order placed successfully!");
}

// <!-- JavaScript to show Date and Time -->
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const datetimeString = now.toLocaleDateString('en-US', options);
    document.getElementById('datetime').textContent = datetimeString;
}

setInterval(updateDateTime, 1000); // Update every second
