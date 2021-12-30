import { useEffect, useState, useRef } from 'react'

import './Carousel.scss'

function Carousel() {

    const [data, setData] = useState([])
    const carousel = useRef(null)

    useEffect(() => {
        //fetch é uma API JavaScript que funciona como o axios, para fazer requisições HTTP
        fetch('http://localhost:3000/static/prods.json')
        .then(response => response.json()) //o axios converte a response em json automaticamente, o fetch() não
        .then(setData)
    }, [])

    const handleLeftClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft -= carousel.current.offsetWidth
    }

    const handleRightClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft += carousel.current.offsetWidth
    }

    //caso não tenha conseguido carregar os dados dos cards, não renderiza o carrossel na tela
    if(!data || !data.length){
        return null
    }

    return(
        <div className="carousel-container">
            <div className="carousel" ref={carousel}>
                {data.map((item) => {
                    const {id, name, price, oldPrice, image}  = item

                    return (
                        <div className="item" key={id}>
                            <div className="image">
                                <img src={image} alt={name}></img>
                            </div>

                            <div className="info">
                                <span className="name">{name}</span>
                                <span className="old-price">U$ {oldPrice}</span>
                                <span className="price">U$ {price}</span>
                            </div>
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