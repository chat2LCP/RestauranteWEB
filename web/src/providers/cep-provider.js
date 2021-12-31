/* Serviço que consome a api do viaCEP */
import axios from "axios"

const CepProvider = (cep, setAddress) => {

    console.log(cep)
    
    // const findCep = (cep, set) => {
        axios.get(`https://viacep.com.br/ws/${cep}/json`)
        .then((response) => {
            setAddress(response.data)
            //console.log(response.data)
            // return response.data
        }) 
        .catch((err) => {
            console.log("erro ao buscar dados"+err)
        })
    // }
}

export default CepProvider