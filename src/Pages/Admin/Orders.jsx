import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/AdminComponents/Layout/Sidebar/Sidebar";
import OrderList from "../../Components/AdminComponents/Orders/OrderList";
import Header from "../../Components/AdminComponents/Layout/Header/Header";
import { fetchOrders } from "../../firebase";
import { ClipLoader } from "react-spinners";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const ordersData = await fetchOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
        // Handle error
      } finally {
        setLoading(false); // Set loading to false when data fetching is completed
      }
    };

    fetchOrdersData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row bg-white text-black">
      <Sidebar className="md:w-56" />
      <div className="flex-1">
        <div className="md:ml-56 p-1  min-h-screen">
          <div className="max-w-screen-xl mx-auto">
            <Header
              pageTitle={"Orders"}
              pageDescription={"All Orders will show here "}
            />
            <hr className="my-4" />
            <div className="bg-white  p-1 md:p-1">
              {/* Render the ClipLoader if loading is true */}
              {loading ? (
                <div className="flex justify-center my-8">
                  <ClipLoader color={"#000"} loading={loading} size={35} />
                </div>
              ) : (
                <OrderList orders={orders} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
