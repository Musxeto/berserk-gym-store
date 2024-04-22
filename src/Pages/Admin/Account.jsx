import React, { useState } from "react";
import Sidebar from "../../Components/AdminComponents/Layout/Sidebar/Sidebar";
import Header from "../../Components/AdminComponents/Layout/Header/Header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, updateUserProfile, sendPassResetEmail } from "../../firebase";
import { showFailureToast } from "../../App";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!validateEmail(formData.newEmail)) {
      newErrors.emailError = "Enter a valid email";
    }
    if (formData.newPassword.length < 8) {
      newErrors.passwordError = "At least 8 characters required";
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.passwordError = "Passwords do not match";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      await handleProfileUpdate();
      setLoading(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setLoading(false);
      if (error.code === "auth/user-token-expired") {
        console.log("User token expired. Refreshing token...");
      } else {
        showFailureToast("Failed to update profile. Please try again.");
      }
    }
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleProfileUpdate = async () => {
    if (!auth.currentUser) {
      throw new Error("User is not authenticated");
    }
    await updateUserProfile(formData.newEmail, formData.newPassword);
    showSuccessToast("Profile updated successfully!");
  };

  const handlePasswordReset = async () => {
    try {
      await sendPassResetEmail(formData.newEmail);
      showSuccessToast("Password reset email sent successfully");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      toast.error("Failed to send password reset email. Please try again.");
    }
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
                {errors.passwordError && (
                  <p className="text-red-500 text-sm">{errors.passwordError}</p>
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
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Profile"}
                </button>
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                  onClick={handlePasswordReset}
                >
                  Reset Password
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
