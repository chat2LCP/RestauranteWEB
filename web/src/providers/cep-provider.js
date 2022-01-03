import axios from "axios"

export async function getCep(cep){
    try{
        const url = `https://viacep.com.br/ws/${cep}/json`
        const resp =  await axios.get(url)
        return resp.data
    } catch (err){
        console.log('Erro: ', err)
    }
}

// export const getCep = (cep) => {
//     return new Promise((resolve, reject) => {
//         const url = `https://viacep.com.br/ws/${cep}/json`
        
//         axios.get(url, {cache: 'force-cache'})
//         .then(response => response.data) 
//         .then(resolve)
//         .catch(reject)
//     })
// }