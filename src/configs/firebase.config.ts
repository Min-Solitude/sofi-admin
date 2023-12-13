// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA1oTiZyU_5VVvHLiPpfJixqcMuQkWq7oY",
  authDomain: "sofi-website-b4bb7.firebaseapp.com",
  projectId: "sofi-website-b4bb7",
  storageBucket: "sofi-website-b4bb7.appspot.com",
  messagingSenderId: "69731134414",
  appId: "1:69731134414:web:acc7e42c9533bf03d4d99f",
  measurementId: "G-3VYS9RCYJ2"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  login_hint: "nefy.website",
});

const db = getFirestore();
const storage = getStorage();

export { auth, provider, db, storage };
