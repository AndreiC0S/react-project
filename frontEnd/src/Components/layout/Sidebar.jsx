import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [activePage, setActivePage] = useState('Page 1');

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <div className="flex absolute">
      <div className="w-[250px] ml-5 bg-gray-200">
        <div className="flex items-center justify-center h-12 bg-gray-300">
          Sidebar
        </div>
        <aside className="flex flex-col mt-4 items-center justify-center">
          <Link
            className={`p-2 rounded-lg ${
              activePage === 'Page 1' ? 'bg-gray-400' : ''
            }`}
            onClick={() => handlePageChange('Page 1')}
          >
            News
          </Link>
          <Link
            className={`p-2 rounded-lg ${
              activePage === 'Page 2' ? 'bg-gray-400' : ''
            }`}
            onClick={() => handlePageChange('Page 2')}
          >
            Best Offers
          </Link>
          <Link
            className={`p-2 rounded-lg ${
              activePage === 'Page 3' ? 'bg-gray-400' : ''
            }`}
            onClick={() => handlePageChange('Page 3')}
          >
            Sales
          </Link>
          <Link
            className={`p-2 rounded-lg ${
              activePage === 'Page 4' ? 'bg-gray-400' : ''
            }`}
            onClick={() => handlePageChange('Page 4')}
          >
            CV
          </Link>
        </aside>
      </div>
      <div className="w-3/4 bg-white">
        {/* <div className="flex items-center justify-center h-12 bg-gray-300">
          {activePage}
        </div>
        <div className="p-4">Content of {activePage}</div> */}
      </div>
    </div>
  );
};

export default Sidebar;