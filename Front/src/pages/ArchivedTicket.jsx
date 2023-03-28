import React, { useState, useEffect } from 'react';
import { useStateContext } from '../contexts/ContextProvider'
const Swal = require('sweetalert2')


const ViewTicket = () => {
    const { currentColor } = useStateContext();

    const headers = ['Title', 'Classification', 'Restore']
    const [data, setData] = useState([])
    function getData(){
        fetch("/ticket/getAll/2", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then((resposta) => resposta.json()).then((data) => {
            var tickets = []
           data.forEach(element => {
            tickets.push({
                id: element.id,
                title: element.title,
                classification: element.type == 1? "HOTFIX": "FEATURE",

            })
            
            
           });
           setData(tickets)
        })
    }
    const restore = (id, status) => {
        fetch("/ticket/updateStatus", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ id: id, status: status })
        }).then((resposta) => resposta.json()).then((data) => {
            if (data.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ticket not restored',
                })
            }
            else {
                var updateData = data.filter(item=> item.id != id)
                setData(updateData)
                Swal.fire({
                    icon: 'success',
                    title: 'Ticket restored successfully',
                })

            }
            console.log(data)
        })
      

    }

    useEffect(()=>{
        getData();
    }, [])
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
                            
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                <button onClick ={(e)=> restore(dat.id, 1)} className="bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center right-20">Restore</button>
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