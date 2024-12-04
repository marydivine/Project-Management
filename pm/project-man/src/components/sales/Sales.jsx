import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Sidebar from "../Sidebar";

const SalesOverview = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchSalesData = () => {
      // Get sales data from local storage
      const storedSales = JSON.parse(localStorage.getItem("sales")) || [];

      // Group sales by unit and calculate total sales
      const groupedData = storedSales.reduce((acc, sale) => {
        const existingUnit = acc.find((item) => item.unit === sale.unit);
        if (existingUnit) {
          existingUnit.sales += sale.saleAmount;
          existingUnit.income += sale.saleAmount * 2; // Example: income is double the sales
        } else {
          acc.push({
            unit: sale.unit,
            sales: sale.saleAmount,
            income: sale.saleAmount * 2, // Example calculation
          });
        }
        return acc;
      }, []);

      setSalesData(groupedData);
      setLoading(false);
    };

    fetchSalesData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div
        className={`flex-1 p-6 bg-white min-h-screen transition-all duration-300 ${
          isSidebarOpen ? "ml-0" : "ml-60"
        }`}
      >
        <h2 className="text-3xl mt-14 font-bold mb-4">Sales Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="unit" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" name="Total Sales" />
            <Bar dataKey="income" fill="#82ca9d" name="Total Income" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesOverview;
