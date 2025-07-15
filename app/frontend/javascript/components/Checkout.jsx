import React from 'react'

const Checkout = () => {
  const [status, setStatus] = React.useState('Loading...')
  const [total, setTotal] = React.useState(null)
  const [items, setItems] = React.useState([])
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}')

      // Don't send request if cart is empty or has no items
  if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
    setStatus('Checkout complete')
    setItems([]) // explicitly set empty items
    setTotal(0)
    return
  }

    const token = document.querySelector('meta[name="csrf-token"]')?.content

    fetch('/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
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
        setItems(data.items || [])  // Capture items array
        setStatus('Checkout complete')
      })
      .catch(err => {
        console.error('Checkout error:', err)
        setError('Checkout failed. Please try again.')
        setStatus('Error')
      })
  }, [])

  return (
    <div className="container mt-4">
      <h2>Checkout Summary</h2>

      {status === 'Loading...' && <p>Processing checkout...</p>}

      {status === 'Checkout complete' && (
        <>
          <h4>Items:</h4>
          {items.length === 0 ? (
            <p>No items in checkout.</p>
          ) : (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Cost</th>
                  <th>Quantity</th>
                  {/* Add more columns if needed */}
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.code}</td>
                    <td>${item.cost}</td>
                    <td>{item.quantity}</td>
                    {/* Add more attributes as needed */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <p id="total-cost"><strong>Total cost:</strong> ${total}</p>

        </>
      )}

      {error && <p className="text-danger">{error}</p>}
    </div>
  )
}

export default Checkout
