import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Catalogue from './catalogue/Catalogue.jsx'
import Product from './product/Product.jsx'
import Checkout from './checkout/Checkout.jsx'
// Import our custom CSS
import '../../stylesheets/application.scss'
// Import all of Bootstrap's JS
import 'bootstrap'

const App = () => {
  return (
    <>
      <nav className='navbar bg-dark bg-opacity-75 text-white shadow-sm mb-4'>
        <div className='container d-flex justify-content-between align-items-center'>
          <Link className='navbar-brand text-white' to='/'>Home</Link>
          <Link to='/checkout' className='btn btn-light'>
            Checkout
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path='/' element={<Catalogue />} />
        <Route path='products/:productId' element={<Product />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
    </>
  )
}

export default App
