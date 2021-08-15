import React from 'react'
import '../../App.css'
import { Button } from '../Button/Button'
import './HeroSection.css'

function HeroSection() {
    return (
        <div className='hero-container'>
            {/*<video src='' autoPlay loop muted></video>*/} {/* caso queira colocar um video de fundo ao inves da imagem é só colocar a source */}
            <h1>THE BEST MEALS YOU WILL EVER HAVE</h1>
            <p>What are you waiting for?</p>

            <div className='hero-btns'>
                <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large'>GET STARTED</Button>
                <Button className='btns' buttonStyle='btn--primary' buttonSize='btn--large'>WATCH TRAILLER <i className='far fa-play-circle'/></Button>
            </div>
        </div>
    )
}

export default HeroSection
