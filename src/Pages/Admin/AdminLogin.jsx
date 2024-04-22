import React, { useState } from "react";
import Navbar from "../../Components/Layout/Navbar/Navbar";
import Footer from "../../Components/Layout/Footer/Footer";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";
import { signIn } from "../../firebase.jsx";
import { showSuccessToast, showFailureToast } from "../../App";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call the signIn function with email and password
      await signIn(email, password);
      setLoading(false);
      setEmail("");
      setPassword("");
      showSuccessToast("Signed in successfully!");
    } catch (error) {
      setLoading(false);
      showFailureToast(`Failed to sign in: ${error.message}`);
    }
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
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Link
              to="/forgot-password"
              className="text-gray-700 no-underline hover:no-underline hover:text-gray-600"
            >
              Forgot Password?
            </Link>

            <div className="flex items-center justify-between ">
              <button
                className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminLogin;
