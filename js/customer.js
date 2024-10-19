let isUpdateMode = false; // Track whether we're in update mode
let selectedRow = null;   // Track which row is being updated

$("#onActionSave").click(function (){
    if (isUpdateMode){
        updateCustomer();
    } else {
        //saveCustomer();
    }
});

getAllCustomer();

// ================= Save customer =================//
function saveCustomer() {
    let id = $('#customerId').val();
    let name = $('#customerName').val();
    let address = $('#customerAddress').val();
    let salary = $('#customerSalary').val();

    let custObj = {
        id: id,
        name: name,
        address: address,
        salary: salary
    };

    let jsonObj = JSON.stringify(custObj);
    $.ajax({
        url: "http://localhost:8080/Spring_Pos_System/api/v1/customer",
        method: "POST",
        contentType: "application/json",
        data: jsonObj,
        success: function(resp, textStatus, jqxhr) {
            if (jqxhr.status == 204) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Customer saved successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
            getAllCustomer(); // Refresh the customer list
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error Status: " + jqXHR.status);
            console.log("Response Text: " + jqXHR.responseText);
            console.log("Error Thrown: " + errorThrown);

            Swal.fire({
                title: 'Error!',
                text: 'Failed to save customer. Please check the input data.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
}

// ================== Get all customers ====================
function getAllCustomer() {
    $.ajax({
        url: "http://localhost:8080/Spring_Pos_System/api/v1/customer",
        method: "GET",
        success: function(response) {
            const tableBody = document.getElementById('customerTableBody');
            tableBody.innerHTML = ''; // Clear existing table content

            // Loop through each customer and add a row
            response.forEach(function(customer) {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${customer.id}</td>
                    <td>${customer.name}</td>
                    <td>${customer.address}</td>
                    <td>${customer.salary}</td>
                    <td class="button-column">
                        <button class="btn btn-warning btn-sm" onclick="editRow(this, '${customer.id}')">Update</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteRow('${customer.id}', this)">Delete</button>
                    </td>
                `;
                tableBody.appendChild(newRow);
                document.getElementById('customerForm').reset();
            });
        },
        error: function(xhr, status, error) {
            console.error("Error fetching customer data: ", error);
        }
    });
}

// =================== Edit customer row ===================
function editRow(button, customerId) {
    isUpdateMode = true; // Switch to update mode
    currentCustomerId = customerId;

    // Fetch the customer data from the row
    let row = button.parentElement.parentElement;
    let cells = row.getElementsByTagName('td'); // Get the row for future update

    // Populate the form fields
    $('#customerId').val(cells[0].innerText);
    $('#customerName').val(cells[1].innerText);
    $('#customerAddress').val(cells[2].innerText);
    $('#customerSalary').val(cells[3].innerText);
}

// =================== Update customer =====================
function updateCustomer() {
    let id = $('#customerId').val();
    let name = $('#customerName').val();
    let address = $('#customerAddress').val();
    let salary = $('#customerSalary').val();

    let custObj = {
        id: id,
        name: name,
        address: address,
        salary: salary
    };

    let jsonObj = JSON.stringify(custObj);

    $.ajax({
        url: `http://localhost:8080/Spring_Pos_System/api/v1/customer/${custObj.id}`,
        method: "PATCH",
        contentType: "application/json",
        data: jsonObj,
        success: function(resp, textStatus, jqxhr) {
            if (jqxhr.status == 204) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Customer updated successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    getAllCustomer(); // Reload all customers
                    $('#customerId').val('');
                    $('#customerName').val('');
                    $('#customerAddress').val('');
                    $('#customerSalary').val('');
                    isUpdateMode = false; // Switch back to save mode
                });
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error Status: " + jqXHR.status);
            console.log("Response Text: " + jqXHR.responseText);
            console.log("Error Thrown: " + errorThrown);

            Swal.fire({
                title: 'Error!',
                text: 'Failed to update customer. Please check the input data.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
}

// ================== Delete customer row ==================
function deleteRow(customerId, button) {
    $.ajax({
        url: `http://localhost:8080/Spring_Pos_System/api/v1/customer/${customerId}`,
        method: "DELETE",
        success: function() {
            Swal.fire({
                title: 'Deleted!',
                text: 'Customer deleted successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                // Remove the row from the table
                let row = button.parentElement.parentElement;
                row.remove();
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error Status: " + jqXHR.status);
            console.log("Response Text: " + jqXHR.responseText);
            console.log("Error Thrown: " + errorThrown);

            Swal.fire({
                title: 'Error!',
                text: 'Failed to delete customer.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
}
