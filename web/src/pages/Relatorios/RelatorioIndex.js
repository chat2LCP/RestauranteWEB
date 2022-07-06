import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ptbr from 'date-fns/locale/pt-BR';
import { Apple } from 'react-bootstrap-icons'

import './RelatorioIndex.scss'
import Button from '../../components/Button/Button'
import axios from 'axios';
import ModalScreen from '../../components/Modal/ModalScreen';

registerLocale('ptbr', ptbr)

function RelatorioIndex() {

    const [dataInicio, setDataInicio] = useState(new Date())
    const [dataFim, setDataFim] = useState(new Date())
    const [dadosRelatorio, setDadosRelatorio] = useState([{itens: [{data: '', quantidade: 0, valor: 0}], quantidade: 0, valor: 0}])
    const [modalShow, setModalShow] = useState({show: false, status: 'ok', message: ''})

    const geraRelatorio = async (periodo) => {         
        const dataDeInicio = dataInicio.toISOString().substr(0, 10)
        const dataDeFim = dataFim.toISOString().substr(0, 10)

        await axios.get(`${process.env.REACT_APP_URL_BASE}/vendas/total`, {
            params:{
                dataInicial: dataDeInicio,
                dataFinal: dataDeFim,
            }
        })
        .then((res) => {
            setDadosRelatorio(res.data.data)
        })
        .catch(()=> {
            setModalShow({
                show: true, 
                status: 'error', 
                message: 'Não há dados para o período selecionado'
            })
        })

        console.log(dadosRelatorio)
        
        // switch(periodo){
        //     case 'd':
        //         console.log('d');

        //         break;
        //     case 's':
        //         console.log('s');

        //         break;
        //     case 'm':
        //         console.log('m');

        //         break;
        //     default:
        // }
    }

    const handleDateChange = () => {
        // if(startDate > finalDate){
        //     alert('A data incial deve ser menor que a data final');
        // }else{
        //     //
        // }
    }

    return(
        <div className='relatorioIndex-container'>
            <ModalScreen 
                show={modalShow.show} 
                status={modalShow.status}
                message={modalShow.message}
                onHide={() => setModalShow({show: false, status: modalShow.status, message: modalShow.message})}
            />
            <section className='header'>
                <div className='relatorioIndex-header'>
                    <Apple size={92} color='#fefefe'></Apple>
                    <h1 className='relatorioIndex-titulo'>DRestaurante</h1>
                </div>
            </section>

            <section className="relatorioIndex-body">
                <div className='relatorioIndex-description'>
                    <h3>RELATÓRIOS</h3>
                    <span className='divider'></span>
                </div>

                <div className='relatorio-datepickers-container'>
                    <div className='dtpicker inicial'>
                        <label className='label-nome-relatorio'>Data inicial</label>
                        <DatePicker
                            className='dtpicker'
                            dateFormat="dd/MM/yyyy"
                            selected={dataInicio}
                            onSelect={setDataInicio}
                            onChange={handleDateChange} //only when value has changed
                            locale={'ptbr'}
                            withPortal
                        />
                    </div>
                    <div className='dtpicker final'>
                        <label className='label-nome-relatorio'>Data final</label>
                        <DatePicker
                            className='dtpicker'
                            dateFormat="dd/MM/yyyy"
                            selected={dataFim}
                            onSelect={setDataFim} //when day is clicked
                            onChange={handleDateChange} //only when value has changed
                            locale={'ptbr'}
                            withPortal
                        />
                    </div>
                </div>

                <div className='relatorioIndex-botoes-container'>
                    <div className='relatorioIndex-botoes'>
                        <Button component={Button} onClick={() => geraRelatorio('d')} buttonSize='btn--medium' buttonStyle='btn--green'>RELATÓRIO DIÁRIO</Button>
                        <Button component={Button} onClick={() => geraRelatorio('s')} buttonSize='btn--medium' buttonStyle='btn--green'>RELATÓRIO SEMANAL</Button>
                        <Button component={Button} onClick={() => geraRelatorio('m')} buttonSize='btn--medium' buttonStyle='btn--green'>RELATÓRIO MENSAL</Button>
                    </div>
                </div>
            
                <section className="relatorio-index-container">
                    <div className='relatorio-index-body'>            
                        <table className='tabela-dados-relatorio'>
                            <thead className='thead'>
                                <tr className='colunas'>
                                    <th>Data</th>
                                    <th>Quantidade</th>
                                    <th>Valor</th>
                                </tr>
                            </thead>
                            <tbody className='tbody'>
                                {
                                    dadosRelatorio.map((dado, index) => {
                                        return(
                                            <tr className='linha-container' key={index}>
                                                <tr >
                                                    {
                                                        dado.itens.map((item, index) => {
                                                            return(
                                                                <tr className='row-dados' key={index}>
                                                                    <td>{item.data}</td>
                                                                    <td>{item.quantidade}</td>
                                                                    <td>{item.valor}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tr>
                                                <tr className='row-total-valor-geral'>
                                                    <td></td>
                                                    <td><b>Quantidade total: {dado.quantidade}</b></td>
                                                    <td><b>Valor total: {dado.valor}</b></td>
                                                </tr>
                                            </tr>
                                        )
                                    })    
                                }
                            </tbody>
                        </table>
                    </div>
                </section>
            
                <div className='relatorioData-botoes'>
                    <Button component={Link} to='/' buttonSize='btn--medium' buttonStyle='btn--blue'>VOLTAR</Button>
                </div>
            </section>
        </div>
    )
}

export default RelatorioIndex