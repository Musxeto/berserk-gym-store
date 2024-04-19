import React from "react";
import Sidebar from "../../Components/AdminComponents/Layout/Sidebar/Sidebar";
import OrderList from "../../Components/AdminComponents/Orders/OrderList";
import Header from "../../Components/AdminComponents/Layout/Header/Header";

const Orders = () => {
  return (
    <div className="flex flex-col md:flex-row bg-white text-black">
      {" "}
      {/* White background and black text */}
      <Sidebar className="md:w-56" />
      <div className="flex-1 md:ml-2 p-6 bg-gray-100">
        <div className="max-w-screen-xl mx-auto">
          <Header
            pageTitle={"Orders"}
            pageDescription={"All Orders will show here "}
          />
          <hr className="my-4" />
          <div className="bg-white shadow-md rounded-md p-4 md:p-6">
            {" "}
            {/* Add padding */}
            <OrderList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
