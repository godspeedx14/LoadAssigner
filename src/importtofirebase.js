// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

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
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const db = getDatabase();
var mail = document.querySelector("#email");
var pr1Sub = document.querySelector("#pre1");
var pr1Score = document.querySelector("#demo1");
var pr2Sub = document.querySelector("#pre2");
var pr2Score = document.querySelector("#demo2");
var pr3Sub = document.querySelector("#pre3");
var pr3Score = document.querySelector("#demo3");
var pr4Sub = document.querySelector("#pre4");
var pr4Score = document.querySelector("#demo4");
var pr5Sub = document.querySelector("#pre5");
var pr5Score = document.querySelector("#demo5");
var teachexper = document.querySelector("#teachexper");

var insertBtn = document.querySelector("#btnSubmit");

var a;

function InsertData() {
  console.log(mail.value);
  // + "/" + enterSub.value
  // for fixed address use set instead of push
  // push(ref(db, "subject/" + "unsorted"), {
  set(ref(db, a + "/Teachers/" + mail.value.replace(/\./g, "_")), {
    Email: mail.value.replace(/\./g, "_"),
    Preference1: pr1Sub.value,
    Score1: pr1Score.value,
    Preference2: pr2Sub.value,
    Score2: pr2Score.value,
    Preference3: pr3Sub.value,
    Score3: pr3Score.value,
    Preference4: pr4Sub.value,
    Score4: pr4Score.value,
    Preference5: pr5Sub.value,
    Score5: pr5Score.value,
    TeachExp: Math.round(teachexper.value),
  })
    .then(() => {
      location.reload();
      alert("Data added successfully");
      location.reload();
      // window.location.href = "www.google.com";
    })
    .catch((error) => {
      alert(error);
    });
}

insertBtn.addEventListener("click", InsertData);

// findBtn.addEventListener("click", FindData);

//for uesr verification
var userbtn1 = document.querySelector("#userbtn1");

function valid() {
  a = document.getElementById("clgcode").value;

  var b = String(document.getElementById("userpass").value);

  var c;

  var setref = ref(db, a + "/settings");
  onValue(setref, (snapshot) => {
    try {
      c = snapshot.val().userpass;
    } catch (err) {
      document.getElementById("error").innerHTML =
        "Department code/user password is incorrect";
    }
    console.log(snapshot.val().adminpass);
    // findCity.innerHTML = "City: " + snapshot.val().City;
    // findSpeciality.innerHTML = "Email Id: " + snapshot.val().Speciality;

    if (b == c) {
      var x = document.getElementById("myDIV1");
      x.style.display = "block";

      var x = document.getElementById("credDIV");
      x.style.display = "none";

      //code to change option (100).1)

      jQuery("option[value=DSA]").text(snapshot.val().sub.sub1);
      jQuery("option[value=CSS]").text(snapshot.val().sub.sub2);
      jQuery("option[value=DSTL]").text(snapshot.val().sub.sub3);
      jQuery("option[value=SENSOR]").text(snapshot.val().sub.sub4);
      jQuery("option[value=COA]").text(snapshot.val().sub.sub5);

      //till here(100.1)
    } else {
      console.log(c);
      // alert("Admin Access Denied......!");
      document.getElementById("error").innerHTML =
        "college code/user pass is incorrect";
    }
  });
}
userbtn1.addEventListener("click", valid);

//new

// function FindData() {
//     const dbref = ref(db);

//     get(child(dbref, "BookId/" + findID.value))
//       .then((snapshot) => {
//         if (snapshot.exists()) {
//           findName.innerHTML = "Name: " + snapshot.val().Name;
//           findCity.innerHTML = "City: " + snapshot.val().City;
//           findSpeciality.innerHTML = "Email Id: " + snapshot.val().Speciality;
//         } else {
//           alert("No data found");
//         }
//       })
//       .catch((error) => {
//         alert(error);
//       });
//   }

console.log("Godspeed");

//till here

// code 2.1 for making new node

// const converter = childSnapshot.val().Email;
// const converter2 = converter.replace(/\./g, "_");

// set(ref(db, "subject2/" + "unsorted/" + converter2), {
//   Email: converter2,
// Preference1: childSnapshot.val().Preference1,
// Score1: childSnapshot.val().Score1,
// Preference2: childSnapshot.val().Preference2,
// Score2: childSnapshot.val().score2,
// Preference3: childSnapshot.val().Preference3,
// Score3: childSnapshot.val().score3,
// });

// 4.1  code for making random name and values

// var choice = ["COA", "CSS", "SENSOR", "DSA", "DSTL"];
// var teacher = [
//   "aman",
//   "shaashwat",
//   "aditya",
//   "prabhat",
//   "naveen",
//   "utkarsh",
//   "manas",
//   "yash",
//   "ayush",
//   "raunak",
//   "sachin",
//   "kartikey",
//   "vaibhav",
//   "nikhil",
//   "shiv",
//   "abhishek",
//   "ashwin",
//   "dishant",
//   "lakshya",
//   "prakhal",
//   "kanishk",
//   "ashish",
//   "sahib",
//   "prashant",
//   "manav",
//   "raj",
//   "hasan",
//   "kushagra",
//   "aryan",
//   "nayan",
// ];

// for (let i = 0; i < 10; i++) {
//   let haveIt = [];

//   function generateUniqueRandom(maxNr) {
//     let random = getRandomInt(maxNr);

//     if (!haveIt.includes(random)) {
//       haveIt.push(random);
//       return random;
//     } else {
//       if (haveIt.length < maxNr) {
//         return generateUniqueRandom(maxNr);
//       } else {
//         console.log("No more numbers available.");
//         return false;
//       }
//     }
//   }

//   function getRandomInt(max) {
//     return Math.floor(Math.random() * max);
//   }

//   var mail = teacher[i];

//   set(ref(db, "kietcse2/Teachers/" + mail.replace(/\./g, "_")), {
//     Email: mail.replace(/\./g, "_"),
//     Preference1: choice[generateUniqueRandom(5)],
//     Score1: getRandomInt(13),
//     Preference2: choice[generateUniqueRandom(5)],
//     Score2: getRandomInt(13),
//     Preference3: choice[generateUniqueRandom(5)],
//     Score3: getRandomInt(13),
//     Preference4: choice[generateUniqueRandom(5)],
//     Score4: getRandomInt(13),
//     Preference5: choice[generateUniqueRandom(5)],
//     Score5: getRandomInt(13),
//     TeachExp: getRandomInt(30),
//   });
// }

//4.1 end here
