import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyDMmyGm4z1bzW1UbaF8I2J9rvungwhVavo",
  authDomain: "tic-tac-toe-1a9b7.firebaseapp.com",
  databaseURL: "https://tic-tac-toe-1a9b7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tic-tac-toe-1a9b7",
  storageBucket: "tic-tac-toe-1a9b7.appspot.com",
  messagingSenderId: "971809178106",
  appId: "1:971809178106:web:ff92ab378322ff40b96443"
};

const firebase = initializeApp(firebaseConfig);

const db = getDatabase(firebase);

export { db };
