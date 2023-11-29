// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQ6jMLbXYDgU_bDYvm8rW3HXYbkif1UNE",
  authDomain: "razer-movie.firebaseapp.com",
  projectId: "razer-movie",
  storageBucket: "razer-movie.appspot.com",
  messagingSenderId: "767190118250",
  appId: "1:767190118250:web:790c2ad3f4dfb39c367f13",
  measurementId: "G-4P0TE2NBLP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
