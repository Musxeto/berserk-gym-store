import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  Firestore,
  doc,
  setDoc,
  getFirestore,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  updateEmail,
  updatePassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { showFailureToast, showSuccessToast } from "./App";

const firebaseConfig = {
  apiKey: "AIzaSyAuNAUayCyLQwcMvfLaCCE1oFwPhgWOlmo",
  authDomain: "berserkgym-64268.firebaseapp.com",
  projectId: "berserkgym-64268",
  storageBucket: "berserkgym-64268.appspot.com",
  messagingSenderId: "715156722697",
  appId: "1:715156722697:web:82e661a5232228bcd3d4d8"
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

const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, "products"), productData);
    console.log("Product added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error("Failed to add product");
  }
};

const deleteProduct = async (productId) => {
  try {
    await deleteDoc(doc(db, "products", productId));
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

const storeOrder = async (orderDetails) => {
  try {
    const orderRef = await addDoc(collection(db, "orders"), orderDetails);
    console.log("Order stored with ID:", orderRef.id);
    return orderRef.id;
  } catch (error) {
    console.error("Error storing order:", error);
    throw new Error("Failed to store order");
  }
};
const fetchOrders = async () => {
  try {
    const ordersSnapshot = await getDocs(collection(db, "orders"));
    const ordersData = ordersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return ordersData;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch Orders");
  }
};

const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, {
      deliveryStatus: newStatus,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    throw new Error("Failed to update order status");
  }
};
export {
  fetchProducts,
  updateProduct,
  addProduct,
  deleteProduct,
  storeOrder,
  fetchOrders,
  updateOrderStatus,
};

const updateAnalytics = async (order) => {
  try {
    const totalMoneyMade = await calculateTotalMoneyMade();
    const totalOrders = await fetchTotalOrders();
    const totalProducts = await fetchTotalProducts();

    await updateAnalyticsData(totalMoneyMade, totalOrders, totalProducts);
  } catch (error) {
    console.error("Error updating analytics:", error);
    throw new Error("Failed to update analytics");
  }
};

const calculateTotalMoneyMade = async () => {
  try {
    const ordersSnapshot = await getDocs(collection(db, "orders"));
    let totalMoney = 0;
    ordersSnapshot.forEach((doc) => {
      const orderData = doc.data();
      if (orderData.deliveryStatus === "Delivered") {
        totalMoney += orderData.total;
      }
    });
    return totalMoney;
  } catch (error) {
    console.error("Error calculating total money made:", error);
    throw new Error("Failed to calculate total money made");
  }
};

const fetchTotalOrders = async () => {
  try {
    const ordersSnapshot = await getDocs(collection(db, "orders"));
    return ordersSnapshot.size;
  } catch (error) {
    console.error("Error fetching total orders:", error);
    throw error;
  }
};

const fetchTotalProducts = async () => {
  try {
    const productsSnapshot = await getDocs(collection(db, "products"));
    return productsSnapshot.size;
  } catch (error) {
    console.error("Error fetching total products:", error);
    throw error;
  }
};

const updateAnalyticsData = async (
  totalMoneyMade,
  totalOrders,
  totalProducts
) => {
  try {
    const analyticsRef = doc(db, "analytics", "summary");
    await setDoc(analyticsRef, {
      totalMoneyMade,
      totalOrders,
      totalProducts,
    });
  } catch (error) {
    console.error("Error updating analytics data:", error);
    throw new Error("Failed to update analytics data");
  }
};

export {
  updateAnalytics,
  fetchTotalOrders,
  fetchTotalProducts,
  calculateTotalMoneyMade,
};

const fetchSettings = async (settingsId) => {
  try {
    const settingsDoc = await getDoc(doc(db, "settings", "allSettings"));
    if (settingsDoc.exists()) {
      return settingsDoc.data();
    } else {
      throw new Error("Settings document does not exist");
    }
  } catch (error) {
    console.error("Error fetching settings:", error);
    throw new Error("Failed to fetch settings");
  }
};

const updateSettings = async (settingsId, updatedSettings) => {
  try {
    await updateDoc(doc(db, "settings", settingsId), updatedSettings);
    showSuccessToast("Settings updated successfully!");
  } catch (error) {
    console.error("Error updating settings:", error);
    throw new Error("Failed to update settings");
  }
};

const saveSettings = async (settingsId, settingsData) => {
  try {
    await setDoc(doc(db, "settings", settingsId), settingsData);
    showSuccessToast("Settings saved successfully!");
  } catch (error) {
    console.error("Error saving settings:", error);
    throw new Error("Failed to save settings");
  }
};

export { fetchSettings, updateSettings, saveSettings };

// Function to sign in an existing user with email and password
const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw new Error("Failed to sign in");
  }
};

// Function to sign out the current user
const logout = async () => {
  try {
    await signOut(auth);
    showSuccessToast("Logged out successfully!");
  } catch (error) {
    console.error("Error logging out:", error);
    throw new Error("Failed to log out");
  }
};

// Function to update user profile information
const updateUserProfile = async (email, password) => {
  try {
    // Get the current user
    const user = auth.currentUser;

    // Update the user's email if provided
    if (email) {
      await updateEmail(user, email);
    }

    // Update the user's password if provided
    if (password) {
      await updatePassword(user, password);
    }

    // Show success message or handle appropriately
    console.log("Profile updated successfully!");
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("Failed to update profile");
  }
};

const sendPassResetEmail = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    showSuccessToast("Password reset email sent successfully!");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
};

export { signIn, logout, updateUserProfile, sendPassResetEmail };
