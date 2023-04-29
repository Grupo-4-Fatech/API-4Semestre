import React, { useEffect, useState, useMemo } from 'react';
import Pagination from '../../components/Paginacao/Pagination';
import { useStateContext } from '../../contexts/ContextProvider'
import { Header } from '../../components'
import { useAutenticacao } from '../../contexts/ContextUsuLogado.tsx';

const Swal = require('sweetalert2')

let PageSize = 5;

const ViewTicket = () => {
    const { currentColor } = useStateContext();
    const [currentPage, setCurrentPage] = useState(1);
    const headers = ['Titulo', 'Classificação', 'Editar', 'Arquivar', 'Aprovado']
    const [data, setData] = useState([])
    const [searchTerm, setSearchTerm] = useState('');

    const { usuario } = useAutenticacao();

    const userPermission = usuario?.role

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
                    classification: element.type == 1 ? "HOTFIX" : "FEATURE",

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
                    title: 'Ticket não arquivado',
                })
            }
            else {

                Swal.fire({
                    icon: 'success',
                    title: 'Ticket aprovado com sucesso',
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
                    title: 'Ticket não arquivado',
                })
            }
            else {

                Swal.fire({
                    icon: 'success',
                    title: 'Ticket arquivado com sucesso',
                })
                var updateData = data.filter(item => item.id != id)
                setData(updateData)

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
            <Header category="Pagina" title="Vizualização Ticket" />
            <div className="block relative">
                <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                        <path
                            d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                        </path>
                    </svg>
                </span>
                <input placeholder="Procurar" onChange={(e) => setSearchTerm(e.target.value)}
                    className="appearance-none rounded-r-lg border border-gray-400 border-b block pl-8 pr-6 py-2 w-44 bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400 content-center">
                        <tr>
                            {headers.map((header, index) => {
                                if (userPermission === 3 && index >= 3) {
                                    return null;
                                }
                                return (
                                    <th scope="col" className="px-6 py-3" key={header}>
                                        {header}
                                    </th>
                                );
                            })}
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
                                        <button onClick={() => { window.location.href = "/ticket/update/" + dat.id }} style={{ backgroundColor: currentColor }} className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20">Editar</button>
                                    </td>

                                    {/* Verificação para ocultar o botão 'Archive' */}
                                    {userPermission !== 3 && (
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                            <button onClick={(e) => Archive(dat.id, 2)} className='bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center right-20'>Arquivo</button>
                                        </td>
                                    )}

                                    {/* Verificação para ocultar o botão 'Approved' */}
                                    {userPermission !== 3 && (
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                            <button onClick={(e) => Aproved(dat.id, 3)} className='bg-green-500 text-white font-bold py-2 px-4 rounded inline-flex items-center right-20'>Aprovado</button>
                                        </td>
                                    )}

                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                    </td>
                                </tr>
                            );
                        })}
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