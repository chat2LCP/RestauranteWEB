import React from 'react'

import './CardsProduct.css'
import CardItem from '../../components/Cards/CardItem'

function CardsProduct(props) {

    return (
        <div className='cards'>
            <h1>Produto selecionado: {}</h1>

            <h1>Menu</h1> 
            <div className='cards_container'>
                <div className="cards_wrapper">
                    <ul className="cards_items">
                        <CardItem 
                            src= ''
                            text=''
                            label='Brigadeiro'
                            path='/'
                        /> 
                        <CardItem 
                            src='' 
                            text='-----'
                            label='------'
                            path='/'
                        /> 
                        <CardItem 
                            src='' 
                            text='-----'
                            label='------'
                            path='/'
                        /> 
                    </ul>
                    <ul className="cards_items">    
                        <CardItem 
                            src=''
                            text='-----'
                            label='----'
                            path='/'
                        /> 
                        <CardItem 
                            src='' 
                            text='---'
                            label='-----'
                            path='/'
                        />
                        <CardItem 
                            src='' 
                            text='------'
                            label='-------'
                            path='/'
                        />
                    </ul>
                </div>
            </div>           
        </div>
    )
}

export default CardsProduct
