import { createContext, React, useContext, useState } from 'react'

const PedidoContext = createContext()

const PedidoProvider = ({children}) => {
    const [pedido, setPedido] = useState({nomeCliente: '', numeroFicha: 0})

    return(
        <PedidoContext.Provider value={{pedido, setPedido}}>
            {children}
        </PedidoContext.Provider>
    )
}

const usePedido = () => {
    const context = useContext(PedidoContext);
    return context;
}

export { PedidoContext, PedidoProvider, usePedido }