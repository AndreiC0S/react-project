import React from "react";

// Import from react-router-dom
import {BrowserRouter, Routes,Route} from "react-router-dom";
import Layout from "./Components/layout/Layout";
import Home from "./pages/Home"
import ProductList from "./pages/ProductList"
import About from "./pages/About";
import Contact from "./pages/Contact"
import SignUp from "./Components/login-Register/SignUp";
import Stripe from "./Components/Stripe_card_pay/stripe";
import ShoppingList from "./Components/ShoppingCart/ShoppingList";





import './App.css';


function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
            <Route  element={<Layout />}>
              <Route index  element={<Home />} />
              <Route path="product-list" element={<ProductList/>} />
              <Route path="about" element={<About/>} />
              <Route path="contact" element={<Contact/>} />
              
              <Route path="shopping-list" element={<ShoppingList/>} />
              <Route path="payment" element={<Stripe/>} />
              


              <Route path="*" element={<Home />} />
              
            </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
    
  

  );
}

export default App;
