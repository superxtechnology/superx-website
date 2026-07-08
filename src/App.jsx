import React from 'react'
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/Home/HomePage.jsx'
import AboutPage from './pages/About/AboutPage.jsx'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/admin' element={<h1>Admin</h1>} />
      </Routes>
    </div>
  )
}

export default App
