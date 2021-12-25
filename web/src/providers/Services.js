import React from 'react'
import Footer from '../components/Footer/Footer'
import CardsServices from './CardsServices'
import HeroSection from '../components/HeroSection/HeroSection'
import './Services.scss'

function Services() {
    return (
        <>
            <HeroSection
                mainText='SERVICES'
                textBtn1='GET STARTED'
                textBtn2='button 2'
            />

            <CardsServices />

            <Footer />
        </>
    )
}

export default Services