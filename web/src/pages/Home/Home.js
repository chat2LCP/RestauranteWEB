import React from 'react'

import './Home.scss'
import Cards from '../../components/Cards/Cards'
import Footer from '../../components/Footer/Footer'
import HeroSection from '../../components/HeroSection/HeroSection'
import ScrollTopButton from '../../components/ScrollTopButton/ScrollTopButton'
import Paralax from '../../components/Paralax/Paralax'

function Home() {
    
    //endpoint que contém os produtos que serão exibidos nos cards
    const homeCards = 'http://localhost:3000/static/cards-prods.json'

    return(
        <>
            <HeroSection 
                mainText='THE BEST MEALS YOU WILL EVER HAVE'
                description='What are you waiting for?'
            />
            
            <div className='products-cards-title'>
                <h1>Check out our Products</h1>
            </div>

            <Cards productsUrl={homeCards} />

            <ScrollTopButton />

            <Paralax />

            <Footer />
        </>
    )
}

export default Home;