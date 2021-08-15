import React from 'react'
import '../../App.css'
import CardsHome from './CardsHome'
import Footer from '../../components/Footer/Footer'
import HeroSection from '../../components/HeroSection/HeroSection'

function Home() {
    return(
        <>
            <HeroSection />
            <CardsHome />
            <Footer />
        </>
    )
}

export default Home;