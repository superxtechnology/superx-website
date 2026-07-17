import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, X, ArrowRight } from "lucide-react";
import AxiosInstance from "../api/AxiosInstance";
import logo from "../assets/logo.png";
import { toast } from "react-hot-toast";

const LoginForm = ({ onClose, switchToSignUp }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // 1. Yup Validation Schema
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email ID is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  // 2. Submit Handler
  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await AxiosInstance.post("/auth/login", values);
      if (response.data.success) {
        toast.success(response.data.message || "Logged in successfully! 🎉");
        onClose(); // Modal band karne ke liye
        window.location.reload(); // State refresh karne ke liye
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-gray-100">
      
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <img src={logo} alt="SuperX Logo" className="h-9 w-auto" />
          <span className="text-lg font-bold text-gray-800">SuperX Technology</span>
        </div>
        <button 
          onClick={onClose} 
          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <h2 className="text-2xl font-black text-gray-900 mb-1">Welcome Back!</h2>
      <p className="text-sm text-gray-500 mb-6">Securely log in to manage your premium equipment.</p>

      {/* FORMIK FORM */}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ errors, touched, handleChange, handleBlur, values }) => (
          <Form className="space-y-4">
            
            {/* EMAIL INPUT */}
            <div className="relative">
              <label className="text-xs font-bold text-gray-600 block mb-1">Email Address</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail className="w-5 h-5" />
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="name@superx.com"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium outline-none transition-all
                    ${touched.email && errors.email 
                      ? "bg-red-50 border-red-500 focus:ring-2 focus:ring-red-200 text-red-900" 
                      : "bg-gray-50/50 border-gray-200 focus:border-blue-500 focus:bg-white"
                    }`}
                />
              </div>
              {touched.email && errors.email && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs font-semibold text-red-500 mt-1 pl-1">{errors.email}</motion.p>
              )}
            </div>

            {/* PASSWORD INPUT */}
            <div className="relative">
              <label className="text-xs font-bold text-gray-600 block mb-1">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-5 h-5" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm font-medium outline-none transition-all
                    ${touched.password && errors.password 
                      ? "bg-red-50 border-red-500 focus:ring-2 focus:ring-red-200 text-red-900" 
                      : "bg-gray-50/50 border-gray-200 focus:border-blue-500 focus:bg-white"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {touched.password && errors.password && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs font-semibold text-red-500 mt-1 pl-1">{errors.password}</motion.p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-sky-500 text-white font-bold text-sm py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Secure Login"}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Form>
        )}
      </Formik>

      {/* FOOTER SWITCH */}
      <div className="text-center mt-6 pt-4 border-t border-gray-100">
        <p className="text-xs font-semibold text-gray-500">
          Don't have an account?{" "}
          <button 
            onClick={switchToSignUp} 
            className="text-blue-600 font-bold hover:underline cursor-pointer"
          >
            Sign Up here
          </button>
        </p>
      </div>

    </div>
  );
};

export default LoginForm;