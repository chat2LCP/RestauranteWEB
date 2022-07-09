import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ptbr from 'date-fns/locale/pt-BR';
import { Apple } from 'react-bootstrap-icons'
import { Calendar } from 'react-bootstrap-icons'
import { Chart } from 'react-google-charts'
import _ from 'lodash'

import './RelatorioIndex.scss'
import Button from '../../components/Button/Button'
import axios from 'axios';
import ModalScreen from '../../components/Modal/ModalScreen';

registerLocale('ptbr', ptbr)

function RelatorioIndex() {

    const [dataInicio, setDataInicio] = useState(new Date())
    const [dataFim, setDataFim] = useState(new Date())
    const [dadosRelatorio, setDadosRelatorio] = useState([{itens: [{data: '', quantidade: 0, valor: 0}], quantidade: 0, valor: 0}])
    const [dadosRelatorioVendas, setDadosRelatorioVendas] = useState(["",0])
    const [dadosRelatorioQuantidades, setDadosRelatorioQuantidades] = useState(["",0])
    const [modalShow, setModalShow] = useState({show: false, status: 'ok', message: ''})
    const AuthStr = 'Bearer '.concat(localStorage.getItem("access_token"))

    const geraRelatorio = async () => {         
        const dataDeInicio = dataInicio.toISOString().substr(0, 10)
        const dataDeFim = dataFim.toISOString().substr(0, 10)

        await axios.get(`${process.env.REACT_APP_URL_BASE}/vendas/total`, {
            headers:{
                Authorization: AuthStr
            },
            params:{
                dataInicial: dataDeInicio,
                dataFinal: dataDeFim,
            }
        })
        .then((res) => {
            setDadosRelatorio(res.data.data)

            const vendas = res.data.data.map(({itens}) => {
                return(
                    itens.map(({data, valor}) => {
                        return [data, valor]
                    })
                )
            })
            setDadosRelatorioVendas(...vendas)

            const quantidade = res.data.data.map(({itens}) => {
                return(
                    itens.map(({data, quantidade}) => {
                        return [data, quantidade]
                    })
                )
            })
            setDadosRelatorioQuantidades(...quantidade)
        })
        .catch(()=> {
            setModalShow({
                show: true, 
                status: 'error', 
                message: 'Não há dados para o período selecionado'
            })
        })
    }

    const handleDateChange = () => {
        // if(startDate > finalDate){
        //     alert('A data incial deve ser menor que a data final');
        // }else{
        //     //
        // }
    }

    const chartSalesData=[
        ["Ano", "Vendas"], 
        ...dadosRelatorioVendas
    ]

    const chartQuantidadeData=[
        ["Ano", "Vendas"], 
        ...dadosRelatorioQuantidades
    ]

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
                        <div className='date-picker-and-icon'>
                            <DatePicker
                                className='dtpicker'
                                dateFormat="dd/MM/yyyy"
                                selected={dataInicio}
                                onSelect={setDataInicio}
                                onChange={handleDateChange} //only when value has changed
                                locale={'ptbr'}
                                withPortal
                                />
                            <Calendar className='calendar-icon'/>
                        </div>
                    </div>
                    <div className='dtpicker final'>
                        <label className='label-nome-relatorio'>Data final</label>
                        <div className='date-picker-and-icon'>
                            <DatePicker
                                className='dtpicker'
                                dateFormat="dd/MM/yyyy"
                                selected={dataFim}
                                onSelect={setDataFim} //when day is clicked
                                onChange={handleDateChange} //only when value has changed
                                locale={'ptbr'}
                                withPortal
                            />
                            <Calendar className='calendar-icon'/>
                        </div>
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
                
                {
                    [...dadosRelatorioVendas][0] != "" &&
                        <section>
                            <span className='grafico-titulo'>Titulo grafico</span>
                            <Chart
                                chartType='LineChart'
                                data={chartSalesData}
                                width="100%"
                                height="300px"
                                legendToggle
                            />
                        </section>      
                }

                {
                    [...dadosRelatorioQuantidades][0] != "" &&
                        <section>
                            <span className='grafico-titulo'>Titulo grafico</span>
                            <Chart
                                chartType='LineChart'
                                data={chartQuantidadeData}
                                width="100%"
                                height="300px"
                                legendToggle
                            />
                        </section>
                }
                <div className='relatorio-botao'>
                    <Button component={Link} to='/home' buttonSize='btn--medium' buttonStyle='btn--blue'>VOLTAR</Button>
                </div>
            </section>
        </div>
    )
}

export default RelatorioIndex