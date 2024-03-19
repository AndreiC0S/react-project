// import { Carousel } from "@material-tailwind/react";

// export default function Example() {
//   return (
//     <Carousel
//       className="rounded-xl"
//       navigation={({ setActiveIndex, activeIndex, length }) => (
//         <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
//           {new Array(length).fill("").map((_, i) => (
//             <span
//               key={i}
//               className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
//                 activeIndex === i ? "bg-white w-8" : "bg-white/50 w-4"
//               }`}
//               onClick={() => setActiveIndex(i)}
//             />
//           ))}
//         </div>
//       )}
//     >

//       <img
//         src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
//         alt="image 1"
//         className="h-full w-full "
//       />
//       <img
//         src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
//         alt="image 2"
//         className="h-full w-full "
//       />
//       <img
//         src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
//         alt="image 3"
//         className="h-full w-full "
//       />

//     </Carousel>
//   );
// }

import React, { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

export default function Carousel() {
  const slides = [
    {
      url: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
    },
  ];
  
  const [curentIndex, setCurentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = curentIndex === 0;
    const newIndex = isFirstSlide ? slides.length-1 : curentIndex -1;
    setCurentIndex(newIndex);
  }

  const nextSlide = () => {
    const isLastSlide = curentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : curentIndex + 1;
    setCurentIndex(newIndex); 
  }

  const autoSlide = () => {
    const isLastSlide = curentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : curentIndex + 1;
    setCurentIndex(newIndex);
  }
  useEffect(() =>{
    const interval = setInterval(() => {
      autoSlide();
    }, 4000);
    return () => clearInterval(interval)
  })

  return (
    <div className=" h-full  w-full  relative group">
        <img  src={`${slides[curentIndex].url}`}  alt="" className="h-full  w-full  duration-500  rounded-2xl object-cover" />
      {/*     left arrow */}
      <div className="hidden group-hover:block absolute bottom-[50%] -translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/*     right arrow */}
      <div className="hidden group-hover:block absolute bottom-[50%] -translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
    </div>
  );
}
