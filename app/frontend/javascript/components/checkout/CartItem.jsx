import React from 'react'
import QuantityAdjuster from '../QuantityAdjuster'

const CartItem = ({ item, updateCartVersion }) => {
  return (

<div className="row g-3">
  <div className="col-md-9" data-testid="cart-item">
    <div className="card shadow-sm h-100">
      <div className="row g-0 align-items-center">
        {/* Left: Product Image */}
        <div className="col-md-4">
          <img
            src={`/${item.code}.png`}
            className="img-fluid rounded-start"
            alt={item.name}
          />
        </div>

        {/* Right: Item details */}
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <p className="card-text text-muted mb-2">
              Price: <strong>${item.price}</strong>
            </p>

            <QuantityAdjuster
              product={item}
              updateCartVersion={updateCartVersion}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



  )
}

export default CartItem




