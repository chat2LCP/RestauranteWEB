import React from 'react';

import './Button.scss';

const Button = ({
    children, 
    component: Component,  /*essa propriedade serve para eu poder usar esse componente como substituto dos elementos <button> ou <a> ou <Link>, por exemplo. Basta eu definir na tag <Button> qual é o tipo de componente que eu quero que ele substitua*/
    className, 
    buttonStyle, 
    buttonSize,
    ...restProps
}) => {

    return(
        <Component className={`btn ${buttonStyle} ${buttonSize} ${className}`} {...restProps}>
            {children}
        </Component>
    )
}

// Define o valor padrão das props caso elas não sejam passadas na tag do elemento, ou seja, na tag <Button />
Button.defaultProps = {
    component: 'button',
    className: '',
    buttonStyle: 'btn--outline',
    buttonSize: 'btn--medium'
}

export default Button