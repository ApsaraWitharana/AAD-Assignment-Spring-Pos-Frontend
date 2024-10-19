/*validate field*/
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
