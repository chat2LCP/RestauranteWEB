import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

import './Carousel.scss'
import { fetchProducts } from '../../providers/fetch-products-provider'

function Carousel() {

    const [data, setData] = useState([])
    const carousel = useRef(null)

    useEffect(() => {
        fetchProducts('http://localhost:3000/static/prods.json')
        .then(setData)
        .catch(console.error)
    }, [])

    //caso não tenha conseguido carregar os dados dos cards, não renderiza o carrossel na tela
    if(!data || !data.length){
        return null
    }

    const handleLeftClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft -= carousel.current.offsetWidth
    }

    const handleRightClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft += carousel.current.offsetWidth
    }

    return(
        <div className="carousel-container">
            <div className="carousel" ref={carousel}>
                {data.map((item) => {
                    const {id, description, price, oldPrice, image}  = item

                    return (
                        <div className="item" key={id}>
                            <Link to={`/products/${id}`} >
                                <div className="image">
                                    <img src={image} alt={description}></img>
                                </div>

                                <div className="info">
                                    <span className="name">{description}</span>
                                    <span className="old-price">U$ {oldPrice}</span>
                                    <span className="price">U$ {price}</span>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>

            <div className="btn-scroll-card left" onClick={handleLeftClick} role="button"></div>
            <div className="btn-scroll-card right" onClick={handleRightClick} role="button"></div>
        </div>
    )
}

export default Carousel