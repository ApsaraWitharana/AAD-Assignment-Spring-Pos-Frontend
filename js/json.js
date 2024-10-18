let isUpdateMode = false; // Track whether we're in update mode
let selectedRow = null;   // Track which row is being updated

$("#onActionSave").click(function (){
    if (isUpdateMode){
        updateCustomer();
    } else {
        saveCustomer();
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
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editRow(this, '${customer.id}')">Update</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteRow('${customer.id}', this)">Delete</button>
                    </td>
                `;
                tableBody.appendChild(newRow);
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
    selectedRow = button.closest('tr'); // Get the row for future update

    // Retrieve customer data from the row
    let id = selectedRow.cells[0].innerHTML;
    let name = selectedRow.cells[1].innerHTML;
    let address = selectedRow.cells[2].innerHTML;
    let salary = selectedRow.cells[3].innerHTML;

    // Set the data in the form
    $('#customerId').val(id);
    $('#customerName').val(name);
    $('#customerAddress').val(address);
    $('#customerSalary').val(salary);
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
                    // Update the row directly
                    selectedRow.cells[0].innerHTML = custObj.id;
                    selectedRow.cells[1].innerHTML = custObj.name;
                    selectedRow.cells[2].innerHTML = custObj.address;
                    selectedRow.cells[3].innerHTML = custObj.salary;

                    // Reset form and switch off update mode
                    $('#customerForm')[0].reset();
                    isUpdateMode = false;
                    selectedRow = null;
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
                button.closest('tr').remove(); // Remove the row from the table
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to delete customer.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
}
