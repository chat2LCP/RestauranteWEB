import React from 'react'

import './Home.scss'
import CardsHome from './CardsHome'
import Footer from '../../components/Footer/Footer'
import HeroSection from '../../components/HeroSection/HeroSection'
import ScrollTopButton from '../../components/ScrollTopButton/ScrollTopButton'

function Home() {

    return(
        <>
            <HeroSection 
                mainText='THE BEST MEALS YOU WILL EVER HAVE'
                description='What are you waiting for?'
            />
            <CardsHome />
            <ScrollTopButton />
            <Footer />
        </>
    )
}

export default Home;