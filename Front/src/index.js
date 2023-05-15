import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App';
import { ContextProvider } from './contexts/ContextProvider'
import AutenticacaoProvider from './contexts/ContextUsuLogado.tsx';
import LanguageProvider from './contexts/contextLanguage.js'


ReactDOM.render(
    <AutenticacaoProvider>
        <LanguageProvider>
            <ContextProvider>
                <App />
            </ContextProvider>
        </LanguageProvider>
    </AutenticacaoProvider>,
    document.getElementById('root')
)