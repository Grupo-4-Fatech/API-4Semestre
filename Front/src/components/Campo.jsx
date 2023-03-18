import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function Campo({ id, text, placeholder, type, min, icon, qtdMax,}) {
  return (
    <>

      <label className="text-lg font-bold dark:text-black" htmlFor={id}>{text}</label>
      <div className='mb-6 flex'>
        {icon && <FontAwesomeIcon icon={icon} className='block p-2.5 fa-xl' />}
        <input maxLength={qtdMax} min={min} id={id} placeholder={placeholder} name={id} type={type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
    </>
  )
}
