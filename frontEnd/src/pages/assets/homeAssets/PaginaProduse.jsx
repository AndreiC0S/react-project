import React, { useState, useEffect } from 'react';

const produse = [
  { id: 1, nume: 'Produs 1', imagine: 'url_imagine_1' },
  { id: 2, nume: 'Produs 2', imagine: 'url_imagine_2' },
  { id: 3, nume: 'Produs 3', imagine: 'url_imagine_3' },
];

function ProductSlider() {
  const [indexCurent, setIndexCurent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndexCurent((prevIndex) => (prevIndex + 1) % produse.length);
    }, 3000); // Schimbă produsul la fiecare 3 secunde
    return () => clearTimeout(timer);
  }, [indexCurent]);

  const nextProduct = () => {
    setIndexCurent((prevIndex) => (prevIndex + 1) % produse.length);
  };

  const prevProduct = () => {
    setIndexCurent((prevIndex) => (prevIndex - 1 + produse.length) % produse.length);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: '100%', height: '300px' }}> {/* Ajustează înălțimea după necesități */}
        {produse.map((produs, index) => (
          <div
            key={produs.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === indexCurent ? 'opacity-100' : 'opacity-0'}`}
            style={{ display: index === indexCurent ? 'flex' : 'none' }} // Afișează doar produsul curent
          >
            <img src={produs.imagine} alt={produs.nume} className="w-full h-auto" />
            <h2 className="text-xl text-center">{produs.nume}</h2>
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <button
          onClick={prevProduct}
          className="px-4 py-2 mx-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Anterior
        </button>
        <button
          onClick={nextProduct}
          className="px-4 py-2 mx-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Următor
        </button>
      </div>
    </div>
  );
}

export default ProductSlider;
