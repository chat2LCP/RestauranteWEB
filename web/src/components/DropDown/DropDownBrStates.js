import React from "react"
import { useEffect, useState } from "react"

const DropDownBrStates = () => {

    const [states, setStates] = useState([])

    useEffect(() => {
        doGet('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(setStates).catch(console.error)
    }, [])


    /*******************************************
     * Função responsável por fazer o fetch dos estados brasileiros 
     * que estão no elemento < select > do formulário
     * 
     * @param url endpoint que retorna o array de estados brasileiros
     * @returns Promise
     *******************************************/
    const doGet = (url) => {
        return new Promise((resolve, reject) => {
            //fetch é uma API JavaScript que funciona como o axios, para fazer requisições HTTP
            fetch(url)
            .then(response => {
                if(!response.ok){   //essa verificação é porque o fecth() retorna uma response (Promise) mesmo que tenha havido algum erro no get (erro 404, por exemplo)
                    throw new Error('Cannot fetch url - Status: '+response.status)
                }
                return response.json() //o axios converte a response em json automaticamente, o fetch() não
            }) 
            .then(resolve)  //lança o resolve caso tudo ocorra bem com o fetch. Ele indica que a Promise do fecth foi resolvida e está tudo OK, esse then acessa a Promise retornada pelo then anterior. O then sempre precisa retornar uma Promisse. O resolve e o reject são funções que retornam promises com o resultado retornado na promise anteriormente resolvida ou rejeitada
            .catch(reject)  //lança o reject caso algo tenha dado errado
        })
    }

    return (
        <select
            className="form-control form-select"  //form-control e form-select são classes do bootstrap
            name="state"
            id="state"
        >
            {states.map(state => {
                return (
                    <option key={state.id}>{state.nome}</option>
                )
            })}
        </select>
    )
}

export default DropDownBrStates