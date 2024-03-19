// LoadingScreen.js
import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-20 ">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-300 " />
    </div>
  );
};

export default LoadingScreen;
