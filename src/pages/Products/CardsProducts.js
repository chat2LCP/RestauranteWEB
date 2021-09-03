import React from 'react'
import './CardsProducts.css'
import CardItem from '../../components/Cards/CardItem'

function CardsProducts() {
    return (
        <div className='cards'>
            <h1>Sweets Menu</h1> 
            <div className='cards_container'>
                <div className="cards_wrapper">
                    <ul className="cards_items">
                        <CardItem 
                            src= ''
                            text='Brazilian Brigadeiro'
                            label='Brigadeiro'
                            path='/services'
                        /> 
                        <CardItem 
                            src='' 
                            text='-----'
                            label='------'
                            path='/services'
                        /> 
                        <CardItem 
                            src='' 
                            text='-----'
                            label='------'
                            path='/services'
                        /> 
                    </ul>
                    <ul className="cards_items">    
                        <CardItem 
                            src=''
                            text='-----'
                            label='----'
                            path='/services'
                        /> 
                        <CardItem 
                            src='' 
                            text='---'
                            label='-----'
                            path='/services'
                        />
                        <CardItem 
                            src='' 
                            text='------'
                            label='-------'
                            path='/services'
                        />
                    </ul>
                </div>
            </div>           
        </div>
    )
}

export default CardsProducts
