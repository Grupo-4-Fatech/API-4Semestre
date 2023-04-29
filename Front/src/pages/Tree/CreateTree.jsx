import Campo from '../../components/Campo'
import { Header } from '../../components'
import { MdSend } from 'react-icons/md';
import { useStateContext } from '../../contexts/ContextProvider'
import SelectMult from '../../components/Select';
import { useEffect, useState } from 'react';
import { validador } from "../../utils/validador";
const Swal = require('sweetalert2')
export default function CreateTree() {
    const { currentColor } = useStateContext();
    const [selectMult, setSelectMult] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("");
    const [data, setData] = useState([])
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

    function CriaTime() {
        if (selectMult.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Falha ao criar equipes!',
                text: 'Adicione um usuário',
            })
            return
        }

        if (validador.estaVazio(name)) {
            Swal.fire({
                icon: 'error',
                title: 'Falha ao criar equipes!',
                text: 'Por favor, escreva um nome',
            })
            return
        }
        if (validador.tamanhoTexto(name)) {
            Swal.fire({
                icon: 'error',
                title: 'Falha ao criar equipes!',
                text: 'O tamanho do nome é muito grande',
            })
            return
        }
        if (validador.estaVazio(description)) {

            Swal.fire({
                icon: 'error',
                title: 'Falha ao criar equipes!',
                text: 'Por favor, escreva uma descrição',
            })
            return
        }

    }
    useEffect(() => { getUser() }, [])

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="árvore" />
            <div>
                <h1 className='text-lg font-bold dark:text-black'>
                ANÁLISE DE RISCO
                </h1>
                <div className='ml-2'>
                    <SelectMult id="integrantesDoTime" dados={data} text={'Selecione os usuários'} value={selectMult} setValue={setSelectMult} />

                </div>
            </div>
            <div>
                <h1 className='text-lg font-bold dark:text-black'>
                ANÁLISE DE IMPACTO
                </h1>
                <div className='ml-2'>
                    <SelectMult id="integrantesDoTime" dados={data} text={'Selecione os usuários'} value={selectMult} setValue={setSelectMult} />

                </div>

            </div>
            <div>
                <h1 className='text-lg font-bold dark:text-black'>
                ANÁLISE DE CUSTO
                </h1>
                <div className='ml-2'>
                    <SelectMult id="integrantesDoTime" dados={data} text={'Selecione os usuários'} value={selectMult} setValue={setSelectMult} />

                </div>
            </div>
            <div className="mt-5 mb-5 flex" >
                <button onClick={() => CriaTime()} style={{ backgroundColor: currentColor, position: 'absolute' }} className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20" >
                    <span className='pr-1'>Create</span>
                    <MdSend />
                </button>
            </div>

        </div>
    );

}
