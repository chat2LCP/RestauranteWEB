import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { PedidoProvider } from './contexts/pedidoContext';

ReactDOM.render(
    <PedidoProvider>
        <App />
    </PedidoProvider>,
    document.getElementById('root'));



