import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const Catalogue = () => {
  const [data, setData] = React.useState([])
  React.useEffect(() => {
    fetch('/products.json')
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [])

  return (
    
    <div className='container mt-3'>
      List of all blog products.
      {data.map((element) =>
        <div key={element.id}>
          <Link to={`/products/${element.id}`}>{element.name}</Link>
        </div>)}
      <Outlet />
    </div>
  )
}

export default Catalogue