import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  Firestore,
  getFirestore,
  addDoc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuNAUayCyLQwcMvfLaCCE1oFwPhgWOlmo",
  authDomain: "berserkgym-64268.firebaseapp.com",
  projectId: "berserkgym-64268",
  storageBucket: "berserkgym-64268.appspot.com",
  messagingSenderId: "715156722697",
  appId: "1:715156722697:web:82e661a5232228bcd3d4d8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage();
const db = getFirestore();

export { auth };
export { db };
