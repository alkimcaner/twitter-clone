// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhvBZFsB_0MjLzD8G0URgHuI3BgrZrxuw",
  authDomain: "twitter-clone-7e480.firebaseapp.com",
  projectId: "twitter-clone-7e480",
  storageBucket: "twitter-clone-7e480.appspot.com",
  messagingSenderId: "525477364248",
  appId: "1:525477364248:web:cbb22824b3608db0f3f96d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
