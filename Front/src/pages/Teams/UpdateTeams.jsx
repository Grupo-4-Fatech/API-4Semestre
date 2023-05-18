import Campo from '../../components/Campo'
import { Header } from '../../components'
import { MdSend } from 'react-icons/md';
import { useStateContext } from '../../contexts/ContextProvider'
import SelectMult from '../../components/Select';
import { useEffect, useState } from 'react';
import { validador } from "../../utils/validador";
import { useParams } from 'react-router-dom';
import { useLanguage } from "../../contexts/contextLanguage";
import tradutorAlterarTime from '../../utils/tradutor/teams/tradutorUpdateTeam';

const Swal = require('sweetalert2')

export default function UpdateTeams() {
    const { currentColor, selectMult, setSelectMult } = useStateContext();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [data, setData] = useState([]);
    const [groups, setGroup] = useState([]);
    const { language } = useLanguage();
    const [teamGroup, setTeamGroup] = useState("default");
    const group = document.getElementById("group");
    const id = useParams();
    const [loading, setLoading] = useState(false);

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
                title: tradutorAlterarTime[language].errorTitle,
                text: tradutorAlterarTime[language].errorNomeVazio,
            })
            return
        }
        if (validador.tamanhoTexto(name)) {
            Swal.fire({
                icon: 'error',
                title: tradutorAlterarTime[language].errorTitle,
                text: tradutorAlterarTime[language].errorTamanhoTexto,
            })
            return
        }
        if (selectMult.length === 0) {
            Swal.fire({
                icon: 'error',
                title: tradutorAlterarTime[language].errorTitle,
                text: tradutorAlterarTime[language].selectMultAddUsers,
            })
            return
        }
        if (selectMult.length >= 5) {
            Swal.fire({
                icon: 'error',
                title: tradutorAlterarTime[language].errorTitle,
                text: tradutorAlterarTime[language].selectMultAddUsersTamanho,
            })
            return
        }
        if (validador.selectEstaDefault(group)) {
            Swal.fire({
                icon: 'error',
                title: tradutorAlterarTime[language].errorTitle,
                text: tradutorAlterarTime[language].selectDefaultGroup,
            })
            return
        }
        if (validador.estaVazio(description)) {

            Swal.fire({
                icon: 'error',
                title: tradutorAlterarTime[language].errorTitle,
                text: tradutorAlterarTime[language].errorDescriptionVazio,
            })
            return
        }
        setLoading(true);
        fetch("/teams/update", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ id: id.id, name: name, description: description, group: group.value, users: selectMult })
        }).then((resposta) => resposta.json()).then((data) => {
            if (data.error) {
                Swal.fire({
                    icon: 'error',
                    title: tradutorAlterarTime[language].errorTitle,
                })
                setLoading(false);
            } else {
                Swal.fire({
                    icon: 'success',
                    title: tradutorAlterarTime[language].messageSucssefuly,
                }).then((result) => result.isConfirmed ? window.location.href = "/teams/view" : '')
                setLoading(false);
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
            <Header category={tradutorAlterarTime[language].page} title={tradutorAlterarTime[language].pageTitle} />
            <Campo id="tituloTime" text={tradutorAlterarTime[language].timeTitle} placeholder={tradutorAlterarTime[language].timePlaceholder} type={"text"} value={name} setValue={setName} />
            <SelectMult id="integrantesDoTime" dados={data} text={tradutorAlterarTime[language].selectMultTitle} value={selectMult} setValue={setSelectMult} />
            <div className='mt-5'><label className="text-lg font-bold dark:text-black " >{tradutorAlterarTime[language].selectEquipeTitle}</label>
                <select onChange={(e) => setTeamGroup(e.target.value)} id="group" value={teamGroup} defaultValue={teamGroup} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    <option value="default" disabled>{tradutorAlterarTime[language].selectOption}</option>
                    {groups.map((ele) => {
                        return (<option key={ele.id} value={ele.id}>{ele.nome}</option>)
                    })}
                </select></div>
            <div className='my-6'> <Campo id='descriçãoTime' text={tradutorAlterarTime[language].descriptonTitle} placeholder={tradutorAlterarTime[language].discriptionPlaceholder} type={"text"} value={description} setValue={setDescription} /></div>

            <div className="mt-5 mb-5 flex items-center justify-end" >
                <button onClick={() => CriaTime()}
                    style={{ backgroundColor: currentColor }}
                    disabled={loading === true}
                    className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20" >
                    <span className='pr-1'>{loading ?
                        <div role="status">
                            <svg aria-hidden="true" class="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div>
                        :
                        tradutorAlterarTime[language].updateButton}
                    </span>
                    <MdSend />
                </button>
            </div>

        </div>
    );
};
