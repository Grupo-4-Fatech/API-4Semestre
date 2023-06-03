import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function CampoSolution({ id, text, placeholder, type, min, icon, qtdMax, value, setValue }) {
    return (
        <>

            <label className="text-lg pl-2 pr-2 font-bold dark:text-black" htmlFor={id}>{text}</label>
            <div className='mb-6 pr-2 pl-2 flex'>
                {icon && <FontAwesomeIcon icon={icon} className='block p-2.5 fa-xl' />}
                {/* <input cols="40" rows="5" value={value} onChange={(e) => setValue(e.target.value)} maxLength={qtdMax} min={min} id={id} placeholder={placeholder} name={id} type={type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" required /> */}
                <textarea id="message" rows="4" value={value} onChange={(e) => setValue(e.target.value)} maxLength={qtdMax} min={min} id={id} placeholder={placeholder} name={id} type={type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
            </div>
        </>
    )
}
