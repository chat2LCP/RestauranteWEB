import React from 'react';

import './Button.scss';

const Button = ({
    children, 
    component: Component,  /*essa propriedade serve para eu poder usar esse componente como substituto dos elementos <button> ou <a> ou <Link>, por exemplo. Basta eu definir na tag <Button> qual é o tipo de componente que eu quero que ele substitua*/
    className,  /* com esse className eu posso passar uma classe de css para esse botão de qualquer lugar que eu quiser, por exemplo, no componente HeroSection eu passo a classe 'hero-btn' que está definida lá naquele componente e que aplica uma amrgem de 6 px somente naqueles dois botões*/
    buttonStyle, 
    buttonSize,
    ...restProps    /* restProps são as props padrão dos <button> ou <a> ou <Link>, uma vez que esse componente <Button /> pode ser qualquer um deles, se eu passar um href="/xxxx", ou um type="algumacoisa" ou to="algumCaminho" ou onClick(), por exemplo, eles vão ser pegos aqui pelo ...restProps e eu nao preciso manipular essas propriedades aqui */
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