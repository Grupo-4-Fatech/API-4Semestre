import React, { useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider'
const Swal = require('sweetalert2')


const ViewTicket = () => {
    const { currentColor } = useStateContext();

    const headers = ['Title', 'Classification', 'Status', 'Edit', 'Archive', 'Approved']
    const [data, setData] = useState([
        { title: 'Conexão banco de dados', classification: 'Hotfix', status: "status" },
        { title: 'Página de suporte', classification: 'Feature', status: 'Em andamento' },
        { title: 'Puxando Id Ticket', classification: 'Feature', status: 'Arquivado' },
        { title: 'Criação Ticket', classification: 'Hotfix', status: 'Aprovado' },
    ])

    const Aproved = (title, newStatus) => {
        const updateData = data.map(item => {
            if (item.title === title) {
                return {...item, status: newStatus='Approved'};
        }else {
            Swal.fire({
                icon: 'success',
                title: 'Approved with success',
            })
            return item
        }
        })
        setData(updateData)

}
const Archive = (title, newStatus) => {
    const updateData = data.map(item => {
        if (item.title === title) {
            return {...item, status: newStatus='Archived'};
            
    }else {
        Swal.fire({
            icon: 'success',
            title: 'Archived with success'
        })
        return item
    }
    })
    setData(updateData)

}

return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400 content-center">
                    <tr>
                        {headers.map((header) =>
                            <th scope="col" class="px-6 py-3">
                                {header}
                            </th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((dat) =>
                        <tr class="bg-white hover:bg-gray-50 dark:hover:bg-gray-300 content-center">
                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                {dat.title}
                            </td>
                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                {dat.classification}
                            </td>
                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                {dat.status}
                            </td>
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                <button style={{ backgroundColor: currentColor }} className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20">Edit</button>
                            </td>
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                <button onClick ={(e)=> Archive(dat.title)} className="bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center right-20">Archive</button>
                            </td>
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                <button onClick={(e)=> Aproved(dat.title)} className="bg-green-500 text-white font-bold py-2 px-4 rounded inline-flex items-center right-20">Aproved</button>
                            </td>
                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                            </td>

                        </tr>
                    )}
                </tbody>
            </table>
        </div>

    </div>
);
};

export default ViewTicket;