import React, { useState, useEffect } from 'react';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';

import { kanbanGrid } from '../../data/dummy';
import { Header } from '../../components';

export default function Kanban() {
  const [showModal, setShowModal] = React.useState(false);
  const [data, setData] = useState([])
  const [ticket, setTicket] = useState({ title: '', description: ``, classification: '' })
  const [searchTerm, setSearchTerm] = useState('');
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
      setData(tickets)
    })
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
        <Header category="App" title="Kanban" />
        <div className="block relative pl-2.5">
          <span className="h-full absolute inset-y-0 flex items-center pl-2">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
              <path
                d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
              </path>
            </svg>
          </span>
          <input placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)}
            className="appearance-none rounded-r-lg border border-gray-400 border-b block pl-8 pr-6 py-2 w-44 bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
        </div>
        <KanbanComponent
          id="kanban"
          keyField="Status"
          cardSettings={{ headerField: 'Id', template: cardTemplate.bind(this) }}
          dataSource={data}
          dialogOpen={DialogOpen.bind(this)}
          dragStop={(e) => { changeStatus(e.data[0].Id, e.data[0].Status); }}
          cardDoubleClick={(e) => { setTicket({ title: e.data.Title, description: e.data.Summary, classification: e.data.Type }); setShowModal(true); }}

        >
          <ColumnsDirective>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {kanbanGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
          </ColumnsDirective>
        </KanbanComponent>
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
                    <div className='px-2'>
                      {ticket.classification == 'Hotfix' ?
                        <span class="p-1 text-[13px] rounded-full bg-red-500 text-white">{ticket.classification}</span>
                        :
                        <span class="p-1 text-[13px] rounded-full bg-cyan-400 text-white">{ticket.classification}</span>
                      }
                    </div>
                    <h3 className="text-1 font-semibold px2 text-left">
                      {ticket.title}
                    </h3>

                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}

                  <div id='description' className="relative max-h-72 p-6 max-w-3x1 overflow-scroll m-6" dangerouslySetInnerHTML={{ __html: ticket.description }} />
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
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