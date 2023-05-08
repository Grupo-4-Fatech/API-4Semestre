import React, { useEffect, useState, useMemo } from 'react';
import Pagination from '../../components/Paginacao/Pagination';
import { useStateContext } from '../../contexts/ContextProvider'
import { Header } from '../../components'
import { useAutenticacao } from '../../contexts/ContextUsuLogado.tsx';
import { Tab } from '@headlessui/react'
import { validador } from '../../utils/validador';

const Swal = require('sweetalert2')

let PageSize = 5;


const ViewTicket = () => {

    const { currentColor } = useStateContext();
    const { usuario } = useAutenticacao();
    const [showModal, setShowModal] = React.useState(false);
    const [ticket, setTicket] = useState({ title: '', description: ``, classification: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const headers = ['Título', 'Classificação', 'Editar', 'Avaliar']
    const [data, setData] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const tabs = ['Visualizar', 'Avaliar']
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
                    Summary: element.description,
                    classification: element.type == 1 ? "HOTFIX" : "FEATURE",
                })
            });
            setData(tickets)
        })
    }
  
    function teste(e) {
        const notai = document.getElementById("notaI")
        const notar = document.getElementById("notaR")
        const notac = document.getElementById("notaC")
        if (validador.selectEstaDefault(notar)){
            Swal.fire({
                icon: 'error',
                title: 'Falha na avaliação!',
                text: 'Por favor selecione a nota de Risco',
              })
              return
        }
        if (validador.selectEstaDefault(notai)){
            Swal.fire({
                icon: 'error',
                title: 'Falha na avaliação!',
                text: 'Por favor selecione a nota Impacto',
              })
              return
        }
        console.log(notai.value);
        if(validador.selectEstaDefault(notac)){
            Swal.fire({
                icon: 'error',
                title: 'Falha na avaliação!',
                text: 'Por favor selecione a nota Custo',
              })
              return
        }
        if (validador.selectAvaliar(notar)) {
            Swal.fire({
                title: `Você deseja avaliar o risco como ${notar.value}?`,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Avaliar',
                denyButtonText: `Não avaliar`,
                cancelButtonText: `Cancelar`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire('Avaliado!', '', 'success')
                } else if (result.isDenied) {
                    Swal.fire('Não avalidado', '', 'info')
                }
            })
            return
        }
        if (validador.selectAvaliar(notai)) {
            Swal.fire({
                title: `Você deseja avaliar o impacto como ${notai.value}?`,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Avaliar',
                denyButtonText: `Não avaliar`,
                cancelButtonText: `Cancelar`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire('Avaliado!', '', 'success')
                } else if (result.isDenied) {
                    Swal.fire('Não avalidado', '', 'info')
                }
            })
            return
        }
        
        if (validador.selectAvaliar(notac)) {
            Swal.fire({
                title: `Você deseja avaliar o custo como ${notac.value}?`,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Avaliar',
                denyButtonText: `Não avaliar`,
                cancelButtonText: `Cancelar`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire('Avaliado!', '', 'success')
                } else if (result.isDenied) {
                    Swal.fire('Não avalidado', '', 'info')
                }
            })
            return
        }
    }
    // const Aproved = (id, status) => {
    //     fetch("/ticket/updateStatus", {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json;charset=utf-8'
    //         },
    //         body: JSON.stringify({ id: id, status: status })
    //     }).then((resposta) => resposta.json()).then((response) => {
    //         if (response.error) {
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'Ticket not archived',
    //             })
    //         }
    //         else {

    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'Ticket approved successfully',
    //             })
    //             var updateData = data.filter(item => item.id != id)
    //             setData(updateData)

    //         }

    //     })


    // }
    // const Archive = (id, status) => {
    //     fetch("/ticket/updateStatus", {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json;charset=utf-8'
    //         },
    //         body: JSON.stringify({ id: id, status: status })
    //     }).then((resposta) => resposta.json()).then((response) => {
    //         if (response.error) {
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'Chamado não arquivado',
    //             })
    //         }
    //         else {

    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'Chamado arquivado com sucesso',
    //             })
    //             var updateData = data.filter(item => item.id != id)
    //             setData(updateData)

    //         }

    //     })
    // }

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

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <Header category="Página" title="Visualizar chamados" />
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
                                        {/* {userPermission !== 3 && (
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                                <button onClick={(e) => Archive(dat.id, 2)} className='bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center right-20'>Archive</button>
                                            </td>
                                        )} */}

                                        {/* Verificação para ocultar o botão 'Approved' */}
                                        {userPermission !== 3 && (
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                                <button onClick={() => { setTicket({ title: dat.title, description: dat.Summary, classification: dat.classification }); setShowModal(true); }} className='bg-green-500 text-white font-bold py-2 px-4 rounded inline-flex items-center right-20'>Avaliar</button>
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
            <>
                {showModal ? (
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

                                        <h3 className="p-2 items-center text-1 font-semibold px2 text-left">
                                            {ticket.title}
                                        </h3>

                                    </div>
                                    {/*body*/}
                                    <div className="w-full px-2 sm:px-0">
                                        <Tab.Group defaultIndex={0}>
                                            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                                                {tabs.map((tab) => (
                                                    <Tab className={({ selected }) =>
                                                        classNames(
                                                            'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                                                            'ring-white ring-opacity-60 ring-offset-2 focus:outline-none',
                                                            selected
                                                                ? 'text-blue-700 bg-white shadow'
                                                                : 'text-gray-500 hover:bg-white/[0.12] hover:text-gray-700'
                                                        )
                                                    }>{tab}</Tab>
                                                ))}
                                            </Tab.List>
                                            <Tab.Panels className="mt-2">
                                                <Tab.Panel className={classNames(
                                                    'rounded-xl bg-white p-3',
                                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                                                )}>
                                                    <div id='description' className="relative max-h-72 p-6 max-w-3x1 overflow-scroll m-6" dangerouslySetInnerHTML={{ __html: ticket.description }} />
                                                </Tab.Panel>
                                                <Tab.Panel>

                                                    <div className=" pl-2 mt-2 text-lg font-bold dark:text-black">Análise de risco:</div>
                                                    <div className='pl-2'>
                                                        <select id="notaR" defaultValue='default' className=' pl-2 mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-5/6 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                                                            <option value="default" disabled>Selecione uma nota:</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                        </select>
                                                    </div>

                                                    <div className="pl-2 mt-2 text-lg font-bold dark:text-black">Análise de impacto:</div>
                                                    <div className='pl-2'>
                                                        <select id="notaI" defaultValue='default' className='pl-2 mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-5/6 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                                                            <option value="default" disabled>Selecione uma nota:</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                        </select>
                                                    </div>
                                                    <div className="pl-2 mt-2 text-lg font-bold dark:text-black">Análise de custo:</div>
                                                    <div className='pl-2'>
                                                        <select id="notaC" defaultValue='default' className='pl-2 mt-2 my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-5/6 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                                                            <option value="default" disabled>Selecione uma nota:</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                        </select>
                                                    </div>

                                                </Tab.Panel>
                                            </Tab.Panels>
                                        </Tab.Group>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-white rounded-full bg-red-600  hover:bg-red-800 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Fechar
                                        </button>

                                        <button onClick={() => teste()} className="text-white rounded-full bg-green-700  hover:bg-green-800 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button" > Avaliar </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
            </>
        </>
    );
};

export default ViewTicket;