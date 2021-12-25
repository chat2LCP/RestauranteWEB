import React from 'react'
import CardItem from '../components/Cards/CardItem'
import './CardsServices.scss'

function CardsServices() {
    return (
        <div className='cards'>
            <h1>Check out our Services</h1> 
            <div className='cards_container'>
                <div className="cards_wrapper">
                    <ul className="cards_items">
                        <CardItem 
                            src='/images/services-card-image-1.jpg' 
                            text='Whether you are planning a traditional ceremony, a modern wedding, or want to hold a rehearsal dinner, we have the best options for you'
                            label='Wedding venue'
                            path='/'
                        /> 
                        <CardItem 
                            src='' 
                            text='Service 2 description'
                            label='Service 2'
                            path=''
                        />  
                        <CardItem 
                            src='' 
                            text='Service 3 description'
                            label='Service 3'
                            path=''
                        /> 
                    </ul>
                    <ul className="cards_items">    
                        <CardItem 
                            src=''
                            text='Service 4 description'
                            label='Service 4'
                            path=''
                        /> 
                        <CardItem 
                            src='' 
                            text='Service 5 description'
                            label='Service 5'
                            path=''
                        />
                        <CardItem 
                            src='' 
                            text='Service 6 description'
                            label='Service 6'
                            path=''
                        />
                    </ul>
                </div>
            </div>           
        </div>
    )
}

export default CardsServices