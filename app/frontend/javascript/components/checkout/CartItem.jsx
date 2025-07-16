import React from 'react'
import QuantityAdjuster from '../QuantityAdjuster'

const CartItem = ({ item, updateCartVersion }) => {
  return (
    <div data-testid='cart-item'>
      <p>Name: {item.name}</p>
      <p>Price: ${item.price}</p>
      <QuantityAdjuster product={item} updateCartVersion={updateCartVersion} />
    </div>
  )
}

export default CartItem
