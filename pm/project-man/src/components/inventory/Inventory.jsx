import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaExclamationTriangle,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "../Sidebar";

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReorderModalOpen, setIsReorderModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    unit: "",
    item: "",
    stock: "",
    salesTrend: [],
  });
  const [reorderItem, setReorderItem] = useState(null);
  const [reorderQuantity, setReorderQuantity] = useState("");
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    const storedInventory = JSON.parse(localStorage.getItem("inventory"));
    if (storedInventory) {
      setInventory(storedInventory);
    }
  }, []);

  useEffect(() => {
    inventory.forEach((item) => {
      if (item.stock === 0) {
        toast.error(`${item.unit}: ${item.item} is out of stock!`, {
          position: "top-right",
        });
      } else if (item.stock < item.reorderLevel) {
        toast.warn(
          `${item.unit}: ${item.item} stock is low. Consider reordering.`,
          {
            position: "top-right",
          }
        );
      }
    });
  }, [inventory]);

  const handleSale = (item, saleQuantity) => {
    if (saleQuantity > item.stock) {
      toast.error("Not enough stock for this sale!");
      return;
    }
     // Update inventory stock
  const updatedInventory = inventory.map((invItem) =>
    invItem === item
      ? { ...invItem, stock: invItem.stock - saleQuantity }
      : invItem
  );
  setInventory(updatedInventory);
  localStorage.setItem("inventory", JSON.stringify(updatedInventory));

  // Log the sale in local storage
  const currentSales = JSON.parse(localStorage.getItem("sales")) || [];
  const updatedSales = [
    ...currentSales,
    {
      unit: item.unit,
      item: item.item,
      saleQuantity,
      saleAmount: saleQuantity * 10, // Example price per unit (adjust as needed)
    },
  ];
  localStorage.setItem("sales", JSON.stringify(updatedSales));

  toast.success(`Sold ${saleQuantity} units of ${item.item}`);
};

  const handleAddInventory = () => {
    // Validate inputs
    if (!newItem.unit || !newItem.item || isNaN(newItem.stock)) {
      toast.error("Please fill out all fields with valid data.");
      return;
    }

    const calculatedReorderLevel = Math.floor(newItem.stock * 0.2); // Reorder level = 20% of stock
    const updatedInventory = [
      ...inventory,
      {
        ...newItem,
        stock: parseInt(newItem.stock),
        reorderLevel: calculatedReorderLevel,
      },
    ];
    setInventory(updatedInventory);
    localStorage.setItem("inventory", JSON.stringify(updatedInventory));
    setIsModalOpen(false);
    setNewItem({
      unit: "",
      item: "",
      stock: "",
      salesTrend: [],
    });
    toast.success("New inventory item added successfully!");
  };

  const handleReorder = () => {
    const updatedInventory = inventory.map((item) => {
      if (item === reorderItem) {
        const newStock = item.stock + parseInt(reorderQuantity);
        const newReorderLevel = Math.floor(newStock * 0.2); // Recalculate reorder level as 20% of new stock
        return {
          ...item,
          stock: newStock,
          reorderLevel: newReorderLevel,
        };
      }
      return item;
    });
  
    setInventory(updatedInventory);
    localStorage.setItem("inventory", JSON.stringify(updatedInventory));
    toast.success(`Successfully reordered ${reorderQuantity} units of ${reorderItem.item}.`);
    setReorderItem(null);
    setReorderQuantity("");
    setIsReorderModalOpen(false);
  };
  
  const handleDelete = () => {
    const updatedInventory = inventory.filter(
      (item) => item.unit !== itemToDelete.unit || item.item !== itemToDelete.item
    );
    setInventory(updatedInventory);
    localStorage.setItem("inventory", JSON.stringify(updatedInventory));
    toast.success(`Successfully deleted ${itemToDelete.item}.`);
    setItemToDelete(null);
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 mt-10 bg-white min-h-screen ml-0 md:ml-60 transition-all duration-300">
        <ToastContainer />

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Inventory Management
          </h1>
          
        </header>

        <button
          className="bg-gray-800 text-white px-4 py-2 rounded-lg mb-6"
          onClick={() => setIsModalOpen(true)}
        >
          Add Inventory
        </button>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Inventory Overview</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="py-2 px-4 border">Business Unit</th>
                <th className="py-2 px-4 border">Item</th>
                <th className="py-2 px-4 border">Stock</th>
                <th className="py-2 px-4 border">Reorder Level</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item, index) => (
                <tr key={index} className="text-gray-700 text-center">
                  <td className="py-2 px-4 border">{item.unit}</td>
                  <td className="py-2 px-4 border">{item.item}</td>
                  <td
                    className={`py-2 px-4 border ${
                      item.stock === 0
                        ? "text-red-500"
                        : item.stock < item.reorderLevel
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {item.stock}
                  </td>
                  <td className="py-2 px-4 border">{item.reorderLevel}</td>
                  <td className="py-2 px-4 border">
                    {item.stock <= 50 && (
                      <button
                        className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                        onClick={() => {
                          setReorderItem(item);
                          setIsReorderModalOpen(true);
                        }}
                      >
                        Reorder Now
                      </button>
                    )}
                    {item.stock === 0 && (
                      <FaExclamationTriangle className="text-red-500 text-xl inline ml-2" />
                    )}
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 mt-2"
                      onClick={() => setItemToDelete(item)}
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

{/* Sales Trends */}
<div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
  <h2 className="text-xl font-semibold mb-4">Sales Trends</h2>
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={inventory}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="item" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="stock"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  </ResponsiveContainer>

  {inventory.map((item, index) => (
    <div key={index} className="mt-4">
      <h3 className="text-gray-800">
        {item.unit}: {item.item}
      </h3>
      <button
        className="bg-gray-800 text-white px-3 py-1 rounded-lg hover:bg-green-700"
        onClick={() => handleSale(item, 1)} // Example sale of 5 units
      >
        Record Sale
      </button>
    </div>
  ))}
</div>


        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Add New Inventory Item</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700">Business Unit</label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg"
                    value={newItem.unit}
                    onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                  >
                    <option value="">Select Unit</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Bookshop">Bookshop</option>
                    <option value="Bottled Water Industry">Bottled Water Industry</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Item</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={newItem.item}
                    onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Stock</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={newItem.stock}
                    onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })}
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    onClick={handleAddInventory}
                  >
                    Add Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

{itemToDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
              <p>Are you sure you want to delete {itemToDelete.item}?</p>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg"
                  onClick={() => setItemToDelete(null)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  onClick={handleDelete}
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
          {isReorderModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Reorder Item</h2>
              <p>
                Reordering for: <strong>{reorderItem?.item}</strong>
              </p>
              <div className="mb-4">
                <label className="block text-gray-700">Quantity</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={reorderQuantity}
                  onChange={(e) => setReorderQuantity(e.target.value)}
                />
              </div>
              <div className="flex justify-between">
                <button
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg"
                  onClick={() => setIsReorderModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  onClick={handleReorder}
                >
                  Confirm Reorder
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryManagement;
