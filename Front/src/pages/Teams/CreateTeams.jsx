import Campo from '../../components/Campo'
import { Header } from '../../components'
import { MdSend } from 'react-icons/md';
import { useStateContext } from '../../contexts/ContextProvider'
import SelectMult from '../../components/Select';
import { useEffect, useState } from 'react';
import { validador } from "../../utils/validador";
import { useLanguage } from "../../contexts/contextLanguage";
import tradutorCriarTime from '../../utils/tradutor/teams/tradutorCriarTime';

const Swal = require('sweetalert2')





export default function CreateTeams() {
    const { language } = useLanguage();
    const { currentColor } = useStateContext();
    const [selectMult, setSelectMult] = useState([])
    const [name, setName] = useState("")
    const group = document.getElementById("group")
    const [description, setDescription] = useState("");
    const [data, setData] = useState([])
    const [groups, setGroup] = useState([])
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
                title: tradutorCriarTime[language].errorTitle,
                text: tradutorCriarTime[language].errorNomeVazio,
            })
            return
        }
        if (validador.tamanhoTexto(name)) {
            Swal.fire({
                icon: 'error',
                title: tradutorCriarTime[language].errorTitle,
                text: tradutorCriarTime[language].errorTamanhoTexto,
            })
            return
        }
        if (selectMult.length === 0) {
            Swal.fire({
                icon: 'error',
                title: tradutorCriarTime[language].errorTitle,
                text: tradutorCriarTime[language].selectMultAddUsers,
            })
            return
        }
        if (validador.selectEstaDefault(group)) {
            Swal.fire({
                icon: 'error',
                title: tradutorCriarTime[language].errorTitle,
                text: tradutorCriarTime[language].selectDefaultGroup,
            })
            return
        }
        if (validador.estaVazio(description)) {

            Swal.fire({
                icon: 'error',
                title: tradutorCriarTime[language].errorTitle,
                text: tradutorCriarTime[language].errorDescriptionVazio,
            })
            return
        }
        if (validador.tamanhoTexto(description)) {
            Swal.fire({
                icon: 'error',
                title: tradutorCriarTime[language].errorTitle,
                text: tradutorCriarTime[language].errorDescriptionTamanhoTexto,
            })
            return
        }
        fetch("/teams/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ name: name, description: description, group: group.value, users: selectMult })
        }).then((resposta) => resposta.json()).then((data) => {
            if (data.error) {
                Swal.fire({
                    icon: 'error',
                    title: tradutorCriarTime[language].errorTitle,
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: tradutorCriarTime[language].messageSucssefuly,
                }).then((result) => result.isConfirmed ? window.location.href = "/teams/view" : '')

            }
        })

    }
    useEffect(() => { getUser(); getGroup(); }, [])

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category={tradutorCriarTime[language].page} title={tradutorCriarTime[language].pageTitle} />
            <Campo id="tituloTime" text={tradutorCriarTime[language].timeTitle} placeholder={tradutorCriarTime[language].timePlaceholder} type={"text"} value={name} setValue={setName} />
            <SelectMult id="integrantesDoTime" dados={data} text={tradutorCriarTime[language].selectMultTitle} value={selectMult} setValue={setSelectMult} />
            <div className='mt-5'><label className="text-lg font-bold dark:text-black " >{tradutorCriarTime[language].selectEquipeTitle}</label>
                <select id="group" defaultValue='default' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    <option value="default" disabled>{tradutorCriarTime[language].selectOption}</option>
                    {groups.map((ele) => {
                        return (<option key={ele.id} value={ele.id}>{ele.nome}</option>)
                    })}

                </select></div>
            <div className='my-6'> <Campo id='descriçãoTime' text={tradutorCriarTime[language].descriptonTitle} placeholder={tradutorCriarTime[language].discriptionPlaceholder} type={"text"} value={description} setValue={setDescription} /></div>

            <div className="mt-5 mb-5 flex items-center justify-end" >
                <button onClick={() => CriaTime()} style={{ backgroundColor: currentColor }} className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20" >
                    <span className='pr-1 '>{tradutorCriarTime[language].criarButton}</span>
                    <MdSend />
                </button>
            </div>

        </div>
    );

}
