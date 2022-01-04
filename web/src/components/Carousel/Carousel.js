import { useEffect, useState, useRef } from 'react'

import './Carousel.scss'
import { fetchProducts } from '../../providers/fetch-products-provider'

function Carousel() {

    const [data, setData] = useState([])
    const carousel = useRef(null)

    useEffect(() => {
        // doGet('http://localhost:3000/static/prods.json')
        fetchProducts('http://localhost:3000/static/prods.json')
        .then(setData)
        .catch(console.error)
    }, [])

    // const doGet = (url) => {
    //     return new Promise((resolve, reject) => {
    //         //fetch é uma API JavaScript que funciona como o axios, para fazer requisições HTTP
    //         fetch(url)
    //         .then(response => {
    //             if(!response.ok){   //essa verificação é porque o fecth() retorna uma response (Promise) mesmo que tenha havido algum erro no get (erro 404, por exemplo)
    //                 throw new Error('Cannot fetch url - Status: '+response.status)
    //             }
    //             return response.json() //o axios converte a response em json automaticamente, o fetch() não
    //         }) 
    //         .then(resolve)  //lança o resolve caso tudo ocorra bem com o fetch. Ele indica que a Promise do fecth foi resolvida e está tudo OK, esse then acessa a Promise retornada pelo then anterior. O then sempre precisa retornar uma Promisse. O resolve e o reject são funções que retornam promises com o resultado retornado na promise anteriormente resolvida ou rejeitada
    //         .catch(reject)  //lança o reject caso algo tenha dado errado
    //     })
    // }

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