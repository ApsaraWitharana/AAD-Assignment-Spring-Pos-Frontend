// Function to fetch customers and populate the Customer ID dropdown
getAllCustomers();
getAllItems();
openOrderForm();
// Function to fetch customers and populate the Customer ID dropdown
function getAllCustomers() {
    $.ajax({
        url: 'http://localhost:8080/Spring_Pos_System/api/v1/customer', // Adjust URL based on your API endpoint
        type: 'GET',
        success: function (data) {
            let customerDropdown = $('#custId');
            customerDropdown.empty(); // Clear previous options
            customerDropdown.append(new Option('Select Customer', '')); // Default option

            // Populate dropdown with customer ID and name
            data.forEach(function (customer) {
                customerDropdown.append(new Option(customer.id + ' - ' + customer.name, customer.id));
            });
        },
        error: function (error) {
            console.error('Error fetching customers:', error);
        }
    });
}
// Event handler to populate customer name and address based on selected customer ID
$('#custId').change(function () {
    let selectedCustomerId = $(this).val();
    if (selectedCustomerId) {
        $.ajax({
            url: `http://localhost:8080/Spring_Pos_System/api/v1/customer/${selectedCustomerId}`, // Adjust URL for customer details
            type: 'GET',
            success: function (data) {
                // Set customer name and address fields
                $('#custName').val(data.name);
                $('#address').val(data.address);
            },
            error: function (error) {
                console.error('Error fetching customer details:', error);
            }
        });
    } else {
        // Clear customer name and address fields if no customer is selected
        $('#custName').val('');
        $('#address').val('');
    }
});


// Function to fetch items and populate the Item Code dropdown
function getAllItems() {
    $.ajax({
        url: 'http://localhost:8080/Spring_Pos_System/api/v1/item', // Adjust URL based on your API endpoint
        type: 'GET',
        success: function (data) {
            let itemDropdown = $('#itCode');
            itemDropdown.empty(); // Clear previous options
            data.forEach(function (item) {
                itemDropdown.append(new Option(item.code, item.code));
            });
        },
        error: function (error) {
            console.error('Error fetching items:', error);
        }
    });
}

// Function to handle item selection and set item name, price, and qty on hand
$('#itCode').change(function () {
    let selectedItemCode = $(this).val();
    if (selectedItemCode) {
        $.ajax({
            url: `http://localhost:8080/Spring_Pos_System/api/v1/item/${selectedItemCode}`, // Adjust URL for item details
            type: 'GET',
            success: function (data) {
                $('#itName').val(data.name);
                $('#itPrice').val(data.price);
                $('#QtyOn').val(data.qty);
            },
            error: function (error) {
                console.error('Error fetching item details:', error);
            }
        });
    } else {
        // Clear customer name and address fields if no customer is selected
        $('#itName').val('');
        $('#itPrice').val('');
        $('#QtyOn').val('');
    }
});

// Function to add item to the order summary
function addItemToOrder() {
    let qty = parseFloat($('#Qty').val());
    let price = parseFloat($('#itPrice').val());
    let total = qty * price;

    // Add the item details to the order table
    let orderTableBody = $('#orderTableBody');
    orderTableBody.append(`<tr>
        <td>${$('#orderId').val()}</td>
        <td>${$('#date').val()}</td>
        <td>${$('#itName').val()}</td>
        <td>${qty}</td>
        <td>${price.toFixed(2)}</td>
        <td>${total.toFixed(2)}</td>
        <td><button class="btn btn-danger" onclick="confirmRemoveOrderRow(this)">Remove</button></td>
    </tr>`);

    // Update the subtotal and total items
    let currentSubTotal = parseFloat($('#totalCost').text()) || 0;
    let currentTotalItems = parseInt($('#totalItems').text()) || 0;

    $('#totalCost').text((currentSubTotal + total).toFixed(2));
    $('#totalItems').text(currentTotalItems + qty);

    // Clear input fields after adding the item
    $('#Qty').val('');
    $('#itCode').val('');
    $('#itName').val('');
    $('#itPrice').val('');
    $('#QtyOn').val('');
}
updateSubtotal();

function updateSubtotal() {
    let subtotal = 0;

    // Loop through each row and sum the total column
    $('#orderTableBody tr').each(function () {
        let rowTotal = parseFloat($(this).find('td:eq(4)').text()) || 0;
        subtotal += rowTotal;
    });

    // Update the Subtotal display
    $('#totalCost').text(subtotal.toFixed(2));
}
// Function to confirm removal of order row
function confirmRemoveOrderRow(button) {
    // SweetAlert confirmation dialog
    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to remove this order?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, remove it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            // If confirmed, remove the row and show success message
            removeOrderRow(button);
            Swal.fire({
                title: 'Removed!',
                text: 'Order has been removed successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Optionally handle cancel action if needed
        }
    });
}

// Function to remove order row
function removeOrderRow(button) {
    // Remove the table row
    $(button).closest('tr').remove();
}
// Function to remove a row from the order table
function removeOrderRow(button) {
    let row = $(button).closest('tr');
    let total = parseFloat(row.find('td:eq(4)').text());
    let qty = parseInt(row.find('td:eq(2)').text());
    row.remove();

    // Update the subtotal and total items
    let currentSubTotal = parseFloat($('#totalCost').text()) || 0;
    let currentTotalItems = parseInt($('#totalItems').text()) || 0;

    $('#totalCost').text((currentSubTotal - total).toFixed(2));
    $('#totalItems').text(currentTotalItems - qty);
}

// Function to calculate balance after cash and discount
$('#discount, #cash').on('input', function () {
    let subtotal = parseFloat($('#totalCost').text()) || 0;
    let discountPercent = parseFloat($('#discount').val()) || 0;
    let discountAmount = subtotal * (discountPercent / 100);
    let total = subtotal - discountAmount;

    let cash = parseFloat($('#cash').val()) || 0;
    let balance = cash - total;

    $('#balance').val(balance.toFixed(2));
    $('#totalItems').val(balance.toFixed(2));


});

// Function to place an order
function placeOrder() {
    // Create order data object
    let orderData = {
        orderId: generateOrderId(), // Auto-generate order ID
        customerId: $('#custId').val(),
        date: $('#date').val(),
        total: $('#totalCost').text(),
        items: [] // Initialize empty items array
    };

    // Loop through the table rows and push item data into orderData.items array
    $('#orderTableBody tr').each(function () {
        let row = $(this);
        orderData.items.push({
            itemCode: row.find('td:eq(0)').text(),
            qty: row.find('td:eq(2)').text(),
            price: row.find('td:eq(3)').text(),
            total: row.find('td:eq(4)').text()
        });
    });

    // AJAX call to place the order
    $.ajax({
        // url: 'http://localhost:8080/Spring_Pos_System/api/v1/place_order',
        // type: 'POST',
        // contentType: 'application/json',
        // data: JSON.stringify(orderData),
        success: function () {
            // Display SweetAlert success message
            Swal.fire({
                title: 'Order Placed!',
                text: 'Your order has been placed successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            // Update order summary
            $('#totalItems').text(orderData.items.length);  // Update total number of items
            $('#totalCost').text(orderData.total); // Update total cost (subtotal)

            // Optionally, calculate the balance after applying discount
            let cash = parseFloat($('#cash').val()) || 0;
            let discountPercent = parseFloat($('#discount').val()) || 0;
            let discountAmount = (discountPercent / 100) * parseFloat(orderData.total);
            let balance = cash - (parseFloat(orderData.total) - discountAmount);

            // Set balance value
            $('#balance').val(balance.toFixed(2));

            // Clear form after successful order placement
            resetOrderForm();
        },
        error: function (error) {
            console.log(JSON.stringify(orderData, null, 2)); // Log order data to debug any issues
        }
    });
}

// Helper function to reset the order form
function resetOrderForm() {
    $('#custId').val('');
    $('#date').val('');
    $('#totalCost').text('00.00');
    $('#orderTableBody').empty(); // Clear the order table
    $('#cash').val('');
    $('#discount').val('');
    $('#balance').val('');
}

//  generate order ID (e.g., ORD-001)
function generateOrderId() {
    // Get the last order ID from local storage (if exists)
    let lastOrderId = localStorage.getItem('lastOrderId') || 'ORD-000';

    // Extract the numeric part, increment it, and format it with leading zeros
    let orderNumber = parseInt(lastOrderId.split('-')[1]) + 1;
    let newOrderId = 'ORD-' + orderNumber.toString().padStart(3, '0');

    // Store the new order ID as the last order ID in local storage
    localStorage.setItem('lastOrderId', newOrderId);

    // Set the generated orderId to the input field with id="orderId"
    $('#orderId').val(newOrderId);

    return newOrderId;
}

function openOrderForm() {
    // Generate and set a new order ID when the order form is opened
    generateOrderId();

    $('#orderForm').show();
    $('#custId').focus();
}



// Function to reset the order form
// function resetOrderForm() {
//     $('#orderTableBody').empty();
//     $('#totalCost').text('00.00');
//     $('#totalItems').text('00.00');
//     $('#cash').val('');
//     $('#discount').val('');
//     $('#balance').val('');
//     $('#custId').val('');
//     $('#custName').val('');
//     $('#address').val('');
//     $('#date').val('');
// }
