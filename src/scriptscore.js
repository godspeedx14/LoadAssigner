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

// document.getElementById("myDIV1").style.display = "none";
// document.getElementById("myDIV2").style.display = "none";
// document.getElementById("myDIV3").style.display = "none";
// document.getElementById("myDIV3").style.display = "none";
// document.getElementById("myDIV3").style.display = "none";

// document.getElementById("loginImg").style.display = "none";

function myFunction() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }

  var x = document.getElementById("credDIV");
  // if (x.style.display === "none") {
  x.style.display = "block";
  // } else {
  // x.style.display = "none";
  // }
}

function myFunction1() {
  var element = document.getElementById("pre1");
  var element2 = document.getElementById("pre2");
  var element3 = document.getElementById("pre3");
  var element4 = document.getElementById("pre4");
  var element5 = document.getElementById("pre5");
  element2.remove(element.selectedIndex);
  element3.remove(element.selectedIndex);
  element4.remove(element.selectedIndex);
  element5.remove(element.selectedIndex);

  var x = document.getElementById("myDIV1");
  x.style.display = "none";

  var x = document.getElementById("myDIV2");
  x.style.display = "block";
}

function myFunction2() {
  var element = document.getElementById("pre2");
  var element3 = document.getElementById("pre3");
  var element4 = document.getElementById("pre4");
  var element5 = document.getElementById("pre5");
  element3.remove(element.selectedIndex);
  element4.remove(element.selectedIndex);
  element5.remove(element.selectedIndex);

  var x = document.getElementById("myDIV2");
  x.style.display = "none";

  var x = document.getElementById("myDIV3");
  x.style.display = "block";
}

function myFunction3() {
  var element = document.getElementById("pre3");
  var element4 = document.getElementById("pre4");
  var element5 = document.getElementById("pre5");
  element4.remove(element.selectedIndex);
  element5.remove(element.selectedIndex);

  var x = document.getElementById("myDIV3");
  x.style.display = "none";

  var x = document.getElementById("myDIV4");
  x.style.display = "block";
}

function myFunction4() {
  var element = document.getElementById("pre4");
  var element5 = document.getElementById("pre5");
  element5.remove(element.selectedIndex);

  var x = document.getElementById("myDIV4");
  x.style.display = "none";

  var x = document.getElementById("myDIV5");
  x.style.display = "block";
}

var score1 = 0;
var score2 = 0;
var score3 = 0;
var score4 = 0;
var score5 = 0;
// console.log(score1);
function scoreFunction() {
  score1 += Number(document.getElementById("ex1").value);
  score1 += Number(document.getElementById("lc1").value);
  score1 += Number(document.getElementById("ed1").value);

  score2 += Number(document.getElementById("ex2").value);
  score2 += Number(document.getElementById("lc2").value);
  score2 += Number(document.getElementById("ed2").value);

  score3 += Number(document.getElementById("ex3").value);
  score3 += Number(document.getElementById("lc3").value);
  score3 += Number(document.getElementById("ed3").value);

  score4 += Number(document.getElementById("lc4").value);
  score4 += Number(document.getElementById("ex4").value);
  score4 += Number(document.getElementById("ed4").value);

  score5 += Number(document.getElementById("ex5").value);
  score5 += Number(document.getElementById("lc5").value);
  score5 += Number(document.getElementById("ed5").value);

  document.getElementById("demo1").value = score1;
  document.getElementById("demo2").value = score2;
  document.getElementById("demo3").value = score3;
  document.getElementById("demo4").value = score4;
  document.getElementById("demo5").value = score5;
  // console.log(score1);
  // document.getElementById("demo1").innerHTML = score1;
  // <p id="demo"></p>
}
