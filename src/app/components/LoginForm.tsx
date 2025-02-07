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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900">
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleLogin}
        className="bg-gradient-to-br from-purple-800 to-indigo-800 p-8 rounded-xl shadow-2xl w-96 relative overflow-hidden"
      >
        {/* Animated Background (changed to a one-time animation) */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20"
          initial={{ x: -100, y: -100 }}
          animate={{ x: 0, y: 0 }}
          transition={{ duration: 3 }}
        />

        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Admin Login
        </h2>

        <AnimatePresence>
          {message && (
            <motion.div
              key="message"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-4 p-2 text-center rounded-md ${
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
          <label className="block text-sm font-medium text-purple-200 mb-1">
            Email
          </label>
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.02 }}
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 pl-10 bg-purple-700/50 text-white rounded-lg focus:ring-2 focus:ring-purple-500 border-none outline-none placeholder-purple-300"
            />
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" />
          </motion.div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-purple-200 mb-1">
            Password
          </label>
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.02 }}
          >
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 pl-10 bg-purple-700/50 text-white rounded-lg focus:ring-2 focus:ring-purple-500 border-none outline-none placeholder-purple-300"
            />
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-purple-100 transition-colors"
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
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all relative overflow-hidden"
        >
          {isLoading ? (
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 1.5,
                // Optionally, if you prefer a finite animation, you can remove the repeat property
                // repeat: Infinity,
                // repeatType: "mirror"
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
