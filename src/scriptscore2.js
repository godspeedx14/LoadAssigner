//part of the code that sends data to google sheets("Professor") on my id , it compare the name feild in html and then put the value in that row.
jQuery("#frmSubmit").on("submit", function (e) {
  e.preventDefault();
  jQuery("#msg").html("Please wait...");
  jQuery("#btnSubmit").attr("disabled", true);
  jQuery.ajax({
    url: "https://script.google.com/macros/s/AKfycbxk-gIcGyofd65AuU7y1kYd9hueBN4ODc2Zu4WDOfvTGGcrZKye7JCFf4fMH_MYU7Q/exec",
    type: "post",
    data: jQuery("#frmSubmit").serialize(),
    success: function (result) {
      jQuery("#frmSubmit")[0].reset();
      jQuery("#msg").html("Your data have been saved! Thank You");
      jQuery("#btnSubmit").attr("disabled", false);
      //window.location.href='';
    },
  });
});
//till here.
