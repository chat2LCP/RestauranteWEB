import React from 'react'
import CardItem from './CardItem'
import './Cards.css'

function Cards() {
    return (
        <div className='cards'>
            <h1>Check out the Menu</h1> 
            <div className='cards_container'>
                <div className="cards_wrapper">
                    <ul className="cards_items">
                        <CardItem 
                            src='../../images/card-image-1.jpg' 
                            text='An explosion of flavor'
                            label='Sweets'
                            path='/services'
                        /> 
                        <CardItem 
                            src='../../images/card-image-2.jpg' 
                            text='A wide variety of wines from the best wineries of the country'
                            label='Wines'
                            path='/services'
                        />  
                    </ul>
                    <ul className="cards_items">    
                        <CardItem 
                            src='../../images/card-image-3.jpg'
                            text='A wide variety of wines from the best wineries of the country'
                            label='Wines'
                            path='/services'
                        /> 
                        <CardItem 
                            src='../../images/card-image-3.jpg' 
                            text='A wide variety of wines from the best wineries of the country'
                            label='Wines'
                            path='/services'
                        />
                        <CardItem 
                            src='../../images/card-image-3.jpg' 
                            text='A wide variety of wines from the best wineries of the country'
                            label='Wines'
                            path='/services'
                        />
                    </ul>
                </div>
            </div>           
        </div>
    )
}

export default Cards
