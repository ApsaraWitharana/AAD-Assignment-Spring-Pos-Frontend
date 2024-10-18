// =====================save customer================//
let isUpdateMode = false; // Initially, it's false (not in update mode)

$("#onActionSave").click(function (){
    if (isUpdateMode){
        updateCustomer();
    }
});
getAllCustomer();
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
                // SweetAlert success message
                Swal.fire({
                    title: 'Success!',
                    text: 'Customer saved successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
            getAllCustomer();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Log error details
            console.log("Error Status: " + jqXHR.status);
            console.log("Response Text: " + jqXHR.responseText);
            console.log("Error Thrown: " + errorThrown);

            // SweetAlert error message
            Swal.fire({
                title: 'Error!',
                text: 'Failed to save customer. Please check the input data.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
}
//================get all ========================//
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
                        <button class="btn btn-warning btn-sm" id="updateCustomerBtn" onclick="updateRow(this)">Update</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteRow(this)">Delete</button>
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

