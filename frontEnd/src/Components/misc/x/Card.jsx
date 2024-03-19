// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Typography,
//   Button,
// } from "@material-tailwind/react";
// import { CartContext } from "../../context/cartContext";

// const CardBox = () => {
//   const { content, setContent } = useContext(CartContext);
//   const [dataItem, setDataItem] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [minPrice, setMinPrice] = useState('');
//   const [maxPrice, setMaxPrice] = useState('');

//   useEffect(() => {
//     axios.get("http://localhost:3002/products", {
//       responseType: "json",
//     }).then(function (response) {
//       setDataItem(response.data.data);
//     });
//   }, []);
//   const addContent = (id, img, title, category, price, qty = 1) => {
//     let newContent = {
//       id: id,
//       img: img,
//       title: title,
//       category: category,
//       price: price,
//       qty: qty,
//     };

//     if (Object.keys(content).length === 0) {
//       setContent([...content, newContent]);
//     } else {
//       const existaObiect = content.some((itemA) => itemA.id === newContent.id);
//       if (existaObiect) {
//         setContent((prevArrayA) =>
//           prevArrayA.map((itemA) =>
//             itemA.id === newContent.id
//               ? { ...itemA, qty: itemA.qty + 1 }
//               : itemA
//           )
//         );
//       } else {
//         setContent([...content, newContent]);

//       }
//     }
//   };
//   const filteredData = dataItem.filter(item => {
//     return item.nume_produs.toLowerCase().includes(searchTerm.toLowerCase()) &&
//            item.pret_produs >= (minPrice || 0) &&
//            item.pret_produs <= (maxPrice || Infinity);
//   });

//   return (
//     <>
//        <div className="flex absolute justify-center mb-8 gap-x-4">
//         <input
//           type="text"
//           placeholder="Caută după nume..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="input input-bordered input-primary w-full max-w-xs rounded-lg"
//         />
//         <input
//           type="number"
//           placeholder="Preț minim"
//           value={minPrice}
//           onChange={(e) => setMinPrice(e.target.value)}
//           className="input input-bordered input-primary w-full max-w-xs rounded-lg"
//         />
//         <input
//           type="number"
//           placeholder="Preț maxim"
//           value={maxPrice}
//           onChange={(e) => setMaxPrice(e.target.value)}
//           className="input input-bordered input-primary w-full max-w-xs rounded-lg"
//         />
//       </div>
//       <div className="flex flex-wrap justify-center items-center mx-auto">
//         {filteredData.map((Val) => (
//           <div
//             className="flex rounded-lg break-words bg-white shadow-lg mb-5 mx-3"
//             key={Val.id}
//           >
//               <Card className="w-96 h-[500px]  overflow-auto">
//                 <CardHeader
//                   shadow={false}
//                   floated={false}
//                   className="h-48"
//                   children={false}
//                   style={{
//                     backgroundImage: `url(${Val.poza_url})`,
//                     backgroundRepeat: "no-repeat",
//                     backgroundSize: "contain",
//                   }}
//                 ></CardHeader>
//                 <CardBody>
//                   <div className="flex items-center justify-between mb-2">
//                     <Typography color="blue-gray" className="font-medium">
//                       {Val.nume_produs}
//                     </Typography>
//                     <Typography color="blue-gray" className="font-medium">
//                       {Number(Val.pret_produs) + "$"}
//                     </Typography>
//                   </div>
//                   <Typography
//                     variant="small"
//                     color="gray"
//                     className="font-normal opacity-75"
//                   >
//                     {Val.descriere_produs}
//                   </Typography>
//                 </CardBody>
//                 <CardFooter className="pt-0">
//                   <Button
//                     ripple={false}
//                     fullWidth={true}
//                     className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
//                     onClick={() =>
//                       addContent(
//                         Val.id,
//                         Val.poza_url,
//                         Val.nume_produs,
//                         Val.categorie_produs,
//                         Val.pret_produs
//                       )
//                     }
//                   >
//                     Add to Cart
//                   </Button>
//                 </CardFooter>
//               </Card>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };
// export default CardBox;
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { CartContext } from "../../context/cartContext";

const CardBox = () => {
  const { content, setContent } = useContext(CartContext);
  const [dataItem, setDataItem] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState(80);

  useEffect(() => {
    axios
      .get("http://localhost:3002/products", { responseType: "json" })
      .then(function (response) {
        setDataItem(response.data.data);
        const uniqueCategories = new Set(
          response.data.data.map((item) => item.categorie_produs)
        );
        setCategories([...uniqueCategories]);
      });
  }, []);

  const addContent = (id, img, title, category, price, qty = 1) => {
    let newContent = { id, img, title, category, price, qty };
    const exists = content.some((item) => item.id === id);
    if (exists) {
      setContent(
        content.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setContent([...content, newContent]);
    }
  };

  const filteredData = dataItem.filter((item) => {
    return (
      (selectedCategory === "all" ||
        item.categorie_produs === selectedCategory) &&
      item.nume_produs.toLowerCase().includes(searchTerm.toLowerCase()) &&
      item.pret_produs <= priceRange
    );
  });

  return (
    // <>
    //   <div className="sticky h-full top-0 p-4 bg-white">
    //     <input
    //       type="text"
    //       placeholder="Caută după nume..."
    //       value={searchTerm}
    //       onChange={(e) => setSearchTerm(e.target.value)}
    //       className="w-full p-2 rounded border border-gray-200 mb-4"
    //     />
    //     <h4 className="font-semibold mb-2">Categorie</h4>
    //     <button
    //       onClick={() => setSelectedCategory("all")}
    //       className={`w-full text-left p-2 rounded mb-2 ${
    //         selectedCategory === "all"
    //           ? "bg-blue-500 text-white"
    //           : "bg-transparent text-gray-600"
    //       }`}
    //     >
    //       All
    //     </button>
    //     {categories.map((category) => (
    //       <button
    //         key={category}
    //         onClick={() => setSelectedCategory(category)}
    //         className={`w-full text-left p-2 rounded mb-2 ${
    //           selectedCategory === category
    //             ? "bg-blue-500 text-white"
    //             : "bg-transparent text-gray-600"
    //         }`}
    //       >
    //         {category}
    //       </button>
    //     ))}
    //     <h4 className="font-semibold mb-2">Preț</h4>
    //     <input
    //       type="range"
    //       className="w-full"
    //       min="0"
    //       max={Math.max(...dataItem.map((item) => item.pret_produs))}
    //       value={priceRange}
    //       onChange={(e) => setPriceRange(e.target.value)}
    //     />
    //     <p>{priceRange}</p>
    //   </div>
    //   <div className="w-3/4 p-4 flex flex-wrap justify-center items-center">
    //     {filteredData.map((Val) => (
    //       <div
    //         className="flex rounded-lg break-words bg-white shadow-lg mb-5 mx-3"
    //         key={Val.id}
    //       >
    //         <Card className="w-96 h-[500px]  overflow-auto">
    //           <CardHeader
    //             shadow={false}
    //             floated={false}
    //             className="h-48"
    //             children={false}
    //             style={{
    //               backgroundImage: `url(${Val.poza_url})`,
    //               backgroundRepeat: "no-repeat",
    //               backgroundSize: "contain",
    //             }}
    //           ></CardHeader>
    //           <CardBody>
    //             <div className="flex items-center justify-between mb-2">
    //               <Typography color="blue-gray" className="font-medium">
    //                 {Val.nume_produs}
    //               </Typography>
    //               <Typography color="blue-gray" className="font-medium">
    //                 {Number(Val.pret_produs) + "$"}
    //               </Typography>
    //             </div>
    //             <Typography
    //               variant="small"
    //               color="gray"
    //               className="font-normal opacity-75"
    //             >
    //               {Val.descriere_produs}
    //             </Typography>
    //           </CardBody>
    //           <CardFooter className="pt-0">
    //             <Button
    //               ripple={false}
    //               fullWidth={true}
    //               className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
    //               onClick={() =>
    //                 addContent(
    //                   Val.id,
    //                   Val.poza_url,
    //                   Val.nume_produs,
    //                   Val.categorie_produs,
    //                   Val.pret_produs
    //                 )
    //               }
    //             >
    //               Add to Cart
    //             </Button>
    //           </CardFooter>
    //         </Card>
    //       </div>
    //     ))}
    //   </div>
    // </>
    <>
      <div className="flex">
        <div className="sticky top-0 p-4 w-1/4 h-screen bg-white overflow-auto">
          <input
            type="text"
            placeholder="Caută după nume..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full p-2 mb-4 rounded border border-gray-300"
          />
          <h4 className="font-semibold mb-2">Categorie</h4>
          <div className="space-y-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`block w-full text-left p-2 rounded ${
                selectedCategory === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`block w-full text-left p-2 rounded ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <h4 className="font-semibold my-4">Preț: {priceRange}</h4>
          <input
            type="range"
            className="range range-primary w-full"
            min="0"
            max={Math.max(
              ...dataItem.map((item) => parseFloat(item.pret_produs) || 0)
            )}
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          />
        </div>
        <div className="flex-1 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredData.map((Val) => (
              
                <Card className="flex rounded-lg break-words bg-white shadow-lg mb-5 mx-3"
                key={Val.id}>
                  <CardHeader
                    shadow={false}
                    floated={false}
                    className="h-48"
                    style={{
                      backgroundImage: `url(${Val.poza_url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <CardBody>
                    <Typography color="blue-gray" className="font-medium">
                      {Val.nume_produs}
                    </Typography>
                    <Typography color="blue-gray" className="font-medium">
                      {Number(Val.pret_produs) + "$"}
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="opacity-75"
                    >
                      {Val.descriere_produs}
                    </Typography>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <Button
                      ripple={false}
                      fullWidth={true}
                      className="bg-blue-gray-900/10 text-blue-gray-900 hover:bg-blue-gray-800 hover:text-white"
                      onClick={() =>
                        addContent(
                          Val.id,
                          Val.poza_url,
                          Val.nume_produs,
                          Val.categorie_produs,
                          Val.pret_produs
                        )
                      }
                    >
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
             
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardBox;
