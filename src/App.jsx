import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/Home/HomePage.jsx'
import AboutPage from './pages/About/AboutPage.jsx'
import SupportPage from './pages/Support/SupportPage.jsx'
import AdminPage from './pages/Admin/AdminPage.jsx'
import AdminLoginPage from './pages/Admin/AdminLoginPage.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ProtectedAdminRoute from './components/ProtectedAdminRoute.jsx'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      
      {/* Navbar — admin routes par nahi dikhayenge */}
      {!isAdminPage && <Navbar />}
      
      {/* Main Content Area */}
      <div className="grow">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/support' element={<SupportPage />} />

          {/* Admin Login — public */}
          <Route path='/admin/login' element={<AdminLoginPage />} />

          {/* Admin Panel — protected */}
          <Route
            path='/admin'
            element={
              <ProtectedAdminRoute>
                <AdminPage />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </div>

      {/* Footer — admin routes par nahi dikhayenge */}
      {!isAdminPage && <Footer />}
    </div>
  )
}

export default App