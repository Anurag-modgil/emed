import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerRoutes from "./Routers/CustomerRoute";
import ProductDetails from "./customer/pages/Home/ProductDetails";
import Cart from "./customer/components/cart/Cart";
import AdminPannel from "./Admin/AdminPannel";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const isAdmin = true;
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/*" element={<CustomerRoutes />} />
            <Route path="/admin/*" element={<AdminPannel />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer limit={1} />
    </div>
  );
}

export default App;
