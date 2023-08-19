// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyDVKb7VMWsFEXxjZqkqYXKlNSVWq5Id6mI',
    authDomain: 'nevsad-a0ab3.firebaseapp.com',
    projectId: 'nevsad-a0ab3',
    storageBucket: 'nevsad-a0ab3.appspot.com',
    messagingSenderId: '466401843232',
    appId: '1:466401843232:web:16cfddede66b80da768445',
    measurementId: 'G-DN15XPN7VS'
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const db = getFirestore()
const storage = getStorage()

export { auth, provider, db, storage }
