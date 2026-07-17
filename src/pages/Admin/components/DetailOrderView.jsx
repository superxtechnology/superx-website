import React from 'react';
import { X, User, Truck, CreditCard, Clock } from 'lucide-react';
import useThemeStore from '../../../store/ThemeStore';

const DetailOrderView = ({ isOpen, order, onClose }) => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-[120] flex justify-end">
      {/* Dynamic Blur Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity" />

      {/* Drawer Panel Container */}
      <div className={`relative w-full max-w-md h-full shadow-2xl p-6 flex flex-col justify-between border-l transition-transform overflow-y-auto ${
        isDark ? 'bg-[#0f172a] border-gray-800 text-white' : 'bg-white border-gray-100 text-gray-800'
      }`}>
        
        <div>
          {/* Main Top Header Section */}
          <div className="flex justify-between items-start border-b pb-4 mb-6 dark:border-gray-800">
            <div>
              <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs bg-emerald-500/10 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" /> LEDGER SPECIFICATIONS
              </div>
              <h2 className="text-xs font-semibold opacity-50 mt-1">ID: {order._id || '6a4008f4138a6cfeed70ac0e'}</h2>
            </div>
            <button 
              onClick={onClose} 
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                isDark ? 'border-gray-800 hover:bg-gray-800 text-gray-400' : 'border-gray-200 hover:bg-gray-100 text-gray-500'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-5">
            {/* CARD 1: CLIENT PROFILE CONTEXT */}
            <div className={`p-4 rounded-xl border ${isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-gray-50/50 border-gray-100'}`}>
              <h3 className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider flex items-center gap-1.5 mb-3">
                <User className="w-4 h-4" /> Client Profile Context
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="opacity-60 font-medium">Full Name:</span> <span className="font-bold">{order.user?.fullName || order.clientName}</span></div>
                <div className="flex justify-between"><span className="opacity-60 font-medium">Email:</span> <span className="font-bold tracking-tight">{order.user?.email || order.clientEmail}</span></div>
                <div className="flex justify-between"><span className="opacity-60 font-medium">Contact / Phone:</span> <span className="font-bold">{order.shippingAddress?.phone || '9336768363'}</span></div>
              </div>
            </div>

            {/* CARD 2: SYSTEM ROUTING DATA / LOGISTICS */}
            <div className={`p-4 rounded-xl border ${isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-gray-50/50 border-gray-100'}`}>
              <h3 className="text-xs font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider flex items-center gap-1.5 mb-3">
                <Truck className="w-4 h-4" /> System Routing Data
              </h3>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-start">
                  <span className="opacity-60 font-medium shrink-0">Ordered Items:</span>
                  <div className="text-right font-bold space-y-0.5">
                    {order.items?.map((item, idx) => (
                      <div key={idx}>{item.product?.name || item.name} (x{item.quantity})</div>
                    )) || <div>SuperX Pro Dome Camera (x1)</div>}
                  </div>
                </div>
                <div className="border-t pt-2 dark:border-gray-800 flex justify-between"><span className="opacity-60 font-medium">Delivery Mode:</span> <span className="font-bold uppercase tracking-wider text-blue-500">Standard Ground</span></div>
                <div className="flex justify-between items-start"><span className="opacity-60 font-medium">Shipping Destination:</span> <span className="font-bold text-right max-w-[200px] block line-clamp-2">{order.shippingAddress?.addressLine || 'Sector 62, Electronic City, Noida'}</span></div>
              </div>
            </div>

            {/* CARD 3: FINANCIAL TRANSACTION LOG */}
            <div className={`p-4 rounded-xl border ${isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-gray-50/50 border-gray-100'}`}>
              <h3 className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider flex items-center gap-1.5 mb-3">
                <CreditCard className="w-4 h-4" /> Financial Transaction Log
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="opacity-60 font-medium">Payment Mode:</span> <span className="font-bold uppercase">{order.paymentMethod || 'COD'}</span></div>
                <div className="flex justify-between"><span className="opacity-60 font-medium">Transaction Date:</span> <span className="font-bold">{new Date(order.createdAt).toLocaleDateString('en-GB')}</span></div>
                <div className="border-t pt-2 dark:border-gray-800 flex justify-between items-center">
                  <span className="text-xs font-black">Net Total Amount:</span> 
                  <span className="text-base font-black text-emerald-500">₹{order.totalAmount?.toLocaleString() || '2,499'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Closing Trigger button at footer */}
        <div className="pt-4 border-t dark:border-gray-800 mt-6">
          <button
            onClick={onClose}
            className={`w-full py-2.5 rounded-xl font-bold text-xs border transition-colors cursor-pointer ${
              isDark ? 'border-gray-800 bg-gray-800 hover:bg-gray-700 text-white' : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700'
            }`}
          >
            Close Operational Registry
          </button>
        </div>

      </div>
    </div>
  );
};

export default DetailOrderView;