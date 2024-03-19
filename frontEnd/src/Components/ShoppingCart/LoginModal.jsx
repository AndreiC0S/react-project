import React from "react";

export default function LoginModal() {
    const handleClick = () => {
        // Change the page URL
        window.location.href = '/home';
      };
  return (
    <div  class=" fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-center justify-center h-screen pt-4 px-4 pb-20 text-center">
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span class=" sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"> 
          <div class=" bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 class="text-xl leading-6 font-medium text-gray-900">
              Trebuie sa fii logat pentru a continua
            </h3>
            
          </div> 
          <div class="bg-white px-4 py-3 sm:px-6 sm:flex sm:flex justify-center">
            <button
            onClick={handleClick}
              id="allow"
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              OK
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}
