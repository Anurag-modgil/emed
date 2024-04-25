import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import Homepage from "../customer/pages/Home/Homepage";
import Contact from "../customer/pages/contact/Contact";
import Healthcare from "../customer/components/Healthcare/Healthcare";
import Aboutus from "../customer/pages/aboutus/Aboutus";
import Labtest from "../customer/pages/Lab Tests/Labtest";
import Cart from "../customer/components/cart/Cart";
import ProductDetails from "../customer/pages/Home/ProductDetails";
import Checkout from "../customer/components/Checkout/Checkout";
import Order from "../customer/components/orders/Order";
import OrderDetails from "../customer/components/orders/OrderDetails";
import PaymentSuccess from "../customer/components/paymentSuccess/PaymentSuccess";
import { customerTheme } from "../Admin/them/customeThem";
import HomePageLayout from "../customer/components/homepagelayout/HomePageLayout";
import Createsellproduct from "../customer/components/sellproduct/createsellproduct";

const CustomerRoutes = () => {
  const showNavigation = location.pathname !== "*";
  return (
    <div>
      <ThemeProvider theme={customerTheme}>
        {showNavigation && (
          <HomePageLayout>
            <Routes>
              <Route path="/login" element={<Homepage />}></Route>
              <Route path="/register" element={<Homepage />}></Route>
              <Route path="/" element={<Homepage />} />
              <Route path="/Labtest" element={<Labtest />} />
              <Route path="/healthcare" element={<Healthcare />} />
              <Route path="/sell" element={<Createsellproduct />} />
              <Route path="/aboutus" element={<Aboutus />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/:productId" element={<ProductDetails />}></Route>
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/account/order" element={<Order />} />
              <Route
                path="/account/order/:orderId"
                element={<OrderDetails />}
              />
              <Route path="/payment/:orderId" element={<PaymentSuccess />} />
            </Routes>
          </HomePageLayout>
        )}
      </ThemeProvider>
    </div>
  );
};

export default CustomerRoutes;
