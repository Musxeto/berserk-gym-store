import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/AdminComponents/Layout/Sidebar/Sidebar";
import Header from "../../Components/AdminComponents/Layout/Header/Header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, updateUserProfile, sendPassResetEmail } from "../../firebase";
import { showFailureToast, showSuccessToast } from "../../App";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";

const Account = () => {
  const [formData, setFormData] = useState({
    newEmail: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Update the formData state with the current user's email when the component mounts
    if (auth.currentUser) {
      setFormData((prevData) => ({
        ...prevData,
        newEmail: auth.currentUser.email,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email if provided
    if (formData.newEmail && !validateEmail(formData.newEmail)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailError: "Please enter a valid email address",
      }));
      return;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailError: "",
      }));
    }

    // Validate password if provided
    if (formData.newPassword !== formData.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: "Passwords do not match",
      }));
      return;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: "",
      }));
    }

    // Call handleProfileUpdate to update profile information
    handleProfileUpdate();
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleProfileUpdate = async () => {
    try {
      setLoading(true);
      await updateUserProfile(formData.newEmail, formData.newPassword);
      setLoading(false);
      // Show success message
      showSuccessToast("Profile updated successfully!");
    } catch (error) {
      // Show error message
      setLoading(false);
      showFailureToast(error.message);
    }
  };

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  return (
    <div className="flex flex-col md:flex-row bg-white text-black">
      <Sidebar className="md:w-56" />
      <div className="flex-1">
        <div className="md:ml-56 p-3 min-h-screen">
          <div className="max-w-screen-xl mx-auto">
            <Header
              pageTitle={"Account"}
              pageDescription={"Manage your account"}
            />
            <hr className="my-4" />
            {loading ? (
              <div className="flex p-5 justify-center items-center min-h-screen bg-gray-200">
                <RingLoader
                  color={"#000"}
                  loading={loading}
                  css={override}
                  size={150}
                />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-1 md:p-1">
                <div className="mb-4">
                  <label htmlFor="newEmail" className="block font-medium mb-1">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="newEmail"
                    name="newEmail"
                    value={
                      auth.currentUser
                        ? auth.currentUser.email
                        : formData.newEmail
                    }
                    disabled
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 disabled:text-gray-400 py-2 w-full"
                    required
                  />

                  {errors.emailError && (
                    <p className="text-red-500 text-sm">{errors.emailError}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="newPassword"
                    className="block font-medium mb-1"
                  >
                    New Password:
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    required
                  />
                  {errors.passwordError && (
                    <p className="text-red-500 text-sm">
                      {errors.passwordError}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block font-medium mb-1"
                  >
                    Confirm Password:
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    required
                  />
                </div>
                <div className="text-right md:text-center">
                  <button
                    type="submit"
                    onSubmit={handleProfileUpdate}
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-300 ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={loading}
                  >
                    Update Profile
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
