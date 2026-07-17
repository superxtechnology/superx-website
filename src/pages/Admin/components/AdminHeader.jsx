import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, LogOut, AlertTriangle } from 'lucide-react';
import useThemeStore from '../../../store/ThemeStore';
import useAdminAuthStore from '../../../store/adminAuthStore';
import useToastStore from '../../../store/toastStore';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../../../components/ThemeToggle';
import logo from '../../../assets/logo.png';

const AdminHeader = ({ activeTab, setActiveTab }) => {
  const { theme, toggleTheme } = useThemeStore();
  const { adminLogout } = useAdminAuthStore();
  const { showToast } = useToastStore();
  const navigate = useNavigate();
  const isDark = theme === 'dark';

  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await adminLogout();
    showToast('Session Ended', 'Logged out successfully! See you again.', 'success');
    navigate('/admin/login');
  };

  return (
    <>
      <header className={`w-full transition-colors duration-300 border-b ${
        isDark ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-200 text-gray-800'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* UPPER ROW: LOGO & CONTROLS */}
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <img src={logo} alt="SuperX Logo" className="h-9 w-auto" />
              <span className="text-lg font-black tracking-wide">SuperX Admin</span>
            </div>

            <div className="flex items-center gap-4">
              {/* Theme Toggle Button */}
              <ThemeToggle theme={theme} onToggleTheme={toggleTheme} />

              {/* Admin Badge with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 focus:outline-none cursor-pointer group"
                >
                  <span className="text-xs font-bold hidden sm:inline opacity-70 group-hover:opacity-100 transition-opacity">System Admin</span>
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-md hover:scale-105 transition-transform">
                    A
                  </div>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showDropdown && (
                    <>
                      {/* Transparent Click-away overlay */}
                      <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
                      
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className={`absolute right-0 mt-2 w-48 rounded-2xl shadow-xl border p-2 z-20 ${
                          isDark ? 'bg-gray-850 border-gray-700 text-white shadow-black/50' : 'bg-white border-gray-100 text-gray-800'
                        }`}
                      >
                        <button
                          onClick={() => {
                            setShowDropdown(false);
                            setShowConfirmLogout(true);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-left text-xs font-bold text-red-500 hover:bg-red-500/10 transition-all cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* LOWER ROW: NAVIGATION TABS */}
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-2 py-3 px-1 text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'border-blue-500 text-blue-500'
                  : `border-transparent opacity-60 hover:opacity-100 ${isDark ? 'hover:text-white' : 'hover:text-black'}`
              }`}
            >
              <Package className="w-4 h-4" />
              All Products
            </button>
          </div>

        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showConfirmLogout && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <div 
            onClick={() => setShowConfirmLogout(false)} 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          {/* Modal Card */}
          <div className={`relative w-full max-w-sm rounded-3xl p-6 shadow-2xl border transition-all ${
            isDark ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-100 text-gray-800'
          }`}>
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-red-500/10 text-red-500 rounded-full mb-4">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black">Terminate Admin Session?</h3>
              <p className="text-sm opacity-60 mt-2">
                Are you sure you want to log out of the admin panel? You will need your login credentials to gain access again.
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowConfirmLogout(false)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  isDark ? 'border-gray-700 bg-gray-800 hover:bg-gray-700' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black transition-all shadow-md hover:shadow-red-600/25 cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminHeader;