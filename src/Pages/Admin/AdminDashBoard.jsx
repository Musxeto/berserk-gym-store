import React, { useEffect, useState } from "react";
import Header from "../../Components/AdminComponents/Layout/Header/Header";
import QuickAccess from "../../Components/AdminComponents/QuickAccess/QuickAccess";
import Card from "../../Components/AdminComponents/Layout/Card/Card";
import { ClipLoader } from "react-spinners"; // Import the ClipLoader component
import {
  fetchTotalOrders,
  fetchTotalProducts,
  calculateTotalMoneyMade,
  updateAnalytics,
} from "../../firebase";

const AdminDashBoard = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersCount = await fetchTotalOrders();
        const productsCount = await fetchTotalProducts();
        const revenue = await calculateTotalMoneyMade();

        setTotalOrders(ordersCount);
        setTotalProducts(productsCount);
        setTotalRevenue(revenue);
        updateAnalytics(revenue, ordersCount, productsCount);
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header
        pageTitle="Admin Dashboard"
        pageDescription="Here You Can Manage Orders, Products, Account, and Settings."
      />
      <QuickAccess />
      <div className="flex flex-wrap justify-center mt-8">
        {isLoading ? ( // Render ClipLoader while loading
          <div className="flex justify-center mt-8">
            <ClipLoader color={"#000"} loading={isLoading} size={35} />
          </div>
        ) : (
          <>
            <Card
              title="Total Orders"
              value={totalOrders}
              link="/admin/orders"
            />
            <Card
              title="Total Products"
              value={totalProducts}
              link="/admin/products"
            />
            <Card title="Total Revenue" value={`$${totalRevenue}`} />
          </>
        )}
      </div>
    </>
  );
};

export default AdminDashBoard;
