import React from 'react'
import CardItem from '../../components/Cards/CardItem'
import './CardsHome.scss'

function CardsHome() {
    return (
        <div className='cards-container container-fluid'>
            <h1 className="row cards-container-title"> Check out our Menu</h1> 
            
            <ul className="cards_items row">
                <CardItem
                    src='../images/CardsHome/card-image-1.jpg'
                    text='An explosion of flavor'
                    label='Sweets'
                    path='/'
                /> 
                <CardItem 
                    src='/images/card-image-2.jpg' 
                    text='A wide variety of wines from the best wineries of the country'
                    label='Wines'
                    path='/'
                />  
                <CardItem 
                    src='/images/card-image-3.jpg' 
                    text='A wide variety of wines from the best wineries of the country'
                    label='Wines'
                    path='/'
                /> 
                <CardItem 
                    src='/images/card-image-1.jpg'
                    text='The original Italian pasta'
                    label='Pasta'
                    path='/'
                /> 
                <CardItem 
                    src='/images/card-image-2.jpg' 
                    text='High quality brazilian barbecue for the meat lovers'
                    label='Barbecue'
                    path='/'
                />
                <CardItem 
                    src='/images/card-image-3.jpg' 
                    text='Kids menu with delicious meals specially prepared for the little ones'
                    label='Kids menu'
                    path='/'
                />
            </ul>
        </div>
    )
}

export default CardsHome
