import React from 'react'
import Navbar from '../../components/Navbar' 
import Footer from '../../components/Footer'

const HomePage = () => {
  return (
    // min-h-screen aur flex-col se footer humesha bottom mein locked rahega
    <div className="min-h-screen flex flex-col bg-white">
      
      {/* 1. Header Navigation */}
      <Navbar />
      
      {/* 2. Main Content Area (Beech ka hissa) */}
      <main className="flex-grow pt-20">
        {/* Hero Section placeholder - yahan se hum beech ka hissa banana shuru karenge */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#1e293b] tracking-tight mb-6">
            Secure Your Assets With <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">Next-Gen Tech</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10">
            Premium IP cameras, smart automation, and professional setup engineered for ultimate security.
          </p>
        </div>
      </main>
      
      {/* 3. Footer Section */}
      <Footer />
      
    </div>
  )
}

export default HomePage