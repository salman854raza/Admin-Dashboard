"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  FaBox,
  FaChartBar,
  FaUser,
  FaTimes,
  FaBars,
  FaSignOutAlt,
  FaShoppingCart,
  FaTachometerAlt,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const SideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/");
  };

  const navItems = [
    { href: "/admin", icon: <FaTachometerAlt />, text: "Dashboard" },
    { href: "/admin/product", icon: <FaBox />, text: "Products" },
    { href: "/admin/customers", icon: <FaUser />, text: "Customers" },
    { href: "/admin/orders", icon: <FaShoppingCart />, text: "Orders" },
  ];

  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 400, damping: 30 } },
    closed: { x: "-100%", transition: { type: "spring", stiffness: 400, damping: 30 } },
  };

  const itemVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: -20 },
  };

  if (!isMounted) return null;

  return (
    <div className="z-50">
      {/* Mobile Header */}
      {isMobile && !sidebarOpen && (
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-600 to-cyan-700 text-white w-full fixed top-0 left-0 z-10 md:hidden shadow-xl backdrop-blur-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-tr from-teal-400 to-cyan-300 rounded-lg" />
            <h1 className="text-xl font-bold tracking-tighter font-poppins">Shopping Admin</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-white/10 transition-all active:scale-95"
          >
            <FaBars className="text-xl" />
          </button>
        </motion.div>
      )}

      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          variants={sidebarVariants}
          initial="closed"
          animate={sidebarOpen ? "open" : "closed"}
          className="fixed top-0 left-0 w-72 bg-gradient-to-br from-teal-900/95 to-cyan-900/95 text-white h-full z-20 shadow-2xl backdrop-blur-xl border-r border-white/10"
        >
          <div className="flex justify-between items-center p-6 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-tr from-teal-400 to-cyan-300 rounded-lg shadow-md" />
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-teal-200 to-cyan-200 bg-clip-text text-transparent font-poppins">
                Shopping Dashboard
              </h1>
            </div>
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-all active:scale-90"
              >
                <FaTimes className="text-lg" />
              </button>
            )}
          </div>

          <nav className="flex flex-col p-4 gap-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                variants={itemVariants}
                transition={{ delay: index * 0.05 }}
                className="relative"
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group
                    ${pathname === item.href
                      ? "bg-gradient-to-r from-teal-500/90 to-cyan-600/90 shadow-lg"
                      : "hover:bg-white/5 hover:shadow-md"}`}
                >
                  <span
                    className={`p-2 rounded-lg backdrop-blur-sm ${pathname === item.href
                      ? "bg-white/10 text-teal-200"
                      : "text-cyan-200 group-hover:bg-white/10"}`}
                  >
                    {item.icon}
                  </span>
                  <span className="font-medium tracking-tight font-poppins">{item.text}</span>
                  {pathname === item.href && (
                    <motion.div
                      className="absolute right-4 w-2 h-2 bg-teal-300 rounded-full shadow-sm"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}

            <motion.div
              variants={itemVariants}
              transition={{ delay: navItems.length * 0.05 }}
              className="mt-4 mx-4 border-t border-white/10 pt-4"
            >
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-teal-200 hover:bg-red-900/50 hover:text-teal-100 transition-all group"
              >
                <span className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10">
                  <FaSignOutAlt className="transform group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="font-medium tracking-tight font-poppins">Logout</span>
              </button>
            </motion.div>
          </nav>

          {/* Sidebar Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
            <div className="text-center text-sm text-cyan-200/80 font-poppins">
              v2.4.0 • {new Date().getFullYear()}
            </div>
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Arrow Buttons */}
      <div className="fixed top-1/2 transform -translate-y-1/2 z-30">
        {sidebarOpen ? (
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 bg-gradient-to-r from-teal-600 to-cyan-700 text-white rounded-r-lg shadow-lg hover:bg-teal-700 transition-all"
          >
            <FaArrowLeft className="text-xl" />
          </button>
        ) : (
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 bg-gradient-to-r from-teal-600 to-cyan-700 text-white rounded-r-lg shadow-lg hover:bg-teal-700 transition-all"
          >
            <FaArrowRight className="text-xl" />
          </button>
        )}
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black md:hidden z-10 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SideBar;