import React, { useState } from "react";
import Navbar from "../../Components/Layout/Navbar/Navbar";
import Footer from "../../Components/Layout/Footer/Footer";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";
import { sendPassResetEmail } from "../../firebase";
import { showSuccessToast, showFailureToast } from "../../App";

const AdminForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call resetPassword function to send password reset email
      await resetPassword(email);
      setLoading(false);
      setEmail("");
      setSent(true);
      showSuccessToast("Password reset email sent successfully!");
    } catch (error) {
      setLoading(false);
      showFailureToast("Failed to send reset email. Please try again.");
    }
  };

  const resetPassword = (email) => {
    // Call Firebase's sendPassResetEmail function
    return sendPassResetEmail(email);
  };

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div>
      <Navbar />
      <div className="flex p-5 justify-center items-center min-h-screen bg-gray-200">
        {loading ? (
          <RingLoader
            color={"#000"}
            loading={loading}
            css={override}
            size={150}
          />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {!sent && (
              <div className="flex items-center justify-between ">
                <button
                  className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Reset Password
                </button>
                <Link
                  to="/admin"
                  className="text-gray-700 no-underline hover:no-underline hover:text-gray-600"
                >
                  Forgot Password?
                </Link>
              </div>
            )}
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminForgotPassword;
