import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router'
// import axios from 'axios'

import './Products.scss'
// import ProductsProvider from '../../providers/ProductsProvider'
// import CardsProduct from './CardsProduct'
import SearchNavigateBar from '../../components/SearchNavigateBar/SearchNavigateBar'
import Carousel from '../../components/Carousel/Carousel'

function Products() {

    const { prodType } = useParams()
    // const [products, setProducts] = useState([])
    
    useEffect(() => {
        //comentei esse trecho para não ficar dando erro por que o servidor não está ligado para poder fazer o GET
        // axios.get('http://localhost:5000/products?_embed=comments') //_embed=comments faz a junção dos produtos com seus comentários
        // .then((response) => {
        //     setProducts(response.data)
        // })  

        //essa linha abaixo é uma tentativa de chamar o método acima por meio de um service (ProductsProvider) mas nao deu certo ainda
        // setProducts(ProductsProvider.getProducts())

    },[]) //[] para que esse useEffect só seja executado 1 vez (quando o componente for montado)
    
    //  console.log("prods: "+products)

    return(
        <div className="products-container">

            <SearchNavigateBar/>

            {prodType? (
                <div>
                    <div>tem parâmetro: {prodType}</div>
                    <Outlet></Outlet>
                </div>        
            ) : (
                <div className='all-products-container'>
                    <Carousel />

                    
                </div>
            )}

            

            {/* {products.map((prod) => {
                console.log('pro:'+prod.title)
                return []      
            })} */}            
        </div>
    )
}

export default Products
