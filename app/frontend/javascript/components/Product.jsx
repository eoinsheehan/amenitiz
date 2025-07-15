import React from 'react'
import { useParams } from 'react-router-dom'

const Product = () => {
  const { productId } = useParams()
  const [product, setProduct] = React.useState(null)
  const [amount, setAmount] = React.useState(0)

  React.useEffect(() => {
    fetch(`/products/${productId}.json`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
  }, [productId])

  React.useEffect(() => {
    if (!product?.code) return // wait for product to load

    const cartJSON = localStorage.getItem('cart')
    const cart = cartJSON ? JSON.parse(cartJSON) : { items: [] }

    const item = cart.items.find(item => item.code === product.code)
    setAmount(item?.quantity || 0)
  }, [product])

  const updateCartItem = (product, operation) => {
    if (!product?.code || !product?.price) return

    const cartJSON = localStorage.getItem('cart')
    const cart = cartJSON ? JSON.parse(cartJSON) : { items: [] }

    const existingItem = cart.items.find(item => item.code === product.code)

    if (operation === 'increase') {
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        cart.items.push({
          code: product.code,
          cost: product.price,
          quantity: 1
        })
      }
    } else if (operation === 'decrease') {
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1
        } else {
        // Remove item if quantity is 1 or less
          cart.items = cart.items.filter(item => item.code !== product.code)
        }
      }
    }

    localStorage.setItem('cart', JSON.stringify(cart))

    // Return new quantity (optional)
    const updatedItem = cart.items.find(item => item.code === product.code)
    return updatedItem?.quantity || 0
  }

  const handleIncrease = () => {
    const newQty = updateCartItem(product, 'increase')
    setAmount(newQty)
  }

  const handleSubtract = () => {
    const newQty = updateCartItem(product, 'decrease')
    setAmount(newQty)
  }

  return (
    <div>
      <div className='container py-5'>
        {product
          ? (
            <div>
              <h1>{product.name}</h1>

              <h1>{product.price}</h1>

              <h1>{product.description}</h1>
              <p><strong>Amount:</strong> {amount}</p>
              <button onClick={handleSubtract}>Subtract</button>
              <button onClick={handleIncrease}>Increase</button>
            </div>

            )
          : (
              'Product not yet available'
            )}
      </div>
    </div>
  )
}

export default Product
