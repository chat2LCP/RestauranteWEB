import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ptbr from 'date-fns/locale/pt-BR';

import './RelatorioIndex.scss'
import Button from '../../components/Button/Button'

registerLocale('ptbr', ptbr)

function RelatorioIndex() {
    const [startDate, setStartDate] = useState(new Date());
    const [finalDate, setFinalDate] = useState(new Date());

    const gerarRelatorio = (periodo) => {
        switch(periodo){
            case 'd':
                console.log('d');
                break;
            case 's':
                console.log('s');
                break;
            case 'm':
                console.log('m');
                break;
            default:
        }
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
            <section className='header'>
                <div className='relatorioIndex-header'>
                    <div className='logo-restaurante'>
                        <i class="fab fa-pagelines"></i>
                    </div>
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
                            selected={startDate}
                            onSelect={setStartDate}
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
                            selected={finalDate}
                            onSelect={setFinalDate} //when day is clicked
                            onChange={handleDateChange} //only when value has changed
                            locale={'ptbr'}
                            withPortal
                        />
                    </div>
                </div>


                <div className='relatorioIndex-botoes-container'>
                    <div className='relatorioIndex-botoes'>
                        <Button component={Link} to='relatorios-data' onClick={() => gerarRelatorio('d')} buttonSize='btn--medium' buttonStyle='btn--green'>RELATÓRIO DIÁRIO</Button>
                        <Button component={Link} to='relatorios-data' onClick={() => gerarRelatorio('s')} buttonSize='btn--medium' buttonStyle='btn--green'>RELATÓRIO SEMANAL</Button>
                        <Button component={Link} to='relatorios-data' onClick={() => gerarRelatorio('m')} buttonSize='btn--medium' buttonStyle='btn--green'>RELATÓRIO MENSAL</Button>
                    </div>
                    <div className='relatorioIndex-botoes botoes-inferior'>
                        <Button component={Link} to='/' buttonSize='btn--medium' buttonStyle='btn--red'>CANCELAR</Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default RelatorioIndex