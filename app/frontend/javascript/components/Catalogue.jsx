import React from 'react';
import { Outlet } from 'react-router-dom'

const Catalogue = () =>  {
  return (
    <div>
        <h1>Catalogue of items</h1>
        <Outlet />
    </div>
    );
}

export default Catalogue