import React, { useEffect, useState } from "react";
import axios from "axios";
import CardBox from "./Card";
import { CartContextProvider } from "../../context/cartContext";
 
const GetData = () => {
//   const [item, setItem] = useState([]);
//   let itemz  
    

// useEffect(()=>{
//   axios.get(`http://localhost:3002/products`)
//       .then(res => {
//         const data = res.data;
//         itemz = data
//         // setItem([data]);
        
//         // console.log(data)
//       })
// },[])
  return (
    <>
     
        <div className="  ">
          
            {/* <CartContextProvider> */}
              <CardBox 
              // item={itemz}
              /> 
            {/* </CartContextProvider> */}
        </div>
     
    </>
  );
};
 
export default GetData;