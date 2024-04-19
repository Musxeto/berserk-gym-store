import React, { useState } from "react";
import Sidebar from "../../Components/AdminComponents/Layout/Sidebar/Sidebar";
import Header from "../../Components/AdminComponents/Layout/Header/Header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Account = () => {
  // State for managing form inputs and validation
  const [formData, setFormData] = useState({
    newEmail: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });

  // Handler for form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    if (!validateEmail(formData.newEmail)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailError: "Enter a valid email",
      }));
      return;
    }
    if (formData.newPassword.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: "At least 8 characters required",
      }));
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: "Passwords do not match",
      }));
      return;
    }
    // Reset error messages
    setErrors({
      emailError: "",
      passwordError: "",
    });
    // Submission logic here (could be API call or local storage)
    // For now, just show a toast notification
    toast.success("Changes saved successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // Function to validate email
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

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
            <form onSubmit={handleSubmit} className="bg-white p-1 md:p-1">
              <div className="mb-4">
                <label htmlFor="newEmail" className="block font-medium mb-1">
                  New Email:
                </label>
                <input
                  type="email"
                  id="newEmail"
                  name="newEmail"
                  value={formData.newEmail}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  required
                />
                {errors.emailError && (
                  <p className="text-red-500 text-sm">{errors.emailError}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block font-medium mb-1">
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
                {errors.passwordError && (
                  <p className="text-red-500 text-sm">{errors.passwordError}</p>
                )}
              </div>
              <div className="text-right md:text-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
