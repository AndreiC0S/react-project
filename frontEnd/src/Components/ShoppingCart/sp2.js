import React, { useState, useEffect, useContext } from "react";

import { CartContext } from "../../context/cartContext";
import "./css/shoppingList.css";
import Stripe from "../Stripe_card_pay/stripe2"

export default function ShoppingList() {
  const { content, setContent } = useContext(CartContext);

  const { totalPrice, setTotalPrice } = useContext(CartContext);

  const [togglePay, setTogglePay] = useState(false)

  return (
    <>
      <div className="flex flex-row m-[5vh] ">
        <div
          id="parent"
          className="flex flex-col  left-[25%] top-[10.53vh] w-[40%]  border-2 border-indigo-600 overflow-auto "
        >
          {content.map((Val,index) => {
            
            return (
              <>
                <div
                  key={Val.index}
                  className=" flex  flex-row border-2 border-black w-[96%] h-[20%] m-[5px] zIndex "
                >
                  <div className="w-[20%] h-[100%] border-black ">
                    <img
                      className="h-[100%] w-[100%] "
                      src={Val.img}
                      alt="img"
                    />
                  </div>
                  <div className="w-[20%] h-[100%]  border-black ">
                    <p>{Val.title}</p>

                    <p className="text-s">{Val.category}</p>

                    <p>{Val.price * Val.qty} $</p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="bg-gray-400 pt-[10%] p-[5px]">
        <button onClick={()=>setTogglePay(!togglePay)} class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            TOTAL: {totalPrice} $
        </button>
        </div>
          {togglePay &&(
            <div className="flex ml-[10%]">
                <Stripe
                totalPrice = {totalPrice}
                cartContent = {content}
                />
            </div>
          )}
      </div>
    </>
  );
}
