import React from 'react'
import { MdSend } from 'react-icons/md';
import Campo from '../components/Campo'
import Descrition from '../components/Descrition'
import { Button, Header } from '../components'
import { useStateContext } from '../contexts/ContextProvider'

export default function Chamado() {
    const { currentColor } = useStateContext();
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Ticket" />
            <Campo text="Title " id="Titulo" placeholder="Title" type="text" />
            <label className="text-lg font-bold dark:text-black">Classification</label>
            <select defaultValue={'default'} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                <option value="default" disabled>Select an option:</option>
                <option>Hotfix</option>
                <option>Feature</option>
            </select>
            <Descrition />
            <div className="mt-5 mb-5 flex" >
                <button style={{ backgroundColor: currentColor, position: 'absolute' }} className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20">
                    <span className='pr-1'>Send</span>
                    <MdSend />
                </button>
            </div>
        </div>

    )
}
