import React, { useState } from 'react';
import useThemeStore from '../../store/themeStore';
import useToastStore from '../../store/toastStore';
import AdminHeader from './components/AdminHeader';
import AllProductTable from './components/AllProductTable';
import ProductFormDrawer from './components/ProductFormDrawer';
import Toast from '../../components/Toast';

const AdminPage = () => {
  const { theme } = useThemeStore();
  const { toast: activeToast, hideToast } = useToastStore();
  const [activeTab, setActiveTab] = useState('products');
  const [currentView, setCurrentView] = useState('list'); // 'list' | 'add-product' | 'edit-product'
  const [editingProduct, setEditingProduct] = useState(null);

  const isDark = theme === 'dark';

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setCurrentView('edit-product');
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setCurrentView('add-product');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setEditingProduct(null);
  };

  // We can force AllProductTable to refresh when a product is saved successfully.
  // One way is to trigger a refresh counter key inside AllProductTable.
  const [refreshCounter, setRefreshCounter] = useState(0);
  const handleSaveSuccess = () => {
    setRefreshCounter(prev => prev + 1);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Global custom Toast alert display */}
      <Toast toast={activeToast} onClose={hideToast} />

      {/* Admin Topbar */}
      <AdminHeader
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setCurrentView('list');
          setEditingProduct(null);
        }}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        
        {activeTab === 'products' && (
          <>
            {/* The main table remains in background */}
            <div className={currentView !== 'list' ? 'blur-xs pointer-events-none' : ''}>
              <AllProductTable
                key={refreshCounter}
                onAddProductClick={handleAddProduct}
                onEditProduct={handleEditProduct}
              />
            </div>

            {/* Sliding Drawer overlay */}
            <ProductFormDrawer
              isOpen={currentView !== 'list'}
              onClose={handleBackToList}
              editProduct={editingProduct}
              onSaveSuccess={handleSaveSuccess}
            />
          </>
        )}

      </main>
    </div>
  );
};

export default AdminPage;