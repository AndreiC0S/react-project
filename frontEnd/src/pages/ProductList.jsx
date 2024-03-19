import React from "react";
import GetData from "../Components/misc/GetData";
import ShoppingCart from "../Components/ShoppingCart/ShoppingCart";

export default function ProductList() {
  return (
    <>
     <div className='fixed right-[3vw] top-[11.6vh]  z-[1]'>
        {/* <CartContextProvider> */}
          <ShoppingCart/>
        {/* </CartContextProvider> */}
      </div>
      <div className="">
        
        <GetData />
      </div>
    </>
  );
}
