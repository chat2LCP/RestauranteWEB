import axios from "axios";

const getIp = async () => {    
    // try{
    //     const resp =  await axios.get('http://meuip.com/api/meuip.php')

    //     console.log('resp.data '+resp.data)

    //     return resp.data
    // } catch (err){
    //     console.log('Erro: ', err)
    // }

    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        console.log(response);
      } catch (error) {
        console.error(error);
      }

}

export { getIp }