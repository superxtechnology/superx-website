import React, { useState, useEffect } from 'react';
import AxiosInstance from '../../api/AxiosInstance';

// Import subcomponents
import Hero from './components/Hero';
import CategoryList from './components/CategoryList';
import ProductGrid from './components/ProductGrid';
import WhyChoose from './components/WhyChoose';
import ContactCTA from './components/ContactCTA';

const WHATSAPP_NUMBER = '918743011865';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await AxiosInstance.get('/admin/products/public');
        if (res.data.success) {
          const prods = res.data.products || [];
          setProducts(prods);
          // Extract unique categories
          const cats = ['All', ...new Set(prods.map(p => p.category).filter(Boolean))];
          setCategories(cats);
        }
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = !searchQuery ||
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subcategory?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleWhatsAppContact = () => {
    const msg = encodeURIComponent('Hello SuperX Technology! 👋\n\nI would like to know more about your CCTV products and installation services.');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  const handleBrowseProducts = () => {
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <Hero
        onBrowseProducts={handleBrowseProducts}
        onWhatsAppContact={handleWhatsAppContact}
      />

      {/* 2. Categories Section */}
      <CategoryList
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          handleBrowseProducts();
        }}
      />

      {/* 3. Product Grid */}
      <ProductGrid
        loading={loading}
        filteredProducts={filteredProducts}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        categories={categories}
      />

      {/* 4. Why Choose Us Section */}
      <WhyChoose />

      {/* 5. CTA Section */}
      <ContactCTA
        onWhatsAppContact={handleWhatsAppContact}
      />
    </div>
  );
};

export default HomePage;