import React, { createContext, useEffect, useState } from "react";
import { object } from "yup";

export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [content, setContent] = useState(
    JSON.parse(localStorage.getItem("cartItems") || "[]")
  );

  const [test, setTest] = useState(0);

  const [cartLenght, setCartLenght] = useState();

  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    setTest(content.reduce((total, object) => total + object.qty, 0));

    setTotalPrice(content.reduce((total, object) => total + object.price * object.qty, 0))

    if (content != null) {
      localStorage.setItem("cartItems", JSON.stringify(content));
    } else {
      localStorage.setItem("cartItems", null);
    }
  }, [content]);

  useEffect(() => {
    setCartLenght(test);
  }, [test]);

  localStorage.setItem("cartItems", JSON.stringify(content));

  return (
    <CartContext.Provider
      value={{
        content,
        setContent,
        cartLenght,
        setCartLenght,
        totalPrice,
        setTotalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
