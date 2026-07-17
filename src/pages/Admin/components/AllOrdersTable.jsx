import React, { useEffect, useState } from 'react';
import { Eye, Edit2, Search, RotateCw, CheckCircle, Clock, AlertTriangle, XCircle } from 'lucide-react';
import useThemeStore from '../../../store/themeStore';
import AxiosInstance from '../../../api/AxiosInstance';
import DetailOrderView from './DetailOrderView';
import { toast } from 'react-hot-toast';

const AllOrdersTable = () => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal aur Status Menu Popover control states
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeStatusMenuId, setActiveStatusMenuId] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await AxiosInstance.get('/orders/admin/orders'); // Apne exact route ke mutabik badal lena bhai
      if (response.data.success) {
        const data = response.data.orders || response.data;
        setOrders(data);
        setFilteredOrders(data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load global tracking ledger.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Real-time keyword filter engine
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = orders.filter(o => 
      o.user?.fullName?.toLowerCase().includes(query) || 
      o._id?.toLowerCase().includes(query) ||
      o.status?.toLowerCase().includes(query)
    );
    setFilteredOrders(filtered);
  }, [searchQuery, orders]);

  // Status Change handler mechanism
  const handleUpdateStatus = async (orderId, nextStatus) => {
    try {
      const response = await AxiosInstance.put(`/orders/admin/orders/${orderId}/status`, { status: nextStatus });
      if (response.data.success) {
        toast.success(`Order state moved to ${nextStatus}!`);
        setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: nextStatus } : o));
        setActiveStatusMenuId(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Status synchronization failed.");
    }
  };

  // Status dynamic style resolver helper
  const getStatusBadgeStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-emerald-500/10 text-emerald-500';
      case 'packed':
      case 'out for delivery':
        return 'bg-blue-500/10 text-blue-500';
      case 'cancelled':
        return 'bg-red-500/10 text-red-500';
      default: // pending
        return 'bg-amber-500/10 text-amber-500';
    }
  };

  return (
    <div className="space-y-5">
      
      {/* SECTION HEADER BLOCK */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-xl font-black tracking-tight">All Consultation Orders</h2>
          <p className="text-xs opacity-60 mt-0.5">Track paid case entries, client configurations, and session logs.</p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Reference Search Element */}
          <div className={`flex items-center gap-2 border px-3 py-1.5 rounded-xl text-xs w-full sm:w-64 font-medium transition-all ${
            isDark ? 'bg-gray-900 border-gray-800 focus-within:border-blue-500' : 'bg-white border-gray-200 focus-within:border-blue-500'
          }`}>
            <Search className="w-4 h-4 opacity-40 shrink-0" />
            <input 
              type="text" 
              placeholder="Search orders..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none w-full text-xs font-semibold"
            />
          </div>

          <button onClick={fetchOrders} className={`p-2 border rounded-xl h-9 w-9 flex items-center justify-center cursor-pointer hover:bg-gray-500/10 ${isDark ? 'border-gray-800 text-white' : 'border-gray-200 text-gray-700'}`}>
            <RotateCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* COMPACT DATA MATRIX TABLE */}
      <div className={`w-full overflow-x-auto rounded-2xl border shadow-sm transition-colors duration-300 ${
        isDark ? 'bg-gray-900 border-gray-800 text-gray-100' : 'bg-white border-gray-100 text-gray-800'
      }`}>
        <table className="w-full text-left border-collapse min-w-[850px]">
          <thead>
            <tr className={`text-[11px] font-black uppercase tracking-wider border-b ${
              isDark ? 'bg-gray-800/40 border-gray-800 text-gray-400' : 'bg-gray-50/70 border-gray-100 text-gray-500'
            }`}>
              <th className="py-4 px-5">Client Details</th>
              <th className="py-4 px-4">Equipment Ordered</th>
              <th className="py-4 px-4">Channel</th>
              <th className="py-4 px-4">Transaction Fee</th>
              <th className="py-4 px-4">Intake Registry Time</th>
              <th className="py-4 px-4">Status</th>
              <th className="py-4 px-5 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs font-bold">
            {loading ? (
              <tr><td colSpan="7" className="text-center py-10 opacity-50 font-semibold">Decrypting Inbound Logistics Stream...</td></tr>
            ) : filteredOrders.length === 0 ? (
              <tr><td colSpan="7" className="text-center py-12 opacity-40 font-bold">No registered transactions inside pipeline.</td></tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order._id} className={`transition-colors ${isDark ? 'hover:bg-gray-800/20' : 'hover:bg-gray-50/40'}`}>
                  
                  {/* CLIENT CORE MATRIX INFO */}
                  <td className="py-3.5 px-5">
                    <div className="text-sm font-black tracking-tight">{order.user?.fullName || order.clientName || 'Shiva Singh'}</div>
                    <div className="text-[10px] opacity-50 font-medium tracking-tight mt-0.5">{order.user?.email || order.clientEmail || 'shivasingh247044@gmail.com'}</div>
                  </td>

                  {/* EQUIPMENT / SPEC ASSIGNED MANIFEST */}
                  <td className="py-3.5 px-4 font-black text-slate-700 dark:text-slate-300">
                    {order.items?.[0]?.product?.name || order.items?.[0]?.name || 'Adv. Shiva Singh'}
                    {order.items?.length > 1 && <span className="text-[10px] ml-1 opacity-50 font-medium">(+{order.items.length - 1} More)</span>}
                  </td>

                  {/* SPECIALTY IDENTIFICATION CAPSULES */}
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-slate-500/10 text-slate-500 uppercase tracking-wider">
                      {order.items?.[0]?.product?.category || 'CIVIL'}
                    </span>
                  </td>

                  {/* TRANSACTION VALUE LEDGER */}
                  <td className="py-3.5 px-4 text-sm font-extrabold text-slate-800 dark:text-slate-200">
                    ₹{order.totalAmount?.toLocaleString() || '2499'}
                  </td>

                  {/* TIMESTAMP ENTRY */}
                  <td className="py-3.5 px-4 font-medium opacity-70">
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute:'2-digit' }) : '27 Jun, 11:01 pm'}
                  </td>

                  {/* OPERATION STATE LIVE BADGE */}
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${getStatusBadgeStyle(order.status || 'pending')}`}>
                      • {order.status || 'PENDING'}
                    </span>
                  </td>

                  {/* CONTEXT ACTIONS COLUMN ELEMENT */}
                  <td className="py-3.5 px-5 relative">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => { setSelectedOrder(order); setIsDrawerOpen(true); }}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-500/10 transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Editor pencil context menu activation link */}
                      <button 
                        onClick={() => setActiveStatusMenuId(activeStatusMenuId === order._id ? null : order._id)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          activeStatusMenuId === order._id ? 'bg-emerald-500/20 text-emerald-500' : 'text-slate-500 hover:bg-slate-500/10'
                        }`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* 🔥 INLINE RECOGNITION CONTEXT INLINE MENU POPOVER (AS IN SCREENSHOT) */}
                    {activeStatusMenuId === order._id && (
                      <div className={`absolute right-14 top-10 z-50 w-40 rounded-xl shadow-xl border p-1.5 space-y-1 ${
                        isDark ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-100 text-gray-800'
                      }`}>
                        <div className="text-[9px] font-black uppercase opacity-40 px-2 py-1 tracking-wider">Update Status</div>
                        {[
                          { label: 'Mark Pending', val: 'pending', icon: Clock, color: 'text-amber-500' },
                          { label: 'Mark Packed', val: 'packed', icon: Edit2, color: 'text-blue-500' },
                          { label: 'Out For Delivery', val: 'out for delivery', icon: AlertTriangle, color: 'text-purple-500' },
                          { label: 'Mark Completed', val: 'delivered', icon: CheckCircle, color: 'text-emerald-500' },
                          { label: 'Cancel Order', val: 'cancelled', icon: XCircle, color: 'text-red-500' }
                        ].map((btn) => (
                          <button
                            key={btn.val}
                            onClick={() => handleUpdateStatus(order._id, btn.val)}
                            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] font-bold text-left hover:bg-slate-500/10 cursor-pointer transition-colors`}
                          >
                            <btn.icon className={`w-3.5 h-3.5 ${btn.color}`} />
                            {btn.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center text-[10px] font-black uppercase opacity-40 tracking-widest pt-2">
        • END OF RECORDS •
      </div>

      {/* SHEET DRAWER CONTAINER LINK OVERLAY */}
      <DetailOrderView 
        isOpen={isDrawerOpen} 
        order={selectedOrder} 
        onClose={() => { setIsDrawerOpen(false); setSelectedOrder(null); }} 
      />

    </div>
  );
};

export default AllOrdersTable;