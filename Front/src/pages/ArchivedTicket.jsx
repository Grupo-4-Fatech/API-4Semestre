import React, { useState, useEffect, useMemo } from 'react';
import Pagination from '../components/Paginacao/Pagination';
const Swal = require('sweetalert2')

let PageSize = 5;


const ViewTicket = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const headers = ['Title', 'Classification', 'Restore','Delete']
    const [data, setData] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    function getData() {
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
                    classification: element.type == 1 ? "HOTFIX" : "FEATURE",

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
        }).then((resposta) => resposta.json()).then((response) => {
            if (response.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ticket not restored',
                })
            }
            else {

                Swal.fire({
                    icon: 'success',
                    title: 'Ticket restored successfully',
                })
                var updateData = data.filter(item => item.id != id)
                setData(updateData)
            }
        })
    }

    const deleteTicket = (id) => {}

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return data
            .filter((dat) =>
                dat.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .slice(firstPageIndex, lastPageIndex)
    }, [currentPage,data, searchTerm]);

    useEffect(() => {
        getData();
    }, [])
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <div class="block relative">
                <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                    <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-gray-500">
                        <path
                            d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                        </path>
                    </svg>
                </span>
                <input placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)}
                    class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-44 bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400 content-center">
                        <tr>
                            {headers.map((header) =>
                                <th scope="col" className="px-6 py-3" key={header}>
                                    {header}
                                </th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {currentTableData.map((dat) =>
                            <tr className="bg-white hover:bg-gray-50 dark:hover:bg-gray-300 content-center">
                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                    {dat.title}
                                </td>
                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                    {dat.classification}
                                </td>

                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                    <button onClick={(e) => restore(dat.id, 1)} className="bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center right-20">Restore</button>
                                </td>

                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                    <button onClick={(e) => deleteTicket(dat.id)} className="bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center right-20">Delete</button>
                                </td>


                                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                </td>

                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Pagination
                currentPage={currentPage}
                totalCount={data.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </div>
    );
};

export default ViewTicket;