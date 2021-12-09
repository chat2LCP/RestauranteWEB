import React from 'react'
import CardItem from '../../components/Cards/CardItem'
import './CardsHome.css'

function CardsHome() {
    return (
        <div className='cards-container container-fluid'>
            <h1 className="row"> Check out our Menu</h1> 

            <div className='row'>
                {/* <div className="cards_wrapper col-11 col-sm-6"> */}
                    <ul className="cards_items col-11 col-sm-6">
                        <CardItem 
                            src='/images/card-image-1.jpg'
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
                    </ul>
                    <ul className="cards_items col-11 col-sm-6 cold-md-4">    
                        <CardItem 
                            src='/images/card-image-3.jpg'
                            text='The original Italian pasta'
                            label='Pasta'
                            path='/'
                        /> 
                        <CardItem 
                            src='/images/card-image-3.jpg' 
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
                {/* </div> */}
            </div>         
        </div>
    )
}

export default CardsHome
