import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Catalogue from './Catalogue.jsx'
import Product from './Product.jsx'
import Checkout from './Checkout.jsx'

const App = () => {
  return (
    <>
    <nav>
        <Link to="/">Home</Link> |
        <Link to="/checkout">Checkout</Link>
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