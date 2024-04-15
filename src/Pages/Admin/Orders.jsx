import React from "react";
import Sidebar from "../../Components/AdminComponents/Layout/Sidebar/Sidebar";
import OrderList from "../../Components/AdminComponents/Orders/OrderList";
import Header from "../../Components/AdminComponents/Layout/Header/Header";

const Orders = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-2 md:ml-56 p-6 bg-gray-100">
        <div className="max-w-screen-lg mx-auto">
          <Header
            pageTitle={"Orders"}
            pageDescription={"All Orders will show here "}
          />
          <hr />
          <br />
          <div className="bg-white shadow-md rounded-md p-6">
            <OrderList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
