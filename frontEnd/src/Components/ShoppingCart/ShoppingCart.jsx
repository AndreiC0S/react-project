import React, { useState, useContext, useEffect } from "react";
import "./shoppingCart2.css";

import CartContent from "./CartContent";
import { CartContext } from "../../context/cartContext";

export default function ShoppingCart() {
  const { cartLenght, setCartLenght } = useContext(CartContext);

  const [newCart, setNewCart] = useState();

  const [cart, setCart] = useState(true);

  const handleToggleCart = () => {
    setCart((current) => !current);
  };

  return (
    <>
      <button className="toggle-cart " onClick={handleToggleCart}>
        <i className="fas fa-shopping-cart text-black  "></i>
      </button>
      <span className="cart-item-count m-0 p-0">{cartLenght}</span>
      {!cart && (
        <>
          <CartContent newCart={newCart} setNewCart={setNewCart} />
        </>
      )}
    </>
  );
}
