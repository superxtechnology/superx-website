import React, { useEffect, useState } from 'react';
import { Plus, PackagePlus, Eye, Trash2, Pencil, Search, RotateCw } from 'lucide-react';
import useThemeStore from '../../../store/themeStore';
import useAdminAuthStore from '../../../store/adminAuthStore';
import useToastStore from '../../../store/toastStore';
import AxiosInstance from '../../../api/AxiosInstance';
import ProductActionsModal from './ProductActionsModal';

const AllProductTable = ({ onAddProductClick, onEditProduct }) => {
  const { theme } = useThemeStore();
  const { adminToken } = useAdminAuthStore();
  const { showToast } = useToastStore();
  const isDark = theme === 'dark';

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [modalMode, setModalMode] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const authConfig = {
    headers: adminToken ? { Authorization: `Bearer ${adminToken}` } : {},
    withCredentials: true,
  };

  const fetchProducts = async (isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true);
    else setLoading(true);

    try {
      const response = await AxiosInstance.get('/admin/products', authConfig);
      if (response.data.success) {
        const data = response.data.products || [];
        setProducts(data);
        setFilteredProducts(data);
      }
    } catch (error) {
      console.error(error);
      showToast('Database Error', 'Failed to load operational databases.', 'error');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = products.filter(p =>
      p.name?.toLowerCase().includes(query) ||
      p.brand?.toLowerCase().includes(query) ||
      p.category?.toLowerCase().includes(query) ||
      p.subcategory?.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  // Handle Toggle Product Availability status
  const handleToggleStatus = async (item) => {
    const nextStatus = !item.isActive;
    try {
      const response = await AxiosInstance.put(`/admin/products/${item._id}`, {
        isActive: nextStatus
      }, authConfig);
      if (response.data.success) {
        showToast('Visibility Updated', `Product is now ${nextStatus ? 'Active' : 'Inactive'} in the catalog.`, 'success');
        setProducts(prev => prev.map(p => p._id === item._id ? { ...p, isActive: nextStatus } : p));
      }
    } catch (error) {
      console.error(error);
      showToast('Status Error', 'Failed to update catalog status', 'error');
    }
  };

  // Handle Inventory Asset Deletion
  const handleDeleteConfirm = async (id) => {
    try {
      const response = await AxiosInstance.delete(`/admin/products/${id}`, authConfig);
      if (response.data.success) {
        showToast('Asset Deleted', 'Product has been permanently wiped from registry!', 'success');
        setProducts(prev => prev.filter(item => item._id !== id));
        setModalMode(null);
        setSelectedProduct(null);
      }
    } catch (error) {
      console.error(error);
      showToast('Action Failed', 'Unable to execute asset termination.', 'error');
    }
  };

  return (
    <div className={`w-full border rounded-3xl p-6 shadow-lg transition-all duration-300 ${
      isDark ? 'bg-[#0b1329] border-slate-800 text-white' : 'bg-white border-slate-500 text-slate-800'
    }`}>

      {/* 1. MASTER HEADER / SEARCH ACTION BAR */}
      <div className={`flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-5 pb-4 border-b ${
        isDark ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-2xl hidden sm:block ${
            isDark ? 'bg-emerald-500/10 text-[#00c2a8]' : 'bg-emerald-50 text-emerald-600'
          }`}>
            <PackagePlus className="w-6 h-6" />
          </div>
          <div>
            <h2 className={`text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>Products List</h2>
            <p className={`text-xs mt-0.5 hidden md:block ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Manage active equipment listings, access secure profiles and logs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Real-time search element */}
          <div className={`flex items-center gap-2 border px-4 py-2 rounded-full text-xs w-full md:w-64 font-semibold transition-all shadow-inner border-slate-500 ${
            isDark
              ? 'bg-[#050b1d] border-slate-700 focus-within:border-[#00c2a8] text-slate-200 placeholder:text-slate-600'
              : 'bg-slate-50 border-slate-300 focus-within:border-emerald-500 focus-within:bg-white text-slate-800'
          }`}>
            <Search className={`w-4 h-4 shrink-0 ${isDark ? 'text-slate-500' : 'text-slate-500'}`} />
            <input
              type="text"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none w-full text-xs font-bold placeholder:font-semibold placeholder:text-slate-500"
            />
          </div>

          {/* Add Product Button */}
          <button
            id="add-product-btn"
            onClick={onAddProductClick}
            className={`flex items-center gap-2 font-bold text-xs px-5 py-2.5 rounded-full h-10 whitespace-nowrap shadow-md cursor-pointer transition-all ${
              isDark
                ? 'bg-[#00c2a8] hover:bg-[#00ebd0] text-[#050b1d]'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-emerald-500/30'
            }`}
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>

          {/* Refresh Button */}
          <button
            onClick={() => fetchProducts(true)}
            disabled={loading || isRefreshing}
            className={`p-2 border rounded-full h-10 w-10 flex items-center justify-center cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              isDark
                ? 'border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-[#00c2a8]'
                : 'border-slate-300 hover:bg-slate-100 text-slate-600 hover:text-emerald-600 hover:border-emerald-300'
            }`}
            title="Force Sync Directory"
          >
            <RotateCw className={`w-4 h-4 transition-transform duration-700 ${isRefreshing ? `animate-spin ${isDark ? 'text-[#00c2a8]' : 'text-emerald-600'}` : ''}`} />
          </button>
        </div>
      </div>

      {/* 2. CORE SYSTEM DATA DIRECTORY TABLE */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[750px]">
          <thead>
            <tr className={`text-[11px] font-black uppercase tracking-wider border-b-2 ${
              isDark ? 'bg-[#050b1d] border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-300 text-slate-600'
            }`}>
              <th className="py-4 px-5">Equipment Profile</th>
              <th className="py-4 px-4">Category</th>
              <th className="py-4 px-4">Sub Category</th>
              <th className="py-4 px-4">Brand</th>
              <th className="py-4 px-4 text-center">Availability</th>
              <th className="py-4 px-5 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className={`divide-y text-xs font-bold ${isDark ? 'divide-slate-800' : 'divide-slate-200'}`}>
            {loading && !isRefreshing ? (
              <tr>
                <td colSpan="6" className="py-16">
                  <div className="flex flex-col items-center justify-center gap-4 select-none">
                    <div className="relative w-10 h-10">
                      <div className={`absolute inset-0 rounded-full border-4 ${isDark ? 'border-slate-800/80' : 'border-slate-100'}`}></div>
                      <div className={`absolute inset-0 rounded-full border-4 border-t-transparent animate-spin ${isDark ? 'border-[#00c2a8]' : 'border-emerald-600'}`}></div>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-center">
                      <span className={`text-xs font-black uppercase tracking-widest animate-pulse ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Syncing Security Matrix Vault
                      </span>
                      <span className={`text-[10px] font-semibold tracking-wider normal-case ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                        Fetching product cluster nodes...
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-14">
                  <div className={`flex flex-col items-center gap-2 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                    <PackagePlus className="w-9 h-9" />
                    <p className="text-xs font-black uppercase tracking-wide">No dynamic listings detected inside pipeline.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredProducts.map((item) => (
                <tr key={item._id} className={`transition-colors ${isDark ? 'hover:bg-slate-900/40' : 'hover:bg-slate-50'}`}>

                  {/* COLUMN 1: IMAGE + INFO */}
                  <td className="py-3.5 px-5 flex items-center gap-3">
                    <img
                      src={item.images?.[0] || `https://placehold.co/80x80/1e293b/60a5fa?text=${encodeURIComponent(item.name?.charAt(0) || 'P')}`}
                      className={`w-10 h-10 object-cover rounded-xl border shrink-0 ${isDark ? 'border-slate-800 bg-slate-800' : 'border-slate-300 bg-slate-50'}`}
                      alt=""
                    />
                    <div>
                      <div className={`text-sm font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>{item.name}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1 font-semibold">{item.description}</div>
                    </div>
                  </td>

                  {/* COLUMN 2: HARDWARE GROUP */}
                  <td className="py-3.5 px-4">
                    <span className={`px-3 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider border ${
                      isDark ? 'bg-emerald-500/10 text-emerald-400 border-transparent' : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                    }`}>
                      {item.category}
                    </span>
                  </td>

                  {/* COLUMN 3: SUBGROUP */}
                  <td className="py-3.5 px-4">
                    {item.subcategory ? (
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider border ${
                        isDark ? 'bg-blue-500/10 text-blue-400 border-transparent' : 'bg-blue-50 text-blue-700 border-blue-100'
                      }`}>
                        {item.subcategory}
                      </span>
                    ) : (
                      <span className={`text-[10px] ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>—</span>
                    )}
                  </td>

                  {/* COLUMN 4: BRAND */}
                  <td className={`py-3.5 px-4 text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.brand}</td>

                  {/* COLUMN 5: AVAILABILITY TOGGLE */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center justify-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.isActive !== false}
                          onChange={() => handleToggleStatus(item)}
                          className="sr-only peer"
                        />
                        <div className={`w-11 h-6 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:shadow-md ${
                          isDark ? 'bg-slate-800 peer-checked:bg-[#00c2a8]' : 'bg-slate-200 peer-checked:bg-emerald-600'
                        }`}></div>
                      </label>
                    </div>
                  </td>

                  {/* COLUMN 6: CONTROL ACTION CONTROLS */}
                  <td className="py-3.5 px-5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => { setSelectedProduct(item); setModalMode('view'); }}
                        className={`p-1.5 rounded-lg text-blue-500 transition-all cursor-pointer ${isDark ? 'hover:bg-blue-500/10' : 'hover:bg-blue-50'}`}
                        title="View Asset Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onEditProduct(item)}
                        className={`p-1.5 rounded-lg text-slate-600 transition-all cursor-pointer ${isDark ? 'hover:text-[#00c2a8] hover:bg-emerald-500/10' : 'hover:text-emerald-600 hover:bg-emerald-50'}`}
                        title="Edit Asset Profile"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => { setSelectedProduct(item); setModalMode('delete'); }}
                        className={`p-1.5 rounded-lg text-red-500 hover:text-rose-600 transition-all cursor-pointer ${isDark ? 'hover:bg-rose-500/10' : 'hover:bg-rose-50'}`}
                        title="Decommission Asset"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 3. PIPELINE FOOTER */}
      <div className="mt-6 mb-1 flex items-center justify-center gap-3">
        <div className={`h-[1px] flex-1 ${isDark ? 'bg-gradient-to-r from-transparent to-slate-700' : 'bg-gradient-to-r from-transparent to-slate-200'}`}></div>
        <div className={`inline-flex items-center gap-2 border text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ${
          isDark ? 'bg-slate-900 border-slate-800 text-[#00c2a8]' : 'bg-emerald-50/40 border-emerald-100 text-emerald-700'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isDark ? 'bg-[#00c2a8]' : 'bg-emerald-500'}`} />
          Product Directory Pipeline Ends
        </div>
        <div className={`h-[1px] flex-1 ${isDark ? 'bg-gradient-to-l from-transparent to-slate-700' : 'bg-gradient-to-l from-transparent to-slate-200'}`}></div>
      </div>

      {/* 4. DETAILS / TERMINATION CONFIRMATION MODALS */}
      {modalMode && (
        <ProductActionsModal
          mode={modalMode}
          product={selectedProduct}
          onClose={() => { setModalMode(null); setSelectedProduct(null); }}
          onConfirmDelete={handleDeleteConfirm}
        />
      )}

    </div>
  );
};

export default AllProductTable;