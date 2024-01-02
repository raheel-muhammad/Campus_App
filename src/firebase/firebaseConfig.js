// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWEX0bSf6lH5opEDI6j9qVZJyhdqG9rAY",
  authDomain: "campus-app-01.firebaseapp.com",
  projectId: "campus-app-01",
  storageBucket: "campus-app-01.appspot.com",
  messagingSenderId: "722785574803",
  appId: "1:722785574803:web:e7b3345cb7d8c0e2c11266",
  databaseURL: "https://campus-app-01-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

export { firebaseConfig, app, database, auth };

// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";

// // TODO: Replace the following with your app's Firebase project configuration
// // See: https://firebase.google.com/docs/web/learn-more#config-object
// const firebaseConfig = {
//   // ...
//   // The value of `databaseURL` depends on the location of the database
//   databaseURL: "https://DATABASE_NAME.firebaseio.com",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


// // Initialize Realtime Database and get a reference to the service
// const database = getDatabase(app);
