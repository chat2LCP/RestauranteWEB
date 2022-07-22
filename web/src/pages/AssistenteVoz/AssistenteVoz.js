import React, {useEffect, useState} from 'react';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import { useNavigate } from 'react-router-dom';

import './AssistenteVoz.scss'

import Button from '../../components/Button/Button'

const AssistenteVoz = () => {
    const [path, setPath] = useState('')
    const navigate = useNavigate()
    const commands = [
        {
            command: ['cancelar', 'voltar'],
            callback: () => {navigate('/home')}
        },
        {
            command: '(cadastrar) produto',
            callback: () => {setPath('/cadastrar-produto')}
        },
        {
            command: '(cadastrar) cargo',
            callback: () => {setPath('/cadastrar-cargo')}
        },
        {
            command: '(cadastrar) funcionário',
            callback: () => {setPath('/cadastrar-funcionario')}
        },
        {
            command: '(cadastrar) setor',
            callback: () => {setPath('/cadastrar-setor')}
        },
        {
            command: '(cadastrar) categoria',
            callback: () => {setPath('/cadastrar-categoria')}
        },
        {
            command: 'relatórios',
            callback: () => {setPath('/relatorios')}
        },
        {
            command: '(realizar) pedido',
            callback: () => {setPath('/realizar-pedido')}
        },
        {
            command: '(adicionar) item',
            callback: () => {setPath('/incluir-item')}
        },
        {
            command: ['prossegir', 'finalizar', 'fim'],
            callback: () => {navigate(path)}
        },
        {
            command: 'limpar',
            callback: ({resetTranscript}) => resetTranscript(),
        }
    ]

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
        isMicrophoneAvailable
    } = useSpeechRecognition({commands});

    const startListening = () => SpeechRecognition.startListening({
        continuous: true,
        language: 'pt-br'
    });

    const stopListening = () => {
        SpeechRecognition.stopListening()
        resetTranscript()
    }

    useEffect(()=>{
        startListening()
    },[])

    if (!browserSupportsSpeechRecognition) {
        return <span>NAVEGADOR NAO POSSUI SUPORTE PARA ESTA FUNCAO</span>;
    }

    if (!isMicrophoneAvailable) {
        return <span>MICROFONE INDISPONÍVEL</span>;
    }

    return (
        <div className='home-container'>
            <section className='header'>
                <div className='home-header'>
                    <div className='logo-restaurante'>
                        <i class="fab fa-pagelines"></i>
                    </div>
                    <h1 className='home-titulo'>DRestaurante</h1>
                </div>
            </section>
            <section>
                <div>
                    <Button
                        component={Button}
                        buttonSize='btn--large'
                        buttonStyle={listening ? 'btn--red' : 'btn--blue'}
                        onMouseDown={listening ? stopListening : startListening}
                    >{listening ? 'PAUSAR' : 'RETOMAR'}</Button>
                    <h3>Path atual: {path}</h3>
                    <h3>Transcricao: {transcript}</h3>
                </div>
            </section>
        </div>
    );
}

export default AssistenteVoz;













































