import React from 'react';
import Image3 from "../images/image3.jpg"

const AboutPage = () => {
  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            <h1 className="text-3xl font-bold mb-4">About Our Company</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img
                  src={Image3}
                  alt="Company Logo"
                  className="rounded-lg shadow-md"
                />
              </div>
              <div>
                <p className="text-lg mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  facilisi. Curabitur euismod mauris et neque convallis, ac
                  luctus libero consequat. Suspendisse potenti. Aenean
                  consectetur fringilla tortor, et efficitur odio posuere eget.
                </p>
                <p className="text-lg">
                  Vestibulum ante ipsum primis in faucibus orci luctus et
                  ultrices posuere cubilia Curae; Sed consequat libero quis
                  suscipit luctus.
                </p>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Contact Details</h2>
              <p className="text-lg">
                <strong>Email:</strong> info@company.com
              </p>
              <p className="text-lg">
                <strong>Phone:</strong> +1 (123) 456-7890
              </p>
              <p className="text-lg">
                <strong>Address:</strong> 123 Main Street, City, Country
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
