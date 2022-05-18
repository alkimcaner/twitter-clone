import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

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

export const auth = getAuth(app);
export const db = getFirestore(app);
