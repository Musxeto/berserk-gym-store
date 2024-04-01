import React from "react";
import "./App.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Tshirts from "./Pages/Tshirts";
import TankTops from "./Pages/TankTops"; // Import TankTops component/page
import Shorts from "./Pages/Shorts"; // Import Shorts component/page
import Leggings from "./Pages/Leggings"; // Import Leggings component/page
import ProteinPowder from "./Pages/ProteinPowder"; // Import ProteinPowder component/page
import Creatine from "./Pages/Creatine"; // Import Creatine component/page
import Vitamins from "./Pages/Vitamins"; // Import Vitamins component/page
import PreWorkout from "./Pages/PreWorkout"; // Import PreWorkout component/page
import LiftingBelts from "./Pages/LiftingBelts"; // Import LiftingBelts component/page
import WristWraps from "./Pages/WristWraps"; // Import WristWraps component/page
import ToastProvider from "./Contexts/ToastProvider";
import { CartProvider } from "./Contexts/CartContext";
import Navbar from "./Components/Layout/Navbar/Navbar";
import Footer from "./Components/Layout/Footer/Footer";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <CartProvider>
      <ToastProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/about" element={<About />} />
          <Route path="/tshirts" element={<Tshirts />} />
          <Route path="/tanktops" element={<TankTops />} />
          <Route path="/shorts" element={<Shorts />} />
          <Route path="/leggings" element={<Leggings />} />
          <Route path="/proteinpowder" element={<ProteinPowder />} />
          <Route path="/creatine" element={<Creatine />} />
          <Route path="/vitamins" element={<Vitamins />} />
          <Route path="/preworkout" element={<PreWorkout />} />
          <Route path="/accessories/lifting-belts" element={<LiftingBelts />} />
          <Route path="/accessories/wrist-wraps" element={<WristWraps />} />

          {/* <Route path="/admin" element={<Admin />} />*/}
        </Routes>
        <Footer />
      </ToastProvider>
    </CartProvider>
  );
}

export default App;
