import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './Cards.scss'
import { fetchProducts } from '../../providers/fetch-products-provider'

const Cards = ({ 
    productsUrl
}) => { //cardsList é uma lista de objetos contendo as informações que estarão contidas nos cards

    const [cardsList, setCardsList] = useState([]) //buscar a lisa de cards de um banco de dados ou de um json

    useEffect(() => {
        let isSubscribed = true //evita que o setCardsList seja executado caso o componente esteja desmontado

        fetchProducts(productsUrl)
        .then(isSubscribed ? setCardsList : null)
        .catch(console.error)

        return () => (isSubscribed = false)
    }, [])  //as [] é para que o useEffect apenas seja executado quando o componente é montado. Ele não é executado nos 're-renders'

    //caso não tenha conseguido carregar os dados dos cards, não renderiza o carrossel na tela
    if(!cardsList || !cardsList.length){
        return null
    }

    return (
        <div className='cards-container container-fluid'>
            <ol className="cards_items row">
                {cardsList.map(cardItem => {
                    const { id, src, text, label, path } = cardItem

                    return (
                        <li key={id} className="card_item">
                            <Link to={path} className="card_item_link">
                                <figure className="card_item_pic-wrap" data-category={label}>    {/*o atributo data-algumacoisa permite armazenar informações extras nos elementos html, qualquer informação que achar necessário, para recuperar essa informação pode-se usar getAttribute() ou através do objeto "dataset" */}
                                    <img src={src} alt="Menu item" className="card_item_img" />
                                </figure>
                                <div className="card_item_info">
                                    <h5 className="card_item_text">{text}</h5>
                                </div>
                            </Link>
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}

// Cards.defaultProps = {
//     src: '',
//     text: 'product description',
//     label: 'Product',
//     path: '/'
// }

export default Cards
