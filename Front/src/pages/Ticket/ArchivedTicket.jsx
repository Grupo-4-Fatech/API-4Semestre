import React, { useState, useEffect, useMemo } from 'react';
import Pagination from '../../components/Paginacao/Pagination';
import { Header } from '../../components'
import { useLanguage } from "../../contexts/contextLanguage";
import archivedTicktes from '../../utils/tradutor/ticket/tradutorArchivedTickets';


const Swal = require('sweetalert2')

let PageSize = 5;

const ArchivedTicket = () => {
    const { language } = useLanguage();
    const [currentPage, setCurrentPage] = useState(1);
    const headers = [archivedTicktes[language].headerTitulo, archivedTicktes[language].headerClassificacao, archivedTicktes[language].headerRestaurar, archivedTicktes[language].headerHistorico]
    const [data, setData] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [showModalHistorico, setShowModalHistorico] = React.useState(false);
    const [ticket, setTicket] = useState({ id: '', title: '', description: ``, classification: '' });
    const [loading, setLoading] = useState(false);

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
                    Summary: element.description,
                    classification: element.type == 1 ? "HOTFIX" : "FEATURE",

                })


            });
            setData(tickets)
        })
    }
    const restore = (id, status) => {
        setLoading(true);
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
                    title: archivedTicktes[language].swalError,
                })
                setLoading(false);
            }
            else {

                Swal.fire({
                    icon: 'success',
                    title: archivedTicktes[language].swalSucsses,
                })
                setLoading(false);
                var updateData = data.filter(item => item.id != id)
                setData(updateData)
            }
        })
    }
    
    const deleteTicket = (id) => {
        fetch("/ticket/delete", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ id: id })
        }).then((resposta) => resposta.json()).then((response) => {
            if (response.error) {
                Swal.fire({
                    icon: 'error',
                    title: archivedTicktes[language].swalErrorDelete,
                })
            }
            else {

                Swal.fire({
                    icon: 'success',
                    title: archivedTicktes[language].swalSucssesDeleted,
                })
                var deleteData = data.filter(item => item.id != id)
                setData(deleteData)
            }
        })
    }

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return data
            .filter((dat) =>
                dat.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .slice(firstPageIndex, lastPageIndex)
    }, [currentPage, data, searchTerm]);

    useEffect(() => {
        getData();
    }, [])
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category={archivedTicktes[language].page} title={archivedTicktes[language].pageTitle} />
            <div className="block relative">
                <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                        <path
                            d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                        </path>
                    </svg>
                </span>
                <input placeholder={archivedTicktes[language].placheSearch} onChange={(e) => setSearchTerm(e.target.value)}
                    className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-44 bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
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
                            <tr key={dat.id} className="bg-white hover:bg-gray-50 dark:hover:bg-gray-300 content-center">
                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                    {dat.title}
                                </td>
                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                    {dat.classification}
                                </td>

                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                    <button
                                        onClick={(e) => restore(dat.id, 1)}
                                        disabled={loading === true}
                                        className="bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center right-20">
                                        {archivedTicktes[language].restaurarButton}
                                    </button>
                                </td>

                                {/* <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                    <button onClick={(e) => deleteTicket(dat.id)} className="bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center right-20">{archivedTicktes[language].deletarButton}</button>
                                </td> */}
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                    <button
                                        className="bg-botaohistorico text-white font-bold py-2 px-4 rounded inline-flex items-center right-20"
                                        onClick={() => { setTicket({ id: dat.id, title: dat.title, description: dat.Summary, classification: dat.classification }); setShowModalHistorico(true); }}
                                    >
                                        {archivedTicktes[language].historicoButton}
                                    </button>
                                </td>
                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
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
            <>
                {showModalHistorico ?
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-4/6 my-6">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex p-5 pb-0 border-b border-solid border-slate-200 rounded-t">
                                        <div className='p-2'>
                                            {ticket.classification == 'Hotfix' ?
                                                <span className="p-1 text-[13px] rounded-full bg-red-500 text-white">{ticket.classification}</span>
                                                :
                                                <span className="p-1 text-[13px] rounded-full bg-cyan-400 text-white">{ticket.classification}</span>
                                            }
                                        </div>
                                        <h3 className="text-1 font-semibold p-2 text-left">
                                            {ticket.title}
                                        </h3>
                                    </div>
                                    {/*body*/}

                                    <div id='description' className="relative max-h-72 p-6 max-w-3x1 overflow-scroll m-6" dangerouslySetInnerHTML={{ __html: ticket.description }} />
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-white rounded-full bg-red-600  hover:bg-red-800 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModalHistorico(false)}
                                        >
                                            {archivedTicktes[language].closeButton}

                                        </button>
                                        <button
                                            className="text-white rounded-full bg-botaohistorico  hover:bg-green-900 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => { window.location.href = "/historic/" + ticket.id }}
                                        >
                                            {archivedTicktes[language].historicoButton}
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                    : null}
            </>
        </div>

    );
};

export default ArchivedTicket;