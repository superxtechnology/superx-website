import React from 'react';
import { X, Cpu, Trash2, AlertTriangle, MessageSquare, Camera, Shield } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import useThemeStore from '../../../store/themeStore';

const ProductActionsModal = ({ mode, product, onClose, onConfirmDelete }) => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  if (!product) return null;

  // 1. DELETE CONFIRMATION MODAL
  if (mode === 'delete') {
    return (
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
        <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className={`relative w-full max-w-sm rounded-3xl p-6 shadow-2xl border transition-all ${
          isDark ? 'bg-[#0b1329] border-slate-800 text-white' : 'bg-white border-slate-200 text-gray-800'
        }`}>
          <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-red-500/10 text-red-500 rounded-full mb-4">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black">Delete Product?</h3>
            <p className="text-sm opacity-60 mt-2">
              Are you sure you want to delete <span className="font-bold text-red-500">"{product.name}"</span>? This action cannot be undone.
            </p>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                isDark ? 'border-slate-700 bg-[#121b36] hover:bg-slate-800' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirmDelete(product._id)}
              className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black transition-colors shadow-md cursor-pointer"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. DETAILED SPECIFICATIONS DRAWER
  if (mode === 'view') {
    const cardBgCls = isDark ? 'bg-[#050b1d] border-slate-800/80' : 'bg-slate-50 border-slate-200';
    const labelTextCls = isDark ? 'text-slate-400 font-bold' : 'text-slate-600 font-bold';
    const valTextCls = isDark ? 'text-white font-extrabold' : 'text-slate-900 font-extrabold';

    return (
      <div className="fixed inset-0 z-[105] flex justify-end">
        {/* Backdrop blur overlay */}
        <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-xs" />

        {/* Drawer container */}
        <div className={`relative w-full max-w-md h-full shadow-2xl p-6 flex flex-col gap-6 border-l overflow-y-auto scrollbar-premium transition-colors duration-300 ${
          isDark ? 'bg-[#0b1329] border-slate-800 text-white' : 'bg-white border-slate-200 text-gray-800'
        }`}>

          {/* Top Header */}
          <div className={`flex justify-between items-center border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                isDark ? 'bg-emerald-500/10 text-[#00c2a8]' : 'bg-emerald-500/10 text-emerald-600'
              }`}>
                PR
              </div>
              <div>
                <h2 className={`text-sm font-black uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>Product Specifications</h2>
                <p className="text-[9px] font-mono text-slate-500 truncate max-w-[200px]">{product._id}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className={`p-2 transition-colors rounded-xl border cursor-pointer ${
                isDark ? 'border-slate-700 bg-[#121b36] text-slate-400 hover:bg-slate-800 hover:text-white' : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cards List content */}
          <div className="space-y-5 flex-1">

            {/* Card 1: Product Profile Details */}
            <div className={`p-4 rounded-xl border space-y-3 ${cardBgCls}`}>
              <h4 className={`text-[10px] font-black uppercase tracking-wider mb-2 ${isDark ? 'text-[#00c2a8]' : 'text-emerald-600'}`}>
                Product Profile Details
              </h4>
              <div className="space-y-3 text-xs">
                {/* Name */}
                <div className="flex items-center gap-3">
                  <Camera className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <span className={labelTextCls}>Full Name:</span>
                  <span className={`${valTextCls} ml-auto`}>{product.name}</span>
                </div>
                {/* Brand */}
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <span className={labelTextCls}>Brand:</span>
                  <span className={`${valTextCls} ml-auto`}>{product.brand}</span>
                </div>
                {/* Category */}
                <div className="flex items-center gap-3">
                  <Cpu className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <span className={labelTextCls}>Category:</span>
                  <span className={`font-black ml-auto uppercase text-[10px] ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                    {product.category}
                  </span>
                </div>
                {/* Subcategory */}
                {product.subcategory && (
                  <div className="flex items-center gap-3">
                    <Cpu className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <span className={labelTextCls}>Subcategory:</span>
                    <span className={`font-black ml-auto uppercase text-[10px] ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                      {product.subcategory}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Card 2: Technical Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div className={`border p-4 rounded-xl space-y-3 ${isDark ? 'border-slate-800/60' : 'border-slate-200'}`}>
                <h4 className={`text-[10px] font-black uppercase tracking-wider mb-2 ${isDark ? 'text-blue-400' : 'text-blue-500'}`}>
                  Technical Specifications
                </h4>
                <div className="space-y-3 text-xs">
                  {product.specifications.map((spec, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Cpu className="w-4 h-4 text-slate-500 flex-shrink-0" />
                      <span className={labelTextCls}>{spec.key}:</span>
                      <span className={`${valTextCls} ml-auto`}>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Card 3: Communication & System Log */}
            <div className={`border p-4 rounded-xl space-y-3 ${isDark ? 'border-slate-800/60 bg-amber-500/[0.04]' : 'border-slate-200 bg-amber-500/[0.02]'}`}>
              <h4 className={`text-[10px] font-black uppercase tracking-wider mb-2 ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                Communication & System Log
              </h4>
              <div className="space-y-4 text-xs">
                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <span className={`${labelTextCls} flex items-center gap-2`}>
                    <Cpu className="w-4 h-4 text-slate-500" /> Description:
                  </span>
                  <p className={`p-3 rounded-lg leading-relaxed whitespace-pre-wrap select-text border font-semibold ${
                    isDark ? 'text-slate-300 bg-[#050b1d] border-slate-800/80' : 'text-slate-700 bg-slate-50 border-slate-200/60'
                  }`}>
                    {product.description}
                  </p>
                </div>
                {/* WhatsApp message */}
                {product.whatsappMessage && (
                  <div className="flex flex-col gap-1.5">
                    <span className={`${labelTextCls} flex items-center gap-2`}>
                      <FaWhatsapp className={`w-4 h-4 ${isDark ? 'text-[#00c2a8]' : 'text-emerald-600'}`} /> WhatsApp Message Draft:
                    </span>
                    <p className={`font-mono text-[10px] leading-relaxed p-3 rounded-lg border select-text bg-emerald-500/[0.04] border-emerald-500/10 ${isDark ? 'text-[#00c2a8]' : 'text-emerald-700'}`}>
                      {product.whatsappMessage}
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className={`mt-2 border-t pt-4 text-center ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <span className="text-[9px] font-bold uppercase text-slate-500 tracking-widest">End of Product Specifications</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ProductActionsModal;