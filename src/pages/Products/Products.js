import React from 'react'
import './Products.css'

import { Outlet } from 'react-router-dom'
import CardProducts from './CardsProducts'

function Products() {
  
    return(
        <div className="products-container">
            <CardProducts />

            <Outlet/>
        </div> 
    )
}

export default Products
