import React, { useState, useEffect } from "react";
import './ScrollTopButton.css'

const ScrollTopButton = () => {

    const [btnOn, setBtnOn] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', showButton)

        //o useEffect só faz o return quando o componente é desmontado
        return() => {
            window.removeEventListener('scroll', showButton)
        }
    }, [])  //o [] vazio indica que esse useEffect só vai ser executado quando o componente for montado, ou seja, não vai ficar sendo executado toda vez que a página renderizar

    //mostra o botão de scroll top só quando já tiver feito scroll na página
	const showButton = () => {
        if(window.scrollY > 300){
            setBtnOn(true)
        }else{
            setBtnOn(false)
        }
    }

	const scrollToTop = () => {
	  document.body.scrollTop = 0
	  document.documentElement.scrollTop = 0
	}

    return (       
        <div className={`btn-container ${btnOn? 'show-btn' : ''}`} onClick={scrollToTop}>
            <div className='btn-to-top'></div>
        </div>      
    )  
}

export default ScrollTopButton