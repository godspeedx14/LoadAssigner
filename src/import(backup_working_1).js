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

function InsertData() {
  // + "/" + enterSub.value
  // for fixed address use set instead of push
  //
  push(ref(db, "test/" + enterSub.value), {
    Name: enterName.value,
    Score: enterScore.value,
    Preference: 2,
  })
    .then(() => {
      alert("Data added successfully");
    })
    .catch((error) => {
      alert(error);
    });
  //
}

// insertBtn.addEventListener("click", InsertData);

// pull all data from firebase
//from here
// var dbRef = ref(db, "/subject/unsorted"); //for all data
// var dbRef = query(ref(db, "/subject/unsorted"), orderByChild("Score1")); for sorting according to score 1
// var dbRef = query(ref(db, "/subject/unsorted"),orderByChild("Preference1"),equalTo("CSS"));

var dbRef = ref(db, "/Teachers"); //for all data
// var dbRef = query(ref(db, "/Teachers"),orderByChild("Preference1"),equalTo("CSS"));
// var dbRef = query( ref(db, "/Teachers"), orderByChild("Preference1"), equalTo("DSA"));

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
    };

    // console.log(kid["scr1"]);
    // console.log(scorearray[0]);

    // console.log(childKey, childData, addr);
    // console.log(childData.Score1);

    //code for sending data (1.1)
    var scorearray = [0, kid["scr1"], kid["scr2"], kid["scr3"]];
    var prefarray = [0, kid["pref1"], kid["pref2"], kid["pref3"]];
    var i = 1;
    assign(prefarray, kid, scorearray, i);

    //1.1 end here
  });

  console.log("CSS");
  console.log(CSS);
  console.log(CSScount);
  console.log("DSTL");
  console.log(DSTL);
  console.log(DSTLcount);
  console.log("DSA");
  console.log(DSA);
  console.log(DSAcount);
  console.log("SENSOR");
  console.log(SENSOR);
  console.log(SENSORcount);
  console.log("COA");
  console.log(COA);
  console.log(COAcount);
  console.log("unassign");
  console.log(unassign);
  console.log(unassigncount);

  //for table
  var table = document
    .getElementById("myTable")
    .getElementsByTagName("tbody")[0];

  for (var key in DSA) {
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = key;
    cell2.innerHTML = DSA[key];
  }

  var table = document
    .getElementById("myTable1")
    .getElementsByTagName("tbody")[0];

  for (var key in DSTL) {
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = key;
    cell2.innerHTML = DSTL[key];
  }

  var table = document
    .getElementById("myTable2")
    .getElementsByTagName("tbody")[0];

  for (var key in SENSOR) {
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = key;
    cell2.innerHTML = SENSOR[key];
  }

  var table = document
    .getElementById("myTable3")
    .getElementsByTagName("tbody")[0];

  for (var key in COA) {
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = key;
    cell2.innerHTML = COA[key];
  }

  var table = document
    .getElementById("myTable4")
    .getElementsByTagName("tbody")[0];

  for (var key in CSS) {
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = key;
    cell2.innerHTML = CSS[key];
  }

  var table = document
    .getElementById("myTable5")
    .getElementsByTagName("tbody")[0];

  for (var key in unassign) {
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = key;
    cell2.innerHTML = unassign[key];
  }

  //till here table
});

// till here

//find funtion
function FindData() {
  var dbref = ref(db);

  get(child(dbref, "BookId/" + findID.value))
    .then((snapshot) => {
      if (snapshot.exists()) {
        findName.innerHTML = "Name: " + snapshot.val().Name;
        findCity.innerHTML = "City: " + snapshot.val().City;
        findSpeciality.innerHTML = "Email Id: " + snapshot.val().Speciality;
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
// });

function assign(prefarray, kid, scorearray, i) {
  if (i > 3) {
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
        if (CSScount < 5) {
          CSS[kid["mail"]] = scorearray[i];
          console.log("* " + kid["mail"] + " moved to pref " + i + " css");
          CSScount++;
        } else {
          let key = Object.keys(CSS).reduce((key, v) =>
            CSS[v] < CSS[key] ? v : key
          );
          if (CSS[key] < scorearray[i]) {
            CSS[kid["mail"]] = scorearray[i];
            console.log("* " + kid["mail"] + " moved to pref " + i + " css");
            //   unassign[key] = CSS[key];
            //   unassigncount++;
            //   delete CSS[key];

            let kid2;

            var newkid = ref(db, "/Teachers/" + key);
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
              };
            });
            // i = 1;
            var scorearray = [0, kid2["scr1"], kid2["scr2"], kid2["scr3"]];
            var prefarray = [0, kid2["pref1"], kid2["pref2"], kid2["pref3"]];

            console.log("* " + key + " deleted from CSS");
            delete CSS[key];

            assign(prefarray, kid2, scorearray, 2);
          } else {
            assign(prefarray, kid, scorearray, i + 1);
          }
        }
        break;

      //COA
      case "COA":
        if (COAcount < 5) {
          COA[kid["mail"]] = scorearray[i];
          console.log("* " + kid["mail"] + " moved to pref " + i + " coa");
          COAcount++;
        } else {
          let key = Object.keys(COA).reduce((key, v) =>
            COA[v] < COA[key] ? v : key
          );
          if (COA[key] < scorearray[i]) {
            COA[kid["mail"]] = scorearray[i];
            console.log("* " + kid["mail"] + " moved to pref " + i + " coa");
            //   unassign[key] = COA[key];
            //   unassigncount++;
            //   delete COA[key];

            let kid2;

            var newkid = ref(db, "/Teachers/" + key);
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
              };
            });
            // i = 1;
            var scorearray = [0, kid2["scr1"], kid2["scr2"], kid2["scr3"]];
            var prefarray = [0, kid2["pref1"], kid2["pref2"], kid2["pref3"]];

            console.log("* " + key + " deleted from COA");
            delete COA[key];

            assign(prefarray, kid2, scorearray, 2);
          } else {
            assign(prefarray, kid, scorearray, i + 1);
          }
        }
        break;

      //DSTL
      case "DSTL":
        if (DSTLcount < 5) {
          DSTL[kid["mail"]] = scorearray[i];
          console.log("* " + kid["mail"] + " moved to pref " + i + " dstl");
          DSTLcount++;
        } else {
          let key = Object.keys(DSTL).reduce((key, v) =>
            DSTL[v] < DSTL[key] ? v : key
          );
          if (DSTL[key] < scorearray[i]) {
            DSTL[kid["mail"]] = scorearray[i];
            console.log("* " + kid["mail"] + " moved to pref " + i + " dstl");
            //   unassign[key] = DSTL[key];
            //   unassigncount++;
            //   delete DSTL[key];

            let kid2;

            var newkid = ref(db, "/Teachers/" + key);
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
              };
            });

            // i = 1;
            var scorearray = [0, kid2["scr1"], kid2["scr2"], kid2["scr3"]];
            var prefarray = [0, kid2["pref1"], kid2["pref2"], kid2["pref3"]];

            console.log("* " + key + " deleted from DSTL");
            delete DSTL[key];

            assign(prefarray, kid2, scorearray, 2);
          } else {
            assign(prefarray, kid, scorearray, i + 1);
          }
        }
        break;

      //DSA
      case "DSA":
        if (DSAcount < 5) {
          DSA[kid["mail"]] = scorearray[i];
          console.log("* " + kid["mail"] + " moved to pref " + i + " dsa");
          DSAcount++;
        } else {
          let key = Object.keys(DSA).reduce((key, v) =>
            DSA[v] < DSA[key] ? v : key
          );
          if (DSA[key] < scorearray[i]) {
            DSA[kid["mail"]] = scorearray[i];
            console.log("* " + kid["mail"] + " moved to pref " + i + " dsa");
            //   unassign[key] = DSA[key];
            //   unassigncount++;
            //   delete DSA[key];

            let kid2;

            var newkid = ref(db, "/Teachers/" + key);
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
              };
            });

            // i = 1;
            var scorearray = [0, kid2["scr1"], kid2["scr2"], kid2["scr3"]];
            var prefarray = [0, kid2["pref1"], kid2["pref2"], kid2["pref3"]];

            console.log("* " + key + " deleted from DSA");
            delete DSA[key];

            assign(prefarray, kid2, scorearray, 2);
          } else {
            assign(prefarray, kid, scorearray, i + 1);
          }
        }
        break;

      //SENSOR
      case "SENSOR":
        if (SENSORcount < 5) {
          SENSOR[kid["mail"]] = scorearray[i];
          console.log("* " + kid["mail"] + " moved to pref " + i + " sensor");
          SENSORcount++;
        } else {
          let key = Object.keys(SENSOR).reduce((key, v) =>
            SENSOR[v] < SENSOR[key] ? v : key
          );
          if (SENSOR[key] < scorearray[i]) {
            SENSOR[kid["mail"]] = scorearray[i];
            console.log("* " + kid["mail"] + " moved to pref " + i + " sensor");
            //   unassign[key] = SENSOR[key];
            //   unassigncount++;
            //   delete SENSOR[key];
            let kid2;

            var newkid = ref(db, "/Teachers/" + key);
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
              };
            });
            // i = 1;
            var scorearray = [0, kid2["scr1"], kid2["scr2"], kid2["scr3"]];
            var prefarray = [0, kid2["pref1"], kid2["pref2"], kid2["pref3"]];

            console.log("* " + key + " deleted from SENSOR");
            delete SENSOR[key];

            assign(prefarray, kid2, scorearray, 2);
          } else {
            assign(prefarray, kid, scorearray, i + 1);
          }
        }
        break;

      default:
        console.log(kid["mail"] + "assigning for" + i + 1);
        assign(prefarray, kid, scorearray, i + 1);
    }
  }
}
