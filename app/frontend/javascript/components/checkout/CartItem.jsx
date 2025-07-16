import React from 'react'
import QuantityAdjuster from '../QuantityAdjuster'

const CartItem = ({ item }) => {
  
  return (
    <div data-testid="cart-item">
      <p>Code: {item.code}</p>
      <p>Price: ${item.price}</p>
      <QuantityAdjuster product={item}/>
    </div>
  )
}

export default CartItem
