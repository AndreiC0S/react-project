// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import "./css/product.css";
// import AddProduct from "../Components/prod_comp/AddProduct";

// import EditProduct from "../Components/prod_comp/Edit_product";
// // import { avatar } from "@material-tailwind/react";

// export default function Products() {
//   const [editProd, setEditProd] = useState(false);
//   const [getProd, setGetProd] = useState([]);
//   const [addProd, setAddProd] = useState(false);
//   const [passData, setPassData] = useState([]);

//   // Function to handle data for editing a product
//   const dataProp = (
//     id,
//     nume_produs,
//     descriere_produs,
//     poza_url,
//     categorie_produs,
//     pret_produs
//   ) => {
//     setEditProd(true);
//     setPassData([]);

//     const newElements = {
//       id: id,
//       nume_produs: nume_produs,
//       descriere_produs: descriere_produs,
//       poza_url: poza_url,
//       categorie_produs: categorie_produs,
//       pret_produs: pret_produs,
//     };

//     setPassData((oldArray) => [...oldArray, newElements]);
//   };

//   // Function to delete a product
//   const deleteProd = (id, title) => {
//     var answer = window.confirm(
//       `Are you sure you want to delete the product with ID: ${id} and title: ${title}?`
//     );

//     if (answer) {
//       axios
//         .delete(`http://localhost:3002/products/${id}`)
//         .then((res) => {
//           alert(`ID: ${id} Title: ${title} was deleted`);
//           setGetProd(getProd.filter((item) => item.id !== id));
//         })
//         .catch((error) => {
//           alert(error);
//         });
//     } else {
//       return;
//     }
//   };

//   //---------------------- Filter products by ID--------------------------------

//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   // Functia care se ocupă de căutare
//   const handleSearch = () => {
//     const filtered = getProd.filter((product) => {
//       const idMatch = product.id.toString().includes(searchTerm);
//       const nameMatch = product.nume_produs
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());
//       return idMatch || nameMatch;
//     });
//     setFilteredProducts(filtered);
//   };

//   // Functia care se ocupă de resetarea căutării
//   const clearSearch = () => {
//     setSearchTerm("");
//     setFilteredProducts([]);
//   };

//   // Functia care se activează la apăsarea tastei "Enter"
//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       handleSearch();
//     }
//   };

//   // ---------------------------------------------------------------------------

//   useEffect(() => {
//     // Fetch products from the server on component mount
//     axios.get(`http://localhost:3002/products`).then((res) => {
//       setGetProd(res.data.data);
//     });
//   }, []);

//   return (
//     <>
//       <div>
//         <div className="flex  w-[100hw] h-[3vh] bg-amber-300">

//           <button onClick={() => setAddProd(!addProd)}>AddProd</button>
//         </div>
//         {editProd && (
//           <EditProduct
//             setEditProd={setEditProd}
//             passData={passData}
//             dataProp={dataProp}
//           />
//         )}
//         {addProd && <AddProduct />}

//         <div
//           id="parent"
//           className="flex flex-col float-right  right-0 bg-gray-500 w-[49vw] h-[80.35vh] max-h-[80.5vh] border-2 border-indigo-600 overflow-auto "

//         >

//           <div className="flex items-center  mb-4">
//             <input
//               type="text"
//               placeholder="Caută după ID sau nume"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               onKeyDown={handleKeyDown}
//               className="p-2 border border-gray-300 rounded mr-2"
//             />
//             <button
//               onClick={handleSearch}
//               className="bg-blue-500 text-white p-2 rounded"
//             >
//               Caută
//             </button>
//             <button
//               onClick={clearSearch}
//               className="bg-gray-500 text-white p-2 rounded"
//             >
//               Resetare
//             </button>
//           </div>
//           {filteredProducts.length > 0
//             ?
//               filteredProducts
//                 .slice()
//                 .reverse()
//                 .map((Val, index) => {
//                   return (
//                     <>
//                       <div
//                         key={Val.id}
//                         className=" flex  flex-row border-2 border-black w-[96%] max-h-[100px] m-[5px] zIndex "
//                       >
//                         <div className="w-[20%] h-[100%] border-e-2 border-black ">
//                           <img
//                             className="h-[100%] w-[100%]"
//                             src={Val.poza_url}
//                             alt="img"
//                           />
//                         </div>
//                         <div className="w-[20%] h-[100%] border-e-2 border-black ">
//                           <p>id: {Val.id}</p>
//                           <p>{Val.nume_produs}</p>
//                           <p className="text-s">{Val.categorie_produs}</p>
//                           <p>{Val.pret_produs} $</p>
//                         </div>
//                         <div className="w-[40%] h-[100%] border-e-2 border-black overflow-auto">
//                           <p className="">{Val.descriere_produs}</p>
//                         </div>
//                         <div className="w-[20%] h-[100%] bg-black">
//                           <button
//                             type="button"
//                             onClick={() =>
//                               dataProp(
//                                 Val.id,
//                                 Val.nume_produs,
//                                 Val.descriere_produs,
//                                 Val.poza_url,
//                                 Val.categorie_produs,
//                                 Val.pret_produs
//                               )
//                             }
//                             className="w-full h-[45%] bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-300"
//                           >
//                             Edit
//                           </button>

//                           <button
//                             type="button"
//                             onClick={() => deleteProd(Val.id, Val.nume_produs)}
//                             className="w-full h-[45%] mt-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-300"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </div>
//                     </>
//                   );
//                 })
//             :
//               getProd
//                 .slice()
//                 .reverse()
//                 .map((Val2, index2) => {
//                   return (
//                     <>
//                       <div
//                         key={Val2.id}
//                         className=" flex  flex-row border-2 border-black w-[96%] max-h-[100px] m-[5px] zIndex "
//                       >
//                         <div className="w-[20%] h-[100%] border-e-2 border-black ">
//                           <img
//                             className="h-[100%] w-[100%]"
//                             src={Val2.poza_url}
//                             alt="img"
//                           />
//                         </div>
//                         <div className="w-[20%] h-[100%] border-e-2 border-black ">
//                           <p>id: {Val2.id}</p>
//                           <p>{Val2.nume_produs}</p>
//                           <p className="text-s">{Val2.categorie_produs}</p>
//                           <p>{Val2.pret_produs} $</p>
//                         </div>
//                         <div className="w-[40%] h-[100%] border-e-2 border-black overflow-auto">
//                           <p className="">{Val2.descriere_produs}</p>
//                         </div>
//                         <div className="w-[20%] h-[100%] bg-black">
//                           <button
//                             type="button"
//                             onClick={() =>
//                               dataProp(
//                                 Val2.id,
//                                 Val2.nume_produs,
//                                 Val2.descriere_produs,
//                                 Val2.poza_url,
//                                 Val2.categorie_produs,
//                                 Val2.pret_produs
//                               )
//                             }
//                             className="w-full h-[45%] bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-300"
//                           >
//                             Edit
//                           </button>

//                           <button
//                             type="button"
//                             onClick={() =>
//                               deleteProd(Val2.id, Val2.nume_produs)
//                             }
//                             className="w-full h-[45%] mt-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-300"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </div>
//                     </>
//                   );
//                 })}
//         </div>
//       </div>
//     </>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/product.css"; // Asigură-te că acest fișier există și conține stiluri relevante.
import AddProduct from "../Components/prod_comp/AddProduct";
import EditProduct from "../Components/prod_comp/Edit_product";

export default function Products() {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editProd, setEditProd] = useState(false);
  const [getProd, setGetProd] = useState([]);
  const [addProd, setAddProd] = useState(false);
  const [passData, setPassData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3002/products`).then((res) => {
      setGetProd(res.data.data);
    });
  }, []);

  const dataProp = (
    id,
    nume_produs,
    descriere_produs,
    poza_url,
    categorie_produs,
    pret_produs
  ) => {
    setEditProd(true);
    setPassData([
      {
        id,
        nume_produs,
        descriere_produs,
        poza_url,
        categorie_produs,
        pret_produs,
      },
    ]);
  };

  const deleteProd = (id, title) => {
    if (
      window.confirm(
        `Are you sure you want to delete the product with ID: ${id} and title: ${title}?`
      )
    ) {
      axios
        .delete(`http://localhost:3002/products/${id}`)
        .then(() => {
          alert(`ID: ${id} Title: ${title} was deleted`);
          setGetProd(getProd.filter((item) => item.id !== id));
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const handleSearch = () => {
    const filtered = getProd.filter(
      (product) =>
        product.id.toString().includes(searchTerm) ||
        product.nume_produs.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredProducts([]);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const displayProducts =
    filteredProducts.length > 0 ? filteredProducts : getProd;

  return (
    <>
      <div className="flex   flex-col w-[50%] w-[49vw] h-[83vh] overflow-auto  bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Products</h2>
          <div className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded shadow">
            <button onClick={() => setShowAddProduct(!showAddProduct)}>
              Add Product
            </button>
            {showAddProduct && (
              <AddProduct onClose={() => setShowAddProduct(false)} />
            )}
          </div>
          {/* <button onClick={() => setAddProd(!addProd)} className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded shadow">
            Add Product
          </button> */}
        </div>

        {editProd && (
          <EditProduct
            setEditProd={setEditProd}
            passData={passData}
            dataProp={dataProp}
          />
        )}
        {addProd && <AddProduct />}

        <div className="flex flex-col w-full bg-gray-200 p-4 rounded-lg shadow overflow-auto">
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search by ID or name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="p-2 w-full border border-gray-300 rounded-lg mr-2"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
            >
              Search
            </button>
            <button
              onClick={clearSearch}
              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg ml-2"
            >
              Clear
            </button>
          </div>

          {displayProducts
            .slice()
            .reverse()
            .map((Val) => (
              <div
                key={Val.id}
                className="flex bg-white p-4 m-2 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out"
              >
                <img
                  src={Val.poza_url}
                  alt="Product"
                  className="w-24 h-24 rounded-lg mr-4"
                />
                <div className="flex-grow">
                  <p className="font-bold">{Val.nume_produs}</p>
                  <p className="text-sm text-gray-600">
                    {Val.categorie_produs}
                  </p>
                  <p>{Val.pret_produs} $</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {Val.descriere_produs}
                  </p>
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  <button
                    onClick={() =>
                      dataProp(
                        Val.id,
                        Val.nume_produs,
                        Val.descriere_produs,
                        Val.poza_url,
                        Val.categorie_produs,
                        Val.pret_produs
                      )
                    }
                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProd(Val.id, Val.nume_produs)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
