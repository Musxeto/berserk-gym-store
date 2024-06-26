import React from "react";
import "./App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Tshirts from "./Pages/Tshirts";
import TankTops from "./Pages/TankTops"; // Import TankTops component/page
import Shorts from "./Pages/Shorts"; // Import Shorts component/page
import Leggings from "./Pages/Leggings"; // Import Leggings component/page
import ProteinPowder from "./Pages/ProteinPowder"; // Import ProteinPowder component/page
import Creatine from "./Pages/Creatine"; // Import Creatine component/page
import PreWorkout from "./Pages/PreWorkout"; // Import PreWorkout component/page
import LiftingBelts from "./Pages/LiftingBelts"; // Import LiftingBelts component/page
import WristWraps from "./Pages/WristWraps"; // Import WristWraps component/page
import ToastProvider from "./Contexts/ToastProvider";
import { CartProvider } from "./Contexts/CartContext";
import { Route, Routes } from "react-router-dom";
import AllProducts from "./Pages/AllProducts";
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminDashBoard from "./Pages/Admin/AdminDashBoard";
import Orders from "./Pages/Admin/Orders";
import Products from "./Pages/Admin/Products";
import Settings from "./Pages/Admin/Settings";
import Account from "./Pages/Admin/Account";
import AdminForgotPassword from "./Pages/Admin/AdminForgotPassword";
import PrivateRoute from "./Components/PrivateRoute";
import { AuthProvider } from "./Contexts/AuthProvider";
import LoginRoute from "./Components/LoginRoute";
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/tshirts" element={<Tshirts />} />
            <Route path="/tanktops" element={<TankTops />} />
            <Route path="/shorts" element={<Shorts />} />
            <Route path="/leggings" element={<Leggings />} />
            <Route path="/proteinpowder" element={<ProteinPowder />} />
            <Route path="/creatine" element={<Creatine />} />
            <Route path="/preworkout" element={<PreWorkout />} />
            <Route
              path="/accessories/lifting-belts"
              element={<LiftingBelts />}
            />
            <Route path="/accessories/wrist-wraps" element={<WristWraps />} />
            {/*--------------------------------------------------------------- */}
            <Route
              path="/admin"
              element={
                <LoginRoute>
                  <AdminLogin />
                </LoginRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <LoginRoute>
                  <AdminForgotPassword />
                </LoginRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute>
                  <AdminDashBoard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <PrivateRoute>
                  <Orders />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <PrivateRoute>
                  <Products />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/account"
              element={
                <PrivateRoute>
                  <Account />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />
          </Routes>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

export const showSuccessToast = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const showFailureToast = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
