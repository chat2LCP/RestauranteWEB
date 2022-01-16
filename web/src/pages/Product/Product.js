import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import './Product.scss'
import { getCep } from "../../providers/cep-provider"
import { fetchProducts } from "../../providers/fetch-products-provider"

const Product = () => {

    const { productId } = useParams() //retorna o id do produto, que é o parâmetro da rota para o produto selecionado
    const [productDetails, setProductDetails] = useState({})
    const [cep, setCep] = useState(null)
    const miniatures = [{ id: 1, path: '/images/miniature1.jpg' }, { id: 2, path: './images/miniature2.jpg' }, { id: 3, path: './images/miniature3.jpg' }, { id: 4, path: './images/miniature4.jpg' }]


    /************************************************
    * constante do yup (validação dos campos do form) - 
    * o yup não é obrigatorio para fazer as validações, eu 
    * poderia fazer as mesmas validações só com o react-hook-form,
    * a vantagem do yup é que voce consegue tirar a validação da 
    * tag html e fazer ela aqui separada, fica mais legível assim
    *************************************************/
    const validationSchema = yup.object().shape({
        cep: yup
        .string()
        .matches(/^[0-9]+$/, "CEP not valid")
        .matches(/\d{8}/, "CEP not valid")
        .length(8, "CEP not valid")
        .required(),
    })


    /************************************************
    * constantes do react-hook-form para manipular o formulário
    *************************************************/
    const { 
        register,       //register registra cada uma das inputs dentro do hok
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(validationSchema),  //aplica a validação do yup no formulário
    })

    /************************************************
     * Handler que faz a busca do cep digitado pelo usuário
     * é chamado ao fazer submite do cep digitado no formulário
     * 
     * @param cep O CEP que se deseja buscar os dados
     * @returns void
     * ***********************************************/
     const findCep = (data) => {
        // setTimeout(() => {
            getCep(data.cep)
            .then(setCep)
            .catch(console.error) //caso seja submetido um cep incorreto
        // }, 3000)     
    }


    /*************************************************
     * useEffect que recupera as informações do produto selecionado
     * por meio do parâmetro da rota (id do produto)
     *************************************************/
    useEffect(() => {
        let isSubscribed = true //evita que o setProductDetails seja executado caso o componente esteja desmontado

        fetchProducts('http://localhost:3000/static/prods.json')
            .then(resp => resp.filter(p => p.id == productId))
            .then(product => isSubscribed ? setProductDetails(product[0]) : null)
            .catch(console.error)

        return () => (isSubscribed = false) //cancela a inscrição quando o elemento for desmontado
    }, [])


    /*************************************************
     * useEffect que preenche as estrelas de avaliação do produto e
     * inicializa a imagem principal do produto no quadro de imagens
     *************************************************/
    useEffect(() => {
        fillRatingStars()
        changeMainImg(miniatures[0])    //esse método precisa atualizar quando o productDetails atualiza?
    }, [productDetails])


    /************************************************
     * Método que preenche as estrelas a depender do valor da avaliação dos clientes para aquele produto
     *
     *  @returns void
     * ***********************************************/
    const fillRatingStars = () => {
        const starsWidth = document.getElementById('colored-stars')
        const ratingValue = productDetails.rating
        const percentOfColor = (ratingValue * 100) / 5

        starsWidth.style.width = `${percentOfColor}%`
    }


    /************************************************
    * Método que atualiza o nome da cor do produto com base da propriedade 'colors' do produto atual selecionado 
    * 
    * @returns void
    *************************************************/
    const changeColorName = (event) => {
        //o id, nesse caso, já é o código da cor, por isso posso fazer dessa forma
        const selectedColor = event.target.id
        //'color-name' é a span que mostra o nome da cor selecionada
        const colorName = document.getElementById('color-name')
        //atribui o nome da cor no innerText da span  
        colorName.innerText = selectedColor
    }


    /************************************************
     * Método que faz o scroll da janela para a section 'payment-options' ao clicar no link 'More payment methods'
     * 
     * @returns void
     * ***********************************************/
    const goToPaymentOptions = () => {
        const element = document.getElementById('payment-options')
        element?.scrollIntoView({ behavior: "smooth" });
    }


    /************************************************
     * Método que faz a troca da imagem principal do produto sempre que for clicado em uma miniatura
     * 
     * @param miniatureUrl String contendo a url da imagem em minitura clicada
     * @returns void
     * ***********************************************/
    const changeMainImg = (miniatureUrl) => {
        const mainImg = document.getElementById('main-img')

        //só faz a troca e as animações se a imagem clicada for diferente da imagem atual
        if (miniatureUrl != mainImg?.getAttribute('src')) {
            mainImg?.animate([
                { opacity: 1 },
                { opacity: 0 },
            ], {
                duration: 210,
            })

            //precisa do setTimeout porque eu só posso alterar a src da imagem sepois que a animação da imagem anterior terminar
            setTimeout(() => {
                mainImg?.setAttribute('src', miniatureUrl)
                mainImg.animate([
                    { opacity: 0 },
                    { opacity: 1 }
                ], {
                    duration: 300,
                })
            }, 200) //inicia um pouco antes da animação da imagem antiga terminar para evitar uns pequenos bugs na transição
        }
    }


    /************************************************
     * 
     * @param
     * @returns 
     * ***********************************************/
    const formataCEP = (event) => {
        const cep = document.getElementById('teste')

        //console.dir(cep)

        // cep!.statusChanges.pipe( 	//statusChanges é um observable que emite um evento sempre que o status dos validators do campo/controle cep forem alterados, nesse caso, o status muda a cada valor digitado na input, ele vai ficar sempre mudando de INVALID para INVALID até o penultimo digito do cep, quando digitar o ultimo, ele muda para VALID
        // 	distinctUntilChanged(), //essa função só faz rodar a linha de baixo quando o status for modificado, nesse caso, como o CEP precisa ter 8 digitos para ser válido (isso foi definido no validator) ele vai imprimir o status inválido, inicialmente e, só após digitar o oitavo digito, ele vai imprimir na tela de novo o novo status de 'válido'. Sem essa função o programa ficaria imprimindo inválido a cada digito que eu colocasse do cep (até o 7º digito, depois imprimiria 'valido')
        // 	switchMap(status => status === 'VALID'? this.getCepService.findCep(cep!.value) : of({}))  //o método consultaCep() retorna um observable (que é a chamada http lá do viaCep) - of({}) é um observable que emite os argumentos passados para ele e completa sem erros; como, nesse caso, não estou passando argumentos, ele envia um observable vazio, isso porque o operador switchMap() precisa que sejam retornados observables
        // )
        // .subscribe(data => data ? this.populateDataForm(data) : {});
    }


    return (
        <div className="product-details-container">
            <section className="breadcrumb-sec">
                <ul className="breadcrumb" aria-label="breadcrumb">
                    <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                    <li className="breadcrumb-item"><Link to='/products'>Products</Link></li>
                    <li className="breadcrumb-item"><Link to='/'>{productDetails.category}</Link></li>
                </ul>
            </section>

            <section className="curr-prod-container-sec">
                <div className="curr-prod-caption">
                    {productDetails.description}
                </div>

                <div className="curr-prod-details">
                    <div className="curr-prod-media">
                        <ul className="curr-prod-miniatures">
                            {miniatures.map(({ path, id }) => {
                                return (
                                    <li key={id}>
                                        <a>
                                            <img src={path} loading="lazy" />
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>

                        <a className="curr-prod-main-img">
                            <img id="main-img" loading="lazy" />
                        </a>
                    </div>

                    <div className="curr-prod-sell-infos">
                        <div className="client-rating-bar">
                            <div className="stars">
                                <div className="background-stars">
                                    <div className="stars-percent">★</div>
                                    <div className="stars-percent">★</div>
                                    <div className="stars-percent">★</div>
                                    <div className="stars-percent">★</div>
                                    <div className="stars-percent">★</div>
                                </div>
                                <div className="colored-stars" id="colored-stars">
                                    <div className="stars-percent">★</div>
                                    <div className="stars-percent">★</div>
                                    <div className="stars-percent">★</div>
                                    <div className="stars-percent">★</div>
                                    <div className="stars-percent">★</div>
                                </div>
                            </div>
                            <div className="rating-values">
                                <span>{productDetails.rating}</span>
                                <span>({productDetails.numberOfEvaluations})</span>
                            </div>
                        </div>

                        <div className="seller-identification">
                            Sold by <a href='http://www.google.com'>{productDetails.seller} <img src="assets/brand-logo.png" /></a><br />
                            Shipped by <a href='http://www.google.com'>{productDetails.shipper}</a>
                        </div>

                        <div className="price">
                            <div className="total-discount">
                                {productDetails.discountPercent != 0 ?
                                    (
                                        <>
                                            <div className="no-discount-price"> from $ {productDetails.oldPrice}</div>

                                            <div className="discount-price">
                                                to { }
                                                <span className="final-price">
                                                    $ {productDetails.price}
                                                </span>
                                                { } in cash { }
                                                <span className="total-discount">
                                                    ({productDetails.discountPercent}% discount)
                                                </span>
                                            </div>
                                        </>
                                    )
                                    :
                                    (
                                        <div className="final-price">
                                            <span>
                                                $ {productDetails.price}
                                            </span>
                                            a vista
                                        </div>
                                    )
                                }
                            </div>
                        </div>


                        {/* <div className="product-colors" *ngIf="productDetails.colors[0] != null"> */}
                        <div className="product-colors">
                            Color <span id="color-name"> </span>

                            <div className="colors-container">
                                {/* <div *ngFor="let color of productDetails.colors">
                                <input id={{ color }} name="inp-name" type="radio" (click)="changeColorName($event)">

                                <label for={{ color }} className="color-option" [ngStyle]="{'background-color': color}">
                                    <i className="bi bi-check-circle-fill check-symbol"></i>
                                </label>
                            </div> */}
                            </div>
                        </div>

                        <div className="payment">
                            <a type="button" onClick={goToPaymentOptions}>More payment methods</a>
                        </div >

                        <div className="add-to-cart-container">
                            <Link className="btn-add-to-cart" type="button" to='/'>
                                <i className="bi bi-basket3"></i>
                                Add to your shopping cart
                            </Link>
                        </div>

                        <div className="calc-frete-container">
                            <span>
                                Consultar prazo e valor do frete
                            </span>

                            <div className="formcep-anchor-frete-container">
                                <form className="form formcep" onSubmit={handleSubmit(findCep)}>               
                                    <input 
                                        id="cep" 
                                        name="cep"
                                        type="text" 
                                        className="form-control" 
                                        aria-label="text" 
                                        onKeyUp={formataCEP} 
                                        placeholder="000000000"                                     
                                        {...register("cep")} 
                                    />
                                    <button type="submit" aria-label="Get CEP">OK</button>
                                
                                    <a target="_blank" href="https://buscacepinter.correios.com.br/app/endereco/index.php">Don't know my CEP</a>
                                </form>                          

                                <p className='error-message'>{errors.cep?.message}</p>
                            </div>

                            <div className="frete-details">
                                { 
                                    (cep != null && !errors.cep) && //cep != null é pq o valor de cep é null assim que a componente é montado, errors.cep é o retorno das validações feitas pelo yup
                                    (   
                                        !cep.erro?  //cep.erro é retornado pelo viaCep quando é submetido um cep que não existe, não é uma boa variavel p usar aqui
                                        (
                                            <>
                                                <p className="address">
                                                    {cep.logradouro} - {cep.bairro} - {cep.localidade}
                                                </p>

                                                <table className="address-table">
                                                    <tbody>
                                                        <tr className="table-row">
                                                            <td className="shipping-info">
                                                                <span>
                                                                    Receba em até 2 dias úteis
                                                                </span>
                                                                <p>
                                                                    Após a confirmação do pagamento
                                                                </p>
                                                            </td>
                                                            <td className="frete-value">
                                                                $ 15.00
                                                                {/* {{ valorDoFrete | currency }} */}
                                                            </td>
                                                        </tr>

                                                        <tr className="table-row">
                                                            <td>
                                                                <span>
                                                                    Retire na loja em 2 horas
                                                                </span>
                                                                <p>
                                                                    Após aprovação da compra, verifique
                                                                    o horário de funcionamento da loja.
                                                                </p>
                                                            </td>
                                                            <td className="frete-free">
                                                                Frete Grátis
                                                                {/* {{ valorDoFrete | currency }}*/}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <p className="frete-disclaimer">
                                                    Os prazos de entrega começam a contar a partir da
                                                    confirmação de pagamento e podem variar para mais de
                                                    uma unidade de um mesmo produto.
                                                </p>
                                            </>
                                        )
                                        :
                                        (   
                                            // se eu digitar um cep errado e submeter e digitar um correto em seguida ele não funciona
                                            <p className='error-message'>errado</p>
                                        )
                                    )
                                    // :
                                    // (
                                    //     // NÂO ESTA FUNCIONANDO PORQUE AQUI NESSE LUGAR ELE NUNCA VAI SER RENDERIZADO
                                    //     <div className="spinner-container">
                                    //         <div className="spinner-border spin text-warning" role="status">
                                    //         </div>
                                    //     </div>
                                    // )
                                }
                            </div >
                        </div>
                    </div>
                </div>
            </section>

            <section className="related-products-sec">
                <h1>Related products</h1>

                <div className="related-products-container">
                    Seção carrossel de produtos relacionados
                </div>
            </section>

            <section className="curr-prod-complete-details-sec">
                <h1>Product information</h1>

                <div className="curr-prod-complete-details-container">
                    Seção dos detalhes completos do produto
                </div>
            </section>

            <section className="clients-rating-sec">
                <h1>Client evaluation</h1>

                <div className="clients-rating-container">
                    Seção de avaliação de clientes
                </div>
            </section>

            <section className="payment-options-sec" id="payment-options">
                <h1>Payment Methods</h1>

                <div className="payment-method-container">
                    <i className="bi bi-credit-card"></i>

                    <h2>Credit cards</h2>

                    <div className="credit-card">
                        <div className="general-cards">
                            <ul className="general cards-container">
                                <li className="credit-card-icon icon-visa"></li>
                                <li className="credit-card-icon icon-mastercard"></li>
                                <li className="credit-card-icon icon-diners"></li>
                                <li className="credit-card-icon icon-americanexpress"></li>
                                <li className="credit-card-icon icon-elo"></li>
                            </ul>

                            <div className="price-method">
                                {/* 1x de {{ productDetails.originalPrice | currency }} sem juros<br/>
                                2x de {{ productDetails.originalPrice / 2 | currency }} sem juros<br/>
                                3x de {{ productDetails.originalPrice / 3 | currency }} sem juros<br/>
                                4x de {{ productDetails.originalPrice / 4 | currency }} sem juros<br/> */}
                                1x de {productDetails.oldPrice} sem juros<br />
                                2x de {productDetails.oldPrice / 2} sem juros<br />
                                3x de {productDetails.oldPrice / 3} sem juros<br />
                                4x de {productDetails.oldPrice / 4} sem juros<br />
                            </div>
                        </div>

                        <div className="brand-cards">
                            <ul className="brand cards-container">
                                <li className="credit-card-icon icon-brand1"></li>
                                <li className="credit-card-icon icon-brand2"></li>
                            </ul>

                            <div className="price-method">
                                {/* 1x de {{ productDetails.originalPrice | currency }} sem juros<br> */}
                                {/* 5x de {{ (productDetails.originalPrice / 5) + 3 | currency}} */}
                                1x de {productDetails.oldPrice} sem juros<br />
                                5x de {(productDetails.oldPrice / 5) + 3}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="payment-method-container">
                    <i className="bi bi-upc"></i>
                    <h2>Boleto</h2>
                    <div className="boleto price-method">
                        {/* {{ productDetails.originalPrice | currency }} in cash */}

                        {productDetails.oldPrice} in cash
                    </div>
                </div>

                <div className="payment-method-container">
                    <i className="bi bi-phone"></i>
                    <h2>PIX</h2>
                    <div className="pix price-method">
                        {/* { productDetails.originalPrice | currency } in cash */}

                        {productDetails.oldPrice} in cash
                    </div>
                </div>
            </section>

            {/* <ng-template #spinner>
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only"></span>
                </div>
            </ng-template> */}
        </div>
    )
}

export default Product