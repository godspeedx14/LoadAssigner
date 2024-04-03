// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyAE05OrxHO20JPXiaQU1KRAwhPLXiYJqyg",
  authDomain: "selectpreference.firebaseapp.com",
  databaseURL:
    "https://selectpreference-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "selectpreference",
  storageBucket: "selectpreference.appspot.com",
  messagingSenderId: "133641591191",
  appId: "1:133641591191:web:3bedff451af0dcb727ccd2",
  measurementId: "G-VYHS5HX2CV",
};
// Initialize Firebase
var app = initializeApp(firebaseConfig);
var analytics = getAnalytics(app);
var database = getDatabase(app);

import {
  ref,
  get,
  push,
  set,
  child,
  update,
  remove,
  onValue,
  query,
  orderByChild,
  limitToLast,
  equalTo,
  onChildChanged,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

var db = getDatabase();
var enterSub = document.querySelector("#enterSub");
var enterName = document.querySelector("#enterName");
var enterScore = document.querySelector("#enterScore");
var insertBtn = document.querySelector("#insert");
var findBtn = document.querySelector("#find");

//for admin verification
var adminbtn1 = document.querySelector("#adminbtn1");
adminbtn1.addEventListener("click", valid);

function valid() {
  var a = document.getElementById("ex1").value;

  var b = String(document.getElementById("ex2").value);

  var c;

  var setref = ref(db, a + "/settings");
  onValue(setref, (snapshot) => {
    try {
      c = snapshot.val().adminpass;
    } catch (err) {
      document.getElementById("error").innerHTML =
        "username/password is incorrect";
    }
    console.log(snapshot.val().adminpass);
    // findCity.innerHTML = "City: " + snapshot.val().City;
    // findSpeciality.innerHTML = "Email Id: " + snapshot.val().Speciality;

    if (b == c) {
      var x = document.getElementById("dataDIV");
      x.style.display = "block";

      var x = document.getElementById("settingbtn");
      x.style.display = "block";

      var x = document.getElementById("credDIV");
      x.style.display = "none";

      DSA1.innerText = snapshot.val().sub.sub1;
      DSTL1.innerText = snapshot.val().sub.sub3;
      SENSOR1.innerText = snapshot.val().sub.sub4;
      COA1.innerText = snapshot.val().sub.sub5;
      CSS1.innerText = snapshot.val().sub.sub2;

      //the main sorting function(5.1)

      var teach = 3;
      var teach_s = 3;
      var eachteach = 0;

      setting();
      console.log(teach);
      console.log(teach_s);
      console.log(eachteach);

      function InsertData() {
        // + "/" + enterSub.value
        // for fixed address use set instead of push
        //ref(db, a + "/settings");

        push(ref(db, "test/" + enterSub.value), {
          Name: enterName.value,
          Score: enterScore.value,
          Preference: 2,
        })
          .then(() => {
            alert("Data addeteachersd successfully");
          })
          .catch((error) => {
            alert(error);
          });
        //
      }

      // pull all data from firebase
      //from here
      // var dbRef = ref(db, "/subject/unsorted"); //for all data
      // var dbRef = query(ref(db, "/subject/unsorted"), orderByChild("Score1")); for sorting according to score 1
      // var dbRef = query(ref(db, "/subject/unsorted"),orderByChild("Preference1"),equalTo("CSS"));

      // var dbRef = ref(db, a + "/Teachers"); //for all data
      var dbRef = query(ref(db, a + "/Teachers"), orderByChild("TeachExp")); //for sorting according to score 1
      // var dbRef = query(ref(db, a + "/Teachers"),orderByChild("Preference1"),equalTo("CSS"));
      // var dbRef = query( ref(db, a + "/Teachers"), orderByChild("Preference1"), equalTo("DSA"));

      //creation of all subject object
      let CSS = new Object();
      let CSScount = 0;
      let COA = new Object();
      let COAcount = 0;
      let DSTL = new Object();
      let DSTLcount = 0;
      let DSA = new Object();
      let DSAcount = 0;
      let SENSOR = new Object();
      let SENSORcount = 0;
      let unassign = new Object();
      let unassigncount = 0;

      onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();

          let kid = {
            mail: childData.Email,
            pref1: childData.Preference1,
            scr1: parseInt(childData.Score1),
            pref2: childData.Preference2,
            scr2: parseInt(childData.Score2),
            pref3: childData.Preference3,
            scr3: parseInt(childData.Score3),
            pref4: childData.Preference4,
            scr4: parseInt(childData.Score4),
            pref5: childData.Preference5,
            scr5: parseInt(childData.Score5),
          };

          // console.log(kid["scr1"]);
          // console.log(scorearray[0]);

          // console.log(childKey, childData, addr);
          // console.log(childData.Score1);

          //code for sending data (1.1)
          var scorearray = [
            0,
            kid["scr1"],
            kid["scr2"],
            kid["scr3"],
            kid["scr4"],
            kid["scr5"],
          ];
          var prefarray = [
            0,
            kid["pref1"],
            kid["pref2"],
            kid["pref3"],
            kid["pref4"],
            kid["pref5"],
          ];

          for (var i = 1; i <= eachteach; i++) {
            assign(prefarray, kid, scorearray, i);
          }
          //1.1 end here
        });

        console.log("CSS");
        console.log(CSS);
        // set(ref(db, "sub/ CSS"), { CSS });
        console.log(CSScount);
        console.log("DSTL");
        console.log(DSTL);
        // set(ref(db, "sub/ DSTL"), { DSTL });
        console.log(DSTLcount);
        console.log("DSA");
        console.log(DSA);
        // set(ref(db, "sub/ DSA"), { DSA });
        console.log(DSAcount);
        console.log("SENSOR");
        console.log(SENSOR);
        // set(ref(db, "sub/ SENSOR"), { SENSOR });
        console.log(SENSORcount);
        console.log("COA");
        console.log(COA);
        // set(ref(db, "sub/ COA"), { COA });
        console.log(COAcount);
        console.log("unassign");
        console.log(unassign);
        console.log(unassigncount);

        // var dbRef2 = query(ref(db, "/subject/unsorted"), orderByChild("Score1"));

        // onValue(dbRef2, (snapshot) => {
        //   snapshot.forEach((childSnapshot) => {
        //     var childKey = childSnapshot.key;
        //     var childData = childSnapshot.val();

        //     let kid = {
        //       mail: childData.Email,
        //       pref1: childData.Preference1,
        //       scr1: parseInt(childData.Score1),
        //       pref2: childData.Preference2,
        //       scr2: parseInt(childData.Score2),
        //       pref3: childData.Preference3,
        //       scr3: parseInt(childData.Score3),
        //       pref4: childData.Preference4,
        //       scr4: parseInt(childData.Score4),
        //       pref5: childData.Preference5,
        //       scr5: parseInt(childData.Score5),
        //     };
        //   });
        // });

        //for table
        var table = document
          .getElementById("myTable")
          .getElementsByTagName("tbody")[0];

        var i = 1;

        for (var key in fx(DSA)) {
          var row = table.insertRow();
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);

          cell1.style.textAlign = "center";
          cell1.style.width = "10px";

          cell1.innerHTML = i + ". ";
          i++;
          cell2.innerHTML = key;
          cell3.innerHTML = DSA[key];
        }

        var table = document
          .getElementById("myTable1")
          .getElementsByTagName("tbody")[0];

        var i = 1;

        for (var key in fx(DSTL)) {
          var row = table.insertRow();
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          cell1.style.textAlign = "center";
          cell1.style.width = "10px";

          cell1.innerHTML = i + ". ";
          i++;
          cell2.innerHTML = key;
          cell3.innerHTML = DSTL[key];
        }

        var table = document
          .getElementById("myTable2")
          .getElementsByTagName("tbody")[0];

        var i = 1;

        for (var key in fx(SENSOR)) {
          var row = table.insertRow();
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          cell1.style.textAlign = "center";
          cell1.style.width = "10px";

          cell1.innerHTML = i + ". ";
          i++;
          cell2.innerHTML = key;
          cell3.innerHTML = SENSOR[key];
        }

        var table = document
          .getElementById("myTable3")
          .getElementsByTagName("tbody")[0];

        var i = 1;

        for (var key in fx(COA)) {
          var row = table.insertRow();
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          cell1.style.textAlign = "center";
          cell1.style.width = "10px";

          cell1.innerHTML = i + ". ";
          i++;
          cell2.innerHTML = key;
          cell3.innerHTML = COA[key];
        }

        var table = document
          .getElementById("myTable4")
          .getElementsByTagName("tbody")[0];

        var i = 1;

        for (var key in fx(CSS)) {
          var row = table.insertRow();
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          cell1.style.textAlign = "center";
          cell1.style.width = "10px";

          cell1.innerHTML = i + ". ";
          i++;
          cell2.innerHTML = key;
          cell3.innerHTML = CSS[key];
        }

        var table = document
          .getElementById("myTable5")
          .getElementsByTagName("tbody")[0];

        var i = 1;

        for (var key in unassign) {
          var row = table.insertRow();
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          cell1.style.textAlign = "center";
          cell1.style.width = "10px";

          cell1.innerHTML = i + ". ";
          i++;
          cell2.innerHTML = key;
          cell3.innerHTML = unassign[key];
        }

        //till here table
      });

      // till here

      //find funtion
      function FindData() {
        var dbref = ref(db);

        var a = document.getElementById("ex1").value;

        get(child(db, a + "/Teachers/" + findID.value))
          .then((snapshot) => {
            if (snapshot.exists()) {
              findName.innerHTML = "Name: " + snapshot.val().Email;
              findCity.innerHTML = "Pref 1 : " + snapshot.val().Preference1;
              findSpeciality.innerHTML =
                "Pref 1 Score: " + snapshot.val().Score1;
            } else {
              alert("No data found");
            }
          })
          .catch((error) => {
            alert(error);
          });
      }
      //till here

      // code 2.1 for making new node

      // var converter = childSnapshot.val().Email;
      // var converter2 = converter.replace(/\./g, "_");

      // set(ref(db, "subject2/" + "unsorted/" + converter2), {
      //   Email: converter2,
      //   Preference1: childSnapshot.val().Preference1,
      //   Score1: childSnapshot.val().Score1,
      //   Preference2: childSnapshot.val().Preference2,
      //   Score2: childSnapshot.val().score2,
      //   Preference3: childSnapshot.val().Preference3,
      //   Score3: childSnapshot.val().score3,
      //   Preference4: childSnapshot.val().Preference4,
      //   Score4: childSnapshot.val().score4,
      //   Preference5: childSnapshot.val().Preference5,
      //   Score5: childSnapshot.val().score5,
      // });

      function assign(prefarray, kid, scorearray, i) {
        if (i > 5) {
          unassign[kid["mail"]] = 0;
          unassigncount++;
          console.log("* " + " unAssigning " + kid["mail"] + " for pref " + i);
        } else {
          console.log("* " + " Assigning " + kid["mail"] + " for pref " + i);
          // if (i == 2) {
          //   console.log(kid.mail);
          //   console.log(prefarray[i]);
          // }
          switch (prefarray[i]) {
            //CSS
            case "CSS":
              if (CSS.hasOwnProperty(kid["mail"])) {
                // console.log("ok");
                assign(prefarray, kid, scorearray, i + 1);
              } else {
                if (CSScount < teach_s) {
                  CSS[kid["mail"]] = scorearray[i];
                  console.log(
                    "* " + kid["mail"] + " moved to pref " + i + " css"
                  );
                  CSScount++;
                } else {
                  let key = Object.keys(CSS).reduce((key, v) =>
                    CSS[v] < CSS[key] ? v : key
                  );
                  if (CSS[key] < scorearray[i]) {
                    CSS[kid["mail"]] = scorearray[i];
                    console.log(
                      "* " + kid["mail"] + " moved to pref " + i + " css"
                    );
                    //   unassign[key] = CSS[key];
                    //   unassigncount++;
                    //   delete CSS[key];

                    let kid2;

                    var newkid = ref(db, a + "/Teachers/" + key);
                    onValue(newkid, (snapshot) => {
                      var data = snapshot.val();
                      kid2 = {
                        mail: snapshot.val().Email,
                        pref1: snapshot.val().Preference1,
                        scr1: parseInt(snapshot.val().Score1),
                        pref2: snapshot.val().Preference2,
                        scr2: parseInt(snapshot.val().Score2),
                        pref3: snapshot.val().Preference3,
                        scr3: parseInt(snapshot.val().Score3),
                        pref4: snapshot.val().Preference4,
                        scr4: parseInt(snapshot.val().Score4),
                        pref5: snapshot.val().Preference5,
                        scr5: parseInt(snapshot.val().Score5),
                      };
                    });
                    // i = 1;
                    var scorearray = [
                      0,
                      kid2["scr1"],
                      kid2["scr2"],
                      kid2["scr3"],
                      kid2["scr4"],
                      kid2["scr5"],
                    ];
                    var prefarray = [
                      0,
                      kid2["pref1"],
                      kid2["pref2"],
                      kid2["pref3"],
                      kid2["pref4"],
                      kid2["pref5"],
                    ];

                    console.log("* " + key + " deleted from CSS");
                    delete CSS[key];

                    assign(prefarray, kid2, scorearray, 2);
                  } else {
                    assign(prefarray, kid, scorearray, i + 1);
                  }
                }
              }
              break;

            //COA
            case "COA":
              if (COA.hasOwnProperty(kid["mail"])) {
                console.log("ok");
                assign(prefarray, kid, scorearray, i + 1);
              } else {
                if (COAcount < teach) {
                  COA[kid["mail"]] = scorearray[i];
                  console.log(
                    "* " + kid["mail"] + " moved to pref " + i + " coa"
                  );
                  COAcount++;
                } else {
                  let key = Object.keys(COA).reduce((key, v) =>
                    COA[v] < COA[key] ? v : key
                  );
                  if (COA[key] < scorearray[i]) {
                    COA[kid["mail"]] = scorearray[i];
                    console.log(
                      "* " + kid["mail"] + " moved to pref " + i + " coa"
                    );
                    //   unassign[key] = COA[key];
                    //   unassigncount++;
                    //   delete COA[key];

                    let kid2;

                    var newkid = ref(db, a + "/Teachers/" + key);
                    onValue(newkid, (snapshot) => {
                      var data = snapshot.val();
                      kid2 = {
                        mail: snapshot.val().Email,
                        pref1: snapshot.val().Preference1,
                        scr1: parseInt(snapshot.val().Score1),
                        pref2: snapshot.val().Preference2,
                        scr2: parseInt(snapshot.val().Score2),
                        pref3: snapshot.val().Preference3,
                        scr3: parseInt(snapshot.val().Score3),
                        pref4: snapshot.val().Preference4,
                        scr4: parseInt(snapshot.val().Score4),
                        pref5: snapshot.val().Preference5,
                        scr5: parseInt(snapshot.val().Score5),
                      };
                    });
                    // i = 1;
                    var scorearray = [
                      0,
                      kid2["scr1"],
                      kid2["scr2"],
                      kid2["scr3"],
                      kid2["scr4"],
                      kid2["scr5"],
                    ];
                    var prefarray = [
                      0,
                      kid2["pref1"],
                      kid2["pref2"],
                      kid2["pref3"],
                      kid2["pref4"],
                      kid2["pref5"],
                    ];
                    console.log("* " + key + " deleted from COA");
                    delete COA[key];

                    assign(prefarray, kid2, scorearray, 2);
                  } else {
                    assign(prefarray, kid, scorearray, i + 1);
                  }
                }
              }
              break;

            //DSTL
            case "DSTL":
              if (DSTL.hasOwnProperty(kid["mail"])) {
                console.log("ok");
                assign(prefarray, kid, scorearray, i + 1);
              } else {
                if (DSTLcount < teach) {
                  DSTL[kid["mail"]] = scorearray[i];
                  console.log(
                    "* " + kid["mail"] + " moved to pref " + i + " dstl"
                  );
                  DSTLcount++;
                } else {
                  let key = Object.keys(DSTL).reduce((key, v) =>
                    DSTL[v] < DSTL[key] ? v : key
                  );
                  if (DSTL[key] < scorearray[i]) {
                    DSTL[kid["mail"]] = scorearray[i];
                    console.log(
                      "* " + kid["mail"] + " moved to pref " + i + " dstl"
                    );
                    //   unassign[key] = DSTL[key];
                    //   unassigncount++;
                    //   delete DSTL[key];

                    let kid2;

                    var newkid = ref(db, a + "/Teachers/" + key);
                    onValue(newkid, (snapshot) => {
                      var data = snapshot.val();
                      kid2 = {
                        mail: snapshot.val().Email,
                        pref1: snapshot.val().Preference1,
                        scr1: parseInt(snapshot.val().Score1),
                        pref2: snapshot.val().Preference2,
                        scr2: parseInt(snapshot.val().Score2),
                        pref3: snapshot.val().Preference3,
                        scr3: parseInt(snapshot.val().Score3),
                        pref4: snapshot.val().Preference4,
                        scr4: parseInt(snapshot.val().Score4),
                        pref5: snapshot.val().Preference5,
                        scr5: parseInt(snapshot.val().Score5),
                      };
                    });

                    // i = 1;
                    var scorearray = [
                      0,
                      kid2["scr1"],
                      kid2["scr2"],
                      kid2["scr3"],
                      kid2["scr4"],
                      kid2["scr5"],
                    ];
                    var prefarray = [
                      0,
                      kid2["pref1"],
                      kid2["pref2"],
                      kid2["pref3"],
                      kid2["pref4"],
                      kid2["pref5"],
                    ];
                    console.log("* " + key + " deleted from DSTL");
                    delete DSTL[key];

                    assign(prefarray, kid2, scorearray, 2);
                  } else {
                    assign(prefarray, kid, scorearray, i + 1);
                  }
                }
              }
              break;

            //DSA
            case "DSA":
              if (DSA.hasOwnProperty(kid["mail"])) {
                console.log("ok");
                assign(prefarray, kid, scorearray, i + 1);
              } else {
                if (DSAcount < teach) {
                  DSA[kid["mail"]] = scorearray[i];
                  console.log(
                    "* " + kid["mail"] + " moved to pref " + i + " dsa"
                  );
                  DSAcount++;
                } else {
                  let key = Object.keys(DSA).reduce((key, v) =>
                    DSA[v] < DSA[key] ? v : key
                  );
                  if (DSA[key] < scorearray[i]) {
                    DSA[kid["mail"]] = scorearray[i];
                    console.log(
                      "* " + kid["mail"] + " moved to pref " + i + " dsa"
                    );
                    //   unassign[key] = DSA[key];
                    //   unassigncount++;
                    //   delete DSA[key];

                    let kid2;

                    var newkid = ref(db, a + "/Teachers/" + key);
                    onValue(newkid, (snapshot) => {
                      var data = snapshot.val();
                      kid2 = {
                        mail: snapshot.val().Email,
                        pref1: snapshot.val().Preference1,
                        scr1: parseInt(snapshot.val().Score1),
                        pref2: snapshot.val().Preference2,
                        scr2: parseInt(snapshot.val().Score2),
                        pref3: snapshot.val().Preference3,
                        scr3: parseInt(snapshot.val().Score3),
                        pref4: snapshot.val().Preference4,
                        scr4: parseInt(snapshot.val().Score4),
                        pref5: snapshot.val().Preference5,
                        scr5: parseInt(snapshot.val().Score5),
                      };
                    });

                    // i = 1;
                    var scorearray = [
                      0,
                      kid2["scr1"],
                      kid2["scr2"],
                      kid2["scr3"],
                      kid2["scr4"],
                      kid2["scr5"],
                    ];
                    var prefarray = [
                      0,
                      kid2["pref1"],
                      kid2["pref2"],
                      kid2["pref3"],
                      kid2["pref4"],
                      kid2["pref5"],
                    ];
                    console.log("* " + key + " deleted from DSA");
                    delete DSA[key];

                    assign(prefarray, kid2, scorearray, 2);
                  } else {
                    assign(prefarray, kid, scorearray, i + 1);
                  }
                }
              }
              break;

            //SENSOR
            case "SENSOR":
              if (SENSOR.hasOwnProperty(kid["mail"])) {
                console.log("ok");
                assign(prefarray, kid, scorearray, i + 1);
              } else {
                if (SENSORcount < teach) {
                  SENSOR[kid["mail"]] = scorearray[i];
                  console.log(
                    "* " + kid["mail"] + " moved to pref " + i + " sensor"
                  );
                  SENSORcount++;
                } else {
                  let key = Object.keys(SENSOR).reduce((key, v) =>
                    SENSOR[v] < SENSOR[key] ? v : key
                  );
                  if (SENSOR[key] < scorearray[i]) {
                    SENSOR[kid["mail"]] = scorearray[i];
                    console.log(
                      "* " + kid["mail"] + " moved to pref " + i + " sensor"
                    );
                    //   unassign[key] = SENSOR[key];
                    //   unassigncount++;
                    //   delete SENSOR[key];
                    let kid2;

                    var newkid = ref(db, a + "/Teachers/" + key);
                    onValue(newkid, (snapshot) => {
                      var data = snapshot.val();
                      kid2 = {
                        mail: snapshot.val().Email,
                        pref1: snapshot.val().Preference1,
                        scr1: parseInt(snapshot.val().Score1),
                        pref2: snapshot.val().Preference2,
                        scr2: parseInt(snapshot.val().Score2),
                        pref3: snapshot.val().Preference3,
                        scr3: parseInt(snapshot.val().Score3),
                        pref4: snapshot.val().Preference4,
                        scr4: parseInt(snapshot.val().Score4),
                        pref5: snapshot.val().Preference5,
                        scr5: parseInt(snapshot.val().Score5),
                      };
                    });
                    // i = 1;
                    var scorearray = [
                      0,
                      kid2["scr1"],
                      kid2["scr2"],
                      kid2["scr3"],
                      kid2["scr4"],
                      kid2["scr5"],
                    ];
                    var prefarray = [
                      0,
                      kid2["pref1"],
                      kid2["pref2"],
                      kid2["pref3"],
                      kid2["pref4"],
                      kid2["pref5"],
                    ];
                    console.log("* " + key + " deleted from SENSOR");
                    delete SENSOR[key];

                    assign(prefarray, kid2, scorearray, 2);
                  } else {
                    assign(prefarray, kid, scorearray, i + 1);
                  }
                }
              }
              break;

            default:
              console.log(kid["mail"] + "assigning for" + i + 1);
              assign(prefarray, kid, scorearray, i + 1);
          }
        }
      }

      //function for sorting (3.1)

      function fx(subforsort) {
        let sortable = [];
        for (var teachforsort in subforsort) {
          sortable.push([teachforsort, subforsort[teachforsort]]);
        }

        sortable.sort(function (a, b) {
          return a[1] - b[1];
        });

        sortable.reverse();

        let objSorted = {};
        sortable.forEach(function (item) {
          objSorted[item[0]] = item[1];
        });
        return objSorted;
      }
      // 3.1 end here

      //creation of settings pannel (4.1)
      function setting() {
        var setref = ref(db, a + "/settings");
        onValue(setref, (snapshot) => {
          console.log("does it");
          teach = snapshot.val().teach;
          teach_s = snapshot.val().teach_s;
          // teach = Math.floor((teach * 2) / 5);
          eachteach = snapshot.val().eachteach;

          // findCity.innerHTML = "City: " + snapshot.val().City;
          // findSpeciality.innerHTML = "Email Id: " + snapshot.val().Speciality;
        });
      }

      //till here(5.1)
    } else {
      console.log(c);
      alert("Admin Access Denied......!");
    }
  });
}

//for settings update

var adminpass = document.querySelector("#adminpass");
var eachteach = document.querySelector("#eachteach");
var teach = document.querySelector("#teach");
var teach_s = document.querySelector("#teach_s");
var userpass = document.querySelector("#userpass");

var subject1name = document.querySelector("#subject1name");
var subject2name = document.querySelector("#subject2name");
var subject3name = document.querySelector("#subject3name");
var subject4name = document.querySelector("#subject4name");
var subject5name = document.querySelector("#subject5name");

var updbtn1 = document.querySelector("#updbtn1");
// function valid() {
// }
updbtn1.addEventListener("click", updatesettings);

function updatesettings() {
  // + "/" + enterSub.value
  // for fixed address use set instead of push

  const updates = {};
  updates["adminpass"] = adminpass.value;
  updates["eachteach"] = eachteach.value;
  updates["teach"] = teach.value;
  updates["teach_s"] = teach_s.value;
  updates["userpass"] = userpass.value;
  updates["sub/sub1"] = subject1name.value;
  updates["sub/sub2"] = subject2name.value;
  updates["sub/sub3"] = subject3name.value;
  updates["sub/sub4"] = subject4name.value;
  updates["sub/sub5"] = subject5name.value;

  var a = document.getElementById("ex1").value;

  update(ref(db, a + "/settings"), updates).then(() => {
    location.reload();
    alert("Data modified successfully");
    location.reload();
  });
  //
}

var settingbtn = document.querySelector("#settingbtn");
// function valid() {
// }
settingbtn.addEventListener("click", settingbtn1);

function settingbtn1() {
  var a = document.getElementById("ex1").value;
  var setref = ref(db, a + "/settings");
  onValue(setref, (snapshot) => {
    adminpass.value = snapshot.val().adminpass;
    eachteach.value = snapshot.val().eachteach;
    teach.value = snapshot.val().teach;
    teach_s.value = snapshot.val().teach_s;
    userpass.value = snapshot.val().userpass;

    subject1name.value = snapshot.val().sub.sub1;
    subject2name.value = snapshot.val().sub.sub2;
    subject3name.value = snapshot.val().sub.sub3;
    subject4name.value = snapshot.val().sub.sub4;
    subject5name.value = snapshot.val().sub.sub5;

    //set visibiliity on
    var x = document.getElementById("settingDIV");
    x.style.display = "block";

    var x = document.getElementById("dataDIV");
    x.style.display = "none";
  });
}

// insertBtn.addEventListener("click", InsertData);
