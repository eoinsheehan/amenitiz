import React from 'react'

const CheckoutSummary = (cartVersion) => {
  const [status, setStatus] = React.useState('Loading...')
  const [total, setTotal] = React.useState(null)
  const [items, setItems] = React.useState([])
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}')

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

      body: JSON.stringify({ checkout: cart })
    })
      .then(res => {
        if (!res.ok) throw new Error('Checkout failed')
        return res.json()
      })
      .then(data => {
        setTotal(data.total_cost)
        setItems(data.items || [])
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
      <h2>Checkout Summary</h2>

      {status === 'Loading...' && <p>Processing checkout...</p>}

      {status === 'Checkout complete' && (
        <>
          {items.length === 0
            ? (
              <p>No items in checkout.</p>
              )
            : (
              <div>
                <div className='row fw-semibold border-bottom pb-2 mb-2'>
                  <div className='col-8'>Product</div>
                  <div className='col-4 text-end'>Cost</div>
                </div>

                {items.map((item, idx) => (
                  <div className='row align-items-center mb-2' key={idx}>
                    <div className='col-8'>
                      {item.name} x{item.quantity}
                    </div>
                    <div className='col-4 text-end'>€{item.cost.toFixed(2)}</div>
                  </div>
                ))}

                <div className='row fw-bold border-top pt-2 mt-3'>
                  <div className='col-8'>Total cost:</div>
                  <div className='col-4 text-end' id='total-cost'>€{total.toFixed(2)}</div>
                </div>
              </div>
              )}
        </>
      )}

      {error && <p className='text-danger'>{error}</p>}
    </div>

  )
}

export default CheckoutSummary
