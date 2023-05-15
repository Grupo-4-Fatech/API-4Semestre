import React, { useEffect, useState, useMemo } from 'react';
import Pagination from '../../components/Paginacao/Pagination';
import { useStateContext } from '../../contexts/ContextProvider'
import { Header } from '../../components'
import { useAutenticacao } from '../../contexts/ContextUsuLogado.tsx';
import { Tab } from '@headlessui/react'
import { validador } from '../../utils/validador';
import { useLanguage } from "../../contexts/contextLanguage";
import visualizarChamado from '../../utils/tradutor/ticket/tradutorVisualizarChamado';


const Swal = require('sweetalert2')

let PageSize = 5;


const ViewTicket = () => {
    const { language } = useLanguage();
    const { currentColor } = useStateContext();
    const { usuario } = useAutenticacao();
    const [showModal, setShowModal] = React.useState(false);
    const [showModalHistorico, setShowModalHistorico] = React.useState(false);
    const [ticket, setTicket] = useState({ id: '', title: '', description: ``, classification: '', risk:'', cost:'', impact:'' });
    const [currentPage, setCurrentPage] = useState(1);
    const headers = [
        visualizarChamado[language].headerTitulo,
        visualizarChamado[language].headerClassificacao,
        visualizarChamado[language].headerEditar,
        visualizarChamado[language].headerAvaliar,
        visualizarChamado[language].headerHistorico
    ]
    const [data, setData] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const tabs = [visualizarChamado[language].tabsVisualizar, visualizarChamado[language].tabsAvaliar]
    const userPermission = usuario?.role
    const [grupos, setGrupos] = useState([])
    const riscoUsers = getUsersByGroup(grupos, 'Grupo Risco');
    const custoUsers = getUsersByGroup(grupos, 'Grupo Custo');
    const impactoUsers = getUsersByGroup(grupos, 'Grupo Impacto');
    const arrayNotas = new Array();
    const [selectRisco, setSelectRisco] = useState();
    const [selectImpacto, setSelectImpacto] = useState();
    const [selectCusto, setSelectCusto] = useState();
    const [riscoDesabilitado, setRiscoDesabilitado] = useState(false)
    const [custoDesabilitado, setCustoDesabilitado] = useState(false)
    const [impactoDesabilitado, setImpactoDesabilitado] = useState(false)

    function getUsersByGroup(groups, groupName) {
        const group = groups.find(group => group.name.toLowerCase() === groupName.toLowerCase());

        if (group) {
            return group.users;
        } else {
            return [];
        }
    }

    function hasPermission(users, loggedInUser) {
        return users.some(user => user.id === loggedInUser);
    }

    function disableSelects(loggedInUser) {
        if (!hasPermission(riscoUsers, loggedInUser)) {
            setRiscoDesabilitado(true)
        }

        if (!hasPermission(custoUsers, loggedInUser)) {
            setCustoDesabilitado(true)
        }

        if (!hasPermission(impactoUsers, loggedInUser)) {
            setImpactoDesabilitado(true)
        }
    }

    function getDataAndSetSelectPermission() {
        disableSelects(usuario.id);
    };

    function getData() {
        fetch("/ticket/getAll/1", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then((resposta) => resposta.json()).then((data) => {
            var tickets = []
            console.log(data)
            data.forEach(element => {
                tickets.push({
                    id: element.id,
                    title: element.title,
                    Summary: element.description,
                    classification: element.type == 1 ? "HOTFIX" : "FEATURE",
                    risk : element.risk != ""? element.risk:"default",
                    cost: element.cost != ""? element.cost:"default",
                    impact: element.impact != ""? element.impact:"default",
                })
            });
            setData(tickets)
        })
        fetch("/InspectionGroup/list", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then((resposta) => resposta.json()).then((data) => {
            setGrupos(data);
        })
    }

    function getAllUserIds(groups) {
        const allUserIds = [];

        groups.forEach(group => {
            group.users.forEach(user => {
                allUserIds.push(user.id);
            });
        });

        return allUserIds;
    }

    const allUserIds = getAllUserIds(grupos);

    function adicionarAvaliacao(tipo, nota) {
        if (nota !== 'default' && nota !== null) {
            const avaliacao = {
                tipo: tipo,
                nota: nota
            };
            arrayNotas.push(avaliacao);
        }
    }

    async function confirmarAvaliacao(nota, avaliacao) {
        return Swal.fire({
            title: `${visualizarChamado[language][avaliacao]} ${nota}?`,
            showCancelButton: true,
            confirmButtonText: visualizarChamado[language].avaliarButton,
            cancelButtonText: visualizarChamado[language].cancelButton,
        })
        .then((result) => {
            if (result.isDismissed) {
                return 'cancelado'
            }
        })
    }

    async function verificaDefault(nota, analise) {
        if (nota === undefined) {
            return Swal.fire({
                icon: 'error',
                title: visualizarChamado[language].errotTitle,
                text: visualizarChamado[language][analise],
            })
        }
    }

    async function avaliar(id) {
        if (hasPermission(riscoUsers, usuario.id)) {
            const resultado = await verificaDefault(selectRisco, 'selectDefautlNotarText')
            if (resultado !== undefined) { return }
            const risco = await confirmarAvaliacao(selectRisco, 'avaliarRisco')
            if (risco === 'cancelado') {return}
            adicionarAvaliacao(1, selectRisco)
        }
        if (hasPermission(impactoUsers, usuario.id)) {
            const resultado = await verificaDefault(selectImpacto, 'selectDefautlNotaiText')
            if (resultado !== undefined) { return }
            const impacto = await confirmarAvaliacao(selectImpacto, 'avaliarImpacto')
            if (impacto === 'cancelado') {return}
            adicionarAvaliacao(2, selectImpacto)
        }
        if (hasPermission(custoUsers, usuario.id)) {
            const resultado = await verificaDefault(selectCusto, 'selectDefautlNotacText')
            if (resultado !== undefined) { return }
            const custo = await confirmarAvaliacao(selectCusto, 'avaliarCusto')
            if (custo === 'cancelado') {return}
            
        adicionarAvaliacao(3, selectCusto)
        }
        // adicionarAvaliacao(1, selectRisco)
        // adicionarAvaliacao(2, selectImpacto)
        // adicionarAvaliacao(3, selectCusto)
        await fetch("/ticket/avaliar", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ id: id, data: arrayNotas })
        }).then((resposta) => resposta.json()).then((res) => {
            if (res.error) {
                Swal.fire({
                    icon: 'error',
                    title: visualizarChamado[language].errotTitle
                })
            }
            else {
                Swal.fire(visualizarChamado[language].messageAvaliado, '', 'success')
                if(res.aprovado){
                var updateData = data.filter(item => item.id != id)
                setData(updateData); setShowModal(false)
                }
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

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <Header category={visualizarChamado[language].page} title={visualizarChamado[language].pageTitle} />
                <div className="block relative">
                    <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                            <path
                                d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                            </path>
                        </svg>
                    </span>
                    <input placeholder={visualizarChamado[language].placheSearch} onChange={(e) => setSearchTerm(e.target.value)}
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
                                            <button onClick={() => { window.location.href = "/ticket/update/" + dat.id }} style={{ backgroundColor: currentColor }} className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20">{visualizarChamado[language].editarButton}</button>
                                        </td>

                                        {/* Verificação para disable o botão 'Avaliar' */}
                                        {userPermission !== 3 && (
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">

                                                <button
                                                    onClick={() => { setTicket({ id: dat.id, title: dat.title, description: dat.Summary, classification: dat.classification, risk:dat.risk, cost:dat.cost, impact:dat.impact }); setSelectCusto(dat.cost); setSelectImpacto(dat.impact); setSelectRisco(dat.risk);setShowModal(true); getDataAndSetSelectPermission() }}
                                                    className={`bg-green-500 text-white font-bold py-2 px-4 rounded inline-flex items-center right-20 ${!allUserIds.includes(usuario.id) ? 'bg-gray-400 cursor-not-allowed' : ''}`}
                                                    disabled={!allUserIds.includes(usuario.id)}
                                                >
                                                    {visualizarChamado[language].avaliarButton}
                                                </button>
                                            </td>
                                        )}

                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                            <button onClick={() => { setTicket({ id: dat.id, title: dat.title, description: dat.Summary, classification: dat.classification });  setSelectCusto(dat.cost); setSelectImpacto(dat.impact); setSelectRisco(dat.risk);setShowModalHistorico(true); }} className="bg-botaohistorico text-white font-bold py-2 px-4 rounded inline-flex items-center right-20">
                                                {visualizarChamado[language].historicoButton}</button>
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
                            <div className="relative w-3/5 my-6">
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
                                        <Tab.Group defaultIndex={1}>
                                            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1  pl-2 pr-2">
                                                {tabs.map((tab, index) => (
                                                    <Tab key={index} className={({ selected }) =>
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

                                                    <div className=" pl-2  mt-2 text-lg font-bold dark:text-black">{visualizarChamado[language].titleRisco}</div>
                                                    <div className='pl-2 pr-2'>
                                                        <select id="notaR" defaultValue='default' disabled={riscoDesabilitado} value={selectRisco} onChange={(e) => { setSelectRisco(e.target.value) }} className=' pl-2 mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                                                            <option value="default" disabled>{visualizarChamado[language].selectNota}</option>
                                                            <option value="0">0</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                        </select>
                                                    </div>

                                                    <div className="pl-2 mt-2 text-lg font-bold dark:text-black">{visualizarChamado[language].titleImpacto}</div>
                                                    <div className='pl-2 pr-2'>
                                                        <select id="notaI" defaultValue='default' disabled={impactoDesabilitado} value={selectImpacto} onChange={(e) => { setSelectImpacto(e.target.value) }} className='pl-2 mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                                                            <option value="default" disabled>{visualizarChamado[language].selectNota}</option>
                                                            <option value="0">0</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                        </select>
                                                    </div>
                                                    <div className="pl-2 mt-2 text-lg font-bold dark:text-black">{visualizarChamado[language].titleCusto}</div>
                                                    <div className='pl-2 pr-2'>
                                                        <select id="notaC" defaultValue='default' disabled={custoDesabilitado} value={selectCusto} onChange={(e) => { setSelectCusto(e.target.value) }} className='pl-2 mt-2 my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                                                            <option value="default" disabled>{visualizarChamado[language].selectNota}</option>
                                                            <option value="0">0</option>
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
                                            {visualizarChamado[language].closeButton}
                                        </button>
                                        <button onClick={() => avaliar(ticket.id)} className="text-white rounded-full bg-green-700  hover:bg-green-800 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button" >{visualizarChamado[language].avaliarButton} </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
            </>
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
                                            {visualizarChamado[language].closeButton}
                                        </button>
                                        <button
                                            className="text-white rounded-full bg-botaohistorico  hover:bg-green-900 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => { window.location.href = "/historic/" + ticket.id }}
                                        >
                                            {visualizarChamado[language].historicoButton}
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                    : null}
            </>
        </>
    );
};

export default ViewTicket;