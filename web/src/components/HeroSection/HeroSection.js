import React from 'react'
import { Link } from 'react-router-dom'

import Button from '../Button/Button'
import './HeroSection.scss'

function HeroSection(props) {
    return (
        <div className='hero-container'>
            {/*<video src='' autoPlay loop muted></video>*/} {/* caso queira colocar um video de fundo ao inves da imagem é só colocar a source */}
            <h1>{props.mainText}</h1>
            <p>{props.description}</p>
            
            <div className='hero-btns'>
                <Button component={Link} to='signin' className='hero-btn' buttonStyle='btn--outline' buttonSize='btn--large'>GET STARTED</Button>
                <Button component={Link} to='/' className='hero-btn' buttonStyle='btn--white' buttonSize='btn--large'>WATCH TRAILLER <i className='far fa-play-circle'/></Button>
            </div>
        </div>
    )
}

export default HeroSection
