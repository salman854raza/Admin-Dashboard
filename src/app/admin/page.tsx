"use client";

import { useEffect, useState } from "react";
import { FaBox, FaClipboardList, FaClock, FaCubes, FaMoneyCheckAlt, FaTruck } from "react-icons/fa";
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
        className="mb-8 bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg shadow-lg text-center mt-20 md:mt-0"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
         <p
    style={{ 
      fontFamily: "'Noto Naskh Arabic', serif",
      lineHeight: '2.5rem'
    }}
    className="text-4xl text-center p-6 bg-white rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-red-900"
  >
    ﴾بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ﴿
  </p>
  <p className="mt-4 text-gray-600 text-lg">
    (In the name of Allah, the Most Gracious, the Most Merciful)
  </p>
      </motion.div>

      {/* Dashboard Heading */}
     <motion.h1
  className="text-5xl font-extrabold mb-8"
  style={{
    fontFamily: "'Poppins', sans-serif",
    background: "linear-gradient(45deg, #6EE7B7, #3B82F6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ 
    duration: 0.8,
    delay: 0.2,
    ease: [0.2, 0.71, 0.2, 1.01]
  }}
  whileHover={{ scale: 1.05, rotate: -1 }}
  whileTap={{ scale: 0.95 }}
>
  Dashboard
</motion.h1>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6 bg-transparent">
  {/* Total Products Card */}
  <motion.div
    className="relative rounded-xl p-6 flex items-center space-x-4 cursor-pointer  transition-all duration-300"
    custom={0}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    whileHover={{
      scale: 1.05,
      rotate: -1,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
    }}
  >
    <FaBox className="text-5xl text-indigo-600 opacity-80 hover:opacity-100 transition-opacity duration-300" />
    <div>
      <h2 className="text-xl font-bold text-black">Total Products</h2>
      <p className="text-3xl font-extrabold text-white">{totalProducts}</p>
    </div>
  </motion.div>

  {/* Total Stock Card */}
  <motion.div
    className="relative rounded-xl p-6 flex items-center space-x-4 cursor-pointer  transition-all duration-300"
    custom={1}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    whileHover={{
      scale: 1.05,
      rotate: 1,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
    }}
  >
    <FaCubes className="text-5xl text-emerald-600 opacity-80 hover:opacity-100 transition-opacity duration-300" />
    <div>
      <h2 className="text-xl font-bold text-black">Total Stock</h2>
      <p className="text-3xl font-extrabold text-black">{totalStock}</p>
    </div>
  </motion.div>

  {/* Total Sales Amount Card */}
  <motion.div
    className="relative rounded-xl p-6 flex items-center space-x-4 cursor-pointer transition-all duration-300"
    custom={2}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    whileHover={{
      scale: 1.05,
      rotate: -1,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
    }}
  >
    <FaMoneyCheckAlt className="text-5xl text-yellow-700 opacity-80 hover:opacity-100 transition-opacity duration-300" />
    <div>
      <h2 className="text-xl font-bold text-black">Total Sales Amount</h2>
      <p className="text-3xl font-extrabold text-black">${totalAmount.toFixed(2)}</p>
    </div>
  </motion.div>

  {/* Total Orders Card */}
  <motion.div
    className="relative rounded-xl p-6 flex items-center space-x-4 cursor-pointer  transition-all duration-300"
    custom={3}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    whileHover={{
      scale: 1.05,
      rotate: 1,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
    }}
  >
    <FaClipboardList className="text-5xl text-green-300 opacity-80 hover:opacity-100 transition-opacity duration-300" />
    <div>
      <h2 className="text-xl font-bold text-black">Total Orders</h2>
      <p className="text-3xl font-extrabold text-black">{totalOrders}</p>
    </div>
  </motion.div>

  {/* Delivered Orders Card */}
  <motion.div
    className="relative rounded-xl p-6 flex items-center space-x-4 cursor-pointer transition-all duration-300"
    custom={4}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    whileHover={{
      scale: 1.05,
      rotate: -1,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
    }}
  >
    <FaTruck className="text-5xl text-blue-500 opacity-80 hover:opacity-100 transition-opacity duration-300" />
    <div>
      <h2 className="text-xl font-bold text-black">Delivered Orders</h2>
      <p className="text-3xl font-extrabold text-black">{deliveredOrders}</p>
    </div>
  </motion.div>

  {/* Pending Orders Card */}
  <motion.div
    className="relative rounded-xl p-6 flex items-center space-x-4 cursor-pointer transition-all duration-300"
    custom={5}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    whileHover={{
      scale: 1.05,
      rotate: 1,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
    }}
  >
    <FaClock className="text-5xl text-green-600 hover:opacity-100 transition-opacity duration-300" />
    <div>
      <h2 className="text-xl font-bold text-black">Pending Orders</h2>
      <p className="text-3xl font-extrabold text-black">{pendingOrders}</p>
    </div>
  </motion.div>
</div>
    </div>
  );
}
