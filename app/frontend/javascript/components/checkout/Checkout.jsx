import React from 'react'
import CartItem from './CartItem'
import CheckoutTotals from './CheckoutTotals'

const Checkout = () => {
  const [status, setStatus] = React.useState('Loading...')
  const [items, setItems] = React.useState([])

  React.useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}')

    if (cart || !cart.items.length === 0) {
      setStatus('Checkout complete')
      setItems(cart.items)
    }
  }, [])

  return (
    <div className='container mt-4'>
      <h2>Checkout Summary</h2>

      {status === 'Loading...' && <p>Processing checkout...</p>}

      {status === 'Checkout complete' && (
        <>
          <h4>Items:</h4>
          {items.length === 0
            ? (
              <p>No items in checkout.</p>
              )
            : (
              <div>

                  {items.map((item, idx) => <CartItem key={idx} item={item} /> )}
                  </div>
              )}
          <div><CheckoutTotals/></div>
        </>
      )}
    </div>
  )
}

export default Checkout
