import React from 'react'
import { useStateContext } from '../../contexts/ContextProvider';

export default function NotFound() {
    const { setNotFound } = useStateContext();
    setNotFound(false);
    return (
        <div>
            <h1 class="font-bold text-4xl dark:text-gray-200 text-gray-700 text-center m-20">Página não encontrada.</h1>
        </div>
    )
}
