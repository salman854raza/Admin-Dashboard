"use client";

import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa"; // Importing a spinner icon for the loader

interface Customer {
  _id: string;
  customerName: string;
  customerEmail: string;
  phone: string;
  shippingAddress: string;
}

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const query = `*[_type == "order"]{
          _id,
          customerName,
          customerEmail,
          phone,
          shippingAddress
        }`;
        const data = await client.fetch(query);
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Filter customers based on search term
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 p-6 md:ml-64 relative overflow-hidden">
      {/* Wavy Background */}
      <div className="absolute inset-0 bg-[url('/path/to/wavy-pattern.svg')] opacity-20"></div>

      <h1 className="text-4xl font-bold text-white mb-6 relative z-10">Customers</h1>

      {/* Search Bar */}
      <div className="mb-6 relative z-10">
        <input
          type="text"
          className="w-full md:w-1/3 p-3 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 transition-all ease-in-out duration-300 shadow-lg hover:shadow-xl"
          placeholder="Search by Name or Email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Loading State - Custom Loader */}
      {loading ? (
        <div className="flex justify-center items-center space-x-2 relative z-10">
          <FaSpinner className="animate-spin text-white" size={30} />
          <p className="text-white">Loading customers...</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white/20 backdrop-blur-sm rounded-lg shadow-2xl relative z-10">
          {/* Table */}
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-white/30 backdrop-blur-sm">
                <th className="px-6 py-3 text-left text-white font-semibold">Customer Name</th>
                <th className="px-6 py-3 text-left text-white font-semibold">Customer Email</th>
                <th className="px-6 py-3 text-left text-white font-semibold">Phone</th>
                <th className="px-6 py-3 text-left text-white font-semibold">Shipping Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr
                    key={customer._id}
                    className="border-t border-white/20 hover:bg-white/30 transition-all duration-200"
                  >
                    <td className="px-6 py-4 text-white">{customer.customerName}</td>
                    <td className="px-6 py-4 text-white">{customer.customerEmail}</td>
                    <td className="px-6 py-4 text-white">{customer.phone}</td>
                    <td className="px-6 py-4 text-white">{customer.shippingAddress}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-white/70">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}