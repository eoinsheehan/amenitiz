import React, { useEffect, useState } from 'react'

const QuantityAdjuster = ({ product, updateCartVersion = () => {} }) => {
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    if (!product?.code) return

    const cartJSON = localStorage.getItem('cart')
    const cart = cartJSON ? JSON.parse(cartJSON) : { items: [] }

    const item = cart.items.find(item => item.code === product.code)
    setAmount(item?.quantity || 0)
  }, [product])

  const updateCartItem = (operation) => {
    if (!product?.code) return

    const cartJSON = localStorage.getItem('cart')
    const cart = cartJSON ? JSON.parse(cartJSON) : { items: [] }

    const existingItem = cart.items.find(item => item.code === product.code)

    if (operation === 'increase') {
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        cart.items.push({
          name: product.name,
          code: product.code,
          price: product.price,
          quantity: 1
        })
      }
    } else if (operation === 'decrease') {
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1
        } else {
          cart.items = cart.items.filter(item => item.code !== product.code)
        }
      }
    }

    localStorage.setItem('cart', JSON.stringify(cart))

    const updatedItem = cart.items.find(item => item.code === product.code)
    const newQty = updatedItem?.quantity || 0
    setAmount(newQty)
    updateCartVersion()
    updateCartVersion(prev => prev + 1)
  }

  return (
    <div>
      <p>Quantity: {amount}</p>
      <button onClick={() => updateCartItem('decrease')}>Reduce</button>
      <button onClick={() => updateCartItem('increase')}>Add</button>
    </div>
  )
}

export default QuantityAdjuster
