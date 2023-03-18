import React from 'react'
// import { faFileLines, faUpload} from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome'
import Campo from '../components/Campo'
import Descrition from '../components/Descrition'
import { Header } from '../components'

export default function Chamado() {
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Ticket" />
            <Campo text="Title " id= "Titulo" placeholder="Title" type="text"/>
            <label className="text-lg font-bold dark:text-black">Classification</label>
            <select defaultValue={'default'} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                <option value="default" disabled>Select an option:</option>
                <option>Hotfix</option>
                <option>Feature</option>
            </select>
            <Descrition/>
            {/* <Campo text="Description " id="Descrição" placeholder="Describe the ticket" type="text" icon={ faFileLines}></Campo> */}

        </div>

    )
}
