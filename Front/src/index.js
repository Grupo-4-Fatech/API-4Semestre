import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App';
import { ContextProvider } from './contexts/ContextProvider'
import AutenticacaoProvider from './contexts/ContextUsuLogado.tsx';


ReactDOM.render(
    <AutenticacaoProvider>
        <ContextProvider>
            <App />
        </ContextProvider>
    </AutenticacaoProvider>,
    document.getElementById('root')
)