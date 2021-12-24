/* Serviço que consome a api do viaCEP */

import axios from "axios"

const CepProvider = {
    
    findCep: function(cep) {
        axios.get(`https://viacep.com.br/ws/${cep}/json`)
        .then((response) => {
            //console.log(response.data)
            return response.data
        }) 
        .catch((err) => {
            console.log("erro ao buscar dados"+err)
        })
    }
}

export default CepProvider