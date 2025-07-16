import React from 'react'
import { useParams } from 'react-router-dom'
import QuantityAdjuster from '../QuantityAdjuster'

const Product = () => {
  const { productId } = useParams()
  const [product, setProduct] = React.useState(null)

  React.useEffect(() => {
    fetch(`/products/${productId}.json`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
  }, [])

  return (
    <div>
      <div className='container py-5'>
        {product
          ? (
            <div>
              <h1>{product.name}</h1>

              <h1>{product.price}</h1>

              <h1>{product.description}</h1>
              <QuantityAdjuster product={product} />
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
