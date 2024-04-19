import React, { useState } from "react";
import Sidebar from "../../Components/AdminComponents/Layout/Sidebar/Sidebar";
import Header from "../../Components/AdminComponents/Layout/Header/Header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings = () => {
  // State for managing settings
  const [settings, setSettings] = useState({
    featuredProductsLimit: 4,
    socialLinks: {
      facebook: "https://www.facebook.com/BerserkFit/",
      twitter: "https://twitter.com/itxgm/",
      instagram: "", // Add Instagram link here
      linkedin: "https://www.linkedin.com/in/mustafa-gm/",
      github: "https://github.com/Musxeto",
    },
    deliveryCharge: 5, // Single delivery charge value
  });

  // Handler for updating settings
  const handleSettingChange = (key, value) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
  };

  // Handler for saving settings
  const handleSaveSettings = () => {
    // Save settings logic here (could be API call or local storage)
    // For now, just show a toast notification
    toast.success("Settings saved successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="flex flex-col md:flex-row bg-white text-black">
      <Sidebar className="md:w-56" />
      <div className="flex-1">
        <div className="md:ml-56 p-3 min-h-screen">
          <div className="max-w-screen-xl mx-auto">
            <Header
              pageTitle={"Settings"}
              pageDescription={"Change and customize your Website"}
            />
            <hr className="my-4" />
            <form
              className="bg-white p-1 md:p-1"
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveSettings();
              }}
            >
              {/* Featured Products Limit */}
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
                      value={settings.featuredProductsLimit}
                      onChange={(e) =>
                        handleSettingChange(
                          "featuredProductsLimit",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </label>
                </div>
              </div>

              {/* Social Links */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Social Links</h2>
                <p>Update the links to your social media accounts.</p>
                <div>
                  {Object.entries(settings.socialLinks).map(
                    ([platform, link], index) => (
                      <label key={index} className="block mt-4">
                        <span className="text-gray-700 capitalize">
                          {platform}:
                        </span>
                        <input
                          type="text"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={link}
                          onChange={(e) =>
                            handleSettingChange("socialLinks", {
                              ...settings.socialLinks,
                              [platform]: e.target.value,
                            })
                          }
                        />
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Delivery Charges */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Delivery Charge</h2>
                <p>Set the delivery charge for all orders.</p>
                <div>
                  <label className="block mt-4">
                    <span className="text-gray-700">Charge:</span>
                    <input
                      type="number"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={settings.deliveryCharge}
                      onChange={(e) =>
                        handleSettingChange(
                          "deliveryCharge",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </label>
                </div>
              </div>

              {/* Save Settings Button */}
              <div className="text-right md:text-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
