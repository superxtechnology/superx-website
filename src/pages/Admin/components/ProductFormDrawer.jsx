import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Trash2, Cpu, UploadCloud, MessageSquare } from "lucide-react";
import useThemeStore from "../../../store/ThemeStore";
import useAdminAuthStore from "../../../store/adminAuthStore";
import useToastStore from "../../../store/toastStore";
import AxiosInstance from "../../../api/AxiosInstance";
import {
  FaWhatsapp,
} from "react-icons/fa";

const CATEGORIES = {
  "IP Camera": ["Indoor IP Camera", "Outdoor IP Camera", "PTZ Camera", "Fisheye Camera"],
  "HD Camera": ["Bullet Camera", "Dome Camera", "Varifocal Camera", "Box Camera"],
  "DVR / NVR": ["4 Channel DVR", "8 Channel DVR", "16 Channel DVR", "NVR", "Standalone DVR"],
  "CCTV Wire & Cable": ["Coaxial Cable", "Cat6 Cable", "Power Cable", "HDMI Cable"],
  "CP Plus Camera": ["CP Plus Bullet", "CP Plus Dome", "CP Plus PTZ", "CP Plus IP"],
  "Accessories": ["Power Supply", "Hard Disk", "BNC Connector", "Junction Box", "CCTV Stand", "UPS"],
};

const PremiumSelect = ({ placeholder, value, onChange, options, disabled, isDark }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2.5 rounded-xl border text-sm font-semibold flex items-center justify-between transition-all select-none text-left ${
          disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
        } ${
          isDark
            ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
            : 'bg-white border-slate-300 text-slate-700 focus:border-emerald-500'
        }`}
      >
        <span className={!value ? 'text-slate-400 font-medium' : ''}>{value || placeholder}</span>
        <span className="text-slate-450 text-[10px]">▼</span>
      </button>

      <AnimatePresence>
        {isOpen && !disabled && (
          <>
            <div className="fixed inset-0 z-[110]" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.12 }}
              className={`absolute left-0 right-0 mt-1.5 max-h-60 overflow-y-auto rounded-xl shadow-2xl border p-1.5 z-[120] custom-scrollbar ${
                isDark ? 'bg-gray-800 border-gray-700 text-white shadow-black/50' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              {options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelect(opt)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    value === opt
                      ? (isDark ? 'bg-blue-600 text-white' : 'bg-emerald-50 text-emerald-600')
                      : (isDark ? 'hover:bg-gray-700 text-slate-300' : 'hover:bg-slate-50 text-slate-700')
                  }`}
                >
                  {opt}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductFormDrawer = ({ isOpen, onClose, editProduct, onSaveSuccess }) => {
  const { theme } = useThemeStore();
  const { adminToken } = useAdminAuthStore();
  const { showToast } = useToastStore();
  const isDark = theme === 'dark';
  const isEditMode = !!editProduct;

  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [specs, setSpecs] = useState([]);

  const [values, setValues] = useState({
    name: '',
    brand: '',
    category: '',
    subcategory: '',
    description: '',
    whatsappMessage: '',
    isActive: true,
  });

  const [errors, setErrors] = useState({});

  // Reset or set data when editProduct changes or drawer opens
  useEffect(() => {
    if (isOpen) {
      if (editProduct) {
        setValues({
          name: editProduct.name || '',
          brand: editProduct.brand || '',
          category: editProduct.category || '',
          subcategory: editProduct.subcategory || '',
          description: editProduct.description || '',
          whatsappMessage: editProduct.whatsappMessage || '',
          isActive: editProduct.isActive !== undefined ? editProduct.isActive : true,
        });
        setSpecs(editProduct.specifications || []);
        setExistingImages(editProduct.images || []);
        setSelectedFiles([]);
        setImagePreviews([]);
      } else {
        setValues({
          name: '',
          brand: '',
          category: '',
          subcategory: '',
          description: '',
          whatsappMessage: '',
          isActive: true,
        });
        setSpecs([]);
        setExistingImages([]);
        setSelectedFiles([]);
        setImagePreviews([]);
      }
      setErrors({});
    }
  }, [editProduct, isOpen]);

  // Auto-generate WhatsApp message helper
  const generateWhatsAppMessage = () => {
    const { name, category, subcategory } = values;
    if (name) {
      const cat = subcategory || category;
      const msg = `Hello SuperX Technology! 👋\n\nI am interested in *${name}*${cat ? ` (${cat})` : ''}.\n\nCould you please share the pricing and availability details?\n\nThank you!`;
      setValues(prev => ({ ...prev, whatsappMessage: msg }));
    } else {
      showToast("Required Field", "Please fill in the Product Name first!", "info");
    }
  };

  const validate = () => {
    const errs = {};
    if (!values.name.trim()) errs.name = 'Product name is required';
    if (!values.brand.trim()) errs.brand = 'Brand name is required';
    if (!values.category) errs.category = 'Category is required';
    if (!values.description.trim()) errs.description = 'Description is required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (name === 'category') {
      setValues(prev => ({ ...prev, category: value, subcategory: '' }));
    }
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const total = existingImages.length + selectedFiles.length + files.length;
    if (total > 5) return showToast("Limit Exceeded", "Maximum 5 images allowed", "error");
    setSelectedFiles(prev => [...prev, ...files]);
    setImagePreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
  };

  const removeExistingImage = (idx) => {
    setExistingImages(prev => prev.filter((_, i) => i !== idx));
  };

  const removeNewImage = (idx) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== idx));
    setImagePreviews(prev => prev.filter((_, i) => i !== idx));
  };

  const addSpec = () => setSpecs(prev => [...prev, { key: '', value: '' }]);
  const removeSpec = (idx) => setSpecs(prev => prev.filter((_, i) => i !== idx));
  const updateSpec = (idx, field, val) => {
    setSpecs(prev => prev.map((s, i) => i === idx ? { ...s, [field]: val } : s));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    if (!isEditMode && existingImages.length + selectedFiles.length === 0) {
      return showToast("Media Required", "Please upload at least one product image", "error");
    }

    setLoading(true);
    const formData = new FormData();

    Object.entries(values).forEach(([key, val]) => formData.append(key, val));
    formData.append('specifications', JSON.stringify(specs.filter(s => s.key.trim() && s.value.trim())));
    formData.append('existingImages', JSON.stringify(existingImages));
    selectedFiles.forEach(file => formData.append('images', file));

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {}),
        },
        withCredentials: true,
      };

      let res;
      if (isEditMode) {
        res = await AxiosInstance.put(`/admin/products/${editProduct._id}`, formData, config);
      } else {
        res = await AxiosInstance.post('/admin/products', formData, config);
      }

      if (res.data.success) {
        showToast('Inventory Updated', isEditMode ? 'Product details updated successfully!' : 'Product has been registered in the database!', 'success');
        onSaveSuccess();
        onClose();
      }
    } catch (err) {
      console.error(err);
      showToast('Upload Error', err?.response?.data?.message || 'Failed to save product information.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const labelCls = `text-xs font-bold block mb-1.5 uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`;
  const inputCls = `w-full px-4 py-2.5 rounded-xl border text-sm font-medium outline-none transition-all ${
    isDark
      ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500 placeholder-gray-500'
      : 'bg-white border-gray-400 text-gray-700 focus:border-emerald-500 focus:bg-white placeholder-gray-400'
  }`;

  const subcategories = values.category ? (CATEGORIES[values.category] || []) : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[100] transition-opacity"
          />

          {/* Right Sliding Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className={`fixed top-0 right-0 w-full max-w-[500px] h-full shadow-2xl z-[101] border-l transition-colors duration-300 overflow-y-auto custom-scrollbar ${
              isDark ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-100 text-gray-800'
            }`}
          >
            {/* Header */}
            <div className={`p-6 border-b flex items-center justify-between ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
              <div>
                <span className="text-[10px] font-black tracking-widest uppercase text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded">
                  {isEditMode ? 'Modify Registry' : 'New Product Registration'}
                </span>
                <h2 className="text-xl font-black mt-1.5">{isEditMode ? 'Edit Product Profile' : 'Register Product Asset'}</h2>
                <p className="text-xs opacity-60 mt-0.5">Define core properties, images, and parameters.</p>
              </div>
              <button
                onClick={onClose}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  isDark ? 'border-gray-800 hover:bg-gray-800 text-gray-400 hover:text-white' : 'border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-gray-900'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Body */}
            <div className="p-6 space-y-6">
              <form id="product-drawer-form" onSubmit={handleSubmit} className="space-y-5">
                
                {/* Product Name */}
                <div>
                  <label className={labelCls}>Product Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="e.g. CP Plus 5MP Dome IP Camera"
                    className={inputCls}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1 font-bold">{errors.name}</p>}
                </div>

                {/* Brand */}
                <div>
                  <label className={labelCls}>Brand / Lineup *</label>
                  <input
                    type="text"
                    name="brand"
                    value={values.brand}
                    onChange={handleChange}
                    placeholder="e.g. CP Plus, Hikvision, Dahua"
                    className={inputCls}
                  />
                  {errors.brand && <p className="text-red-500 text-xs mt-1 font-bold">{errors.brand}</p>}
                </div>

                {/* Category & Subcategory Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Category *</label>
                    <PremiumSelect
                      placeholder="Select Category"
                      value={values.category}
                      onChange={(val) => {
                        setValues(prev => ({ ...prev, category: val, subcategory: '' }));
                        if (errors.category) setErrors(prev => ({ ...prev, category: '' }));
                      }}
                      options={Object.keys(CATEGORIES)}
                      isDark={isDark}
                    />
                    {errors.category && <p className="text-red-500 text-xs mt-1 font-bold">{errors.category}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>Subcategory</label>
                    <PremiumSelect
                      placeholder="Select Subcategory"
                      value={values.subcategory}
                      onChange={(val) => setValues(prev => ({ ...prev, subcategory: val }))}
                      options={subcategories}
                      disabled={!values.category}
                      isDark={isDark}
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className={labelCls}>System Description *</label>
                  <textarea
                    name="description"
                    rows={4}
                    value={values.description}
                    onChange={handleChange}
                    placeholder="Provide details on features, specs, range, connectivity..."
                    className={inputCls}
                  />
                  {errors.description && <p className="text-red-500 text-xs mt-1 font-bold">{errors.description}</p>}
                </div>

                {/* WhatsApp Message Area */}
                <div className={`border-t pt-4 ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold flex items-center gap-1.5 uppercase tracking-wider opacity-70">
                      <FaWhatsapp className="w-4 h-4 text-green-900" />
                      WhatsApp Message Draft
                    </label>
                    <button
                      type="button"
                      onClick={generateWhatsAppMessage}
                      className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-lg cursor-pointer hover:bg-emerald-500/20 transition-all"
                    >
                      ✨ Auto-Draft
                    </button>
                  </div>
                  <textarea
                    name="whatsappMessage"
                    rows={3}
                    value={values.whatsappMessage}
                    onChange={handleChange}
                    placeholder="Custom text triggered when clicking WhatsApp Enquiry..."
                    className={inputCls}
                  />
                  <span className="text-[10px] opacity-40 block mt-1">This message text is loaded into client's WhatsApp on clicking the Enquiry button.</span>
                </div>

                {/* Technical Specifications */}
                <div className={`border-t pt-4 ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
                  <label className="text-xs font-bold flex items-center gap-1.5 mb-3 uppercase tracking-wider opacity-70">
                    <Cpu className="w-4 h-4 text-emerald-600" /> Core Parameters / Specifications
                  </label>
                  <div className="space-y-2">
                    {specs.map((spec, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Spec Key (e.g., Resolution)"
                          value={spec.key}
                          onChange={(e) => updateSpec(index, 'key', e.target.value)}
                          className={inputCls}
                        />
                        <input
                          type="text"
                          placeholder="Spec Value (e.g., 5MP)"
                          value={spec.value}
                          onChange={(e) => updateSpec(index, 'value', e.target.value)}
                          className={inputCls}
                        />
                        <button
                          type="button"
                          onClick={() => removeSpec(index)}
                          className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl cursor-pointer transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addSpec}
                      className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1.5 rounded-xl cursor-pointer hover:bg-emerald-500/20 transition-all"
                    >
                      <Plus className="w-4 h-4" /> Add Parameter Row
                    </button>
                  </div>
                </div>

                {/* Media Registry */}
                <div className={`border-t pt-4 ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
                  <label className="text-xs font-bold block mb-2 uppercase tracking-wider opacity-70">Media Assets (Max 5 total)</label>
                  <div className="flex flex-wrap gap-3">
                    {/* Add Photo Button */}
                    {(existingImages.length + selectedFiles.length) < 5 && (
                      <label className={`w-20 h-20 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500/50 transition-colors ${
                        isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
                      }`}>
                        <UploadCloud className="w-5 h-5 opacity-40 text-gray-400" />
                        <span className="text-[10px] opacity-40 font-bold mt-1">Add Photo</span>
                        <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                      </label>
                    )}

                    {/* Pre-existing images */}
                    {existingImages.map((src, i) => (
                      <div key={`existing-${i}`} className="relative w-20 h-20 group">
                        <img src={src} className="w-20 h-20 object-cover rounded-2xl border border-gray-200 dark:border-gray-700" alt="" />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(i)}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-red-600 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}

                    {/* New image previews */}
                    {imagePreviews.map((src, i) => (
                      <div key={`new-${i}`} className="relative w-20 h-20">
                        <img src={src} className="w-20 h-20 object-cover rounded-2xl border border-emerald-300" alt="" />
                        <button
                          type="button"
                          onClick={() => removeNewImage(i)}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-red-600 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability status toggle in form */}
                <div className={`border-t pt-4 flex items-center justify-between ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
                  <div>
                    <label className="text-xs font-bold block uppercase tracking-wider opacity-70">Catalog Visibility</label>
                    <p className="text-[10px] opacity-50 font-bold">Uncheck to hide product from the main catalog</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={values.isActive}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

              </form>
            </div>

            {/* Bottom Actions Footer */}
            <div className={`p-6 border-t flex gap-3 ${isDark ? 'border-gray-800 bg-gray-900' : 'border-gray-100 bg-gray-50'}`}>
              <button
                type="button"
                onClick={onClose}
                className={`flex-1 py-3 border text-xs font-bold rounded-xl transition-all cursor-pointer bg-white ${
                  isDark ? 'border-gray-700 hover:bg-gray-800 text-gray-400 bg-gray-800' : 'border-gray-200 hover:bg-gray-100'
                }`}
              >
                Abort Changes
              </button>
              <button
                type="submit"
                form="product-drawer-form"
                disabled={loading}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800/50 text-white text-xs font-black rounded-xl shadow-lg shadow-emerald-600/10 cursor-pointer transition-all hover:scale-[1.01]"
              >
                {loading ? 'Saving Changes...' : (isEditMode ? 'Save Expert Profile Changes' : 'Confirm Registration')}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductFormDrawer;
