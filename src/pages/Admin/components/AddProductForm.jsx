import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Trash2, Cpu, UploadCloud, MessageSquare, X } from "lucide-react";
import useThemeStore from "../../../store/ThemeStore";
import useAdminAuthStore from "../../../store/adminAuthStore";
import AxiosInstance from "../../../api/AxiosInstance";
import { toast } from "react-hot-toast";

const CATEGORIES = {
  "IP Camera": ["Indoor IP Camera", "Outdoor IP Camera", "PTZ Camera", "Fisheye Camera"],
  "HD Camera": ["Bullet Camera", "Dome Camera", "Varifocal Camera", "Box Camera"],
  "DVR / NVR": ["4 Channel DVR", "8 Channel DVR", "16 Channel DVR", "NVR", "Standalone DVR"],
  "CCTV Wire & Cable": ["Coaxial Cable", "Cat6 Cable", "Power Cable", "HDMI Cable"],
  "CP Plus Camera": ["CP Plus Bullet", "CP Plus Dome", "CP Plus PTZ", "CP Plus IP"],
  "Accessories": ["Power Supply", "Hard Disk", "BNC Connector", "Junction Box", "CCTV Stand", "UPS"],
};

const AddProductForm = ({ onBackClick, editProduct }) => {
  const { theme } = useThemeStore();
  const { adminToken } = useAdminAuthStore();
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
  });

  const [errors, setErrors] = useState({});

  // Edit mode mein form pre-fill karo
  useEffect(() => {
    if (editProduct) {
      setValues({
        name: editProduct.name || '',
        brand: editProduct.brand || '',
        category: editProduct.category || '',
        subcategory: editProduct.subcategory || '',
        description: editProduct.description || '',
        whatsappMessage: editProduct.whatsappMessage || '',
      });
      setSpecs(editProduct.specifications || []);
      setExistingImages(editProduct.images || []);
      setImagePreviews([]);
    }
  }, [editProduct]);

  // Auto-generate WhatsApp message
  const generateWhatsAppMessage = () => {
    const { name, category, subcategory } = values;
    if (name) {
      const cat = subcategory || category;
      const msg = `Hello SuperX Technology! 👋\n\nI am interested in *${name}*${cat ? ` (${cat})` : ''}.\n\nCould you please share the pricing and availability details?\n\nThank you!`;
      setValues(prev => ({ ...prev, whatsappMessage: msg }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!values.name.trim()) errs.name = 'Product name required';
    if (!values.brand.trim()) errs.brand = 'Brand required';
    if (!values.category) errs.category = 'Category required';
    if (!values.description.trim()) errs.description = 'Description required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (name === 'category') {
      setValues(prev => ({ ...prev, category: value, subcategory: '' }));
    }
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const total = existingImages.length + selectedFiles.length + files.length;
    if (total > 5) return toast.error("Maximum 5 images allowed");
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
      return toast.error("Please upload at least one product image");
    }

    setLoading(true);
    const formData = new FormData();

    Object.entries(values).forEach(([key, val]) => formData.append(key, val));
    formData.append('specifications', JSON.stringify(specs.filter(s => s.key && s.value)));
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
        toast.success(isEditMode ? 'Product updated successfully!' : 'Product added successfully!');
        onBackClick();
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = `w-full px-4 py-2.5 rounded-xl border text-sm font-medium outline-none transition-all ${
    isDark
      ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500 placeholder-gray-500'
      : 'bg-gray-50 border-gray-200 focus:border-blue-500 focus:bg-white placeholder-gray-400'
  }`;

  const subcategories = values.category ? (CATEGORIES[values.category] || []) : [];

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBackClick}
          className={`p-2 rounded-xl border cursor-pointer ${isDark ? 'border-gray-800 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-100'}`}
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-xl font-black">{isEditMode ? 'Edit Product' : 'Add New Product'}</h2>
          <p className="text-xs opacity-60">{isEditMode ? `Editing: ${editProduct.name}` : 'Add a new CCTV product to the catalog'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Row 1: Name & Brand */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold block mb-1 opacity-70">Product Name *</label>
            <input type="text" name="name" value={values.name} onChange={handleChange} placeholder="e.g. CP Plus 5MP Bullet Camera" className={inputCls} />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="text-xs font-bold block mb-1 opacity-70">Brand *</label>
            <input type="text" name="brand" value={values.brand} onChange={handleChange} placeholder="e.g. CP Plus, Hikvision, Dahua" className={inputCls} />
            {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand}</p>}
          </div>
        </div>

        {/* Row 2: Category & Subcategory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold block mb-1 opacity-70">Category *</label>
            <select name="category" value={values.category} onChange={handleChange} className={inputCls}>
              <option value="">Select Category</option>
              {Object.keys(CATEGORIES).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>
          <div>
            <label className="text-xs font-bold block mb-1 opacity-70">Subcategory</label>
            <select name="subcategory" value={values.subcategory} onChange={handleChange} disabled={!values.category} className={`${inputCls} ${!values.category ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <option value="">Select Subcategory</option>
              {subcategories.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-xs font-bold block mb-1 opacity-70">Product Description *</label>
          <textarea
            name="description"
            rows={4}
            value={values.description}
            onChange={handleChange}
            placeholder="Describe the product features, specifications, use-cases..."
            className={inputCls}
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>

        {/* WhatsApp Message */}
        <div className={`border-t pt-4 ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold flex items-center gap-1.5 opacity-70">
              <MessageSquare className="w-4 h-4 text-green-500" />
              WhatsApp Enquiry Message
            </label>
            <button
              type="button"
              onClick={generateWhatsAppMessage}
              className="text-xs font-bold text-blue-500 bg-blue-500/10 px-3 py-1 rounded-lg cursor-pointer hover:bg-blue-500/20 transition-colors"
            >
              ✨ Auto-Generate
            </button>
          </div>
          <textarea
            name="whatsappMessage"
            rows={3}
            value={values.whatsappMessage}
            onChange={handleChange}
            placeholder="Custom message sent on WhatsApp when customer clicks Enquire button..."
            className={inputCls}
          />
          <p className="text-[10px] opacity-40 mt-1">This message will be pre-filled when customer clicks the Enquire button on the product.</p>
        </div>

        {/* Technical Specifications */}
        <div className={`border-t pt-4 ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
          <label className="text-xs font-bold flex items-center gap-1.5 mb-3 opacity-70">
            <Cpu className="w-4 h-4" /> Technical Specifications
          </label>
          <div className="space-y-2">
            {specs.map((spec, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Key (e.g. Resolution)"
                  value={spec.key}
                  onChange={(e) => updateSpec(index, 'key', e.target.value)}
                  className={inputCls}
                />
                <input
                  type="text"
                  placeholder="Value (e.g. 5MP)"
                  value={spec.value}
                  onChange={(e) => updateSpec(index, 'value', e.target.value)}
                  className={inputCls}
                />
                <button
                  type="button"
                  onClick={() => removeSpec(index)}
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg cursor-pointer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSpec}
              className="flex items-center gap-1.5 text-xs font-bold text-blue-500 bg-blue-500/10 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-blue-500/20 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Specification
            </button>
          </div>
        </div>

        {/* Images */}
        <div className={`border-t pt-4 ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
          <label className="text-xs font-bold block mb-2 opacity-70">Product Images (Max 5 total)</label>
          <div className="flex flex-wrap gap-3">
            {/* Upload button */}
            {(existingImages.length + selectedFiles.length) < 5 && (
              <label className={`w-20 h-20 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500/50 transition-colors ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                <UploadCloud className="w-5 h-5 opacity-50" />
                <span className="text-[10px] opacity-50 mt-1">Upload</span>
                <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            )}

            {/* Existing images (edit mode) */}
            {existingImages.map((src, i) => (
              <div key={`existing-${i}`} className="relative w-20 h-20">
                <img src={src} className="w-20 h-20 object-cover rounded-xl border border-gray-200 dark:border-gray-700" alt="" />
                <button
                  type="button"
                  onClick={() => removeExistingImage(i)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center cursor-pointer shadow-md"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}

            {/* New image previews */}
            {imagePreviews.map((src, i) => (
              <div key={`new-${i}`} className="relative w-20 h-20">
                <img src={src} className="w-20 h-20 object-cover rounded-xl border border-blue-300" alt="" />
                <button
                  type="button"
                  onClick={() => removeNewImage(i)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center cursor-pointer shadow-md"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? (isEditMode ? 'Updating Product...' : 'Uploading Product...')
            : (isEditMode ? '✏️ Update Product' : '🚀 Add Product to Catalog')
          }
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;