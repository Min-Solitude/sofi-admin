// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDVKb7VMWsFEXxjZqkqYXKlNSVWq5Id6mI",
  authDomain: "nevsad-a0ab3.firebaseapp.com",
  projectId: "nevsad-a0ab3",
  storageBucket: "nevsad-a0ab3.appspot.com",
  messagingSenderId: "466401843232",
  appId: "1:466401843232:web:16cfddede66b80da768445",
  measurementId: "G-DN15XPN7VS",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
