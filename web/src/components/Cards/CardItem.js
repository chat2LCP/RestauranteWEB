import React from 'react'
import { Link } from 'react-router-dom'
import './CardItem.css'

function CardItem({
    src,
    text,
    label,
    path
}) {
    return (
        <>
            <li className="card_item">
                <Link to={path} className="card_item_link">
                    <figure className="card_item_pic-wrap" data-category={label}>    {/*o atributo data-algumacoisa permite armazenar informações extras nos elementos html, qualquer informação que achar necessário, para recuperar essa informação pode-se usar getAttribute() ou através do objeto "dataset" */}
                        <img src={src} alt="Menu item" className="card_item_img" />
                    </figure>
                    <div className="card_item_info">
                        <h5 className="card_item_text">{text}</h5>
                    </div>
                </Link>
            </li>
        </>
    )
}

CardItem.defaultProps = {
    src: '',
    text: 'product description',
    label: 'Product',
    path: '/'
}

export default CardItem
