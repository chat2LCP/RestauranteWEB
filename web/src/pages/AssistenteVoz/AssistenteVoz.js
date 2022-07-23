import React, {useEffect, useState} from 'react';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'react-string-format';
import { Apple } from 'react-bootstrap-icons';

import './AssistenteVoz.scss'

import Button from '../../components/Button/Button'

const AssistenteVoz = () => {
    const [path, setPath] = useState('')
    const [prev, setPrev] = useState('')

    const [id, setID] = useState('')
    const [ip, setIP] = useState('')
    const [login, setLogin] = useState('')
    const [nome, setNome] = useState('')
    const [porta, setPorta] = useState('')
    const [preco, setPreco] = useState('')
    const [senha, setSenha] = useState('')
    const [tempo, setTempo] = useState('')

    //const [categoria, setCat] = useState('')
    //const [setor, setSetor] = useState('')
    //const [cargo, setCargo] = useState('')

    const [acao, setAcao] = useState('')
    const [display, setDisplay] = useState('')

    const update = () => {
        if (prev != path){
            setID('')
            setIP('')
            setLogin('')
            setNome('')
            setPorta('')
            setPreco('')
            setSenha('')
            setTempo('')
        }
        setPrev(path)
        switch(path){
            case '/cadastrar-cargo':
                setAcao('CADASTRAR CARGO')
                setDisplay(format('NOME: {0}', nome))
                break
            case '/cadastrar-setor':
                setAcao('CADASTRAR SETOR')
                setDisplay(format('NOME: {0}', nome))
                break
            case '/cadastrar-categoria':
                setAcao('CADASTRAR CATEGORIA')
                setDisplay(format('NOME: {0}', nome))
                break
            case '/cadastrar-produto':
                setAcao('CADASTRAR PRODUTO')
                setDisplay(format('NOME: {0}\nPRECO: {1}\nTEMPO: {2}', nome, preco, tempo))
                break
            case '/cadastrar-funcionario':
                setAcao('CADASTRAR FUNCIONARIO')
                setDisplay(format('NOME: {0}\nLOGIN: {1}\nSENHA: {2}', nome, login, senha))
                break
            case '/cadastrar-impressora':
                setAcao('CADASTRAR IMPRESSORA')
                setDisplay(format('ID: {0}\nNOME: {1}\nIP: {2}\nPORTA: {3}', id, nome, ip, porta))
                break
            default:
                setAcao('IDLE...')
                setDisplay('')
        }
    }
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
            command: '(cadastrar) impressora',
            callback: () => {setPath('/cadastrar-impressora')}
        },
        {
            command: ['seguir', 'finalizar'],
            callback: () => {navigate(path, {state:{id:id, ip:ip, login:login, nome:nome, porta:porta, preco:preco, senha:senha, tempo:tempo}})}
        },
        {
            command: 'limpar',
            callback: ({resetTranscript}) => {resetTranscript()}
        },
        {
            command: 'id (impressora) *',
            callback: (ret) => {setID(ret)}
        },
        {
            command: 'ip (impressora) *',
            callback: (ret) => {setIP(ret)}
        },
        {
            command: 'login *',
            callback: (ret) => {setLogin(ret)}
        },
        {
            command: 'nome *',
            callback: (ret) => {setNome(ret)}
        },
        {
            command: 'porta *',
            callback: (ret) => {setPorta(ret)}
        },
        {
            command: ['preço *', 'valor *'],
            callback: (ret) => {setPreco(ret)}
        },
        {
            command: 'senha *',
            callback: (ret) => {setSenha(ret)}
        },
        {
            command: 'tempo *',
            callback: (ret) => {setTempo(ret)}
        },
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

    useEffect(() =>{update()},[path, id, ip, login, nome, porta, preco, senha, tempo])

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
                    <Apple size={92} color='#fefefe'></Apple>
                    <h1 className='home-titulo'>DRestaurante</h1>
                </div>
            </section>
            <section>
                <div className='botoes-interacao'>
                    <Button
                        component={Button}
                        buttonSize='btn--large'
                        buttonStyle={listening ? 'btn--red' : 'btn--blue'}
                        onMouseDown={listening ? stopListening : startListening}
                    >{listening ? 'PAUSAR' : 'RETOMAR'}</Button>
                    <Button component={Link} to='/home' buttonSize='btn--large' buttonStyle='btn--white'>VOLTAR</Button>
                </div>
                <div className='display-info'>
                    <label>{acao}</label>
                    <pre>{display}</pre>
                </div>
            </section>
        </div>
    );
}

export default AssistenteVoz;













































