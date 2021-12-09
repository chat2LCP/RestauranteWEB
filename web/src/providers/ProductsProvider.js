import axios from 'axios'

//EU NAO CONSEGUI RETORNAR O response.data PARA O COMPONENTE PRODUCTS
//POR ISSO NÃO ESTOU USANDO ESSE SERVIÇO, AINDA.
const ProductsProvider = {
    
    getProducts: function() {
        axios.get('http://localhost:5000/products?_embed=comments')
        .then((response) => {
            console.log('data '+response.data)
            return response.data
            // response.data.map((product) => {
            //     return product
            //     // console.log('data '+product.title)
            // })
        })
    }   
}

export default ProductsProvider
