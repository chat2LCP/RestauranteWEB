import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

const STYLES = ['btn--outline', 'btn--white', 'btn--create-account', 'btn--login']
const SIZES = ['btn--medium','btn--large']

export const Button = ({
    children, 
    type, 
    onClick, 
    buttonStyle, 
    buttonSize,
    link
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)? buttonStyle : STYLES[1]
    const checkButtonSize = SIZES.includes(buttonSize)? buttonSize : SIZES[0]

    return(
        <Link to={link}>
            <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}>
                {children}  {/* esse children refere-se àquilo que estiver no innerHTML da tag <Button>Isso é o children</Button> */}
            </button>
        </Link>
    )
}