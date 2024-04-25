import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerRoutes from "./Routers/CustomerRoute";
import ProductDetails from "./customer/pages/Home/ProductDetails";
import Cart from "./customer/components/cart/Cart";
import AdminPannel from "./Admin/AdminPannel";

function App() {
  const isAdmin=true;
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/*" element={<CustomerRoutes />} />
          <Route path="/admin/*" element={<AdminPannel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
