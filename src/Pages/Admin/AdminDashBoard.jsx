import React from "react";
import Header from "../../Components/AdminComponents/Layout/Header/Header";
import QuickAccess from "../../Components/AdminComponents/QuickAccess/QuickAccess";
import Card from "../../Components/AdminComponents/Layout/Card/Card";

const AdminDashBoard = () => {
  return (
    <>
      <Header
        pageTitle="Admin Dashboard"
        pageDescription="Here You Can Manage Orders, Products, Account, and Settings."
      />
      <QuickAccess />
      <div className="flex flex-wrap justify-center mt-8">
        <Card title="Total Orders" value="100" link="/admin/orders" />
        <Card title="Total Products" value="500" link="/admin/products" />
        <Card title="Total Revenue" value="$10,000" />
      </div>
    </>
  );
};

export default AdminDashBoard;
