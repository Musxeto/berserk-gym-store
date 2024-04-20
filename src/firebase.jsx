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
  doc,
  setDoc,
  getFirestore,
  addDoc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { showFailureToast, showSuccessToast } from "./App";

const firebaseConfig = {
  apiKey: "AIzaSyAuNAUayCyLQwcMvfLaCCE1oFwPhgWOlmo",
  authDomain: "berserkgym-64268.firebaseapp.com",
  projectId: "berserkgym-64268",
  storageBucket: "berserkgym-64268.appspot.com",
  messagingSenderId: "715156722697",
  appId: "1:715156722697:web:82e661a5232228bcd3d4d8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage();

export { auth, db, storage };

const fetchProducts = async () => {
  try {
    const productsSnapshot = await getDocs(collection(db, "products"));
    const products = [];
    productsSnapshot.forEach((doc) => {
      const productData = doc.data();
      if (productData.sizes && typeof productData.sizes === "string") {
        const sizes = productData.sizes.split(",");
        products.push({ id: doc.id, sizes, ...productData });
      } else {
        console.error(`Invalid sizes field for product ${doc.id}`);
      }
    });
    return products;
  } catch (error) {
    showFailureToast("Error fetching products:", error);
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch Products");
  }
};

export { fetchProducts };

const updateProduct = async (productId, updatedProductData) => {
  try {
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, updatedProductData);
    showSuccessToast("Product updated successfully!");
    return updatedProductData;
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product");
  }
};

export { updateProduct };
