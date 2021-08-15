import React from 'react'
import CardItem from '../../components/Cards/CardItem'
import './CardsServices.css'

function CardsServices() {
    return (
        <div className='cards'>
            <h1>Check out the Menu</h1> 
            <div className='cards_container'>
                <div className="cards_wrapper">
                    <ul className="cards_items">
                        <CardItem 
                            src='' 
                            text='An explosion of flavor'
                            label='Sweets'
                            path='/services'
                        /> 
                        <CardItem 
                            src='' 
                            text='A wide variety of wines from the best wineries of the country'
                            label='Wines'
                            path='/services'
                        />  
                    </ul>
                    <ul className="cards_items">    
                        <CardItem 
                            src=''
                            text='The original Italian pasta'
                            label='Pasta'
                            path='/services'
                        /> 
                        <CardItem 
                            src='' 
                            text='High quality brazilian barbecue for the meat lovers'
                            label='Barbecue'
                            path='/services'
                        />
                        <CardItem 
                            src='' 
                            text='Kids menu with delicious meals specially prepared for the little ones'
                            label='Kids menu'
                            path='/services'
                        />
                    </ul>
                </div>
            </div>           
        </div>
    )
}

export default CardsServices