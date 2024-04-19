import React, { useState } from "react";
import Sidebar from "../../Components/AdminComponents/Layout/Sidebar/Sidebar";
import Header from "../../Components/AdminComponents/Layout/Header/Header";

const Settings = () => {
  const [featuredProductsLimit, setFeaturedProductsLimit] = useState(4);

  const handleFeaturedProductsLimitChange = (e) => {
    setFeaturedProductsLimit(parseInt(e.target.value));
  };

  return (
    <div className="flex flex-col md:flex-row bg-white text-black">
      <Sidebar className="md:w-56" />
      <div className="flex-1">
        <div className="md:ml-56 p-1 min-h-screen">
          <div className="max-w-screen-xl mx-auto">
            <Header
              pageTitle={"Settings"}
              pageDescription={"Change and customize your Website"}
            />
            <hr className="my-4" />
            <div className="bg-white p-1 md:p-1">
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">
                  Featured Products Limit
                </h2>
                <p>Set the maximum number of featured products to display.</p>
                <div>
                  <label className="block mt-4">
                    <span className="text-gray-700">Limit:</span>
                    <input
                      type="number"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={featuredProductsLimit}
                      onChange={handleFeaturedProductsLimitChange}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
