import React from 'react'
import { useStateContext } from '../../contexts/ContextProvider';
import { useLanguage } from "../../contexts/contextLanguage";
import tradutorNotFound from '../../utils/tradutor/notFound/tradutorNotFound';


export default function NotFound() {
    const { setNotFound } = useStateContext();
    const { language } = useLanguage();

    setNotFound(false);
    return (
        <div>
            <h1 class="font-bold text-4xl dark:text-gray-200 text-gray-700 text-center m-20">{tradutorNotFound[language].notFound}</h1>
        </div>
    )
}
