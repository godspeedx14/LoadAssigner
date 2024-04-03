// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  getRedirectResult,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

// import {getAuth,signInWithPopup,GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAE05OrxHO20JPXiaQU1KRAwhPLXiYJqyg",
  authDomain: "selectpreference.firebaseapp.com",
  projectId: "selectpreference",
  storageBucket: "selectpreference.appspot.com",
  messagingSenderId: "133641591191",
  appId: "1:133641591191:web:3bedff451af0dcb727ccd2",
  measurementId: "G-VYHS5HX2CV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//form here new page
const auth = getAuth();

document.getElementById("login").addEventListener("click", GoogleLogin);
// document.getElementById("logout").addEventListener("click", LogoutUser);

let provider = new GoogleAuthProvider();

function GoogleLogin() {
  console.log("Login Btn Call");
  const auth = getAuth();

  signInWithPopup(auth, provider)
    // signInWithRedirect(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      console.log(user.displayName);
      console.log(user.email);

      document.getElementById("name").value = user.displayName;
      document.getElementById("email").value = user.email;

      // console.log(user.photoURL);

      document.getElementById("logout").innerHTML = `
      <a href="/"><img src="${user.photoURL}" class= "loginImg"></a> `;

      myFunction();
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

// function showUserDetails(user) {
//   document.getElementById("userDetails").innerHTML = `
//     <img src="${user.photoURL}" style="width:10%">
//     <p>Name: ${user.displayName}</p>
//     <p>Email: ${user.email}</p>
//   `;
// }

// function checkAuthState() {
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       document.getElementById("LoginScreen").style.display = "none";
//       document.getElementById("dashboard").style.display = "block";
//       showUserDetails(user);
//     } else {
//     }
//   });
// }

// function LogoutUser() {
//   console.log("Logout Btn Call");
//   firebase
//     .auth()
//     .signOut()
//     .then(() => {
//       document.getElementById("LoginScreen").style.display = "block";
//       document.getElementById("dashboard").style.display = "none";
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// }
// checkAuthState();
