"use client";

import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa"; // Importing spinner icon

interface Order {
  _id: string;
  customerName: string;
  totalPrice: number;
  orderStatus: string;
  createdAt: string;
  orderItems: Array<{
    product: {
      title: string;
      price: number;
    };
    quantity: number;
  }>;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("orderDate"); // Default sorting by orderDate

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersQuery = `*[_type == "order"]{
  _id,
  customerName,
  totalPrice,
  orderStatus,
  createdAt,
  orderItems[]{
    product->{
      title,
      price
    },
    quantity
  }
}`;
        
        const data = await client.fetch(ordersQuery);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Sort function based on sortBy
  const sortedOrders = [...orders].sort((a, b) => {
    const aValue = a[sortBy as keyof Order];
    const bValue = b[sortBy as keyof Order];

    if (aValue < bValue) return -1;
    if (aValue > bValue) return 1;
    return 0;
  });

  // Filter orders based on search term and status filter
  const filteredOrders = sortedOrders.filter(
    (order) =>
      (order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "" || order.orderStatus === statusFilter)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:ml-64">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Orders</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ease-in-out duration-300 shadow-md hover:shadow-xl"
          placeholder="Search by Order ID or Customer Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Status Filter Dropdown */}
      <div className="mb-6">
        <select
          className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ease-in-out duration-300 shadow-md hover:shadow-xl"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Filter by Status</option>
          <option value="pending">Pending</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      {/* Sorting Options */}
      <div className="mb-6">
        <select
          className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ease-in-out duration-300 shadow-md hover:shadow-xl"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="orderDate">Sort by Order Date</option>
          <option value="totalAmount">Sort by Total Amount</option>
          <option value="orderId">Sort by Order ID</option>
          <option value="customer">Sort by Customer Name</option>
        </select>
      </div>

      {/* Loading State - Custom Loader */}
      {loading ? (
        <div className="flex justify-center text-center items-center space-x-2">
          <FaSpinner className="animate-spin text-teal-500" size={30} />
          <p className="text-gray-600">Loading orders...</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg cursor-pointer">
          <table className="min-w-full table-auto text-sm text-left text-gray-500">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Customer Name</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Total Items</th>
                <th className="px-4 py-3">Total Quantity</th>
                <th className="px-4 py-3">Order Date</th>
                <th className="px-4 py-3">Total Amount</th>
                <th className="px-4 py-3">Shipping Address</th>
              </tr>
            </thead>
            <tbody>
  {filteredOrders.map((order) => (
    <tr key={order._id} className="border-b hover:bg-gray-100 transition-all">
      <td className="px-4 py-3 text-center">{order._id}</td>
      <td className="px-4 py-3 text-center">{order.customerName}</td>
      <td className="px-4 py-3 text-center">
        <span className={`${order.orderStatus === "pending" ? "text-yellow-500 font-bold" : "text-green-500 font-bold"}`}>
          {order.orderStatus.toUpperCase()}
        </span>
      </td>
      <td className="px-4 py-3 text-center">{order.orderItems.length}</td>
      <td className="px-4 py-3 text-center">
        {order.orderItems.reduce((sum, item) => sum + item.quantity, 0)}
      </td>
      <td className="px-4 py-3 text-center">
        {new Date(order.createdAt).toLocaleDateString()}
      </td>
      <td className="px-4 py-3 text-center">${order.totalPrice}</td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      )}
    </div>
  );
}
