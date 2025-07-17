import React from 'react'
import { useParams } from 'react-router-dom'
import QuantityAdjuster from '../QuantityAdjuster'
import './Product.scss'

const Product = () => {
  const { productId } = useParams()
  const [product, setProduct] = React.useState(null)

  React.useEffect(() => {
    fetch(`/admin/products/${productId}.json`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
  }, [])

  return (
    <div className='container py-5'>
      {product
        ? (
          <div className='row'>
            <div className='col-md-6 mb-4'>
              <img
                src={`/${product.code}.svg`}
                alt={product.name}
                className='img-fluid product-image'
              />
            </div>

            <div className='col-md-6 d-flex flex-column'>
              <h1>{product.name}</h1>
              <h3 className='text-success' data-testid='item-price'>€{product.price}</h3>
              <p className='mt-3 flex-grow-1'>{product.description}</p>

              <p className="alert alert-success" role="alert">{product.promotion.description}</p>

              <p className='text-muted fw-semibold mb-2'>Select quantity to add to cart:</p>
              <QuantityAdjuster product={product} />
            </div>
          </div>
          )
        : (
          <p>Product not yet available</p>
          )}
    </div>
  )
}

export default Product
