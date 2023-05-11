import React, { useState, useEffect } from 'react';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';
import { kanbanGridPt,kanbanGridEn } from '../../data/dummy';
import { Header } from '../../components';
import { useAutenticacao } from '../../contexts/ContextUsuLogado.tsx';
import { Tab } from '@headlessui/react'
import { validador } from '../../utils/validador';
import { useLanguage } from "../../contexts/contextLanguage";

import Swal from 'sweetalert2';
import tradutorKanban from '../../utils/tradutor/tradutorKanban';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Kanban() {
  const [showModal, setShowModal] = React.useState(false);
  const [data, setData] = useState([])
  const [ticket, setTicket] = useState({ id: 0, title: '', description: ``, classification: '' })
  const [searchTerm, setSearchTerm] = useState('');
  const { language } = useLanguage();
  const { usuario } = useAutenticacao();
  const tabs = [tradutorKanban[language].tabsVisualizar,tradutorKanban[language].tabsAcao, tradutorKanban[language].tabsSolucao]
  const userPermission = usuario?.role
  const itensKanban = language === 'pt'? kanbanGridPt : kanbanGridEn
  const isDraggable = userPermission !== 3;
  function getData() {
    fetch("/ticket/getKanbanItem", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then((resposta) => resposta.json()).then((data) => {
      var tickets = []
      data.forEach(element => {
        if (
          element.title.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          tickets.push({
            Id: element.id,
            Title: element.title,
            Status: getStatus(element.status),
            Summary: element.description,
            Type: element.type == 1 ? "Hotfix" : "Feature",
            Priority: '',
            Tags: '',
            Estimate: 1,
            Assignee: '',
            RankId: 2,
            Color: '#1F88E5',
            ClassName: 'e-others, e-critical, e-janet-leverling',

          })

        }
      });
      setData(tickets);
    })
  }

  function teste() {
    const descricao = document.getElementById("descricao")
    if (validador.estaVazio(descricao.value)) {
      Swal.fire({
        icon: 'error',
        title: tradutorKanban[language].errorSolucaoTitle,
        text: tradutorKanban[language].errorSolucaoText,
      })
      return
    }
  }

  function getStatus(status) {
    var newStatus = "";
    if (status == 5) {
      newStatus = 'Done'
    } else if (status == 4) {
      newStatus = 'OnHold'
    } else {
      newStatus = 'New'
    }

    return newStatus
  }

  const changeStatus = (id, newStatus) => {
    var status = "";
    if (newStatus == "OnHold") {
      status = 4
    } else if (newStatus == "Done") {
      status = 5
    } else {
      status = 3
    }

    fetch("/ticket/updateStatus", {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ id: id, status: status })
    }).then((resposta) => resposta.json()).then((response) => {

    })


  }



  function cardTemplate(props) {
    var color = props.Type == "Hotfix" ? "rgba(225, 30, 30, 0.813)" : "rgb(31, 207, 198)"
    return (<div style={{ borderLeft: "solid 2.5px", color: color }} className="card-template ">
      <div className='e-card-content'>
        <table className="card-template-wrap" >
          <tbody >
            <tr >
              <td className="CardMod" >{props.Title}</td>
            </tr>
            <tr >
              <td className="CardHeader">{props.Type}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>);

  }
  function DialogOpen(args) {
    args.cancel = true;
  }
  useEffect(() => {
    getData()
  }, [searchTerm])

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category={tradutorKanban[language].page} title={tradutorKanban[language].pageTitle}/>
        <div className='flex '>
          <div className="flex-1 block relative pl-2.5 ">
            <span className="h-full absolute inset-y-0 flex items-center pl-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                <path
                  d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                </path>
              </svg>
            </span>
            <input placeholder={tradutorKanban[language].placheSearch} onChange={(e) => setSearchTerm(e.target.value)}
              className="appearance-none rounded-r-lg border border-gray-400 border-b block pl-8 pr-6 py-2 w-44 bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
          </div>
          <div className='mr-3 ' >
            {/* <select id="gender" class="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">              <option value="default" disabled selected>Select a Team:</option>
              <option value="team">Dev</option>
            </select> */}
          </div>
        </div>
        <KanbanComponent
          id="kanban"
          keyField="Status"
          cardSettings={{ headerField: 'Id', template: cardTemplate.bind(this) }}
          dataSource={data}
          allowDragAndDrop={isDraggable}
          dialogOpen={DialogOpen.bind(this)}
          dragStop={(e) => { changeStatus(e.data[0].Id, e.data[0].Status); }}
          cardDoubleClick={(e) => { setTicket({ id: e.data.Id, title: e.data.Title, description: e.data.Summary, classification: e.data.Type }); setShowModal(true); }}

        >
          <ColumnsDirective>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {itensKanban.map((item, index) => <ColumnDirective key={index} {...item} />)}
          </ColumnsDirective>
        </KanbanComponent>
      </div>
      <>
        {showModal ? (
          <>
            {console.log(ticket)}
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
                          'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 '
                        )}>
                          <div id='description' className="relative max-h-72 p-6 max-w-3x1 overflow-scroll m-6" dangerouslySetInnerHTML={{ __html: ticket.description }} />
                        </Tab.Panel>
                        <Tab.Panel>
                          <div id='historico' className="relative max-h-72 p-6 max-w-3x1 overflow-scroll m-6">

                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2" onClick={() => window.location.href = "/ticket/update/" + ticket.id}>{tradutorKanban[language].atualizarButon}</button>
                            <button type="button" className="text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2" onClick={() => window.location.href = "/historic/" + ticket.id}>{tradutorKanban[language].historico}</button>

                          </div>
                        </Tab.Panel>
                        <Tab.Panel>
                          <div className="pl-2 mt-2 text-lg font-bold dark:text-black">{tradutorKanban[language].descricaoTitle}</div>
                          <textarea id="descricao" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={tradutorKanban[language].placeholderDescricao}></textarea>
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
                      {tradutorKanban[language].buttonClose}
                    </button>
                    <button onClick={()=> teste()} type="button" className="text-white rounded-full bg-blue-700  hover:bg-blue-800 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                      {tradutorKanban[language].buttonConfirm}
                    </button>

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
}