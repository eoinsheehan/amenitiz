import React from 'react'
import CartItem from './CartItem'
import CheckoutTotals from './CheckoutTotals'

const Checkout = () => {
  const [status, setStatus] = React.useState('Loading...')
  const [items, setItems] = React.useState([])
  const [cartVersion, setCartVersion] = React.useState(0)

  const updateCartVersion = () => {
    setCartVersion(version => version + 1)
  }

  React.useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}')

    if (cart || !cart.items.length === 0) {
      setStatus('Checkout complete')
      setItems(cart.items)
    }
  }, [])

  return (
    <div className='container mt-4'>
      <h2>Welcome to the checkout</h2>

      {status === 'Loading...' && <p>Processing checkout...</p>}

      {status === 'Checkout complete' && (
        <>
          {items.length === 0
            ? (
              <p>No items in checkout.</p>
              )
            : (
              <div>
                <h3>Here are all the items in your cart</h3>
                {items.map((item, idx) => <CartItem key={idx} item={item} updateCartVersion={updateCartVersion} />)}
              </div>
              )}
          <div><CheckoutTotals cartVersion={cartVersion} /></div>
        </>
      )}
    </div>
  )
}

export default Checkout
