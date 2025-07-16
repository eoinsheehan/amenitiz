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
<div className="d-flex align-items-center gap-2">
  <button
    className="btn btn-outline-secondary btn-sm"
    onClick={() => updateCartItem('decrease')}
    aria-label="Decrease quantity"
    data-testid="remove-item"
  >
    −
  </button>

  <div className="px-3 py-1 border rounded bg-light text-center fw-semibold" data-testid="item-quantity">
    {amount}
  </div>

  <button
    className="btn btn-outline-primary btn-sm"
    onClick={() => updateCartItem('increase')}
    aria-label="Increase quantity"
    data-testid="add-item"
  >
    +
  </button>
</div>

  )
}

export default QuantityAdjuster


