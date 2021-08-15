import React from 'react'
import '../../App.css'
import Footer from '../../components/Footer/Footer'
import CardsServices from './CardsServices'

function Services() {
    return (
        <>
            <div className='services_hero_section'>
                <h1>SERVICES</h1>
            </div>

            <CardsServices />

            <Footer />
        </>
    )
}

export default Services