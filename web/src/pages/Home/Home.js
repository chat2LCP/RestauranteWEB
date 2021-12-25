import React from 'react'

import './Home.scss'
import CardsHome from './CardsHome'
import Footer from '../../components/Footer/Footer'
import HeroSection from '../../components/HeroSection/HeroSection'
import ScrollTopButton from '../../components/ScrollTopButton/ScrollTopButton'

function Home() {

    //document.documentElement.style.setProperty('--img-fundo', 'url("../../images/home-capa.jpg")')

    return(
        <>
            <HeroSection 
                /*img = '../../images/home-capa.jpg'*/
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