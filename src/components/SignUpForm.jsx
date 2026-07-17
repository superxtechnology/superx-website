import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, ShieldCheck, X, CheckCircle, KeyRound } from "lucide-react";
import AxiosInstance from "../api/AxiosInstance";
import logo from "../assets/logo.png";
import { toast } from "react-hot-toast";

const SignUpForm = ({ onClose, switchToLogin }) => {
  const [step, setStep] = useState(1); // Step 1: Details, Step 2: OTP
  const [loading, setLoading] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  // 1. Validation Schemas
  const DetailSchema = Yup.object().shape({
    fullName: Yup.string().min(3, "Too Short!").required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email ID is required"),
    password: Yup.string().min(6, "Minimum 6 characters required").required("Password is required"),
    terms: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
  });

  const OtpSchema = Yup.object().shape({
    otp: Yup.string().length(6, "OTP must be exactly 6 digits").required("OTP is required"),
  });

  // 2. Step 1 Submit: Register & Request OTP
  const handleRequestOtp = async (values) => {
    setLoading(true);
    try {
      // Apne backend endpoint ke mutabik replace karein (e.g., /auth/register)
      const response = await AxiosInstance.post("/auth/register", {
        fullName: values.fullName,
        email: values.email,
        password: values.password
      });

      if (response.data.success) {
        toast.success("OTP sent to your email! 📩");
        setRegisteredEmail(values.email);
        setStep(2); // Move to OTP step
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  // 3. Step 2 Submit: Verify OTP & Auto Login
  const handleVerifyOtp = async (values) => {
    setLoading(true);
    try {
      const response = await AxiosInstance.post("/auth/verify", {
        email: registeredEmail,
        otp: values.otp,
      });

      if (response.data.success) {
        toast.success("Account verified & logged in! 🎉");
        onClose();
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-gray-100">
      
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
        <div className="flex items-center gap-2">
          <img src={logo} alt="SuperX" className="h-9 w-auto" />
          <span className="text-lg font-bold text-gray-800">SuperX Technology</span>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer">
          <X className="w-5 h-5" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="details-step"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
          >
            <h2 className="text-2xl font-black text-gray-900 mb-1">Create Account</h2>
            <p className="text-sm text-gray-500 mb-5">Join SuperX to access elite surveillance tech.</p>

            <Formik
              initialValues={{ fullName: "", email: "", password: "", terms: false }}
              validationSchema={DetailSchema}
              onSubmit={handleRequestOtp}
            >
              {({ errors, touched, handleChange, handleBlur, values, setFieldValue }) => (
                <Form className="space-y-4">
                  
                  {/* NAME */}
                  <div>
                    <label className="text-xs font-bold text-gray-600 block mb-1">Full Name</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><User className="w-5 h-5" /></span>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="John Doe"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.fullName}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium outline-none transition-all
                          ${touched.fullName && errors.fullName ? "bg-red-50 border-red-500 text-red-900" : "bg-gray-50/50 border-gray-200 focus:border-blue-500 focus:bg-white"}`}
                      />
                    </div>
                    {touched.fullName && errors.fullName && <p className="text-xs font-semibold text-red-500 mt-1 pl-1">{errors.fullName}</p>}
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="text-xs font-bold text-gray-600 block mb-1">Email ID</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Mail className="w-5 h-5" /></span>
                      <input
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium outline-none transition-all
                          ${touched.email && errors.email ? "bg-red-50 border-red-500 text-red-900" : "bg-gray-50/50 border-gray-200 focus:border-blue-500 focus:bg-white"}`}
                      />
                    </div>
                    {touched.email && errors.email && <p className="text-xs font-semibold text-red-500 mt-1 pl-1">{errors.email}</p>}
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <label className="text-xs font-bold text-gray-600 block mb-1">Password</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Lock className="w-5 h-5" /></span>
                      <input
                        type="password"
                        name="password"
                        placeholder="Create strong password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium outline-none transition-all
                          ${touched.password && errors.password ? "bg-red-50 border-red-500 text-red-900" : "bg-gray-50/50 border-gray-200 focus:border-blue-500 focus:bg-white"}`}
                      />
                    </div>
                    {touched.password && errors.password && <p className="text-xs font-semibold text-red-500 mt-1 pl-1">{errors.password}</p>}
                  </div>

                  {/* TERMS CHECKBOX */}
                  <div className="pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        name="terms"
                        checked={values.terms}
                        onChange={(e) => setFieldValue("terms", e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded text-blue-600 focus:ring-blue-400 border-gray-300"
                      />
                      <span className="text-xs font-medium text-gray-600 leading-tight">
                        I agree with the <span className="text-blue-600 font-bold hover:underline">Terms & Conditions</span> of SuperX.
                      </span>
                    </label>
                    {touched.terms && errors.terms && <p className="text-xs font-semibold text-red-500 mt-1 pl-1">{errors.terms}</p>}
                  </div>

                  {/* SUBMIT */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-sky-500 text-white font-bold text-sm py-3 rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4 disabled:opacity-50"
                  >
                    {loading ? "Sending OTP..." : "Request OTP"}
                    <ShieldCheck className="w-4 h-4" />
                  </motion.button>
                </Form>
              )}
            </Formik>
          </motion.div>
        ) : (
          /* STEP 2: VERIFY OTP SCREEN */
          <motion.div
            key="otp-step"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
          >
            <h2 className="text-2xl font-black text-gray-900 mb-1">Verify Email</h2>
            <p className="text-sm text-gray-500 mb-5">
              We've sent a 6-digit secure code to <span className="text-gray-800 font-bold">{registeredEmail}</span>.
            </p>

            <Formik
              initialValues={{ otp: "" }}
              validationSchema={OtpSchema}
              onSubmit={handleVerifyOtp}
            >
              {({ errors, touched, handleChange, handleBlur, values }) => (
                <Form className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-600 block mb-1">Enter 6-Digit OTP</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><KeyRound className="w-5 h-5" /></span>
                      <input
                        type="text"
                        name="otp"
                        maxLength={6}
                        placeholder="000000"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.otp}
                        className={`w-full pl-10 pr-4 py-3 tracking-[0.5em] text-center font-black rounded-xl border text-lg outline-none transition-all
                          ${touched.otp && errors.otp ? "bg-red-50 border-red-500 text-red-900" : "bg-gray-50/50 border-gray-200 focus:border-blue-500 focus:bg-white"}`}
                      />
                    </div>
                    {touched.otp && errors.otp && <p className="text-xs font-semibold text-red-500 mt-1 text-center">{errors.otp}</p>}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
                  >
                    {loading ? "Verifying..." : "Verify & Activate"}
                    <CheckCircle className="w-4 h-4" />
                  </motion.button>
                </Form>
              )}
            </Formik>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REVERSE SWITCH */}
      <div className="text-center mt-6 pt-4 border-t border-gray-100">
        <p className="text-xs font-semibold text-gray-500">
          Already have an account?{" "}
          <button onClick={switchToLogin} className="text-blue-600 font-bold hover:underline cursor-pointer">
            Login here
          </button>
        </p>
      </div>

    </div>
  );
};

export default SignUpForm;