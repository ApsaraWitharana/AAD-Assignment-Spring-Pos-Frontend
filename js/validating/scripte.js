/*validate field*/
//============customer validating==================//
var cusidPattern = /^CUS-\d{3}$/;

$('#customerId').on('input', function(event) {
    var cusid = $('#customerId').val();
    var errorMessage = $('.errorMessageId');

    if (!cusidPattern.test(cusid)) {
        errorMessage.show();
        $('#customerId').css({'border': '2px solid red'}); // Set border to red
    } else {
        errorMessage.hide(); // Hide error message if valid
        $('#customerId').css({'border': '2px solid green'}); // Set border to green
        $('#customerName').focus();
    }
});


function checkNameField() {
    var cusName = $('#customerName').val();
    var cusNamePattern = /^\s*\S.{5,18}\S\s*$/;
    var errorMessageName=$('.errorMessageName');

    if (!cusNamePattern.test(cusName)) {
        errorMessageName.show();
        $('#customerName').css({'border': '2px solid red'});
    } else {
        errorMessageName.hide();
        $('#customerName').css({'border': '2px solid green'});
        $('#customerAddress').focus();
    }
}

function checkFieldAddress() {
    var cusAddress = $('#customerAddress').val();
    var cusAddressPattern = /^.{5,}$/;
    var errorMessageAddress = $('.errorMessageAddress');

    if (!cusAddressPattern.test(cusAddress)) {
        errorMessageAddress.show();
        $('#customerAddress').css('border', '2px solid red');
    } else {
        errorMessageAddress.hide();
        $('#customerAddress').css('border', '2px solid green');
        $('#customerSalary').focus();
    }

}

function checkFieldSalary() {
    var cusSalary = $('#customerSalary').val();
    var cusSalaryPattern = /^(?:\d+|\d+\.\d{2})$/;
    var errorMessageSalary = $('.errorMessageSalary');

    if (!cusSalaryPattern.test(cusSalary)) {
        errorMessageSalary.show();
        $('#customerSalary').css('border', '2px solid red');
    } else {
        errorMessageSalary.hide();
        $('#customerSalary').css('border', '2px solid green');
    }
}

//=================item validating============================//
/* Validate Item Code */
function checkFieldItemId() {
    var itemCode = $('#itemCode').val();
    var itemCodePattern = /^ITM-\d{3}$/; // Pattern ITM-000
    var errorMessageItemId = $('.errorMessageItemId');

    if (!itemCodePattern.test(itemCode)) {
        errorMessageItemId.show();
        $('#itemCode').css({'border': '2px solid red'});
    } else {
        errorMessageItemId.hide();
        $('#itemCode').css({'border': '2px solid green'});
    }
}

/* Validate Item Name */
function checkFieldItemName() {
    var itemName = $('#itemName').val();
    var itemNamePattern = /^[A-Za-z0-9 ]{8,20}$/; // Minimum 5, Max 20
    var errorMessageItemName = $('.errorMessageItemName');

    if (!itemNamePattern.test(itemName)) {
        errorMessageItemName.show();
        $('#itemName').css({'border': '2px solid red'});
    } else {
        errorMessageItemName.hide();
        $('#itemName').css({'border': '2px solid green'});
    }
}

/* Validate Item Quantity */
function checkFieldItemQty() {
    var itemQuantity = $('#itemQuantity').val();
    var errorMessageItemQty = $('.errorMessageItemQty');

    if (itemQuantity <= 0 || isNaN(itemQuantity)) {
        errorMessageItemQty.show();
        $('#itemQuantity').css({'border': '2px solid red'});
    } else {
        errorMessageItemQty.hide();
        $('#itemQuantity').css({'border': '2px solid green'});
    }
}

/* Validate Item Price */
function checkFieldItemPrice() {
    var itemPrice = $('#itemPrice').val();
    var errorMessageItemPrice = $('.errorMessageItemPrice');

    if (itemPrice <= 0 || isNaN(itemPrice)) {
        errorMessageItemPrice.show();
        $('#itemPrice').css({'border': '2px solid red'});
    } else {
        errorMessageItemPrice.hide();
        $('#itemPrice').css({'border': '2px solid green'});
    }
}