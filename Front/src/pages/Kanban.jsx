import React , {useState, useEffect}from 'react';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';

import { kanbanData, kanbanGrid } from '../data/dummy';
import { Header } from '../components';

export default function Kanban () {
  const [data, setData] = useState([])
  function getData(){
      fetch("/ticket/getKanbanItem", {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json;charset=utf-8'
          }
      }).then((resposta) => resposta.json()).then((data) => {
          var tickets = []
         data.forEach(element => {
          tickets.push({
              Id: element.id,
              Title: element.title,
              Status: getStatus(element.status),
              Summary: "",
              Type: element.type == 1? "Hotfix": "Feature",
              Priority: '',
              Tags: '',
              Estimate: 1,
              Assignee: '',
              RankId: 2,
              Color: '#1F88E5',
              ClassName: 'e-others, e-critical, e-janet-leverling',

          })
          
          
         });
         setData(tickets)
      })
  }

  function getStatus(status){
    var newStatus = "";
    if(status == 5){
        newStatus = 'Done'
    }else if(status == 4){
      newStatus = 'OnHold'
    }else{
      newStatus = 'New'
    }
     
    return newStatus
  }

  const changeStatus = (id, newStatus) => {
    var status = "";
    if(newStatus == "OnHold"){
      status = 4
    }else if( newStatus == "Done"){
      status = 5
    }else{
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
   var color = props.Type== "Hotfix"? "red": "blue"
    return (<div style={{borderLeft:"solid 2.5px "+ color}} className="card-template">
                <div className='e-card-content'>
                    <table className="card-template-wrap" >
                        <tbody >
                            <tr>
                                <td style={{color: color, fontSize:"1.2em", backgroundColor:"white", textDecoration:"underline"}}>{props.Type +" " + props.Id}</td>
                            </tr>
                           
                            <tr>
                                <td className="CardHeader" style={{color:"black", fontSize:"1.2em", backgroundColor:"white"}} >{props.Title}</td>
                                
                            </tr>
                          
                        </tbody>
                    </table>
                </div>
            </div>);
            
        }
        function DialogOpen(args) {
          args.cancel = true;
        }
        useEffect(()=>{
          getData()
        },[])
 
return (
  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header category="App" title="Kanban" />
    <KanbanComponent
      id="kanban"
      keyField="Status"
      cardSettings={{headerField: 'Id' ,template:cardTemplate.bind(this)}}
      dataSource={data}
      dialogOpen={DialogOpen.bind(this)}
      dragStop={(e)=> {changeStatus(e.data[0].Id, e.data[0].Status);}}
      cardDoubleClick={()=> console.log()}
     
    >
      <ColumnsDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {kanbanGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
      </ColumnsDirective>
    </KanbanComponent>
  </div>
);
}






