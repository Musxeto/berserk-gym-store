import { useState } from "react";

import "./App.css";
import Home from "./Pages/Home";
import ToastProvider from "./Contexts/ToastProvider";
function App() {
  return (
    <ToastProvider>
      <div>
        <Home />
      </div>
    </ToastProvider>
  );
}

export default App;
