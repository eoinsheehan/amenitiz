import React from 'react'

const CartItem = ({ item }) => {
  
  return (
    <div data-testid="cart-item">
      <p>Code: {item.code}</p>
      <p>Cost: ${item.cost}</p>
      <p>{`Quantity: ${item.quantity}`}</p>
    </div>
  )
}

export default CartItem
