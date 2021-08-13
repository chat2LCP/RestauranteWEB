import React from 'react'
import { Link } from 'react-router-dom'

function CardItem(props) {
    return (
        <>
          <li className="cards_item">
              <Link to={props.path} className="cards_item_link">
                    <figure className="cards_item_pic-wrap" data-category={props.label}>    {/*o atributo data- permite armazenar informações extras nos elementos html, qualquer informação que achar necessário, para recuperar essa informação pode-se usar getAttribute() ou através do objeto "dataset" */}
                        <img src={props.src} alt="Menu item" className="cards_item_img"></img>
                    </figure>
                    <div className="cards_item_info">
                        <h5 className="cards_item_text">{props.text}</h5>
                    </div>
              </Link>
          </li>
        </>
    )
}

export default CardItem
