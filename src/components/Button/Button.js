import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline']
const SIZES = ['btn--medium','btn--large']

export const Button = ({
    children, 
    type, 
    onClick, 
    buttonStyle, 
    buttonSize
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)? buttonStyle : STYLES[0]
    const checkButtonSize = SIZES.includes(buttonSize)? buttonSize : SIZES[0]

    return(
        <Link to='/signup' className='btn-mobile'>
            <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}>
                {children}  {/* esse children refere-se àquilo que estiver no innerHTML da tag <Button>Isso é o children</Button> */}
            </button>
        </Link>
    )
}