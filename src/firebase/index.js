import firebase from 'firebase/compat/app';
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDRfYqL0jaayz3mWFoosTVZuuHheuMj0zE",
  authDomain: "accountant-5626f.firebaseapp.com",
  databaseURL: "https://accountant-5626f-default-rtdb.firebaseio.com",
  projectId: "accountant-5626f",
  storageBucket: "accountant-5626f.appspot.com",
  messagingSenderId: "863825509740",
  appId: "1:863825509740:web:232ddb113c1d86f0dc4749",
  measurementId: "G-013SMXJS1H"


};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
