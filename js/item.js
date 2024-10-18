
let isUpdateItemMode = false;
$(document).ready(function () {

    $("#onActionItemSave").click(function (){
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
                    // Refresh item list after saving
                    getAllItems();
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Error Status: " + jqXHR.status);
                console.error("Response Text: " + jqXHR.responseText);
                console.error("Error Thrown: " + errorThrown);

                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to save item. Please check the input data.',
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
            success: function(data) {
                // Ensure that data is an array, or default to an empty array
                let items = Array.isArray(data) ? data : [];

                let itemTableBody = $('#itemTableBody');
                itemTableBody.empty();  // Clear any existing rows

                // Check if there are items to display
                if (items.length === 0) {
                    itemTableBody.append('<tr><td colspan="5">No items found.</td></tr>');
                } else {
                    items.forEach(function(item) {
                        let row = `<tr>
                                <td>${item.code}</td>
                                <td>${item.name}</td>
                                <td>${item.qty}</td>
                                <td>${item.price}</td>
                                <td>
                                    <button class="btn btn-warning" onclick="editItem('${item.code}')">Update</button>
                                    <button class="btn btn-danger" onclick="deleteItem('${item.code}')">Delete</button>
                                </td>
                               </tr>`;
                        itemTableBody.append(row);
                    });
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Error fetching items:", textStatus, errorThrown);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to fetch items. Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    }
});
