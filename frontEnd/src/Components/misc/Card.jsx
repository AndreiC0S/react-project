import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

import { CartContext } from "../../context/cartContext";
import axios from "axios";

const CardBox = () => {
  const { content, setContent } = useContext(CartContext);
  const [sortDirection, setSortDirection] = useState("");
  const [dataItem, setDataItem] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3002/products", { responseType: "json" })
      .then(function (response) {
        const items = response.data.data;
        setDataItem(items);
        setCategories([...new Set(items.map((item) => item.categorie_produs))]);
        setMaxPrice(
          Math.max(...items.map((item) => parseFloat(item.pret_produs)))
        );
        setMinPrice(
          Math.min(...items.map((item) => parseFloat(item.pret_produs)))
        );
        // Inițializează priceRange cu valoarea maximă după încărcarea datelor
        setPriceRange(0);
      });
  }, []);

  let filteredData = dataItem
    .filter(
      (item) =>
        (selectedCategory === "all" ||
          item.categorie_produs === selectedCategory) &&
        item.nume_produs.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (priceRange === 0 ||
          parseFloat(item.pret_produs) <= parseFloat(priceRange))
    )
    .sort((a, b) => {
      if (sortDirection === "asc") {
        return parseFloat(a.pret_produs) - parseFloat(b.pret_produs);
      } else if (sortDirection === "desc") {
        return parseFloat(b.pret_produs) - parseFloat(a.pret_produs);
      }
      return 0; // Fără sortare dacă sortDirection este ""
    });

  // Aceasta este implementarea funcției addContent
  const addContent = (id, img, title, category, price, qty = 1) => {
    const newContent = { id, img, title, category, price, qty };
    const exists = content.some((item) => item.id === id);
    if (exists) {
      // Dacă produsul există deja, actualizează cantitatea
      setContent(
        content.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      // Dacă produsul nu există, adaugă-l în listă
      setContent([...content, newContent]);
    }
  };
  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchTerm("");
    setPriceRange(0); // sau setează-l la minPrice dacă dorești să înceapă de la minimul posibil
    setSortDirection("");
  };
  const handlePriceRangeChange = (e) => {
    // Convertim valoarea inputului la un număr și o actualizăm
    const value = Number(e.target.value);
    setPriceRange(value);
  };
  // lg:sticky top-0 p-4 bg-white w-full lg: w-[300px]  h-auto lg:h-full 
  return (
    <>
      <div className="flex flex-col md:flex-row lg:flex-row">
        <div className="flex flex-col w-full  bg-white mb-5  justify-center items-center
        md:mr-5 md:float-left md:sticky md:top-0 md:p-4 md:bg-white md:w-[300px]  md:h-full
        lg:sticky lg:top-0 lg:p-4 lg:bg-white lg:w-[300px]  lg:h-full 
        ">
          <input
            type="text"
            placeholder="Caută după nume..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[190px] p-2 rounded border border-gray-200 mb-4"
          />
          <h4 className="font-semibold mb-2">Categorie</h4>
          <div className="w-[190px]">
            
          <button
            onClick={() => setSelectedCategory("all")}
            className={`w-full text-left p-2 rounded mb-2 ${
              selectedCategory === "all"
                ? "bg-purple-600 text-white"
                : "bg-transparent text-gray-600"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full text-left p-2 rounded mb-2 ${
                selectedCategory === category
                  ? "bg-purple-600 text-white"
                  : "bg-transparent text-gray-600"
              }`}
            >
              {category}
            </button>
          ))}
          </div>
          <h4 className="font-semibold mb-2">Preț</h4>
          <input
            type="number"
            min={minPrice} // Minimul posibil pentru preț
            max={maxPrice} // Maximul posibil pentru preț
            value={priceRange}
            onChange={handlePriceRangeChange}
            className="w-[190px] p-2 rounded border border-gray-200 mb-4"
            placeholder="Introduceți prețul maxim"
          />
          <p>max: {priceRange}$</p>
          <div className="flex flex-col justify-between mb-4 sm:flex-row">
            <Button
              color="lightBlue"
              onClick={() => setSortDirection("asc")}
              className={`${
                sortDirection === "asc"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Preț Crescător
            </Button>
            <Button
              color="lightBlue"
              onClick={() => setSortDirection("desc")}
              className={`${
                sortDirection === "desc"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Preț Descrescător
            </Button>
          </div>
          <Button
            className="w-[190px] text-left p-2 text-center rounded mb-4 bg-purple-600 text-white"
            onClick={resetFilters}
          >
            Reset
          </Button>
        </div>
        <div
          id="cardBoxResp"
          className="mt-4 flex-wrap w-full lg:justify-center  lg:flex lg:flex-wrap lg:w-[80vw]  "
        >
          {filteredData.map((Val, index) => {
            return (
              <div key={Number(Val.id)}>
                <Card className="flex w-full md:top-0  md:w-96 h-[500px] lg:w-[331px] xl:w-[400px]  overflow-auto flex rounded break-words bg-white border-gray-300  mb-5 mr-6">
                  <CardHeader
                    shadow={false}
                    floated={false}
                    className="h-48"
                    children={false}
                    style={{
                      backgroundImage: `url(${Val.poza_url})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "contain",
                    }}
                  ></CardHeader>
                  <CardBody>
                    <div className="flex items-center justify-between mb-2">
                      <Typography color="blue-gray" className="font-medium">
                        {Val.nume_produs}
                      </Typography>
                      <Typography color="blue-gray" className="font-medium">
                        {Number(Val.pret_produs) + "$"}
                      </Typography>
                    </div>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal opacity-75"
                    >
                      {Val.descriere_produs}
                    </Typography>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <Button
                      ripple={false}
                      fullWidth={true}
                      className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
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
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default CardBox;
