"use client";

import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa"; // Importing a spinner icon for the loader

// interface Customer {
//   _id: string;
//   fullName: string;
//   email: string;
//   phoneNumber: string;
//   address: string;
//   city: string;
// }
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
    <div className="min-h-screen bg-gray-50 p-6 md:ml-64">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Customers</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ease-in-out duration-300 shadow-md hover:shadow-xl"
          placeholder="Search by Name or Email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Loading State - Custom Loader */}
      {loading ? (
        <div className="flex justify-center items-center space-x-2">
          <FaSpinner className="animate-spin text-teal-500" size={30} />
          <p className="text-gray-600">Loading customers...</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          {/* Table */}
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-teal-500 text-white">
                <th className="px-6 py-3 text-left">Customer Name</th>
                <th className="px-6 py-3 text-left">Customer Email</th>
                <th className="px-6 py-3 text-left">Phone</th>
                <th className="px-6 py-3 text-left">Shipping Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer._id} className="border-t hover:bg-teal-100">
                    <td className="px-6 py-4">{customer.customerName}</td>
                    <td className="px-6 py-4">{customer.customerName}</td>
                    <td className="px-6 py-4">{customer.customerEmail}</td>
                    <td className="px-6 py-4">{customer.phone}</td>
                    <td className="px-6 py-4">{customer.shippingAddress}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-600">
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
