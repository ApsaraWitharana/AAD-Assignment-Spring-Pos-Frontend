let isUpdateItemMode = false;
    $("#onActionItemSave").click(function () {
        if (isUpdateItemMode) {
            updateItem();
        } else {
            saveItem();
        }
    });

    // Fetch all items when the page loads
    getAllItems();

    // ================= Save Item =================//
    function saveItem() {
        let code = $('#itemCode').val();
        let name = $('#itemName').val();
        let qty = $('#itemQuantity').val();
        let price = $('#itemPrice').val();

        let itemObj = {
            code: code,
            name: name,
            qty: qty,
            price: price
        };

        let jsonObj = JSON.stringify(itemObj);

        $.ajax({
            url: "http://localhost:8080/Spring_Pos_System/api/v1/item",
            method: "POST",
            contentType: "application/json",
            data: jsonObj,
            success: function(resp, textStatus, jqxhr) {
                if (jqxhr.status === 204) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Item saved successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    getAllItems();
                    clearForm();
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("Error Status: " + jqXHR.status);
                console.log("Response Text: " + jqXHR.responseText);
                console.log("Error Thrown: " + errorThrown);

                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to save item. Please check the input data.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    }

    // ================= Update Item =================//
function updateItem() {
    let code = $('#itemCode').val();
    let name = $('#itemName').val();
    let qty = parseInt($('#itemQuantity').val()); // Ensure qty is integer
    let price = parseFloat($('#itemPrice').val()); // Ensure price is a float

    let itemObj = {
        code: code,
        name: name,
        qty: qty,
        price: price
    };

    let jsonObj = JSON.stringify(itemObj);
    console.log("Request Data:", jsonObj); // Log request data

    $.ajax({
        url: `http://localhost:8080/Spring_Pos_System/api/v1/item/${code}`,
        method: "PATCH",
        contentType: "application/json",
        data: jsonObj,
        success: function(resp, textStatus, jqxhr) {
            if (jqxhr.status === 204) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Item updated successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    getAllItems(); // Refresh items list
                    clearForm(); // Clear form fields
                    isUpdateItemMode = false; // Reset update mode
                });
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Error Status: " + jqXHR.status);
            console.error("Response Text: " + jqXHR.responseText);
            console.error("Error Thrown: " + errorThrown);

            Swal.fire({
                title: 'Error!',
                text: 'Failed to update item.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
}


// ================= Delete Item =================//
    function deleteItem(itemCode,button) {
        $.ajax({
            url: `http://localhost:8080/Spring_Pos_System/api/v1/item/${itemCode}`,
            method: "DELETE",
            success: function(resp, textStatus, jqxhr) {
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Item has been deleted.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    let row = button.parentElement.parentElement;
                    row.remove();
                    clearForm();
                });
            },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log("Error Status: " + jqXHR.status);
                        console.log("Response Text: " + jqXHR.responseText);
                        console.log("Error Thrown: " + errorThrown);

                        Swal.fire({
                            title: 'Error!',
                            text: 'Failed to delete item.',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                });
            }

    // ================= Fetch All Items =================//
    function getAllItems() {
        $.ajax({
            url: "http://localhost:8080/Spring_Pos_System/api/v1/item",
            method: "GET",
            success: function(response) {
               const tableBody = document.getElementById('itemTableBody');
               tableBody.innerHTML ='';

               response.forEach(function (item){
                   const newRow = document.createElement('tr');
                   newRow.innerHTML =  `
                       <td>${item.code}</td>
                       <td>${item.name}</td>
                       <td>${item.qty}</td>
                       <td>${item.price}</td>
                       <td class="button-column">
                        <button class="btn btn-warning btn-sm" onclick="editItem(this, '${item.code}')">Update</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteItem('${item.code}', this)">Delete</button>
                    </td>
                    `;
                   tableBody.appendChild(newRow);
                   document.getElementById('itemForm').reset();
               });

                // let itemTableBody = $('#itemTableBody');
                // itemTableBody.empty();

            },
            error: function(xhr, status, error) {
                console.error("Error fetching customer data: ", error);
            }
        });
    }

    // ================= Edit Item (Populate form for update) =================//
    function editItem(button,itemCode) {
        isUpdateItemMode = true;
        currentItemCode = itemCode;

        //Fetch the item data from the row
        let row = button.parentElement.parentElement;
        let cells = row.getElementsByTagName('td');
                $('#itemCode').val(cells[0].innerText);
                $('#itemName').val(cells[1].innerText);
                $('#itemQuantity').val(cells[2].innerText);
                $('#itemPrice').val(cells[3].innerText);
    }

    // ================= Clear Form =================//
    function clearForm() {
        $('#itemCode').val('');
        $('#itemName').val('');
        $('#itemQuantity').val('');
        $('#itemPrice').val('');
        isUpdateItemMode = false; // Exit update mode after form is cleared
        currentItemCode = ''; // Clear current item code
    }

