"use client";

import { useEffect, useState } from "react";
import { FaBox, FaMoneyBillWave, FaShoppingCart, FaUsers } from "react-icons/fa";
import { client } from "@/sanity/lib/client";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [totalStock, setTotalStock] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [completedOrders, setCompletedOrders] = useState<number>(0);
  const [pendingOrders, setPendingOrders] = useState<number>(0);
  const [deliveredOrders, setDeliveredOrders] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productQuery = `*[_type == "productss"]{
  _id,
  title,
  description,
  price,
  "productImage": productImage.asset->url,
  discountPrice,
  slug,
  inStock,
  stock,
  colors,
  tags,
  isNew
}`;

        const productsData = await client.fetch(productQuery);
        setTotalProducts(productsData.length);
        setTotalStock(
          productsData.reduce((acc: number, product: { stock: number }) => acc + product.stock, 0)
        );
        setTotalAmount(
          productsData.reduce(
            (acc: number, product: { price: number; stock: number }) =>
              acc + product.price * product.stock,
            0
          )
        );

        const ordersQuery = `*[_type == "order"]{
  _id,
  customerName,
  customerEmail,
  shippingAddress,
  phone,
  orderItems[]{
    product->{
      title,
      price
    },
    quantity
  },
  totalPrice,
  orderStatus,
  createdAt
}`;

        const ordersData = await client.fetch(ordersQuery);
        setTotalOrders(ordersData.length);
        setCompletedOrders(
          ordersData.filter((order: { status: string }) => order.status === "completed").length
        );
        setPendingOrders(
          ordersData.filter((order: { status: string }) => order.status === "pending").length
        );
        setDeliveredOrders(
          ordersData.filter((order: { status: string }) => order.status === "delivered").length
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Variants for card animations
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, type: "spring", stiffness: 75 },
    }),
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:ml-64">
      {/* Animated Banner */}
      <motion.div
        className="mb-8 bg-white p-4 rounded-lg shadow-lg text-center mt-20 md:mt-0"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p
          style={{ fontFamily: "'Jameel Noori Nastaleeq', cursive" }}
          className="text-3xl font-bold text-red-600"
        >
          بسم الله الرحمن الرحيم
        </p>
        <p className="text-2xl font-bold text-gray-600 mt-2">
          In the Name of Allah, the Most Gracious, the Most Merciful
        </p>
      </motion.div>

      {/* Dashboard Heading */}
      <motion.h1
        className="text-3xl font-bold text-blue-900 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Products Card */}
        <motion.div
          className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4 cursor-pointer"
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
          }}
        >
          <FaBox className="text-4xl text-blue-500" />
          <div>
            <h2 className="text-lg font-semibold">Total Products</h2>
            <p className="text-2xl font-bold">{totalProducts}</p>
          </div>
        </motion.div>

        {/* Total Stock Card */}
        <motion.div
          className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4 cursor-pointer"
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
          }}
        >
          <FaShoppingCart className="text-4xl text-green-500" />
          <div>
            <h2 className="text-lg font-semibold">Total Stock</h2>
            <p className="text-2xl font-bold">{totalStock}</p>
          </div>
        </motion.div>

        {/* Total Sales Amount Card */}
        <motion.div
          className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4 cursor-pointer"
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
          }}
        >
          <FaMoneyBillWave className="text-4xl text-yellow-500" />
          <div>
            <h2 className="text-lg font-semibold">Total Sales Amount</h2>
            <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
          </div>
        </motion.div>

        {/* Total Orders Card */}
        <motion.div
          className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4 cursor-pointer"
          custom={3}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
          }}
        >
          <FaUsers className="text-4xl text-red-500" />
          <div>
            <h2 className="text-lg font-semibold">Total Orders</h2>
            <p className="text-2xl font-bold">{totalOrders}</p>
          </div>
        </motion.div>

        {/* Delivered Orders Card */}
        <motion.div
          className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4 cursor-pointer"
          custom={4}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
          }}
        >
          <FaShoppingCart className="text-4xl text-teal-500" />
          <div>
            <h2 className="text-lg font-semibold">Delivered Orders</h2>
            <p className="text-2xl font-bold">{deliveredOrders}</p>
          </div>
        </motion.div>

        {/* Pending Orders Card */}
        <motion.div
          className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4 cursor-pointer"
          custom={5}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
          }}
        >
          <FaShoppingCart className="text-4xl text-orange-500" />
          <div>
            <h2 className="text-lg font-semibold">Pending Orders</h2>
            <p className="text-2xl font-bold">{pendingOrders}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
