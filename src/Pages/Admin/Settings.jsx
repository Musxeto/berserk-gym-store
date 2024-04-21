import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/AdminComponents/Layout/Sidebar/Sidebar";
import Header from "../../Components/AdminComponents/Layout/Header/Header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import { fetchSettings, updateSettings, saveSettings } from "../../firebase";
import { showFailureToast, showSuccessToast } from "../../App";

const Settings = () => {
  const [settings, setSettings] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSettingsData = async () => {
      try {
        const settingsData = await fetchSettings("allSettings");
        if (settingsData) {
          setSettings(settingsData);
        } else {
          // Handle case when settingsData is undefined
          console.error("Settings data is undefined");
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
        // Handle error
      }
    };
    fetchSettingsData();
  }, []);

  const handleSettingChange = (key, value) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
  };

  const handleSaveSettings = async () => {
    // Check if any required field is null or empty
    if (
      !settings.featuredProductsLimit ||
      !settings.deliveryCharge ||
      !settings.socialLinks
    ) {
      showFailureToast("All fields are required!");
      return;
    }

    // Check if any social link is empty
    const socialLinksValid = Object.values(settings.socialLinks).every(
      (link) => link.trim() !== ""
    );
    if (!socialLinksValid) {
      showFailureToast("All social links are required!");
      return;
    }

    try {
      setIsLoading(true);
      await saveSettings("allSettings", settings);
      showSuccessToast("Settings Saved Successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
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
                  {settings.socialLinks &&
                    Object.entries(settings.socialLinks).map(
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
                  disabled={isLoading}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {isLoading ? (
                    <ClipLoader color={"#ffffff"} loading={isLoading} />
                  ) : (
                    "Save Settings"
                  )}
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
