import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//renderiza o App.js dentro da div de id="root" (que está no index.html)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);



