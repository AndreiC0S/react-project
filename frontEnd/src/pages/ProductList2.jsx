import React from "react";
import CardBox from '../Components/misc/Card'
import ShoppingCart from "../Components/ShoppingCart/ShoppingCart";

export default function ProductList() {
  return (
    <>
     <div className='fixed right-[3vw] top-[11.6vh]  z-[1]'>
        {/* <CartContextProvider> */}
          <ShoppingCart/>
        {/* </CartContextProvider> */}
      </div>
      <div className="container flex flex-wrap sm:px-4 max-w-full mx-auto  sm:px-4">
        <CardBox />
      </div>
    </>
  );
}
