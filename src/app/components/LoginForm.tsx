"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      router.push("/admin");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const adminEmail = process.env.NEXT_PUBLIC_EMAIL_ADDRESS;
    const adminPassword = process.env.NEXT_PUBLIC_USER_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      setMessage("Login successful");
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      router.push("/admin/deshboard");
    } else {
      if (email !== adminEmail) {
        setMessage("Invalid email address");
      } else if (password !== adminPassword) {
        setMessage("Invalid password");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900">
  {/* Background Water Effect */}
  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20"
    animate={{
      x: [0, 100, -100, 0],
      y: [0, -50, 50, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    }}
  />

  <motion.form
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    onSubmit={handleLogin}
    className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-96 relative overflow-hidden border border-white/10"
    whileHover="hover"
    variants={{
      hover: {
        transition: { staggerChildren: 0.1 }
      }
    }}
  >
    {/* Hover-activated Water Ripple */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-indigo-500/30"
      variants={{
        hover: {
          scale: [1, 1.4, 1],
          opacity: [0, 0.4, 0],
          rotate: [0, 5, -5, 0],
          x: [0, 20, -20, 0],
          y: [0, 10, -10, 0],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "anticipate"
          }
        }
      }}
    />

    <h2 className="text-3xl font-bold text-center mb-6 text-white font-poppins">
      Admin Login
    </h2>

    <AnimatePresence>
      {message && (
        <motion.div
          key="message"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`mb-4 p-3 text-center rounded-md ${
            message.includes("Invalid") 
              ? "bg-red-500/20 text-red-300" 
              : "bg-green-500/20 text-green-300"
          }`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>

    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-1 font-poppins">
        Email
      </label>
      <motion.div 
        className="relative"
        whileHover={{ scale: 1.02 }}
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 pl-10 bg-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 border-none outline-none placeholder-gray-400 font-poppins"
        />
        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </motion.div>
    </div>

    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-300 mb-1 font-poppins">
        Password
      </label>
      <motion.div 
        className="relative"
        whileHover={{ scale: 1.02 }}
      >
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 pl-10 bg-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 border-none outline-none placeholder-gray-400 font-poppins"
        />
        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <button
          type="button"
          onClick={() => setPasswordVisible(!passwordVisible)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
        >
          {passwordVisible ? <FaEyeSlash /> : <FaEye />}
        </button>
      </motion.div>
    </div>

    <motion.button
      type="submit"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={isLoading}
      className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all relative overflow-hidden font-poppins"
    >
      {isLoading ? (
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      ) : null}
      <span className="relative z-10">
        {isLoading ? "Logging in..." : "Login"}
      </span>
    </motion.button>
  </motion.form>
</div>
  );
};

export default LoginPage;
