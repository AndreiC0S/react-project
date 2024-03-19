import React from 'react'
import Carousel from './assets/homeAssets/Carousel'
import ShoppingCart from '../Components/ShoppingCart/ShoppingCart'
import DespreNoi from './assets/homeAssets/About'

export default function Home() {
  return (
    <>
    

      <div className='fixed right-[3vw] top-[11.6vh]  z-[1]'>
        {/* <CartContextProvider> */}
          <ShoppingCart/>
        {/* </CartContextProvider> */}
      </div>
      <div className='w-full felx items-center justify-center  '>
        <div className=''><h1 className='ml-[50%]'> HOME</h1> </div>
        
        
        
        <div id='carContainer' className='flex items-center justify-center'>
          <span id='carousel' className=''><Carousel/></span>
          
        </div>
        
      </div>
      
      <div>
      
      <DespreNoi/>
      </div>
    
      
    
    </>
    
    
  )
}
// import React from 'react'
// import Carousel from './assets/homeAssets/Carousel'
// import ShoppingCart from '../Components/ShoppingCart/ShoppingCart'
// import DespreNoi from './assets/homeAssets/About'

// export default function Home() {
//   return (
//     <>
//       <div className='fixed right-12 top-28 z-10'>
//         {/* <CartContextProvider> */}
//           <ShoppingCart className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"/>
//         {/* </CartContextProvider> */}
//       </div>
//       <div className='w-full flex items-center justify-center flex-col'>
        
        
//         <div id='carContainer' className='flex items-center justify-center my-5'>
//           <span id='carousel' className='shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out'>
//             <Carousel/>
//           </span>
//         </div>
//       </div>
      
//       <div className='mt-10 shadow-lg'>
//         <DespreNoi/>
//       </div>
//     </>
//   )
// }
