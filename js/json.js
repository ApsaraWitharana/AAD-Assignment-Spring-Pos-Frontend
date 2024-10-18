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
            if (jqxhr.status == 201) {
                // SweetAlert success message
                Swal.fire({
                    title: 'Success!',
                    text: 'Customer saved successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
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
