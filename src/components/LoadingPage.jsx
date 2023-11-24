import React from 'react';
import { HashLoader } from 'react-spinners';

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <HashLoader color="#36d7b7" size={80} /> {/* Adjust size and color as needed */}
    </div>
  );
};

export default LoadingPage;
