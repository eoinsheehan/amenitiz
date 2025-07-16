import React from 'react'

const CheckoutTotals = (cartVersion) => {
  const [status, setStatus] = React.useState('Loading...')
  const [total, setTotal] = React.useState(null)
  const [items, setItems] = React.useState([])
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}')

    // Don't send request if cart is empty or has no items
    if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
      setStatus('Checkout complete')
      setItems([])
      setTotal(0)
      return
    }

    const token = document.querySelector('meta[name="csrf-token"]')?.content

    fetch('/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRF-Token': token
      },
      body: JSON.stringify(cart)
    })
      .then(res => {
        if (!res.ok) throw new Error('Checkout failed')
        return res.json()
      })
      .then(data => {
        setTotal(data.total_cost)
        setItems(data.items || []) // Capture items array
        setStatus('Checkout complete')
      })
      .catch(err => {
        console.error('Checkout error:', err)
        setError('Checkout failed. Please try again.')
        setStatus('Error')
      })
  }, [cartVersion])

  return (
    <div className='container mt-4'>
      <h2>And here is what they are coming to</h2>

      {status === 'Loading...' && <p>Processing checkout...</p>}

      {status === 'Checkout complete' && (
        <>
          {items.map((item, idx) => {
            return <p key={idx}>{item.name} x{item.quantity} is costing you {item.cost}</p>
          })}
          <p id='total-cost'><strong>Total cost:</strong> ${total}</p>

        </>
      )}

      {error && <p className='text-danger'>{error}</p>}
    </div>
  )
}

export default CheckoutTotals
