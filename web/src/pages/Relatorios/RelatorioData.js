import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './RelatorioData.scss'
import Button from '../../components/Button/Button'

function RelatorioData() {

    const [data, setData] = useState([{id: '1', nome: 'teste', pedido: '2', valor: '2,55'}])

    useEffect(() => {
        //fazer o get p pegar dados da tabela e grafico
    })

    return(
        <div className='relatorioData-container'>
            <section className='header'>
                <div className='relatorioData-header'>
                    <div className='logo-restaurante'>
                        <i class="fab fa-pagelines"></i>
                    </div>
                    <h1 className='relatorioData-titulo'>DRestaurante</h1>
                </div>
            </section>

            <section className="relatorioData-body">
                <div className='relatorioData-description'>
                    <h3>RELATÓRIOS</h3>
                    <span className='divider'></span>
                </div>

                <div className='relatorioData-tabela-grafico'>
                    <table className='tabela-dados-relatorio'>
                        <tr>
                            <th>Nome do cliente</th>
                            <th>item do pedido</th>
                            <th>valor</th>
                        </tr>
                        {
                            data.map((dado) => {
                                return(
                                    <tr key={dado.id}>
                                        <td>{dado.nome}</td>
                                        <td>{dado.pedido}</td>
                                        <td>{dado.valor}</td>
                                    </tr> 
                                )
                            })   
                        }
                    </table>
                </div>

                <div className='relatorioData-botoes'>
                    <Button component={Link} to='/relatorios' buttonSize='btn--medium' buttonStyle='btn--blue'>VOLTAR</Button>
                </div>
            </section>
        </div>
    )
}

export default RelatorioData