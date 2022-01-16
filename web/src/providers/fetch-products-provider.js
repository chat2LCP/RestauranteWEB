/*******************************************
 * Função responsável por fazer o fetch de produtos
 * para outros elementos
 * 
 * @param url endpoint que retorna o array de produtos
 * @returns Promise
 *******************************************/
 export const fetchProducts = (url) => {
    return new Promise((resolve, reject) => {
        //fetch é uma API JavaScript que funciona como o axios, para fazer requisições HTTP
        fetch(url, {cache: 'force-cache'})  //force-cache é para forçar o browser a buscar o array de estados no seu cache antes de fazer uma nova requisição à API
        .then(response => {
            if(!response.ok){   //essa verificação é porque o fecth() retorna uma response (Promise) mesmo que tenha havido algum erro no get (erro 404, por exemplo)
                throw new Error('Cannot fetch url - Status: '+response.status)
            }
            return response.json() //o axios converte o body da response em json automaticamente, o fetch() não. O método .json() vai pegar o body que vier da resposta do fecth e transformar isso em um objeto json (se fizer console.log(response) eu vou ver que response, na verdade, é o cabeçalho do pacote devolvido pela requisição fetch()) em formato de Promisse
        }) 
        .then(resolve)  //lança o resolve caso tudo ocorra bem com o fetch. Ele indica que a Promise do fecth foi resolvida e está tudo OK, esse then acessa a Promise retornada pelo then anterior. O then sempre precisa retornar uma Promisse. O resolve e o reject são funções que retornam promises com o resultado retornado na promise anteriormente resolvida ou rejeitada
        .catch(reject)  //lança o reject caso algo tenha dado errado
    })
}