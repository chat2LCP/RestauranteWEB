import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router'
// import axios from 'axios'

import './Products.css'
// import ProductsProvider from '../../providers/ProductsProvider'
import CardsProduct from './CardsProduct'

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
            <h1>Barra de pesquisa</h1>

            {prodType? (
                <div>
                    <div>tem parâmetro: {prodType}</div>
                    <Outlet></Outlet>
                </div>        
            ) : (
                <div>chamar a pagina com todos os prods</div>
            )}

            

            {/* {products.map((prod) => {
                console.log('pro:'+prod.title)
                return []      
            })} */}            
        </div>
    )
}

export default Products
