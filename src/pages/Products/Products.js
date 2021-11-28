import React from 'react'
import { useParams } from 'react-router'
import { Outlet } from 'react-router-dom'

import './Products.css'
import CardProducts from './CardsProducts'

function Products() {

    const {product} = useParams()
  
    return(
        <div className="products-container">

            {product && <div>ID: {product}</div>}

            <CardProducts />

            <Outlet/>
        </div> 
    )
}

export default Products
