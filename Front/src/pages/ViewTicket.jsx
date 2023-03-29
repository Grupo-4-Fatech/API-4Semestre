import React, { useEffect, useState, useMemo } from 'react';
import Pagination from '../components/Paginacao/Pagination';
import { useStateContext } from '../contexts/ContextProvider'
const Swal = require('sweetalert2')

let PageSize = 5;

const ViewTicket = () => {
    const { currentColor } = useStateContext();
    const [currentPage, setCurrentPage] = useState(1);
    const headers = ['Title', 'Classification', 'Edit', 'Archive', 'Approved']
    const [data, setData] = useState([])
    function getData() {
        fetch("/ticket/getAll/1", {
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
                    classification: element.type === 1 ? "HOTFIX" : "FEATURE",

                })


            });
            setData(tickets)
        })
    }
    const Aproved = (id, status) => {
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
                    title: 'Ticket not archived',
                })
            }
            else {

                Swal.fire({
                    icon: 'success',
                    title: 'Ticket approved successfully',
                })
                var updateData = data.filter(item => item.id != id)
                setData(updateData)

            }

        })


    }
    const Archive = (id, status) => {
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
                    title: 'Ticket not archived',
                })
            }
            else {

                Swal.fire({
                    icon: 'success',
                    title: 'Ticket archived successfully',
                })
                var updateData = data.filter(item => item.id != id)
                setData(updateData)

            }

        })
    }

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return data.slice(firstPageIndex, lastPageIndex)
    }, [currentPage]);

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
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
                        {currentTableData.map(dat => {
                            return (
                                <tr key={dat.id} className="bg-white hover:bg-gray-50 dark:hover:bg-gray-300 content-center">
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                        {dat.title}
                                    </td>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                        {dat.classification}
                                    </td>

                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                        <button onClick={() => { window.location.href = "/ticket/" + dat.id }} style={{ backgroundColor: currentColor }} className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20">Edit</button>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                        <button onClick={(e) => Archive(dat.id, 2)} className="bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center right-20">Archive</button>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                        <button onClick={(e) => Aproved(dat.id, 3)} className="bg-green-500 text-white font-bold py-2 px-4 rounded inline-flex items-center right-20">Aproved</button>
                                    </td>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <Pagination
                    currentPage={currentPage}
                    totalCount={data.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                />
            </div>

        </div>
    );
};

export default ViewTicket;