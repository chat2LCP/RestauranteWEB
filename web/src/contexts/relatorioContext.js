import { createContext, React, useContext, useState } from 'react'

const RelatorioContext = createContext()

const RelatorioProvider = ({children}) => {
    const [dataInicial, setDataInicial] = useState(new Date())
    const [dataFinal, setDataFinal] = useState(new Date())
    const [periodoRelatorio, setPeriodoRelatorio] = useState('')

    return(
        <RelatorioContext.Provider value={{
            dataInicial,
            dataFinal, 
            periodoRelatorio,
            setDataInicial,
            setDataFinal,
            setPeriodoRelatorio,
        }}>
            {children}
        </RelatorioContext.Provider>
    )
}

const useRelatorio = () => {
    const context = useContext(RelatorioContext);
    return context;
}

export { RelatorioContext, RelatorioProvider, useRelatorio }