import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import './Catalogue.scss';

const Catalogue = () => {
  const [data, setData] = React.useState([])
  React.useEffect(() => {
    fetch('/admin/products.json')
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [])

  return (

    <div className="container mt-3">
      <h2>List of all products</h2>
      <div className="row">
        {data.map((element) => (
          <div key={element.id} className="col-md-4 mb-3">
             <div className="card flex-row position-relative h-100 catalogue-card shadow cursor-pointer transition-transform">
              <img
                src={`${element.code}.png`}
                className="card-img-left catalogue-card-img"
                alt={element.name}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{element.name}</h5>
                <p className="card-text">${element.price.toFixed(2)}</p>
                <div className="mt-auto"></div>
              </div>
              <Link
                to={`/products/${element.id}`}
                className="stretched-link"
                aria-label={`View details for ${element.name}`}
              />
              <div className="catalogue-arrow">►</div>
            </div>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  )
}

export default Catalogue
