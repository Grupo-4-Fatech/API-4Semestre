import Campo from '../../components/Campo'
import { Header } from '../../components'
import { MdSend } from 'react-icons/md';
import { useStateContext } from '../../contexts/ContextProvider'
import SelectMult from '../../components/Select';
import { useEffect, useState } from 'react';
import { validador } from "../../utils/validador";
import { useParams } from 'react-router-dom';
const Swal = require('sweetalert2')

export default function UpdateTeams() {
    const { currentColor, selectMult, setSelectMult } = useStateContext();
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [data, setData] = useState([])
    const [groups, setGroup] = useState([])
    const [teamGroup, setTeamGroup] = useState("default")
    const group = document.getElementById("group")
    const id = useParams();
    function getUser() {
        fetch("/user/getUsers", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then((resposta) => resposta.json()).then((data) => {
            var users = []
            data.forEach(element => {
                users.push({
                    value: element.id,
                    label: element.name,
                })
            });
            setData(users)
        })
    }
    function getGroup() {
        fetch("/group/list", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then((resposta) => resposta.json()).then((data) => {
            var groups = []
            data.forEach(element => {
                groups.push({
                    id: element.id,
                    nome: element.name
                })
            });
            setGroup(groups)
        })
    }
    function CriaTime() {
        if (validador.estaVazio(name)) {
            Swal.fire({
                icon: 'error',
                title: 'Update Teams Failed!',
                text: 'Please write a name',
            })
            return
        }
        if (validador.tamanhoTexto(name)) {
            Swal.fire({
                icon: 'error',
                title: 'Update Teams Failed!',
                text: 'Name size is too big',
            })
            return
        }
        if (selectMult.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Update Teams Failed!',
                text: 'Please add an user',
            })
            return
        }
        if (validador.selectEstaDefault(group)) {
            Swal.fire({
                icon: 'error',
                title: 'Update Teams Failed!',
                text: 'Please select a group',
            })
            return
        }
        if (validador.estaVazio(description)) {

            Swal.fire({
                icon: 'error',
                title: 'Update Teams Failed!',
                text: 'Please write a description',
            })
            return
        }
        fetch("/teams/update", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ id:id.id,name:name, description:description, group:group.value , users: selectMult })
        }).then((resposta) => resposta.json()).then((data) => {
            if (data.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to update team',
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Updated successfully',
                }).then((result) => result.isConfirmed ? window.location.href = "/teams/view" : '')

            }
        })

    }
    function getData() {
        fetch("/teams/get/" + id.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then((resposta) => resposta.json()).then((data) => {
            if (data != null) {
                setName(data[0].name);
                setDescription(data[0].description);
                setTeamGroup(data[0].group.id);
                var Users = []
                data[0].users.map(element => {
                    Users.push({
                        value: element.id,
                        label: element.name,
                    })
                });
                setSelectMult(Users)

            }
        })

    }


    useEffect(() => {
        getUser();
        getGroup();
        getData();
    }, [])

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Update Teams" />
            <Campo id="tituloTime" text="Team name" placeholder="Name" type={"text"} value={name} setValue={setName} />
            <SelectMult id="integrantesDoTime" dados={data} text={'Select the users'} value={selectMult} setValue={setSelectMult} />
            <div className='mt-5'><label className="text-lg font-bold dark:text-black " >Select a Group</label>
                <select onChange={(e)=> setTeamGroup(e.target.value)}id="group" value={teamGroup} defaultValue={teamGroup} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    <option value="default" disabled>Select an option:</option>
                    {groups.map((ele) => {
                        return (<option key={ele.id} value={ele.id}>{ele.nome}</option>)
                    })}
                </select></div>
            <div className='my-6'> <Campo id='descriçãoTime' text="Description" placeholder="Description" type={"text"} value={description} setValue={setDescription} /></div>

            <div className="mt-5 mb-5 flex items-center justify-end" >
                <button onClick={() => CriaTime()} style={{ backgroundColor: currentColor }} className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20" >
                    <span className='pr-1'>Update</span>
                    <MdSend />
                </button>
            </div>

        </div>
    );
};
