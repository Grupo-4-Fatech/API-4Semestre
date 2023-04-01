import React, { useState, useEffect } from 'react';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';

import { kanbanData, kanbanGrid } from '../data/dummy';
import { Header } from '../components';

export default function Kanban() {
  const [showModal, setShowModal] = React.useState(false);
  const [data, setData] = useState([])
  const [ticket, setTicket] = useState({ title: '', description: ``, classification: '' })
  function getData() {
    fetch("/ticket/getKanbanItem", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then((resposta) => resposta.json()).then((data) => {
      var tickets = []
      console.log(data)
      data.forEach(element => {
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


      });
      console.log(tickets)
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
    var color = props.Type == "Hotfix" ? "red" : "blue"
    return (<div style={{ borderLeft: "solid 2.5px " + color }} className="card-template">
      <div className='e-card-content'>
        <table className="card-template-wrap" >
          <tbody >
            <tr>
              <td style={{ color: color, fontSize: "1.2em", backgroundColor: "white", textDecoration: "underline" }}>{props.Type + " " + props.Id}</td>
            </tr>

            <tr>
              <td className="CardHeader" style={{ color: "black", fontSize: "1.2em", backgroundColor: "white" }} >{props.Title}</td>

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
  }, [])

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="App" title="Kanban" />
        <KanbanComponent
          id="kanban"
          keyField="Status"
          cardSettings={{ headerField: 'Id', template: cardTemplate.bind(this) }}
          dataSource={data}
          dialogOpen={DialogOpen.bind(this)}
          dragStop={(e) => { changeStatus(e.data[0].Id, e.data[0].Status); }}
          cardDoubleClick={(e) => { setTicket({ title: e.data.Title, description: e.data.Summary, classification: e.data.Type }); setShowModal(true); console.log(e) }}

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






