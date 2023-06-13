import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD_UZ-YgRtLaLyiPWjvnUdYmoymBAUhRB4",
  authDomain: "trips-30bdc.firebaseapp.com",
  databaseURL: "https://trips-30bdc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "trips-30bdc",
  storageBucket: "trips-30bdc.appspot.com",
  messagingSenderId: "242405405644",
  appId: "1:242405405644:web:4dfd9f260d1f21272b2369"
};
  
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const auth = getAuth(app);

export {
  db,
  auth
}