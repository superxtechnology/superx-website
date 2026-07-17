import React from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const WHATSAPP_NUMBER = '918743011865';

const CATEGORY_COLORS = {
  'IP Camera': 'from-blue-500 to-cyan-500',
  'HD Camera': 'from-purple-500 to-pink-500',
  'DVR / NVR': 'from-orange-500 to-red-500',
  'CCTV Wire & Cable': 'from-green-500 to-teal-500',
  'CP Plus Camera': 'from-indigo-500 to-violet-500',
  'Accessories': 'from-yellow-500 to-amber-500',
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ProductCard = ({ product }) => {
  const handleEnquiry = () => {
    const message = product.whatsappMessage ||
      `Hello SuperX Technology! 👋\n\nI am interested in *${product.name}*.\n\nCould you please share the pricing and availability?\n\nThank you!`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
  };

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-slate-100 to-blue-50 overflow-hidden">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Camera className="w-16 h-16 text-blue-200" />
          </div>
        )}
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className={`text-[10px] font-black uppercase tracking-wider text-white px-2.5 py-1 rounded-full bg-gradient-to-r ${CATEGORY_COLORS[product.category] || 'from-blue-500 to-indigo-500'} shadow-lg`}>
            {product.subcategory || product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex-grow">
          <p className="text-xs font-semibold text-blue-500 mb-1">{product.brand}</p>
          <h3 className="font-black text-gray-900 text-base leading-snug mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">{product.description}</p>

          {/* Specs preview */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {product.specifications.slice(0, 3).map((spec, i) => (
                <span key={i} className="text-[10px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">
                  {spec.key}: {spec.value}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Enquiry Button */}
        <button
          id={`enquire-btn-${product._id}`}
          onClick={handleEnquiry}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5a] text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-md shadow-green-500/20 hover:shadow-green-500/40 cursor-pointer"
        >
          <FaWhatsapp className="w-4 h-4" />
          Enquire on WhatsApp
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
